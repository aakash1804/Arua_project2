package com.restaurant.notification.controller;

import com.restaurant.common.dto.ApiResponse;
import com.restaurant.notification.entity.Notification;
import com.restaurant.notification.service.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
@Tag(name = "Notifications", description = "Endpoints for booking alerts and confirmation logs")
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    @Operation(summary = "Get user notifications")
    public ResponseEntity<ApiResponse<List<Notification>>> getNotifications(@RequestParam(required = false) String email) {
        return ResponseEntity.ok(ApiResponse.ok(notificationService.getNotifications(email)));
    }
}

