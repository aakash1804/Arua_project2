package com.restaurant.booking.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsDto {
    private long totalBookings;
    private long confirmedBookings;
    private long cancelledBookings;
    private long completedBookings;
    private long totalGuestsServed;
    private BigDecimal totalEstimatedRevenue;
    private int occupancyRate;
}

