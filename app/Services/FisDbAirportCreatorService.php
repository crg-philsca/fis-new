<?php

namespace App\Services;

use App\Contracts\AirportCreator;
use App\Models\Airport;

// Concrete Product: Creates or updates Airport reference data pushed from ARS. (SRP)
class FisDbAirportCreatorService implements AirportCreator
{
    public function syncAirport(array $payload)
    {
        // Use the updateOrCreate method which respects your natural key (iata_code)
        // If the airport exists, it updates the other fields. If not, it creates it.
        $airport = Airport::updateOrCreate(
            ['iata_code' => $payload['iata_code']],
            [
                'airport_name' => $payload['airport_name'],
                'city' => $payload['city'],
                'country' => $payload['country'],
                'timezone' => $payload['timezone'],
            ]
        );

        return $airport;
    }
}