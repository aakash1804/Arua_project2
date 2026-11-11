package com.restaurant.booking.controller;

import com.restaurant.booking.dto.BookingRequest;
import com.restaurant.booking.dto.BookingResponse;
import com.restaurant.booking.service.BookingService;
import com.restaurant.common.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
@Tag(name = "Bookings", description = "Endpoints for reserving tables, checking status, and cancellations")
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    @Operation(summary = "Create a table reservation with double-booking prevention")
    public ResponseEntity<ApiResponse<BookingResponse>> create(@Valid @RequestBody BookingRequest req) {
        BookingResponse res = bookingService.createReservation(req);
        return new ResponseEntity<>(ApiResponse.ok(res, "Table reservation confirmed"), HttpStatus.CREATED);
    }

    @GetMapping("/my-bookings")
    @Operation(summary = "Get bookings for authenticated user")
    public ResponseEntity<ApiResponse<List<BookingResponse>>> getMyBookings(@RequestParam(defaultValue = "2") Long userId) {
        return ResponseEntity.ok(ApiResponse.ok(bookingService.getMyBookings(userId)));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get booking confirmation details by ID")
    public ResponseEntity<ApiResponse<BookingResponse>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(bookingService.getById(id)));
    }

    @PutMapping("/{id}/cancel")
    @Operation(summary = "Cancel a reservation")
    public ResponseEntity<ApiResponse<BookingResponse>> cancel(
            @PathVariable Long id,
            @RequestParam(required = false) String reason) {
        return ResponseEntity.ok(ApiResponse.ok(bookingService.cancelReservation(id, reason), "Reservation cancelled"));
    }
}

