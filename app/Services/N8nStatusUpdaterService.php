<?php

namespace App\Services;

use App\Contracts\StatusUpdater;
use App\Models\Flight;
use App\Models\FlightTimesHistory;
use App\Models\FlightStatus;
use Illuminate\Support\Facades\DB;

// Concrete Product: Handles complex status update and history logging logic. (SRP, Transactionality)
class N8nStatusUpdaterService implements StatusUpdater
{
    public function updateStatus(array $payload)
    {
        $flightId = $payload['flight_id'] ?? null;
        $newStatusCode = $payload['status_code'] ?? null;
        $timestamp = now(); // Use application time for integrity

        if (!$flightId || !$newStatusCode) {
            throw new \InvalidArgumentException("Payload must contain flight_id and status_code.");
        }

        // Use a database transaction to ensure Atomicity and Consistency (ACID)
        return DB::transaction(function () use ($flightId, $newStatusCode, $timestamp) {
            
            $flight = Flight::find($flightId);
            $newStatus = FlightStatus::where('status_code', $newStatusCode)->first();

            if (!$flight || !$newStatus) {
                throw new \Exception("Flight or new Status not found for ID: {$flightId}.");
            }

            $oldStatusId = $flight->status_id;
            $newStatusId = $newStatus->id;

            // Only update and log if the status actually changed
            if ($oldStatusId !== $newStatusId) {

                // 1. Update the Flight record (The core status change)
                $flight->status_id = $newStatusId;
                $flight->save();

                // 2. Log the change in the history table (The Audit Trail)
                FlightTimesHistory::create([
                    'flight_id' => $flightId,
                    'event_type' => 'STATUS_CHANGE', 
                    'old_fk_id' => $oldStatusId,
                    'new_fk_id' => $newStatusId,
                    'new_value' => $newStatusCode, 
                    'timestamp' => $timestamp,
                ]);
            }
            
            return $flight;
        });
    }
}