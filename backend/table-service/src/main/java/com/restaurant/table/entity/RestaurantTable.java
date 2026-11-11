package com.restaurant.table.entity;

import com.restaurant.common.enums.TableStatus;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "restaurant_tables", indexes = {
        @Index(name = "idx_table_restaurant", columnList = "restaurantId"),
        @Index(name = "idx_table_capacity", columnList = "capacity")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RestaurantTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long restaurantId;

    @Column(nullable = false, length = 50)
    private String tableNumber;

    @Column(nullable = false, length = 100)
    private String zone; // Romantic Window, Main Dining Room, Terrace Garden, Private Salon VIP

    @Column(nullable = false)
    private Integer capacity;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private TableStatus status = TableStatus.AVAILABLE;

    private Integer x;
    private Integer y;
}

