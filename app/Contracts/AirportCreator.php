<?php

namespace App\Contracts; // Product Interface

// Defines the contract for syncing Airport reference data. (ISP, SRP)
interface AirportCreator
{
    /**
     * Handles the payload to insert or update the airport record in the FIS database.
     * @param array $payload The incoming data payload (e.g., from N8n/ARS).
     * @return \App\Models\Airport The created or updated Airport model instance.
     */
    public function syncAirport(array $payload);
}