package com.restaurant.table.service;

import com.restaurant.common.enums.TableStatus;
import com.restaurant.common.exception.ResourceNotFoundException;
import com.restaurant.table.dto.TableDto;
import com.restaurant.table.entity.RestaurantTable;
import com.restaurant.table.repository.RestaurantTableRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TableService {

    private final RestaurantTableRepository tableRepository;

    public List<TableDto> getTablesByRestaurant(Long restaurantId) {
        return tableRepository.findByRestaurantId(restaurantId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<TableDto> getAvailableTables(Long restaurantId, Integer guests) {
        List<RestaurantTable> tables = (guests != null && guests > 0)
                ? tableRepository.findByRestaurantIdAndCapacityGreaterThanEqual(restaurantId, guests)
                : tableRepository.findByRestaurantId(restaurantId);

        return tables.stream().map(t -> {
            TableDto dto = mapToDto(t);
            dto.setIsAvailable(t.getStatus() == TableStatus.AVAILABLE);
            return dto;
        }).collect(Collectors.toList());
    }

    public TableDto getTableById(Long id) {
        RestaurantTable table = tableRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Table not found with id: " + id));
        return mapToDto(table);
    }

    @Transactional
    public TableDto createTable(TableDto dto) {
        RestaurantTable t = RestaurantTable.builder()
                .restaurantId(dto.getRestaurantId())
                .tableNumber(dto.getTableNumber())
                .zone(dto.getZone() != null ? dto.getZone() : "Main Dining Room")
                .capacity(dto.getCapacity() != null ? dto.getCapacity() : 4)
                .status(TableStatus.AVAILABLE)
                .x(dto.getX())
                .y(dto.getY())
                .build();

        RestaurantTable saved = tableRepository.save(t);
        return mapToDto(saved);
    }

    @Transactional
    public TableDto updateTable(Long id, TableDto dto) {
        RestaurantTable t = tableRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Table not found with id: " + id));

        if (dto.getTableNumber() != null) t.setTableNumber(dto.getTableNumber());
        if (dto.getZone() != null) t.setZone(dto.getZone());
        if (dto.getCapacity() != null) t.setCapacity(dto.getCapacity());
        if (dto.getStatus() != null) t.setStatus(dto.getStatus());

        return mapToDto(tableRepository.save(t));
    }

    @Transactional
    public void deleteTable(Long id) {
        if (!tableRepository.existsById(id)) {
            throw new ResourceNotFoundException("Table not found with id: " + id);
        }
        tableRepository.deleteById(id);
    }

    private TableDto mapToDto(RestaurantTable t) {
        return TableDto.builder()
                .id(t.getId())
                .restaurantId(t.getRestaurantId())
                .tableNumber(t.getTableNumber())
                .zone(t.getZone())
                .capacity(t.getCapacity())
                .status(t.getStatus())
                .x(t.getX())
                .y(t.getY())
                .isAvailable(t.getStatus() == TableStatus.AVAILABLE)
                .build();
    }
}

