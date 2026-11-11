package com.restaurant.user.controller;

import com.restaurant.common.dto.ApiResponse;
import com.restaurant.user.dto.AuthRequest;
import com.restaurant.user.dto.AuthResponse;
import com.restaurant.user.dto.RegisterRequest;
import com.restaurant.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Endpoints for user registration and JWT login")
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    @Operation(summary = "Register new customer or admin account")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest req) {
        AuthResponse res = userService.register(req);
        return new ResponseEntity<>(ApiResponse.ok(res, "User registered successfully"), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    @Operation(summary = "Authenticate user and issue JWT token")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody AuthRequest req) {
        AuthResponse res = userService.login(req);
        return ResponseEntity.ok(ApiResponse.ok(res, "Login successful"));
    }
}

