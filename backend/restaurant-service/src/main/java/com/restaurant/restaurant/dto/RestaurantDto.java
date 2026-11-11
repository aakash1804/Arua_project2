package com.restaurant.restaurant.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantDto {
    private Long id;
    private String name;
    private String cuisine;
    private String location;
    private String address;
    private BigDecimal rating;
    private Integer reviewCount;
    private String priceRange;
    private Boolean featured;
    private String openingHours;
    private String phone;
    private String description;
    private String image;
    private List<String> facilities;
    private List<MenuItemDto> menu;
}

