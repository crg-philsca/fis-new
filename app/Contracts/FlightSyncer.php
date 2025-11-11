<?php

namespace App\Contracts; // Product Interface

use App\Models\Flight;

/**
 * Defines the contract for syncing (create/update) master flight records
 * from inbound integration payloads (e.g., n8n / ARS / ATC).
 */
interface FlightSyncer
{
    /**
     * Create or update a flight and minimal related status/time data based on payload.
     * The payload should at minimum contain a unique flight key (id or flight_number).
     *
     * REQUIRED KEYS (choose one identification path):
     *   - flight_id (int) OR flight_number (string)
     * OPTIONAL KEYS:
     *   - origin_code, destination_code, airline_code, aircraft_icao_code
     *   - scheduled_departure_time, scheduled_arrival_time (Y-m-d H:i:s)
     *   - status_code
     *
     * @param array $payload
     * @return Flight The upserted Flight model (with status relation loaded).
     * @throws \InvalidArgumentException if no identifier is provided.
     */
    public function syncFlight(array $payload): Flight;
}
