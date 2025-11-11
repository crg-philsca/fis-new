<?php

namespace App\Services;

use App\Contracts\FlightReader;
use App\Models\Flight;

// Concrete Product: Reads flight data directly from the FIS database using Eloquent. (SRP)
class FisDbFlightReaderService implements FlightReader
{
    public function getFlightDetails(string $identifier)
    {
        // Load relationships (e.g., originAirport) for immediate use
        $query = Flight::with(['originAirport', 'destinationAirport', 'status']);
        
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