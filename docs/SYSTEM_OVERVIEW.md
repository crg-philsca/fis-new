# Flight Information System (FIS) - System Overview

## Introduction

The Flight Information System (FIS) is **not a creator of flight schedules** but a **central receiver, processor, and distributor** of flight information. It acts as the **single source of truth** for flight operations across the airport.

### Core Principle
**FIS receives → processes → distributes**

It does not create bookings, tickets, or payments. Instead, it synchronizes data from multiple systems and ensures all stakeholders have consistent, real-time flight information.

### FIS vs Airline Reservation System (ARS)

**Important Distinction:**

| System | Primary Function | Responsibilities |
|--------|------------------|------------------|
| **Airline Reservation System (ARS)** | Customer-facing booking platform | - Ticket booking and sales<br>- Seat assignments<br>- Payment processing<br>- Passenger records<br>- Ancillary services (meals, baggage)<br>- Customer loyalty programs |
| **Flight Information System (FIS)** | Airport operations hub | - Flight status distribution<br>- Real-time updates<br>- Gate assignments<br>- Baggage claim info<br>- Passenger notifications<br>- System coordination |

**The relationship:** ARS creates bookings and passenger data → FIS displays operational flight information to passengers and coordinates airport operations.

---

## System Scope

The FIS covers all activities related to **flight data management and distribution**:

- ✅ Managing real-time flight status updates (arrival, departure, delays, cancellations)
- ✅ Displaying flight information to passengers (screens, kiosks, mobile notifications)
- ✅ Synchronizing flight data with PMS (check-in, boarding, gate assignments)
- ✅ Coordinating with BHS for baggage routing and handling
- ✅ Receiving ATC updates for flight clearance, weather, and emergencies
- ✅ Acting as the distribution hub for all flight-related information

---

## Key Responsibilities

### A. Flight Data Management
- Store and update arrival/departure schedules
- Track flight numbers, airlines, destinations, origins, gates, terminals
- Handle status changes (on-time, delayed, cancelled, boarding, departed, arrived)
- Synchronize flight information across all connected systems

### B. Passenger Communication
- Provide real-time arrivals/departures displays on airport boards and websites
- Notify passengers of gate changes, delays, cancellations, boarding announcements
- Supply accurate information to mobile apps, chatbots, and digital kiosks

### C. System Integration
- Connect with **PMS** for gate management and boarding updates
- Connect with **BHS** to ensure baggage routing matches flight changes
- Connect with **ATC** for clearance, runway updates, weather, emergencies
- Provide APIs for external airline systems and ground handling services

### D. Operational Support
- Provide central dashboard for airport staff to monitor operations
- Coordinate ground services, gate usage, and baggage operations
- Generate reports and logs for compliance and efficiency improvements

---

## System Limitations

### ❌ What FIS Does NOT Do

FIS is **not responsible** for:

- Booking or selling tickets
- Handling payments or refunds
- Assigning passenger seats or issuing boarding passes
- Managing airline finances
- Storing personal passenger records (beyond flight status needs)

These tasks belong to **airline booking systems** and **Passenger Management Systems (PMS)**, not FIS.

---

## System Workflow

```
┌─────────────┐
│   Airlines  │ ──── Flight Schedules ────┐
└─────────────┘                           │
                                          ▼
┌─────────────┐                    ┌──────────┐
│     ATC     │ ──── Clearance ────▶│   FIS    │───── Flight Info ────▶ Passengers
└─────────────┘      Weather       └──────────┘
                     Runway Status       │
                                         │
┌─────────────┐                          │
│     PMS     │◀──── Gate Changes ───────┤
└─────────────┘      Status Updates      │
     Boarding                             │
     Check-in                             │
                                          │
┌─────────────┐                          │
│     BHS     │◀──── Baggage Routes ─────┘
└─────────────┘      Load/Hold Orders
```

### Step-by-Step Process

1. **Receive Flight Schedule**: Airlines/PMS sends planned schedules → FIS stores in database
2. **Receive ATC Updates**: ATC sends clearance, weather, runway info → FIS updates status
3. **Coordinate with PMS**: PMS sends boarding/check-in events → FIS updates displays
4. **Coordinate with BHS**: FIS sends gate/status changes → BHS adjusts baggage routing
5. **Passenger Communication**: FIS distributes to screens, apps, SMS, email
6. **Continuous Sync**: FIS monitors all systems and distributes changes instantly

---

## System Interconnections

