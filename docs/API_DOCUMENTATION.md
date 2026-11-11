# REST API Specification Document
## AURA Platform Endpoints

Base URL: `http://localhost:8080/api`

### 1. Authentication Service (`/api/auth`)
- `POST /api/auth/register`
  - Body: `{ fullName, email, password, phone, role, dietaryNotes }`
  - Response: `201 Created` with JWT token and user profile.
- `POST /api/auth/login`
  - Body: `{ email, password }`
  - Response: `200 OK` with JWT token.

### 2. User Profiles (`/api/users`)
- `GET /api/users/profile/{userId}`
  - Response: `200 OK` with guest details.
- `PUT /api/users/profile/{userId}`
  - Body: `{ fullName, phone, dietaryNotes }`
  - Response: `200 OK`.

### 3. Restaurants Catalog (`/api/restaurants`)
- `GET /api/restaurants`
  - Query parameters: `search`, `cuisine`, `priceRange`, `minRating`
  - Response: `200 OK` with array of restaurants.
- `GET /api/restaurants/{id}`
  - Response: `200 OK` with menu, facilities, photos.
- `POST /api/restaurants` (Admin)
  - Body: Restaurant DTO
  - Response: `201 Created`.
- `PUT /api/restaurants/{id}` (Admin)
  - Response: `200 OK`.
- `DELETE /api/restaurants/{id}` (Admin)
  - Response: `200 OK`.

### 4. Tables & Floor Plans (`/api/tables`)
- `GET /api/tables/restaurant/{restaurantId}`
  - Response: Array of tables for restaurant.
- `GET /api/tables/available`
  - Query parameters: `restaurantId`, `guests`, `date`, `time`
  - Response: Available tables with status.
- `POST /api/tables` (Admin)
  - Body: `{ restaurantId, tableNumber, zone, capacity }`
  - Response: `201 Created`.

### 5. Bookings Engine (`/api/bookings`)
- `POST /api/bookings`
  - Body: `{ userId, customerName, customerEmail, restaurantId, restaurantName, tableId, tableNumber, zone, bookingDate, bookingTime, guestCount, specialRequests }`
  - Response: `201 Created` with unique `bookingReference`.
  - Conflicts: Returns `409 Conflict` if table is already reserved.
- `GET /api/bookings/my-bookings`
  - Query parameter: `userId`
  - Response: `200 OK` array of reservations.
- `PUT /api/bookings/{id}/cancel`
  - Query parameter: `reason`
  - Response: `200 OK` with status `CANCELLED`.

### 6. Admin Console (`/api/admin`)
- `GET /api/admin/dashboard`
  - Response: Total bookings, confirmed count, revenue, occupancy rate.
- `GET /api/admin/bookings`
  - Response: Master list of all bookings.
- `PUT /api/admin/bookings/{id}/status`
  - Body: `{ status: "COMPLETED" | "CANCELLED" | "CONFIRMED" }`

