<?php

namespace App\Contracts; // Product Interface

// Defines the contract for retrieving read-only flight data. (ISP)
interface FlightReader
{
    /**
     * Retrieves the core flight details by ID or flight number.
     * @param string $identifier Primary lookup key.
     * @return \App\Models\Flight
     * @throws \Exception
     */
    public function getFlightDetails(string $identifier);
}