| System | Sends To FIS | Receives From FIS |
|--------|--------------|-------------------|
| **Airline Reservation System (ARS)** | Booking confirmations, passenger manifests, scheduled flights | Flight delays, cancellations, gate changes (for rebooking) |
| **PMS** | Flight schedules, gate assignments, check-in status, boarding progress | Flight delays, gate changes, cancellations, boarding time adjustments |
| **BHS** | Baggage loading status, delay reports, load/unload confirmations | Gate info for baggage delivery, routing instructions, load/hold orders |
| **ATC** | Weather conditions, runway availability, flight clearance, emergency notifications | Flight cancellations, confirmed departure schedules, status updates |
| **Passengers** | *(None - passive recipients)* | Real-time flight info, gate assignments, boarding announcements, alerts |

### ARS ↔ FIS Integration Flow

```
┌─────────────────────────┐
│  Airline Reservation    │
│       System (ARS)      │
│                         │
│  • Bookings             │
│  • Tickets              │
│  • Seats                │
│  • Payments             │
│  • Passenger Records    │
└───────────┬─────────────┘
            │
            │ Sends: Booking data, passenger count
            │
            ▼
┌─────────────────────────┐
│  Flight Information     │
│      System (FIS)       │
│                         │
│  • Flight Status        │
│  • Gate Info            │
│  • Real-time Updates    │
│  • Passenger Displays   │
└───────────┬─────────────┘
            │
            │ Sends: Delays, cancellations, gate changes
            │
            ▼
     [Passengers see consistent info
      on both ARS booking site
      and airport displays]
```

**Example Scenario:**
1. Passenger books flight on **ARS** (gets ticket with gate TBD)
2. **ARS** sends booking to airline system
3. Airline sends flight schedule to **FIS**
4. **FIS** assigns gate and displays on airport boards
5. If delay occurs, **FIS** updates displays AND notifies **ARS**
6. **ARS** sends rebooking options to affected passengers

---

## Data Flow Model

| System | Creates Data | Processes Data | Distributes Data |
|--------|--------------|----------------|------------------|
| **ARS** | Bookings, tickets, seat assignments, payments, passenger profiles | Validates payment, checks availability, manages loyalty points | Booking confirmations to passengers, manifest to airline/PMS |
| **FIS** | – | Flight schedules, ATC updates, passenger info, baggage status | Flight info to displays, apps, staff |
| **PMS** | Passenger records, check-ins, boarding passes | Ticket validation, seating, baggage allowance | Boarding info to gates, notifications |
| **BHS** | Baggage tracking records, tag IDs, loading logs | Matches baggage to flights | Updates PMS, alerts staff |
| **ATC** | Aircraft positions, flight clearances, landing instructions | Monitors air traffic, processes flight plans | Instructions to pilots, updates FIS |

**Key Insight**: 
- **ARS creates customer/booking data** (tickets, payments, passenger records)
- **PMS, BHS, and ATC create operational data** (check-ins, baggage, clearances)
- **FIS is primarily a processor and distributor** of operational flight information

### Complete Airport Ecosystem

```
┌──────────────────────────────────────────────────────────────┐
│                     AIRPORT ECOSYSTEM                         │
└──────────────────────────────────────────────────────────────┘

┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│    ARS      │      │  Airlines   │      │     CRS     │
│  (Booking)  │◀────▶│  Systems    │◀────▶│ (Amadeus,   │
│             │      │             │      │  Sabre)     │
└──────┬──────┘      └──────┬──────┘      └─────────────┘
       │                    │
       │ Bookings           │ Schedules
       │                    │
       ▼                    ▼
┌──────────────────────────────────────┐
│              FIS                      │
│      (Information Hub)                │
│                                       │
│  • Receives schedules from airlines   │
│  • Processes operational updates      │
│  • Distributes to all stakeholders    │
└───┬────────┬────────┬────────┬───────┘
    │        │        │        │
    ▼        ▼        ▼        ▼
┌───────┐ ┌────┐ ┌────┐ ┌────────────┐
│  PMS  │ │BHS │ │ATC │ │ Passengers │
│(Gates)│ │(Bag)│ │(Air)│ │  (Boards)  │
└───────┘ └────┘ └────┘ └────────────┘
```

---

## Role in Airport Operations

FIS serves as the **information backbone** of the airport:

- **Without FIS**: Passengers, baggage, and ground staff work with outdated or inconsistent data
- **With FIS**: Every system and person sees the same real-time flight status
- **Result**: Coordinated operations, minimized confusion, improved passenger experience

---

## Summary

**FIS is the single source of truth** for flight operations. It:

1. ✅ Receives data from PMS, ATC, and BHS
2. ✅ Processes and updates statuses in real-time
3. ✅ Distributes consistent information to all systems and passengers
4. ❌ Does NOT create bookings, tickets, or payments
5. ❌ Does NOT manage passenger records or airline finances

By acting as the central hub, FIS ensures seamless coordination across all airport operations.
