<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Contracts\FlightDataFactory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

/* Handles incoming API requests (webhooks) from N8n/integrated systems.
   Uses Dependency Injection and the Abstract Factory pattern. */
class FlightIntegrationController extends Controller
{
    protected FlightDataFactory $factory;

    // Dependency Injection: Controller requests the Factory interface (DIP)
    public function __construct(FlightDataFactory $factory)
    {
        $this->factory = $factory;
    }

    // Handles incoming payloads to update a flight's status/events.
    public function updateStatus(Request $request)
    {
        Log::info('Incoming Status Payload', $request->all());

        try {
            // Get the specific updater product from the injected factory
            $updater = $this->factory->createStatusUpdater();

            // Delegate the complex update and history logging logic to the service (SRP)
            $flight = $updater->updateStatus($request->all());

            return response()->json([
                'message' => 'Flight status successfully updated and history logged.',
                'flight_id' => $flight->id,
                'status' => $flight->status->status_code ?? 'N/A',
            ], 200);

        } catch (\Exception $e) {
            Log::error('Status Update Failed: ' . $e->getMessage(), ['trace' => $request->all()]);
            return response()->json(['error' => 'An error occurred during status processing.'], 500);
        }
    }
    
    // Handles incoming payloads to sync a new Airport record from the ARS.
    public function syncAirport(Request $request)
    {
        try {
            // Get the specific creator product from the injected factory
            $creator = $this->factory->createAirportCreator();
            
            // Delegate the sync logic to the service
            $airport = $creator->syncAirport($request->all());

            return response()->json([
                'message' => 'Airport synchronized successfully.',
                'iata_code' => $airport->iata_code,
            ], 200);

        } catch (\Exception $e) {
            Log::error('Airport Sync Failed: ' . $e->getMessage());
            return response()->json(['error' => 'Airport synchronization failed.'], 500);
        }
    }

    // Reads and returns flight details (for IAOS frontend/testing).
    public function readFlightDetails(string $id)
    {
        try {
            // Get the specific reader product from the injected factory
            $reader = $this->factory->createFlightReader();
            
            // Delegate the lookup logic to the service
            $flight = $reader->getFlightDetails($id);

            // Load all necessary relationships for a comprehensive view
            $flight->load(['originAirport', 'destinationAirport', 'status', 'gate', 'arrival.baggageClaim']);

            return response()->json($flight, 200);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Flight not found.'], 404);
        }
    }
}