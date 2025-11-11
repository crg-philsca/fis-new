<?php

namespace App\Services;

use App\Contracts\StatusUpdater; // Your Abstract Product!
use App\Models\Flight;
use App\Models\FlightEvent;
use App\Models\Gate;
use App\Models\BaggageClaim;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

/**
 * Contains the business logic for the FIS Admin panel.
 * This service WRITES data to the DB and TRIGGERS outbound integrations.
 */
class FlightOperationsService
{
    // We inject the abstract contract. Laravel will provide the
    // concrete N8nStatusUpdaterService thanks to your AppServiceProvider.
    public function __construct(protected StatusUpdater $statusUpdater) {}

    /**
     * Business logic for an admin manually assigning a gate.
     */
    public function assignGate(Flight $flight, Gate $newGate): Flight
    {
        $oldGateId = $flight->departure->gate_id ?? null;

        if ($oldGateId === $newGate->id) {
            return $flight; // No change
        }

        // Use a transaction for 3NF integrity
        DB::transaction(function () use ($flight, $newGate, $oldGateId) {
            
            // 1. Update the local database
            $flight->departure()->updateOrCreate(
                ['flight_id' => $flight->id],
                ['gate_id' => $newGate->id]
            );

            // 2. Log the audit event (using the correct FlightEvent model)
            FlightEvent::create([
                'flight_id' => $flight->id,
                'event_type' => 'GATE_CHANGE',
                'old_fk_id' => $oldGateId,
                'new_fk_id' => $newGate->id,
            ]);
        });

        // 3. Notify all other systems (PMS, BHS) via n8n
        // This calls your N8nStatusUpdaterService->updateGate() method
        try {
            $this->statusUpdater->updateGate($flight, $newGate);
        } catch (\Exception $e) {
            Log::error('N8N gate update notification failed.', ['flight_id' => $flight->id, 'error' => $e->getMessage()]);
            // Non-fatal error. The gate is updated locally, but integration failed.
            // You could add this to a failed jobs queue.
        }

        return $flight->fresh('departure.gate');
    }

    /**
     * Business logic for an admin manually assigning a baggage claim.
     */
    public function assignBaggageClaim(Flight $flight, BaggageClaim $newClaim): Flight
    {
        $oldClaimId = $flight->arrival->baggage_claim_id ?? null;

        if ($oldClaimId === $newClaim->id) {
            return $flight; // No change
        }

        DB::transaction(function () use ($flight, $newClaim, $oldClaimId) {
            // 1. Update local DB
            $flight->arrival()->updateOrCreate(
                ['flight_id' => $flight->id],
                ['baggage_claim_id' => $newClaim->id]
            );

            // 2. Log audit event
            FlightEvent::create([
                'flight_id' => $flight->id,
                'event_type' => 'CLAIM_CHANGE',
                'old_fk_id' => $oldClaimId,
                'new_fk_id' => $newClaim->id,
            ]);
        });

        // 3. Notify external systems (PMS, BHS)
        try {
            $this->statusUpdater->updateBaggageClaim($flight, $newClaim);
        } catch (\Exception $e) {
            Log::error('N8N baggage claim update notification failed.', ['flight_id' => $flight->id, 'error' => $e->getMessage()]);
        }

        return $flight->fresh('arrival.baggageClaim');
    }

    /**
     * Business logic for an admin manually updating a time (e.g., new ETA).
     */
    public function updateFlightTime(Flight $flight, string $timeType, Carbon $newTime): Flight
    {
        $oldTime = null;
        $logValue = null;

        DB::transaction(function () use ($flight, $timeType, $newTime, &$oldTime, &$logValue) {
            switch ($timeType) {
                case 'scheduled_departure':
                    $oldTime = $flight->scheduled_departure_time;
                    $flight->scheduled_departure_time = $newTime;
                    $logValue = 'SCHED_DEP_TIME';
                    break;
                case 'scheduled_arrival':
                    $oldTime = $flight->scheduled_arrival_time;
                    $flight->scheduled_arrival_time = $newTime;
                    $logValue = 'SCHED_ARR_TIME';
                    break;
                // You can add cases for 'actual_departure', 'actual_arrival', etc.
                default:
                    throw new \Exception("Invalid time type provided: {$timeType}");
            }
            
            // 1. Update local DB
            $flight->save();

            // 2. Log audit event
            FlightEvent::create([
                'flight_id' => $flight->id,
                'event_type' => 'TIME_UPDATE',
                'old_value' => $oldTime ? $oldTime->toDateTimeString() : null,
                'new_value' => $newTime->toDateTimeString(),
                'old_fk_id' => $logValue, // Using old_fk_id to store the type of time
            ]);
        });

        // 3. Notify external systems
        try {
            $this->statusUpdater->updateTime($flight, $timeType, $newTime);
        } catch (\Exception $e) {
            Log::error('N8N time update notification failed.', ['flight_id' => $flight->id, 'error' => $e->getMessage()]);
        }
        
        return $flight;
    }
}