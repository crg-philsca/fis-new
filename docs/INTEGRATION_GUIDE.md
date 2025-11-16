# FIS Integration Guide

## Overview

This guide explains how external systems (ARS, PMS, BHS, ATC) should integrate with the Flight Information System.

---

## Integration Methods

### 1. RESTful API (Primary Method)
- JSON-based request/response
- Token-based authentication
- Synchronous updates

### 2. Webhooks (Future)
- Event-driven notifications
- Asynchronous updates
- Retry logic for failed deliveries

### 3. Message Queue (Future)
- High-volume data ingestion
- Guaranteed delivery
- Batch processing support

---

## ARS Integration

### Purpose
Airline Reservation System handles customer bookings, ticket sales, and passenger records. It sends booking data and passenger counts to airlines, which then provide flight schedules to FIS. FIS sends operational updates (delays, cancellations, gate changes) back for passenger rebooking.

### Endpoints

#### 1. Receive Booking Notification from ARS
```http
POST /api/integrations/ars/booking-notification
Authorization: Bearer {API_TOKEN}
Content-Type: application/json

{
  "booking_reference": "ABC123",
  "flight_number": "PR123",
  "passenger_count": 1,
  "booking_date": "2025-11-16T10:00:00Z",
  "booking_status": "confirmed"
}
```

Response:
```json
{
  "success": true,
  "message": "Booking notification received",
  "flight_id": 142
}
```

#### 2. Receive Passenger Manifest from ARS
```http
POST /api/integrations/ars/passenger-manifest
Authorization: Bearer {API_TOKEN}

{
  "flight_id": 142,
  "total_passengers": 156,
  "checked_in": 120,
  "special_needs": 3,
  "manifest_finalized_at": "2025-11-16T12:00:00Z"
}
```

### What ARS Receives from FIS

FIS will call ARS webhooks (to be configured):

```http
POST {ARS_WEBHOOK_URL}/flight-update
Content-Type: application/json

{
  "flight_id": 142,
  "flight_number": "PR123",
  "status": "delayed",
  "new_departure_time": "2025-11-16T15:30:00Z",
  "delay_reason": "Weather conditions",
  "gate_assignment": "A12",
  "terminal": "T1",
  "updated_at": "2025-11-16T13:45:00Z"
}
```

**Cancellation Notification:**
```http
POST {ARS_WEBHOOK_URL}/flight-cancellation
Content-Type: application/json

{
  "flight_id": 142,
  "flight_number": "PR123",
  "cancellation_reason": "Aircraft maintenance",
  "cancelled_at": "2025-11-16T11:00:00Z",
  "affected_passengers": 156,
  "rebooking_options": [
    {
      "flight_number": "PR125",
      "departure_time": "2025-11-16T18:00:00Z"
    }
  ]
}
```

**Gate Change Notification:**
```http
POST {ARS_WEBHOOK_URL}/gate-change
Content-Type: application/json

{
  "flight_id": 142,
  "flight_number": "PR123",
  "old_gate": "A10",
  "new_gate": "A12",
  "terminal": "T1",
  "changed_at": "2025-11-16T14:00:00Z",
  "boarding_time": "2025-11-16T14:30:00Z"
}
```

---

## PMS Integration

### Purpose
Passenger Management System sends flight schedules, gate assignments, and boarding status. Receives flight updates, delays, and cancellations from FIS.

### Endpoints

#### 1. Receive Flight Schedule from PMS
```http
POST /api/integrations/pms/flight-schedule
Authorization: Bearer {API_TOKEN}
Content-Type: application/json

{
  "flight_number": "PR123",
  "airline_code": "PR",
  "origin_code": "MNL",
  "destination_code": "CEB",
  "scheduled_departure": "2025-11-16T14:30:00Z",
  "scheduled_arrival": "2025-11-16T16:00:00Z",
  "aircraft_icao": "A320",
  "gate_id": 5,
  "terminal_id": 1
}
```

Response:
```json
{
  "success": true,
  "flight_id": 142,
  "message": "Flight schedule received and processed"
}
```

#### 2. Receive Gate Assignment from PMS
```http
POST /api/integrations/pms/gate-assignment
Authorization: Bearer {API_TOKEN}

{
  "flight_id": 142,
  "gate_id": 12,
  "assigned_at": "2025-11-16T12:00:00Z"
}
```

#### 3. Receive Boarding Status from PMS
```http
POST /api/integrations/pms/boarding-status
Authorization: Bearer {API_TOKEN}

{
  "flight_id": 142,
  "status": "boarding_started",
  "timestamp": "2025-11-16T14:00:00Z"
}
```

### What PMS Receives from FIS

FIS will call PMS webhooks (to be configured):

```http
POST {PMS_WEBHOOK_URL}/flight-update
Content-Type: application/json

{
  "flight_id": 142,
  "flight_number": "PR123",
  "status": "delayed",
  "new_departure_time": "2025-11-16T15:30:00Z",
  "delay_reason": "Weather conditions",
  "updated_at": "2025-11-16T13:45:00Z"
}
```

---

## BHS Integration

