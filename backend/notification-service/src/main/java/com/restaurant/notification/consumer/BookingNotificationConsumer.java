package com.restaurant.notification.consumer;

import com.restaurant.common.events.BookingCancelledEvent;
import com.restaurant.common.events.BookingCreatedEvent;
import com.restaurant.notification.entity.Notification;
import com.restaurant.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class BookingNotificationConsumer {

    private final NotificationService notificationService;

    @KafkaListener(topics = "booking-created-topic", groupId = "notification-group")
    public void handleBookingCreated(BookingCreatedEvent event) {
        log.info("Received booking created event for reference: {}", event.getBookingReference());

        String title = "Table Reservation Confirmed - " + event.getRestaurantName();
        String message = String.format(
                "Dear %s, your reservation (%s) for %d guests at %s on %s at %s (Table %s - %s) is confirmed.",
                event.getCustomerName(),
                event.getBookingReference(),
                event.getGuestCount(),
                event.getRestaurantName(),
                event.getBookingDate(),
                event.getBookingTime(),
                event.getTableNumber(),
                event.getSpecialRequests()
        );

        Notification notification = Notification.builder()
                .recipientEmail(event.getCustomerEmail())
                .title(title)
                .message(message)
                .type("BOOKING_CONFIRMATION")
                .build();

        notificationService.saveAndDispatch(notification);
    }

    @KafkaListener(topics = "booking-cancelled-topic", groupId = "notification-group")
    public void handleBookingCancelled(BookingCancelledEvent event) {
        log.info("Received booking cancelled event for reference: {}", event.getBookingReference());

        String title = "Reservation Cancelled - " + event.getRestaurantName();
        String message = String.format(
                "Your reservation (%s) at %s has been cancelled. Reason: %s",
                event.getBookingReference(),
                event.getRestaurantName(),
                event.getCancellationReason()
        );

        Notification notification = Notification.builder()
                .recipientEmail(event.getCustomerEmail())
                .title(title)
                .message(message)
                .type("BOOKING_CANCELLATION")
                .build();

        notificationService.saveAndDispatch(notification);
    }
}

