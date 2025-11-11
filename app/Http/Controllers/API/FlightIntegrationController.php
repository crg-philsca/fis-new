<?php

namespace App\Http\Controllers\API; // <-- CORRECTED NAMESPACE

use App\Http\Controllers\Controller;
use App\Contracts\FlightDataFactory;
use App\Models\Flight;
use App\Models\Airport;
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

    /**
     * Handles incoming payloads to create or update a flight.
     * This is used by ARS or ATC via n8n.
     * This method was not in your original file but is necessary.
     */
    public function syncFlight(Request $request)
    {
        Log::info('Incoming Flight Sync Payload', $request->all());
        
        try {
            // Use dedicated FlightSyncer product via Abstract Factory
            $syncer = $this->factory->createFlightSyncer();
            /** @var Flight $flight */
            $flight = $syncer->syncFlight($request->all());

            if (!$flight || !is_object($flight) || !isset($flight->id)) {
                Log::error('Flight sync did not return a valid flight object.', ['result' => $flight]);
                return response()->json(['error' => 'Flight synchronization failed.'], 500);
            }

            return response()->json([
                'message' => 'Flight synchronized successfully.',
                'flight_id' => $flight->id,
            ], 200);

        } catch (\Exception $e) {
            Log::error('Flight Sync Failed: ' . $e->getMessage(), ['trace' => $request->all()]);
            return response()->json(['error' => 'An error occurred during flight sync.'], 500);
        }
    }

    // Handles incoming payloads to update a flight's status/events.
    public function updateStatus(Request $request)
    {
        Log::info('Incoming Status Payload', $request->all());

        try {
            // Get the specific updater product from the injected factory
            $updater = $this->factory->createStatusUpdater();

            // Delegate the complex update and history logging logic to the service (SRP)
            /** @var Flight $flight */
            $flight = $updater->updateStatus($request->all());

            return response()->json([
                'message' => 'Flight status successfully updated and history logged.',
                'flight_id' => $flight->id,
                'status' => $flight->status->status_code ?? 'N/A', // Eager load status
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
            /** @var Airport $airport */
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

            if (!$flight) {
                 return response()->json(['error' => 'Flight not found.'], 404);
            }

            // Load all necessary relationships for a comprehensive view
            // THESE MUST MATCH THE METHOD NAMES IN YOUR Flight.php MODEL
            $flight->load([
                'origin',
                'destination',
                'status',
                'airline',
                'aircraft',
                'departure.gate.terminal', // Load gate and its terminal
                'arrival.baggageClaim.terminal' // Load baggage claim and its terminal
            ]);

            return response()->json($flight, 200);

        } catch (\Exception $e) {
            Log::error('Read Flight Failed: ' . $e->getMessage());
            return response()->json(['error' => 'Flight not found.'], 404);
        }
    }
}