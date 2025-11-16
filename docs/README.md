# Flight Information System - Documentation

Welcome to the FIS documentation. This folder contains comprehensive guides about the system's purpose, architecture, and integrations.

## 📚 Documentation Index

### 1. [System Overview](SYSTEM_OVERVIEW.md)
**Start here** to understand what FIS is and what it does.

- System scope and responsibilities
- FIS vs ARS (Airline Reservation System)
- What FIS does (and doesn't do)
- System workflow and data flow
- Integration with ARS, PMS, BHS, ATC
- Role in airport operations

### 2. [Architecture](ARCHITECTURE.md)
Technical architecture and implementation details.

- Technology stack (Laravel, React, MySQL)
- Database schema
- Service layer design
- API architecture
- Security and scalability

### 3. [Integration Guide](INTEGRATION_GUIDE.md)
For external systems connecting to FIS.

- API endpoints for ARS, PMS, BHS, ATC
- Authentication and authorization
- Request/response formats
- Error handling
- Testing and best practices

---

## Quick Reference

### What is FIS?

FIS is the **central hub for flight information** at the airport. It:
- ✅ Receives flight data from airlines, ARS, PMS, and ATC
- ✅ Processes and updates flight status in real-time
- ✅ Distributes information to all connected systems and passengers
- ❌ Does NOT create bookings, tickets, or payments (that's ARS)

### What is ARS?

ARS is the **customer-facing booking platform**. It:
- ✅ Handles flight search and booking
- ✅ Processes payments and issues tickets
- ✅ Manages passenger records and seat assignments
- ✅ Maintains airport master data for flight search
- ❌ Does NOT handle real-time operations (that's FIS)

### Key Principle

**ARS handles commerce, FIS handles operations.**

```
Passengers ──▶ ARS ──▶ Book & Pay ──▶ Get Tickets
                │
                └──▶ Airline System ──▶ Schedule ──▶ FIS
                                                      │
Passengers ◀──┬────────────────────────────────────┘
              │
              └──▶ See Real-time Info (gates, delays, boarding)
```

---

## System Interconnections

| System | Role | Sends to FIS | Receives from FIS |
|--------|------|--------------|-------------------|
| **ARS** | Booking platform | Booking data, passenger count | Delays, cancellations, gate info |
| **PMS** | Passenger ops | Schedules, gates, boarding | Status, delays, cancellations |
| **BHS** | Baggage handling | Load status | Routing instructions |
| **ATC** | Air traffic | Clearance, weather | Flight readiness |
| **Passengers** | End users | - | All flight information |

---

## Development Setup

### Prerequisites
- PHP 8.2+
- MySQL 8.0
- Node.js 18+
- Composer
- npm

### Installation
```bash
# Clone repository
git clone https://github.com/crg-philsca/fis-new.git
cd fis-new

# Install dependencies
composer install
npm install

# Setup environment
cp .env.example .env
php artisan key:generate

# Run migrations
php artisan migrate --seed

# Build frontend
npm run build

# Start server
php artisan serve
npm run dev
```

### Default Credentials
```
Email: admin@fis.test
Password: password
```

---

## Project Structure

```
fis-new/
├── app/
│   ├── Http/Controllers/      # Request handlers
│   ├── Models/                # Database models
│   ├── Services/              # Business logic
│   └── Contracts/             # Service interfaces
├── database/
│   ├── migrations/            # Database schema
│   └── seeders/               # Sample data
├── resources/
│   ├── js/
│   │   ├── pages/            # React pages
│   │   ├── components/       # Reusable components
│   │   └── layouts/          # Page layouts
│   └── views/                # Blade templates
├── routes/
│   ├── web.php               # Web routes
│   └── api.php               # API routes
└── docs/                     # 📖 You are here
    ├── README.md
    ├── SYSTEM_OVERVIEW.md
    ├── ARCHITECTURE.md
    └── INTEGRATION_GUIDE.md
```

---

## Contributing

### Code Standards
- Follow PSR-12 for PHP
- Use TypeScript for frontend
- Write descriptive commit messages
- Add PHPDoc comments to all methods

### Testing
```bash
# Run PHP tests
php artisan test

# Run frontend tests
npm run test
```

### Before Committing
```bash
# Format code
composer pint

# Clear caches
php artisan optimize:clear
```

---

## Support

- **Issues**: https://github.com/crg-philsca/fis-new/issues
- **Discussions**: https://github.com/crg-philsca/fis-new/discussions
- **Email**: support@fis.airport.local

---

## License

This project is proprietary software developed for airport operations.

---

## Changelog

| Version | Date | Description |
|---------|------|-------------|
| 1.0.0 | 2025-11-16 | Initial release with core FIS functionality |

---

**Remember**: FIS is the single source of truth for flight operations. Every change in flight status, gate, or baggage claim should flow through FIS to ensure all systems stay synchronized.
