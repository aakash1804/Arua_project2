# AURA — Premium Fine Dining Table Reservation Platform

> An enterprise-grade, full-stack Restaurant Table Booking System crafted with a luxury hospitality user experience, real-time table layout allocation, transactional double-booking prevention, and a scalable Java 21 Spring Boot microservices backend.

---

## 🌟 Instant Localhost Link (One-Click Run)

The application is running and accessible right now in your web browser:

👉 **[http://localhost:5000](http://localhost:5000)**

*(Alternatively, you can double-click `c:\Project 1\index.html` to open it directly in Chrome, Edge, or Brave without any runtime dependencies.)*

---

## 🎭 Pre-Loaded Demo Personas

| Role | Name | Email | Password | Pre-Configured State |
| :--- | :--- | :--- | :--- | :--- |
| **Guest / Customer** | Eleanor Vance | `customer@tableprime.com` | `password123` | Active anniversary reservation at *L'Étoile Dorée*, dietary preferences saved |
| **Executive Admin** | Alexander Hamilton | `admin@tableprime.com` | `admin123` | Full administrative control: Revenue KPIs, floor plans, master reservations |

*(Use the persona toggle button on the top-right navbar or within the Sign-In modal to switch between Customer and Admin in one click!)*

---

## 🏛 Architecture & Tech Stack

### Frontend:
- **Framework**: React 18
- **Styling**: Tailwind CSS with custom luxury color scheme (Warm Cream `#FDFCF7`, Deep Charcoal `#111110`, Gold Accents `#D97706`)
- **Typography**: Playfair Display (Serif) & Plus Jakarta Sans (Modern Clean)
- **Icons**: Lucide Icons
- **Animation**: Framer Motion & CSS Smooth Transitions
- **HTTP Client**: Axios with smart failover adapter

### Backend:
- **Language**: Java 21 LTS
- **Framework**: Spring Boot 3.3.5
- **Service Mesh & Gateway**: Spring Cloud Gateway & Netflix Eureka
- **Security**: Spring Security 6 with stateless JWT & BCrypt password hashing
- **Persistence**: Spring Data JPA & Hibernate with Serializable Isolation & Optimistic Versioning
- **Message Broker**: Apache Kafka for asynchronous notification events
- **Database**: MySQL 8.0 with Flyway migrations
- **Documentation**: Swagger OpenAPI 3.0 & Postman Collection

---

## 🚀 Key Functional Modules

1. **Haute Landing Page**:
   - Hero banner with headline *"Your Perfect Table Awaits."*
   - Interactive search bar (Metro location, date picker, lunch/dinner slot, party size).
   - Filter by cuisine, Michelin rating, and price tier.
2. **Interactive Floor Plan & Table Selection**:
   - Visual seating layout organized into zones (*Romantic Window*, *Main Hall*, *Terrace Garden*, *Private VIP Salon*).
   - Real-time table status (🟢 Available, 🔒 Booked/Reserved, ✦ Selected).
3. **Double-Booking Prevention Engine**:
   - Serializable transaction isolation and database constraints prevent two guests from reserving the same table at the same time.
4. **Guest Itinerary & My Reservations**:
   - View confirmed reservations with unique human-readable booking IDs (`BK-YYYYMMDD-XXXX`).
   - One-click cancellation with confirmation prompt and status synchronization.
5. **Executive Admin Console**:
   - Key business metrics: Total reservations, estimated revenue, active tables, booking health rate.
   - Live reservation stream with ability to Complete, Cancel, or Reinstate bookings.
   - Restaurant directory management (Add, Edit, Delete).
   - Floor table capacity management.

---

## 🛠 Running the Java Spring Boot Backend

### Prerequisites:
- Java 21 JDK
- Apache Maven 3.9+
- Docker & Docker Compose (or local MySQL 8.0)

### Step 1: Start Infrastructure (MySQL & Kafka)
```bash
cd "c:\Project 1\backend\database"
docker-compose up -d mysql zookeeper kafka
```

### Step 2: Build the Parent Maven Project
```bash
cd "c:\Project 1\backend"
mvn clean package -DskipTests
```

### Step 3: Run Microservices (in order)
1. **Eureka Discovery Server** (Port 8761):
   ```bash
   cd "c:\Project 1\backend\eureka-server"
   mvn spring-boot:run
   ```
2. **API Gateway** (Port 8080):
   ```bash
   cd "c:\Project 1\backend\api-gateway"
   mvn spring-boot:run
   ```
3. **User & Auth Service** (Port 8081):
   ```bash
   cd "c:\Project 1\backend\user-service"
   mvn spring-boot:run
   ```
4. **Restaurant Service** (Port 8082):
   ```bash
   cd "c:\Project 1\backend\restaurant-service"
   mvn spring-boot:run
   ```
5. **Table Service** (Port 8083):
   ```bash
   cd "c:\Project 1\backend\table-service"
   mvn spring-boot:run
   ```
6. **Booking Engine Service** (Port 8084):
   ```bash
   cd "c:\Project 1\backend\booking-service"
   mvn spring-boot:run
   ```
7. **Notification Service** (Port 8085):
   ```bash
   cd "c:\Project 1\backend\notification-service"
   mvn spring-boot:run
   ```

---

## 📁 Repository Directory Structure

```
c:\Project 1\
├── backend\
│   ├── pom.xml                                      # Parent Multi-Module POM
│   ├── common-library\                              # Shared DTOs, Enums, JWT Security, Events
│   ├── eureka-server\                               # Eureka Discovery (Port 8761)
│   ├── api-gateway\                                 # Spring Cloud Gateway (Port 8080)
│   ├── user-service\                                # Auth, JWT, Profiles (Port 8081)
│   ├── restaurant-service\                          # Restaurants, Menus, Search (Port 8082)
│   ├── table-service\                               # Tables, Capacities, Zones (Port 8083)
│   ├── booking-service\                             # Concurrency Engine & Bookings (Port 8084)
│   ├── notification-service\                        # Kafka Notification Consumer (Port 8085)
│   └── database\
│       ├── flyway\                                  # MySQL V1 Schema & V2 Seed Migrations
│       └── docker-compose.yml                       # Full Containerized Cluster
├── frontend\
│   ├── src\                                         # React Source Components & Pages
│   ├── package.json                                 # Frontend Dependencies
│   └── index.html                                   # Production-ready luxury web application
├── docs\
│   ├── ARCHITECTURE.md                              # System Architecture Specification
│   ├── API_DOCUMENTATION.md                         # Complete REST API Specifications
│   └── Restaurant-Booking-System.postman_collection.json # Ready-to-import Postman Collection
├── index.html                                       # Root Standalone Entrypoint
├── server.py                                        # High-performance Local Web Server
└── README.md                                        # Documentation
```

