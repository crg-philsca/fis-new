<?php

namespace App\Contracts; // Abstract Factory Pattern

// Defines the contract for creating families of related data handlers (Products Interface)
interface FlightDataFactory
{
    // Creates a handler responsible for looking up flight details (Product 1).
    public function createFlightReader(): FlightReader;

    // Creates a handler responsible for updating flight status/events (Product 2).
    public function createStatusUpdater(): StatusUpdater;
    
    // Creates a handler responsible for syncing Airport reference data (Product 3).
    public function createAirportCreator(): AirportCreator;
}