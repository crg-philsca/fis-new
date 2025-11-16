# FIS System Architecture

## Technology Stack

### Backend
- **Framework**: Laravel 12.x (PHP 8.2+)
- **Database**: MySQL 8.0
- **API**: RESTful APIs for system integrations
- **Real-time**: Laravel Broadcasting (WebSockets support ready)
- **Cache**: Redis (for permission caching and performance)

### Frontend
- **Framework**: React 19 with TypeScript
- **SSR**: Inertia.js for seamless Laravel-React integration
- **UI Library**: shadcn/ui components with Tailwind CSS
- **State Management**: React hooks (useState, useEffect)
- **Forms**: React Hook Form with validation

### Infrastructure
- **Server**: PHP built-in server / Nginx (production)
- **Build Tools**: Vite for frontend bundling
- **Package Managers**: Composer (PHP), npm (Node.js)

---

## Database Architecture

### Core Tables

#### Flights
- Primary flight data storage
- Links to airlines, airports, aircraft, gates, baggage claims
- Stores scheduled and actual times
- Status tracking through `status_id`

#### Flight Status
- Reference table for flight states
- Standard codes: SCH, BRD, DEP, ARR, DLY, CNX, DIV

#### Airlines, Airports, Aircraft
- Master data tables
- Reference data for flight operations

#### Gates & Terminals
- Infrastructure data
- Gate assignments and restrictions
- Terminal organization

#### Baggage Claims
- Baggage claim area management
- Links to terminals
- Active/inactive status

#### Flight Events
- Audit log of all flight changes
- Tracks who made changes and when
- Historical record for compliance

---

## System Integration Points

### External System APIs (To Be Implemented)

#### 1. ARS Integration
```php
// Receives from ARS
POST /api/integrations/ars/booking-notification
POST /api/integrations/ars/passenger-manifest
POST /api/integrations/ars/special-requests

// Sends to ARS
POST {ARS_URL}/api/flight-updates
POST {ARS_URL}/api/gate-changes
POST {ARS_URL}/api/cancellations
POST {ARS_URL}/api/delays
```

#### 2. PMS Integration
```php
// Receives from PMS
POST /api/integrations/pms/flight-schedule
POST /api/integrations/pms/gate-assignment
POST /api/integrations/pms/boarding-status

// Sends to PMS
POST {PMS_URL}/api/flight-updates
POST {PMS_URL}/api/gate-changes
POST {PMS_URL}/api/cancellations
```

#### 3. BHS Integration
```php
// Receives from BHS
POST /api/integrations/bhs/baggage-loaded
POST /api/integrations/bhs/baggage-status

// Sends to BHS
POST {BHS_URL}/api/routing-instructions
POST {BHS_URL}/api/hold-orders
POST {BHS_URL}/api/gate-changes
```

#### 4. ATC Integration
```php
// Receives from ATC
POST /api/integrations/atc/clearance
POST /api/integrations/atc/weather-update
POST /api/integrations/atc/emergency

// Sends to ATC
POST {ATC_URL}/api/flight-ready
POST {ATC_URL}/api/cancellation
POST {ATC_URL}/api/departure-confirmation
```

---

## Current Implementation Status

### ✅ Completed Features

1. **Flight Data Management**
   - Flight CRUD operations
   - Status management
   - Gate and baggage claim assignments
   - Real-time status updates

2. **Passenger-Facing Displays**
   - Arrivals board
   - Departures board
   - Flight connections view
   - Dashboard with statistics

3. **Airport Resource Management**
   - Terminal management
   - Gate management
   - Baggage claim management
   - Aircraft and airline data

4. **User Management**
   - Authentication (Laravel Fortify)
   - Role-based access control (Spatie Permissions)
   - User profiles

5. **Performance Optimizations**
   - Permission caching (1 hour TTL)
   - Route and config caching
   - Database query optimization with eager loading
   - Pagination (10 items per page)

### 🚧 Pending Integrations

1. **External System APIs**
   - PMS integration endpoints
   - BHS integration endpoints
   - ATC integration endpoints
   - Webhook support for real-time updates

2. **Real-time Features**
   - WebSocket broadcasting for live updates
   - Automatic screen refreshes
   - Push notifications to mobile apps

