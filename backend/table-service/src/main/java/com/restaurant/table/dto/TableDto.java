package com.restaurant.table.dto;

import com.restaurant.common.enums.TableStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TableDto {
    private Long id;
    private Long restaurantId;
    private String tableNumber;
    private String zone;
    private Integer capacity;
    private TableStatus status;
    private Integer x;
    private Integer y;
    private Boolean isAvailable;
}

