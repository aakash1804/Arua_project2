package com.restaurant.restaurant.repository;

import com.restaurant.restaurant.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    @Query("SELECT r FROM Restaurant r WHERE " +
           "(:search IS NULL OR LOWER(r.name) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(r.location) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(r.cuisine) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:cuisine IS NULL OR LOWER(r.cuisine) LIKE LOWER(CONCAT('%', :cuisine, '%'))) AND " +
           "(:priceRange IS NULL OR r.priceRange = :priceRange) AND " +
           "(:minRating IS NULL OR r.rating >= :minRating)")
    List<Restaurant> searchRestaurants(
            @Param("search") String search,
            @Param("cuisine") String cuisine,
            @Param("priceRange") String priceRange,
            @Param("minRating") BigDecimal minRating);
}

