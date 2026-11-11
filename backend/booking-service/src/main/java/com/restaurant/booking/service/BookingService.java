package com.restaurant.booking.service;

import com.restaurant.booking.dto.BookingRequest;
import com.restaurant.booking.dto.BookingResponse;
import com.restaurant.booking.dto.DashboardStatsDto;
import com.restaurant.booking.entity.Booking;
import com.restaurant.booking.repository.BookingRepository;
import com.restaurant.common.enums.BookingStatus;
import com.restaurant.common.events.BookingCancelledEvent;
import com.restaurant.common.events.BookingCreatedEvent;
import com.restaurant.common.exception.ResourceNotFoundException;
import com.restaurant.common.exception.TableUnavailableException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookingService {

    private final BookingRepository bookingRepository;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    private static final String TOPIC_BOOKING_CREATED = "booking-created-topic";
    private static final String TOPIC_BOOKING_CANCELLED = "booking-cancelled-topic";

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public BookingResponse createReservation(BookingRequest req) {
        log.info("Processing reservation request for restaurant {} table {} on {} at {}", 
                req.getRestaurantId(), req.getTableId(), req.getBookingDate(), req.getBookingTime());

        // 1. Double-booking prevention check
        List<Booking> conflicts = bookingRepository.findConflicts(
                req.getRestaurantId(),
                req.getTableId(),
                req.getBookingDate(),
                req.getBookingTime(),
                BookingStatus.CANCELLED
        );

        if (!conflicts.isEmpty()) {
            throw new TableUnavailableException(String.format(
                    "Table %s is already reserved for %s on %s. Please select another table or time.",
                    req.getTableNumber(), req.getBookingTime(), req.getBookingDate()
            ));
        }

        // 2. Generate unique human-readable booking reference
        String datePrefix = req.getBookingDate().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        int randomSuffix = ThreadLocalRandom.current().nextInt(1000, 9999);
        String bookingRef = "BK-" + datePrefix + "-" + randomSuffix;

        // 3. Save entity
        Booking booking = Booking.builder()
                .bookingReference(bookingRef)
                .userId(req.getUserId())
                .customerName(req.getCustomerName())
                .customerEmail(req.getCustomerEmail())
                .customerPhone(req.getCustomerPhone())
                .restaurantId(req.getRestaurantId())
                .restaurantName(req.getRestaurantName())
                .tableId(req.getTableId())
                .tableNumber(req.getTableNumber())
                .zone(req.getZone() != null ? req.getZone() : "Main Dining Room")
                .bookingDate(req.getBookingDate())
                .bookingTime(req.getBookingTime())
                .guestCount(req.getGuestCount())
                .specialRequests(req.getSpecialRequests())
                .status(BookingStatus.CONFIRMED)
                .build();

        Booking saved = bookingRepository.save(booking);

        // 4. Publish asynchronous event to Kafka
        try {
            BookingCreatedEvent event = BookingCreatedEvent.builder()
                    .bookingId(saved.getId())
                    .bookingReference(saved.getBookingReference())
                    .userId(saved.getUserId())
                    .customerName(saved.getCustomerName())
                    .customerEmail(saved.getCustomerEmail())
                    .customerPhone(saved.getCustomerPhone())
                    .restaurantId(saved.getRestaurantId())
                    .restaurantName(saved.getRestaurantName())
                    .tableId(saved.getTableId())
                    .tableNumber(saved.getTableNumber())
                    .bookingDate(saved.getBookingDate())
                    .bookingTime(saved.getBookingTime())
                    .guestCount(saved.getGuestCount())
                    .specialRequests(saved.getSpecialRequests())
                    .build();
            kafkaTemplate.send(TOPIC_BOOKING_CREATED, saved.getBookingReference(), event);
        } catch (Exception ex) {
            log.warn("Kafka not available or failed to publish event: {}", ex.getMessage());
        }

        return mapToResponse(saved);
    }

    public List<BookingResponse> getMyBookings(Long userId) {
        return bookingRepository.findByUserIdOrderByBookingDateDescBookingTimeDesc(userId)
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public List<BookingResponse> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(this::mapToResponse).collect(Collectors.toList());
    }

    public BookingResponse getById(Long id) {
        Booking b = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
        return mapToResponse(b);
    }

    @Transactional
    public BookingResponse cancelReservation(Long id, String reason) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));

        booking.setStatus(BookingStatus.CANCELLED);
        Booking updated = bookingRepository.save(booking);

        try {
            BookingCancelledEvent event = BookingCancelledEvent.builder()
                    .bookingId(updated.getId())
                    .bookingReference(updated.getBookingReference())
                    .customerEmail(updated.getCustomerEmail())
                    .restaurantName(updated.getRestaurantName())
                    .cancellationReason(reason != null ? reason : "Customer request")
                    .build();
            kafkaTemplate.send(TOPIC_BOOKING_CANCELLED, updated.getBookingReference(), event);
        } catch (Exception ex) {
            log.warn("Kafka notification skipped: {}", ex.getMessage());
        }

        return mapToResponse(updated);
    }

    @Transactional
    public BookingResponse updateStatus(Long id, BookingStatus status) {
        Booking b = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
        b.setStatus(status);
        return mapToResponse(bookingRepository.save(b));
    }

    public DashboardStatsDto getDashboardStats() {
        long total = bookingRepository.count();
        long confirmed = bookingRepository.countByStatus(BookingStatus.CONFIRMED);
        long cancelled = bookingRepository.countByStatus(BookingStatus.CANCELLED);
        long completed = bookingRepository.countByStatus(BookingStatus.COMPLETED);

        long totalGuests = bookingRepository.findAll().stream()
                .filter(b -> b.getStatus() == BookingStatus.CONFIRMED || b.getStatus() == BookingStatus.COMPLETED)
                .mapToInt(Booking::getGuestCount)
                .sum();

        BigDecimal estimatedRevenue = BigDecimal.valueOf(totalGuests).multiply(BigDecimal.valueOf(95)); // avg $95/cover

        return DashboardStatsDto.builder()
                .totalBookings(total)
                .confirmedBookings(confirmed)
                .cancelledBookings(cancelled)
                .completedBookings(completed)
                .totalGuestsServed(totalGuests)
                .totalEstimatedRevenue(estimatedRevenue)
                .occupancyRate((int) Math.min(100, (confirmed * 100 / Math.max(1, total))))
                .build();
    }

    private BookingResponse mapToResponse(Booking b) {
        return BookingResponse.builder()
                .id(b.getId())
                .bookingReference(b.getBookingReference())
                .userId(b.getUserId())
                .customerName(b.getCustomerName())
                .customerEmail(b.getCustomerEmail())
                .customerPhone(b.getCustomerPhone())
                .restaurantId(b.getRestaurantId())
                .restaurantName(b.getRestaurantName())
                .tableId(b.getTableId())
                .tableNumber(b.getTableNumber())
                .zone(b.getZone())
                .bookingDate(b.getBookingDate())
                .bookingTime(b.getBookingTime())
                .guestCount(b.getGuestCount())
                .specialRequests(b.getSpecialRequests())
                .status(b.getStatus())
                .createdAt(b.getCreatedAt())
                .build();
    }
}

