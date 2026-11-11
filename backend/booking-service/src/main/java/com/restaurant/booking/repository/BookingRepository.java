package com.restaurant.booking.repository;

import com.restaurant.booking.entity.Booking;
import com.restaurant.common.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import jakarta.persistence.LockModeType;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    Optional<Booking> findByBookingReference(String bookingReference);

    List<Booking> findByUserIdOrderByBookingDateDescBookingTimeDesc(Long userId);

    @Query("SELECT b FROM Booking b WHERE b.restaurantId = :restaurantId " +
           "AND b.tableId = :tableId " +
           "AND b.bookingDate = :bookingDate " +
           "AND b.bookingTime = :bookingTime " +
           "AND b.status != :cancelledStatus")
    List<Booking> findConflicts(
            @Param("restaurantId") Long restaurantId,
            @Param("tableId") Long tableId,
            @Param("bookingDate") LocalDate bookingDate,
            @Param("bookingTime") LocalTime bookingTime,
            @Param("cancelledStatus") BookingStatus cancelledStatus);

    long countByStatus(BookingStatus status);
}

