package com.restaurant.user.controller;

import com.restaurant.common.dto.ApiResponse;
import com.restaurant.user.dto.UserProfileDto;
import com.restaurant.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "User Management", description = "Endpoints for guest profiles")
public class UserController {

    private final UserService userService;

    @GetMapping("/profile/{userId}")
    @Operation(summary = "Get user profile details")
    public ResponseEntity<ApiResponse<UserProfileDto>> getProfile(@PathVariable Long userId) {
        return ResponseEntity.ok(ApiResponse.ok(userService.getProfile(userId)));
    }

    @PutMapping("/profile/{userId}")
    @Operation(summary = "Update user profile and dietary preferences")
    public ResponseEntity<ApiResponse<UserProfileDto>> updateProfile(
            @PathVariable Long userId,
            @RequestBody UserProfileDto dto) {
        return ResponseEntity.ok(ApiResponse.ok(userService.updateProfile(userId, dto), "Profile updated successfully"));
    }
}

