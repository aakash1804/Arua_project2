package com.restaurant.booking.controller;

import com.restaurant.booking.dto.BookingResponse;
import com.restaurant.booking.dto.DashboardStatsDto;
import com.restaurant.booking.service.BookingService;
import com.restaurant.common.dto.ApiResponse;
import com.restaurant.common.enums.BookingStatus;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@Tag(name = "Admin Operations", description = "Endpoints for executive statistics and master bookings")
public class AdminBookingController {

    private final BookingService bookingService;

    @GetMapping("/dashboard")
    @Operation(summary = "Get executive dashboard KPIs, totals, and occupancy")
    public ResponseEntity<ApiResponse<DashboardStatsDto>> getDashboardStats() {
        return ResponseEntity.ok(ApiResponse.ok(bookingService.getDashboardStats()));
    }

    @GetMapping("/bookings")
    @Operation(summary = "Get all reservations across all restaurants")
    public ResponseEntity<ApiResponse<List<BookingResponse>>> getAllBookings() {
        return ResponseEntity.ok(ApiResponse.ok(bookingService.getAllBookings()));
    }

    @PutMapping("/bookings/{id}/status")
    @Operation(summary = "Admin: Update booking status (CONFIRMED, COMPLETED, CANCELLED)")
    public ResponseEntity<ApiResponse<BookingResponse>> updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        String statusStr = body.get("status");
        BookingStatus status = BookingStatus.valueOf(statusStr.toUpperCase());
        return ResponseEntity.ok(ApiResponse.ok(bookingService.updateStatus(id, status), "Status updated"));
    }
}