### Purpose
Baggage Handling System tracks baggage movement and loading. FIS sends routing instructions when gates or flights change.

### Endpoints

#### 1. Receive Baggage Status from BHS
```http
POST /api/integrations/bhs/baggage-status
Authorization: Bearer {API_TOKEN}

{
  "flight_id": 142,
  "baggage_count": 85,
  "loaded_count": 72,
  "status": "loading",
  "timestamp": "2025-11-16T13:30:00Z"
}
```

#### 2. Receive Loading Confirmation
```http
POST /api/integrations/bhs/baggage-loaded
Authorization: Bearer {API_TOKEN}

{
  "flight_id": 142,
  "total_bags": 85,
  "loaded_at": "2025-11-16T14:10:00Z"
}
```

### What BHS Receives from FIS

```http
POST {BHS_WEBHOOK_URL}/routing-instruction
Content-Type: application/json

{
  "flight_id": 142,
  "flight_number": "PR123",
  "gate_code": "A12",
  "terminal_code": "T1",
  "baggage_claim_area": "BC-3",
  "instruction": "route_to_gate",
  "priority": "normal"
}
```

**Hold/Cancel Instructions:**
```http
POST {BHS_WEBHOOK_URL}/hold-order
Content-Type: application/json

{
  "flight_id": 142,
  "flight_number": "PR123",
  "action": "hold",
  "reason": "Flight cancelled",
  "timestamp": "2025-11-16T13:00:00Z"
}
```

---

## ATC Integration

### Purpose
Air Traffic Control provides clearance, weather updates, and emergency notifications. FIS confirms flight readiness and departures.

### Endpoints

#### 1. Receive Clearance from ATC
```http
POST /api/integrations/atc/clearance
Authorization: Bearer {API_TOKEN}

{
  "flight_id": 142,
  "clearance_type": "takeoff",
  "runway": "06",
  "cleared_time": "2025-11-16T14:25:00Z",
  "remarks": "Clear for departure"
}
```

#### 2. Receive Weather Update
```http
POST /api/integrations/atc/weather-update
Authorization: Bearer {API_TOKEN}

{
  "condition": "thunderstorm",
  "visibility": "low",
  "affected_flights": [142, 156, 178],
  "estimated_delay": 45,
  "timestamp": "2025-11-16T13:00:00Z"
}
```

#### 3. Receive Emergency Notification
```http
POST /api/integrations/atc/emergency
Authorization: Bearer {API_TOKEN}

{
  "type": "runway_closure",
  "runway": "24",
  "reason": "Aircraft incident",
  "affected_operations": ["arrivals", "departures"],
  "duration_minutes": 120,
  "timestamp": "2025-11-16T11:00:00Z"
}
```

### What ATC Receives from FIS

```http
POST {ATC_WEBHOOK_URL}/flight-ready
Content-Type: application/json

{
  "flight_id": 142,
  "flight_number": "PR123",
  "status": "ready_for_departure",
  "gate": "A12",
  "passengers_boarded": 156,
  "baggage_loaded": true,
  "timestamp": "2025-11-16T14:15:00Z"
}
```

---

## Authentication

### API Token Generation

1. Admin creates integration token in FIS admin panel
2. Token is provided to external system
3. Token must be included in all requests:
```http
Authorization: Bearer {API_TOKEN}
```

### Token Management
- Tokens are long-lived (no expiration by default)
- Can be revoked/regenerated by admin
- Rate limiting: 1000 requests per minute per token

---

## Error Handling

### Standard Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid flight number format",
    "details": {
      "flight_number": ["The flight number must be in format XX123"]
    }
  },
  "timestamp": "2025-11-16T10:30:00Z"
}
```

### Common Error Codes
- `VALIDATION_ERROR` - Invalid request data
- `NOT_FOUND` - Resource not found
- `UNAUTHORIZED` - Invalid or missing token
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `INTERNAL_ERROR` - Server error

### Retry Logic
- Network errors: Retry up to 3 times with exponential backoff
- 5xx errors: Retry after 30 seconds
- 4xx errors: Do not retry (fix request first)

---

## Testing

### Sandbox Environment
```
Base URL: https://fis-sandbox.airport.local/api
Token: sandbox_test_token_12345
```

### Test Flight Data
```json
{
  "flight_number": "TEST123",
  "airline_code": "XX",
  "origin_code": "MNL",
  "destination_code": "CEB",
  "scheduled_departure": "2025-11-16T18:00:00Z",
  "scheduled_arrival": "2025-11-16T19:30:00Z"
}
```

---

## Best Practices

### 1. Send Updates Immediately
Don't batch critical updates. Send status changes as they occur.

### 2. Include Timestamps
Always include UTC timestamps in ISO 8601 format.

### 3. Handle Idempotency
FIS will deduplicate updates. Safe to resend if unsure.

### 4. Monitor Integration Health
Track success/failure rates of API calls.

### 5. Implement Circuit Breaker
If FIS is down, queue updates and retry later.

---

## Support & Contact

For integration support:
- Email: integration@fis.airport.local
- Documentation: https://fis-docs.airport.local
- Status Page: https://status.fis.airport.local

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-11-16 | Initial integration guide |
