package com.restaurant.booking.entity;

import com.restaurant.common.enums.BookingStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "bookings", indexes = {
        @Index(name = "idx_booking_ref", columnList = "bookingReference", unique = true),
        @Index(name = "idx_booking_user", columnList = "userId"),
        @Index(name = "idx_booking_slot", columnList = "restaurantId, tableId, bookingDate, bookingTime")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String bookingReference;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false, length = 100)
    private String customerName;

    @Column(nullable = false, length = 120)
    private String customerEmail;

    @Column(length = 30)
    private String customerPhone;

    @Column(nullable = false)
    private Long restaurantId;

    @Column(nullable = false, length = 150)
    private String restaurantName;

    @Column(nullable = false)
    private Long tableId;

    @Column(nullable = false, length = 50)
    private String tableNumber;

    @Column(length = 100)
    private String zone;

    @Column(nullable = false)
    private LocalDate bookingDate;

    @Column(nullable = false)
    private LocalTime bookingTime;

    @Column(nullable = false)
    private Integer guestCount;

    @Column(columnDefinition = "TEXT")
    private String specialRequests;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private BookingStatus status = BookingStatus.CONFIRMED;

    @Version
    private Long version;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}

