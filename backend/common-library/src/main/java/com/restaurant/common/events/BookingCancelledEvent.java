package com.restaurant.common.events;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingCancelledEvent implements Serializable {
    private Long bookingId;
    private String bookingReference;
    private String customerEmail;
    private String restaurantName;
    private String cancellationReason;
}

