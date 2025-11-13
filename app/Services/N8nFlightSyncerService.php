<?php

namespace App\Services;

use App\Contracts\FlightSyncer;
use App\Models\Flight;
use App\Models\FlightStatus;
use App\Models\FlightDeparture;
use App\Models\FlightArrival;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use InvalidArgumentException;
use RuntimeException; // Added for completeness

/**
 * Concrete Product: Implements FlightSyncer contract.
 * Responsible for creating/updating Flight master records from inbound payloads.
 */
class N8nFlightSyncerService implements FlightSyncer
{
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
                
                // CRITICAL FIX: Ensure status_id (which is NOT NULL) is set explicitly for new records
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
                    // Carbon will handle the date conversion if the payload is sending ISO 8601
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

            $flight->save();

            // 4. Create related records if the flight is new (for later updates on gates/claims)
            if ($isNew) {
                // FlightDeparture
                FlightDeparture::firstOrCreate(
                    ['flight_id' => $flight->id],
                    ['actual_departure_time' => $flight->scheduled_departure_time]
                );

                // FlightArrival
                FlightArrival::firstOrCreate(
                    ['flight_id' => $flight->id],
                    ['actual_arrival_time' => $flight->scheduled_arrival_time ?? $flight->scheduled_departure_time]
                );
            }

            return $flight->load('status');
        });
    }
}