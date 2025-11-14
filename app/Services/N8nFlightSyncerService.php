<?php

namespace App\Services;

use App\Contracts\FlightSyncer;
use App\Models\Flight;
use App\Models\FlightStatus;
use App\Models\FlightDeparture;
use App\Models\FlightArrival;
use App\Models\Gate;          // ADDED: For Gate lookup
use App\Models\BaggageClaim; // ADDED: For Baggage Claim lookup
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use InvalidArgumentException;
use RuntimeException;

/**
 * Concrete Product: Implements FlightSyncer contract.
 * Responsible for creating/updating Flight master records from inbound payloads.
 */
class N8nFlightSyncerService implements FlightSyncer
{
    /**
     * The fixed database ID for the 'UNASSIGNED' Gate placeholder.
     * This ID MUST match the ID inserted by the SQL command (ID 51).
     */
    private const UNASSIGNED_GATE_ID = 51;

    /**
     * The fixed database ID for the 'UNASSIGNED' Baggage Claim placeholder.
     * This ID MUST match the ID inserted by the SQL command (ID 6).
     */
    private const UNASSIGNED_CLAIM_ID = 6;

    public function syncFlight(array $payload): Flight
    {
        $flightId           = $payload['flight_id'] ?? null;
        $flightNumber       = $payload['flight_number'] ?? null;
        $scheduledDeparture = !empty($payload['scheduled_departure_time']) ? Carbon::parse($payload['scheduled_departure_time']) : null;

        if (!$flightId && (!$flightNumber || !$scheduledDeparture)) {
            throw new InvalidArgumentException('Payload must include flight_id or both flight_number and scheduled_departure_time.');
        }

        return DB::transaction(function () use ($payload, $flightId, $flightNumber, $scheduledDeparture) {
            
            // 1. Locate existing flight or instantiate new
            $flight = null;
            if ($flightId) {
                $flight = Flight::find($flightId);
            }
            if (!$flight && $flightNumber && $scheduledDeparture) {
                $flight = Flight::where('flight_number', $flightNumber)
                                ->where('scheduled_departure_time', $scheduledDeparture->toDateTimeString())
                                ->first();
            }
            
            $isNew = false;
            if (!$flight) {
                $isNew = true;
                $flight = new Flight();
                if ($flightId) {
                    $flight->id = $flightId; // Use provided ID if available
                }
                $flight->flight_number          = $flightNumber;
                $flight->scheduled_departure_time = $scheduledDeparture->toDateTimeString();
                
                // CRITICAL: Ensure status_id is set explicitly for new records (as it's NOT NULL)
                $defaultStatus = FlightStatus::where('status_code', 'SCH')->first();
                if (!$defaultStatus) {
                    throw new RuntimeException('Default flight status (SCH) not found in the database.');
                }
                $flight->status_id = $defaultStatus->id;
            }

            // 2. Map basic attributes
            foreach ([
                'origin_code', 'destination_code', 'airline_code', 'aircraft_icao_code', 'scheduled_arrival_time'
            ] as $attr) {
                if (array_key_exists($attr, $payload)) {
                    // Handle date conversion for scheduled times
                    $flight->{$attr} = in_array($attr, ['scheduled_departure_time', 'scheduled_arrival_time']) && !empty($payload[$attr])
                        ? Carbon::parse($payload[$attr])
                        : $payload[$attr];
                }
            }

            // 3. Status mapping (Only update if provided)
            if (!empty($payload['status_code'])) {
                $status = FlightStatus::where('status_code', $payload['status_code'])->first();
                if ($status) {
                    $flight->status_id = $status->id;
                } else {
                    Log::warning('Status code not found during flight sync.', ['status_code' => $payload['status_code']]);
                }
            }
            
            // 4. Resolve Gate ID (Default to UNASSIGNED_GATE_ID = 51)
            $gateCode = $payload['gate_code'] ?? null;
            $flight->gate_id = self::UNASSIGNED_GATE_ID; // Default to 51

            if ($gateCode) {
                $gate = Gate::where('gate_code', $gateCode)->first();
                if ($gate) {
                    $flight->gate_id = $gate->id;
                }
            }

            // 5. Resolve Baggage Claim ID (Default to UNASSIGNED_CLAIM_ID = 6)
            $claimArea = $payload['claim_area'] ?? null;
            $flight->baggage_claim_id = self::UNASSIGNED_CLAIM_ID; // Default to 6

            if ($claimArea) {
                $claim = BaggageClaim::where('claim_area', $claimArea)->first();
                if ($claim) {
                    $flight->baggage_claim_id = $claim->id;
                }
            }

            // 6. Save the Flight Record
            $isSaved = $flight->save();

            if (!$isSaved) {
                \Illuminate\Support\Facades\Log::error('Flight save failed silently, forcing rollback.', ['flight_id' => $flight->id ?? 'new']);
                throw new RuntimeException('Database save operation failed unexpectedly.');
            }

            // 7. RELATED RECORDS INITIALIZATION
            
            // FlightDeparture: FIX: Include gate_id
            FlightDeparture::firstOrCreate(
                ['flight_id' => $flight->id],
                [
                    // Uses scheduled time to satisfy the NOT NULL constraint
                    'actual_departure_time' => $flight->scheduled_departure_time,
                    // *** FIX LINE: PASSES THE RESOLVED ID ***
                    'gate_id' => $flight->gate_id 
                ]
            );

            // FlightArrival: FIX: Include baggage_claim_id
            FlightArrival::firstOrCreate(
                ['flight_id' => $flight->id],
                [
                    // Uses scheduled time to satisfy the NOT NULL constraint
                    'actual_arrival_time' => $flight->scheduled_arrival_time ?? $flight->scheduled_departure_time,
                    // *** FIX LINE: PASSES THE RESOLVED ID ***
                    'baggage_claim_id' => $flight->baggage_claim_id
                ]
            );

            return $flight->load('status');
        });
    }
}
