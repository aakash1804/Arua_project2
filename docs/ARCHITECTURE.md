# System Architecture & Technical Design Document
## AURA - Premium Fine Dining Table Reservation Platform

### 1. Architectural Overview
A modern, decoupled, cloud-native microservices architecture designed for high concurrency, zero double-booking tolerances, and sub-100ms response times.

```
                              ┌──────────────────────────────────────────────┐
                              │             React 18 Frontend                │
                              │  Tailwind CSS • Framer Motion • Lucide Icons │
                              └──────────────────────┬───────────────────────┘
                                                     │ HTTP / REST (Port 3000/5000)
                                                     ▼
                              ┌──────────────────────────────────────────────┐
                              │         Spring Cloud Gateway (8080)          │
                              │  CORS WebFilter • JWT Auth Check • Routing   │
                              └──────┬───────────────┬───────────────┬───────┘
                                     │               │               │
       ┌─────────────────────────────┼───────────────┼───────────────┼────────────────────────────┐
       ▼                             ▼               ▼               ▼                            ▼
┌──────────────┐             ┌──────────────┐┌──────────────┐┌──────────────┐             ┌──────────────┐
│ User Service │             │  Restaurant  ││Table Service ││Booking Engine│             │ Notification │
│  (Port 8081) │             │  (Port 8082) ││ (Port 8083)  ││ (Port 8084)  │             │ (Port 8085)  │
└──────┬───────┘             └──────┬───────┘└──────┬───────┘└──────┬───────┘             └──────▲───────┘
       │                            │               │               │                            │
       │                            │               │        Kafka Event:                        │
       │                            │               │   BookingCreatedEvent ─────────────────────┘
       │                            │               │
       ▼                            ▼               ▼               ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                        MySQL 8.0 Cluster (Port 3306)                      │
│     users • restaurants • restaurant_tables • bookings • notifications    │
└───────────────────────────────────────────────────────────────────────────┘
```

### 2. Service Catalog
1. **API Gateway (8080)**: Reverse proxy with dynamic Eureka routing, non-blocking Spring WebFlux, centralized CORS, rate limiting.
2. **Eureka Discovery Server (8761)**: Dynamic service registration and client-side load balancing.
3. **User Service (8081)**: Spring Security 6 with stateless JWT tokens, BCrypt password hashing, customer profile and dietary preferences.
4. **Restaurant Service (8082)**: Cuisines, ratings, facilities, multi-category menus (Starters, Mains, Desserts, Wine Pairings), and full-text search.
5. **Table Service (8083)**: Floor plan zones (Romantic Window, Terrace, Main Hall, VIP Private Salon), capacities (2 to 12 seats), spatial coordinates (X, Y).
6. **Booking Engine Service (8084)**: Concurrency control via `@Transactional(isolation = Isolation.SERIALIZABLE)`, transactional locking, double-booking prevention, unique reference codes (`BK-YYYYMMDD-XXXX`), status lifecycle (`PENDING` -> `CONFIRMED` -> `COMPLETED` / `CANCELLED`).
7. **Notification Service (8085)**: Kafka consumer for `booking-created-topic` and `booking-cancelled-topic`, email/SMS dispatcher simulation.

### 3. Concurrency & Double-Booking Prevention Logic
Double-booking is prevented across multiple architectural layers:
1. **Database Constraints & Composite Indexing**:
   - Unique Index on `bookingReference`.
   - Composite Index on `(restaurantId, tableId, bookingDate, bookingTime)`.
2. **Pessimistic & Optimistic Concurrency Control**:
   - Bookings are executed under serializable transaction isolation.
   - An explicit check-and-lock query checks for overlapping active reservations for that table, date, and slot.
   - Hibernate `@Version` prevents concurrent overwrite anomalies.

