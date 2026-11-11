package com.restaurant.restaurant.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "restaurants", indexes = {
        @Index(name = "idx_restaurant_name", columnList = "name"),
        @Index(name = "idx_restaurant_cuisine", columnList = "cuisine"),
        @Index(name = "idx_restaurant_location", columnList = "location")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(nullable = false, length = 100)
    private String cuisine;

    @Column(nullable = false, length = 150)
    private String location;

    @Column(nullable = false, length = 255)
    private String address;

    @Column(precision = 2, scale = 1)
    @Builder.Default
    private BigDecimal rating = new BigDecimal("4.8");

    @Builder.Default
    private Integer reviewCount = 0;

    @Column(length = 10)
    @Builder.Default
    private String priceRange = "$$$$";

    @Builder.Default
    private Boolean featured = false;

    @Column(length = 100)
    private String openingHours;

    @Column(length = 30)
    private String phone;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 500)
    private String image;

    @ElementCollection
    @CollectionTable(name = "restaurant_facilities", joinColumns = @JoinColumn(name = "restaurant_id"))
    @Column(name = "facility")
    @Builder.Default
    private List<String> facilities = new ArrayList<>();

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<MenuItem> menuItems = new ArrayList<>();

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}

