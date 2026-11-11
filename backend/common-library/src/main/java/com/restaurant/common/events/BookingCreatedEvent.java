package com.restaurant.common.events;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingCreatedEvent implements Serializable {
    private Long bookingId;
    private String bookingReference;
    private Long userId;
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private Long restaurantId;
    private String restaurantName;
    private Long tableId;
    private String tableNumber;
    private LocalDate bookingDate;
    private LocalTime bookingTime;
    private Integer guestCount;
    private String specialRequests;
}

