package com.restaurant.booking.dto;

import com.restaurant.common.enums.BookingStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponse {
    private Long id;
    private String bookingReference;
    private Long userId;
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private Long restaurantId;
    private String restaurantName;
    private Long tableId;
    private String tableNumber;
    private String zone;
    private LocalDate bookingDate;
    private LocalTime bookingTime;
    private Integer guestCount;
    private String specialRequests;
    private BookingStatus status;
    private LocalDateTime createdAt;
}

