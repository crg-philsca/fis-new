<?php

namespace App\Services;

use App\Contracts\FlightReader;
use App\Models\Flight;

// Concrete Product: Reads flight data directly from the FIS database using Eloquent. (SRP)
class FisDbFlightReaderService implements FlightReader
{
    public function getFlightDetails(string $identifier)
    {
        // Eager-load relationships using the actual relation names from App\Models\Flight
        $query = Flight::with([
            'origin',
            'destination',
            'status',
            'departure.gate.terminal',
            'arrival.baggageClaim.terminal',
        ]);
        
        // Find by ID or flight_number
        $flight = $query->find($identifier);
        
        if (!$flight) {
            $flight = $query->where('flight_number', $identifier)->first();
        }

        if (!$flight) {
            throw new \Exception("Flight not found with ID or number: {$identifier}");
        }

        return $flight;
    }
}