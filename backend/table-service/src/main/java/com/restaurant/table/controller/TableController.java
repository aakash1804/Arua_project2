package com.restaurant.table.controller;

import com.restaurant.common.dto.ApiResponse;
import com.restaurant.table.dto.TableDto;
import com.restaurant.table.service.TableService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tables")
@RequiredArgsConstructor
@Tag(name = "Tables", description = "Endpoints for managing tables and checking floor layout availability")
public class TableController {

    private final TableService tableService;

    @GetMapping("/restaurant/{restaurantId}")
    @Operation(summary = "Get all tables for a given restaurant")
    public ResponseEntity<ApiResponse<List<TableDto>>> getByRestaurant(@PathVariable Long restaurantId) {
        return ResponseEntity.ok(ApiResponse.ok(tableService.getTablesByRestaurant(restaurantId)));
    }

    @GetMapping("/available")
    @Operation(summary = "Get available tables for party size")
    public ResponseEntity<ApiResponse<List<TableDto>>> getAvailable(
            @RequestParam Long restaurantId,
            @RequestParam(required = false) Integer guests) {
        return ResponseEntity.ok(ApiResponse.ok(tableService.getAvailableTables(restaurantId, guests)));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get table by id")
    public ResponseEntity<ApiResponse<TableDto>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(tableService.getTableById(id)));
    }

    @PostMapping
    @Operation(summary = "Admin: Add a table to the floor plan")
    public ResponseEntity<ApiResponse<TableDto>> create(@RequestBody TableDto dto) {
        return new ResponseEntity<>(ApiResponse.ok(tableService.createTable(dto), "Table created"), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Admin: Update table details or capacity")
    public ResponseEntity<ApiResponse<TableDto>> update(@PathVariable Long id, @RequestBody TableDto dto) {
        return ResponseEntity.ok(ApiResponse.ok(tableService.updateTable(id, dto), "Table updated"));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Admin: Delete table")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        tableService.deleteTable(id);
        return ResponseEntity.ok(ApiResponse.ok(null, "Table deleted successfully"));
    }
}

