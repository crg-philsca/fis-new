<?php

namespace App\Services; // Concrete Products Services (SRP)

use App\Contracts\FlightDataFactory;
use App\Contracts\FlightReader;
use App\Contracts\StatusUpdater;
use App\Contracts\AirportCreator;

// Concrete Factory for data flow originating from N8n/Webhooks.
class N8nFlightDataFactory implements FlightDataFactory
{
    public function createFlightReader(): FlightReader
    {
        // Service to read data from the local FIS database
        return new FisDbFlightReaderService();
    }

    public function createStatusUpdater(): StatusUpdater
    {
        // Service to update status based on N8n's payload
        return new N8nStatusUpdaterService();
    }

    public function createAirportCreator(): AirportCreator
    {
        // Service to sync Airport data from ARS/N8n
        return new FisDbAirportCreatorService();
    }
}