3. **Advanced Features**
   - Bulk flight operations
   - Weather integration display
   - Automated delay notifications
   - SMS/Email notification system

---

## Data Flow Architecture

### Inbound Data Flow
```
Airlines/PMS ──▶ API Gateway ──▶ FlightSyncerService ──▶ Database
                                       │
ATC ──────────▶ API Gateway ──▶ StatusUpdater ──────▶ Database
                                       │
BHS ──────────▶ API Gateway ──▶ FlightEvents ────────▶ Database
```

### Outbound Data Flow
```
Database ──▶ FlightReader ──▶ Controllers ──▶ Inertia ──▶ React Views ──▶ Passengers
         │
         └──▶ API Resources ──▶ External Systems (PMS, BHS, ATC)
```

### Real-time Updates (Future)
```
Event Occurs ──▶ Laravel Event ──▶ Broadcasting ──▶ WebSocket ──▶ Connected Clients
```

---

## Service Layer Architecture

### Core Services

#### FlightDataFactory (N8nFlightDataFactory)
- Processes incoming flight data from external systems
- Normalizes data formats
- Validates required fields

#### FlightSyncer (N8nFlightSyncerService)
- Syncs flight data with database
- Creates or updates flight records
- Handles conflicts and duplicates

#### FlightReader (FisDbFlightReaderService)
- Retrieves flight data from database
- Applies business logic filters
- Formats data for display

#### AirportCreator (FisDbAirportCreatorService)
- Creates missing airports automatically
- Ensures referential integrity
- Validates IATA codes

#### StatusUpdater (FlightOperationsService)
- Updates flight status
- Triggers cascading updates
- Logs all changes to FlightEvents

---

## API Design Principles

### RESTful Endpoints
```
GET    /flights              - List flights (paginated, filtered)
GET    /flights/{id}         - Get single flight
POST   /flights              - Create flight (admin only)
PUT    /flights/{id}         - Update flight
DELETE /flights/{id}         - Delete flight

POST   /flights/{id}/status  - Quick status update
POST   /flights/{id}/gate    - Update gate assignment
POST   /flights/{id}/baggage - Update baggage claim
```

### Response Format
```json
{
  "success": true,
  "data": { },
  "message": "Operation successful",
  "timestamp": "2025-11-16T10:30:00Z"
}
```

---

## Security Architecture

### Authentication
- Session-based auth via Laravel Fortify
- CSRF protection on all mutations
- API token support for integrations

### Authorization
- Role-based permissions (Spatie)
- Cached permissions (1 hour TTL)
- Middleware protection on routes

### Data Protection
- Input validation on all endpoints
- SQL injection prevention (Eloquent ORM)
- XSS protection (React escaping)

---

## Scalability Considerations

### Current Optimizations
- Database indexing on frequently queried fields
- Eager loading to prevent N+1 queries
- Pagination to limit data transfer
- Permission caching to reduce DB queries

### Future Enhancements
- Redis caching for flight data
- Database read replicas
- CDN for static assets
- Horizontal scaling with load balancers
- Message queues for async processing

---

## Monitoring & Logging

### Current Implementation
- Laravel Telescope (development)
- FlightEvents audit log
- Application logs in storage/logs

### Recommended Additions
- APM tools (New Relic, Datadog)
- Error tracking (Sentry)
- Uptime monitoring
- Performance metrics dashboard

---

## Deployment Architecture

### Development
```
Local Server (Herd/Valet) ──▶ MySQL ──▶ npm run dev
```

### Production (Recommended)
```
Load Balancer ──▶ App Servers (PHP-FPM) ──▶ MySQL Primary
                                          │
                                          └──▶ MySQL Replicas
                  Redis Cache
                  File Storage (S3)
```

---

## Summary

The FIS architecture is designed to:
1. ✅ Handle high-frequency flight data updates
2. ✅ Provide real-time information to passengers
3. ✅ Integrate seamlessly with external systems
4. ✅ Scale horizontally as airport operations grow
5. ✅ Maintain data integrity and auditability

The modular service layer ensures that FIS remains flexible and maintainable as requirements evolve.
