<?php

namespace App\Services;

use App\Contracts\FlightSyncer;
use App\Models\Flight;
use App\Models\FlightStatus;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

/**
 * Concrete Product: Implements FlightSyncer contract.
 * Responsible for creating/updating Flight master records from inbound payloads.
 */
class N8nFlightSyncerService implements FlightSyncer
{
    public function syncFlight(array $payload): Flight
    {
        $flightId       = $payload['flight_id'] ?? null;
        $flightNumber   = $payload['flight_number'] ?? null;

        if (!$flightId && !$flightNumber) {
            throw new \InvalidArgumentException('Payload must include flight_id or flight_number.');
        }

        return DB::transaction(function () use ($payload, $flightId, $flightNumber) {
            // 1. Locate existing flight or instantiate new
            $flight = null;
            if ($flightId) {
                $flight = Flight::find($flightId);
            }
            if (!$flight && $flightNumber) {
                $flight = Flight::where('flight_number', $flightNumber)->first();
            }
            if (!$flight) {
                $flight = new Flight();
                if ($flightId) {
                    $flight->id = $flightId; // assuming manual assignment allowed
                }
                if ($flightNumber) {
                    $flight->flight_number = $flightNumber;
                }
            }

            // 2. Map basic attributes (guard against missing keys)
            foreach ([
                'origin_code', 'destination_code', 'airline_code', 'aircraft_icao_code'
            ] as $attr) {
                if (array_key_exists($attr, $payload)) {
                    $flight->{$attr} = $payload[$attr];
                }
            }

            // 3. Times (expect format Y-m-d H:i:s). Use Carbon parsing if present.
            foreach ([
                'scheduled_departure_time', 'scheduled_arrival_time'
            ] as $timeKey) {
                if (!empty($payload[$timeKey])) {
                    $flight->{$timeKey} = Carbon::parse($payload[$timeKey]);
                }
            }

            // 4. Status mapping
            if (!empty($payload['status_code'])) {
                $status = FlightStatus::where('status_code', $payload['status_code'])->first();
                if ($status) {
                    $flight->status_id = $status->id;
                } else {
                    Log::warning('Status code not found during flight sync.', ['status_code' => $payload['status_code']]);
                }
            }

            $flight->save();

            return $flight->load('status');
        });
    }
}
