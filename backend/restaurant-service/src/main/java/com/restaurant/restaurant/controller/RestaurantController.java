package com.restaurant.restaurant.controller;

import com.restaurant.common.dto.ApiResponse;
import com.restaurant.restaurant.dto.RestaurantDto;
import com.restaurant.restaurant.service.RestaurantService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
@RequiredArgsConstructor
@Tag(name = "Restaurants", description = "Endpoints for discovering, searching, and managing restaurants")
public class RestaurantController {

    private final RestaurantService restaurantService;

    @GetMapping
    @Operation(summary = "Search and filter fine dining restaurants")
    public ResponseEntity<ApiResponse<List<RestaurantDto>>> getAll(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String cuisine,
            @RequestParam(required = false) String priceRange,
            @RequestParam(required = false) BigDecimal minRating) {
        return ResponseEntity.ok(ApiResponse.ok(restaurantService.getAllRestaurants(search, cuisine, priceRange, minRating)));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get full restaurant details with menu and facilities")
    public ResponseEntity<ApiResponse<RestaurantDto>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(restaurantService.getRestaurantById(id)));
    }

    @PostMapping
    @Operation(summary = "Admin: Create a new partner restaurant")
    public ResponseEntity<ApiResponse<RestaurantDto>> create(@RequestBody RestaurantDto dto) {
        return new ResponseEntity<>(ApiResponse.ok(restaurantService.createRestaurant(dto), "Restaurant created"), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Admin: Update restaurant information")
    public ResponseEntity<ApiResponse<RestaurantDto>> update(@PathVariable Long id, @RequestBody RestaurantDto dto) {
        return ResponseEntity.ok(ApiResponse.ok(restaurantService.updateRestaurant(id, dto), "Restaurant updated"));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Admin: Delete restaurant listing")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        restaurantService.deleteRestaurant(id);
        return ResponseEntity.ok(ApiResponse.ok(null, "Restaurant deleted successfully"));
    }
}

