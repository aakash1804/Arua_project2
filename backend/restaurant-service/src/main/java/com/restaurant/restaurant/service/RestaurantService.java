package com.restaurant.restaurant.service;

import com.restaurant.common.exception.ResourceNotFoundException;
import com.restaurant.restaurant.dto.MenuItemDto;
import com.restaurant.restaurant.dto.RestaurantDto;
import com.restaurant.restaurant.entity.MenuItem;
import com.restaurant.restaurant.entity.Restaurant;
import com.restaurant.restaurant.repository.MenuItemRepository;
import com.restaurant.restaurant.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final MenuItemRepository menuItemRepository;

    public List<RestaurantDto> getAllRestaurants(String search, String cuisine, String priceRange, BigDecimal minRating) {
        List<Restaurant> list = restaurantRepository.searchRestaurants(search, cuisine, priceRange, minRating);
        return list.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public RestaurantDto getRestaurantById(Long id) {
        Restaurant r = restaurantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id: " + id));
        return mapToDto(r);
    }

    @Transactional
    public RestaurantDto createRestaurant(RestaurantDto dto) {
        Restaurant r = Restaurant.builder()
                .name(dto.getName())
                .cuisine(dto.getCuisine())
                .location(dto.getLocation())
                .address(dto.getAddress() != null ? dto.getAddress() : dto.getLocation())
                .priceRange(dto.getPriceRange() != null ? dto.getPriceRange() : "$$$$")
                .openingHours(dto.getOpeningHours() != null ? dto.getOpeningHours() : "5:00 PM - 11:00 PM")
                .phone(dto.getPhone())
                .description(dto.getDescription())
                .image(dto.getImage() != null ? dto.getImage() : "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80")
                .facilities(dto.getFacilities() != null ? dto.getFacilities() : new ArrayList<>())
                .build();

        Restaurant saved = restaurantRepository.save(r);
        return mapToDto(saved);
    }

    @Transactional
    public RestaurantDto updateRestaurant(Long id, RestaurantDto dto) {
        Restaurant r = restaurantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id: " + id));

        if (dto.getName() != null) r.setName(dto.getName());
        if (dto.getCuisine() != null) r.setCuisine(dto.getCuisine());
        if (dto.getLocation() != null) r.setLocation(dto.getLocation());
        if (dto.getAddress() != null) r.setAddress(dto.getAddress());
        if (dto.getPriceRange() != null) r.setPriceRange(dto.getPriceRange());
        if (dto.getOpeningHours() != null) r.setOpeningHours(dto.getOpeningHours());
        if (dto.getPhone() != null) r.setPhone(dto.getPhone());
        if (dto.getDescription() != null) r.setDescription(dto.getDescription());
        if (dto.getImage() != null) r.setImage(dto.getImage());

        Restaurant updated = restaurantRepository.save(r);
        return mapToDto(updated);
    }

    @Transactional
    public void deleteRestaurant(Long id) {
        if (!restaurantRepository.existsById(id)) {
            throw new ResourceNotFoundException("Restaurant not found with id: " + id);
        }
        restaurantRepository.deleteById(id);
    }

    private RestaurantDto mapToDto(Restaurant r) {
        List<MenuItemDto> menu = (r.getMenuItems() != null) 
                ? r.getMenuItems().stream().map(m -> MenuItemDto.builder()
                        .id(m.getId())
                        .name(m.getName())
                        .category(m.getCategory())
                        .price(m.getPrice())
                        .description(m.getDescription())
                        .available(m.getAvailable())
                        .build()).collect(Collectors.toList())
                : new ArrayList<>();

        return RestaurantDto.builder()
                .id(r.getId())
                .name(r.getName())
                .cuisine(r.getCuisine())
                .location(r.getLocation())
                .address(r.getAddress())
                .rating(r.getRating())
                .reviewCount(r.getReviewCount())
                .priceRange(r.getPriceRange())
                .featured(r.getFeatured())
                .openingHours(r.getOpeningHours())
                .phone(r.getPhone())
                .description(r.getDescription())
                .image(r.getImage())
                .facilities(r.getFacilities())
                .menu(menu)
                .build();
    }
}

