<?php

namespace App\Services;

use App\Contracts\FlightSyncer;
use App\Models\Flight;
use App\Models\FlightStatus;
use App\Models\FlightDeparture;
use App\Models\FlightArrival;
use App\Models\Gate;
use App\Models\BaggageClaim;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use InvalidArgumentException;
use RuntimeException;

/**
 * Concrete Product: Implements FlightSyncer contract.
 * Responsible for creating/updating Flight master records from inbound payloads (e.g., from n8n).
 */
class N8nFlightSyncerService implements FlightSyncer
{
    /**
     * The fixed database ID for the 'UNASSIGNED' Gate placeholder (ID 51).
     */
    private const UNASSIGNED_GATE_ID = 51;

    /**
     * The fixed database ID for the 'UNASSIGNED' Baggage Claim placeholder (ID 6).
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
                
                // If ID is explicitly provided (e.g., for flight 9), use it
                if ($flightId) {
                    $flight->id = $flightId;
                }
                
                // Set mandatory fields and defaults for NEW records
                $flight->flight_number          = $flightNumber;
                $flight->scheduled_departure_time = $scheduledDeparture->toDateTimeString();
                
                // CRITICAL: Set initial default foreign key values for NEW records
                $defaultStatus = FlightStatus::where('status_code', 'SCH')->first();
                if (!$defaultStatus) {
                    throw new RuntimeException('Default flight status (SCH) not found in the database.');
                }
                $flight->status_id = $defaultStatus->id;
                $flight->gate_id = self::UNASSIGNED_GATE_ID;       // Set default for NEW record
                $flight->baggage_claim_id = self::UNASSIGNED_CLAIM_ID; // Set default for NEW record
            }

            // 2. Map basic attributes
            foreach ([
                'origin_code', 'destination_code', 'airline_code', 'aircraft_icao_code', 'scheduled_arrival_time'
            ] as $attr) {
                if (array_key_exists($attr, $payload)) {
                    $flight->{$attr} = in_array($attr, ['scheduled_departure_time', 'scheduled_arrival_time']) && !empty($payload[$attr])
                        ? Carbon::parse($payload[$attr])->toDateTimeString()
                        : $payload[$attr];
                }
            }

            // 3. Status mapping (Only update if status_code is provided)
            if (!empty($payload['status_code'])) {
                $status = FlightStatus::where('status_code', $payload['status_code'])->first();
                if ($status) {
                    $flight->status_id = $status->id;
                } else {
                    Log::warning('Status code not found during flight sync.', ['status_code' => $payload['status_code']]);
                }
            }
            
            // 4. Resolve Gate ID - ***CORRECTED LOGIC***: ONLY update if 'gate_code' is present in the payload.
            if (array_key_exists('gate_code', $payload)) {
                $gateCode = $payload['gate_code'];
                $resolvedGateId = self::UNASSIGNED_GATE_ID; 

                if (!empty($gateCode)) {
                    $gate = Gate::where('gate_code', $gateCode)->first();
                    if ($gate) {
                        $resolvedGateId = $gate->id;
                    } else {
                         Log::warning('Gate code not found during flight sync. Defaulting to UNASSIGNED.', ['gate_code' => $gateCode]);
                    }
                }
                $flight->gate_id = $resolvedGateId;
            }
            // If 'gate_code' is missing from payload, the existing $flight->gate_id is preserved.


            // 5. Resolve Baggage Claim ID - ***CORRECTED LOGIC***: ONLY update if 'claim_area' is present in the payload.
            if (array_key_exists('claim_area', $payload)) {
                $claimArea = $payload['claim_area'];
                $resolvedClaimId = self::UNASSIGNED_CLAIM_ID;

                if (!empty($claimArea)) {
                    $claim = BaggageClaim::where('claim_area', $claimArea)->first();
                    if ($claim) {
                        $resolvedClaimId = $claim->id;
                    } else {
                        Log::warning('Baggage claim area not found during flight sync. Defaulting to UNASSIGNED.', ['claim_area' => $claimArea]);
                    }
                }
                $flight->baggage_claim_id = $resolvedClaimId;
            }
            // If 'claim_area' is missing from payload, the existing $flight->baggage_claim_id is preserved.

            // 6. Save the Flight Record
            $isSaved = $flight->save();

            if (!$isSaved) {
                Log::error('Flight save failed silently, forcing rollback.', ['flight_id' => $flight->id ?? 'new']);
                throw new RuntimeException('Database save operation failed unexpectedly.');
            }

            // 7. RELATED RECORDS INITIALIZATION (Departure/Arrival)
            // ***CRITICAL FIX***: Removed logic that incorrectly set actual_time to scheduled_time. 
            // This requires the database columns to be NULLable (see section 3).
            
            // FlightDeparture: Use firstOrCreate to link to the new flight and set the gate ID.
            FlightDeparture::firstOrCreate(
                ['flight_id' => $flight->id],
                [
                    // actual_departure_time should be NULL, relying on DB schema fix.
                    'gate_id' => $flight->gate_id 
                ]
            );

            // FlightArrival: Use firstOrCreate to link to the new flight and set the baggage claim ID.
            FlightArrival::firstOrCreate(
                ['flight_id' => $flight->id],
                [
                    // actual_arrival_time should be NULL, relying on DB schema fix.
                    'baggage_claim_id' => $flight->baggage_claim_id
                ]
            );

            return $flight->load('status');
        });
    }
}