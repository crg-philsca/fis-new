<?php

namespace App\Services;

use App\Contracts\StatusUpdater;
use App\Models\Flight;
use App\Models\FlightEvent; // <-- CRITICAL FIX: Use the correct model
use App\Models\FlightStatus;
use App\Models\BaggageClaim;
use App\Models\Gate;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 * Concrete Product: Implements the StatusUpdater contract.
 *
 * This service has two roles:
 * 1. (INBOUND) `updateStatus()`: Writes data from n8n TO the local database.
 * 2. (OUTBOUND) `updateGate()`, etc.: Sends data FROM Laravel TO n8n webhooks.
 */
class N8nStatusUpdaterService implements StatusUpdater
{
    // ---
    // ROLE 1: INBOUND DATA (Called by FlightIntegrationController)
    // ---

    /**
     * Processes an incoming payload from n8n and updates the local FIS database.
     */
    public function updateStatus(array $payload): Flight
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

                // 2. Log the change in the *correct* history table (The Audit Trail)
                FlightEvent::create([ // <-- CRITICAL FIX: Was FlightTimesHistory
                    'flight_id' => $flightId,
                    'event_type' => 'STATUS_CHANGE', 
                    'old_fk_id' => $oldStatusId,
                    'new_fk_id' => $newStatusId,
                    'new_value' => $newStatusCode, 
                    'timestamp' => $timestamp,
                ]);
            }
            
            return $flight->load('status');
        });
    }

    // ---
    // ROLE 2: OUTBOUND NOTIFICATIONS (Called by FlightOperationsService)
    // ---

    /**
     * Notify n8n that a gate has changed.
     */
    public function updateGate(Flight $flight, Gate $newGate): bool
    {
        $webhookUrl = config('services.n8n.webhooks.gate_change');
        if (!$webhookUrl) {
            Log::warning('N8N_WEBHOOK_GATE_CHANGE is not set. Skipping notification.');
            return false;
        }

        /** @var \App\Models\Gate $newGate */
        $payload = [
            'flight_id' => $flight->id,
            'flight_number' => $flight->flight_number,
            'new_gate_code' => $newGate->gate_code ?? $newGate->getAttribute('gate_code'),
            'terminal_code' => $newGate->terminal->terminal_code ?? null,
        ];
        
        return $this->sendNotification($webhookUrl, $payload);
    }

    /**
     * Notify n8n that a baggage claim has changed.
     */
    public function updateBaggageClaim(Flight $flight, BaggageClaim $newClaim): bool
    {
        $webhookUrl = config('services.n8n.webhooks.baggage_change');
         if (!$webhookUrl) {
            Log::warning('N8N_WEBHOOK_BAGGAGE_CHANGE is not set. Skipping notification.');
            return false;
        }
        
        /** @var \App\Models\BaggageClaim $newClaim */
        $payload = [
            'flight_id' => $flight->id,
            'flight_number' => $flight->flight_number,
            'new_claim_area' => $newClaim->claim_area ?? $newClaim->getAttribute('claim_area'),
            'terminal_code' => $newClaim->terminal->terminal_code ?? null,
        ];

        return $this->sendNotification($webhookUrl, $payload);
    }

    /**
     * Notify n8n that a time has been updated.
     */
    public function updateTime(Flight $flight, string $timeType, Carbon $newTime): bool
    {
        $webhookUrl = config('services.n8n.webhooks.time_update');
         if (!$webhookUrl) {
            Log::warning('N8N_WEBHOOK_TIME_UPDATE is not set. Skipping notification.');
            return false;
        }

        $payload = [
            'flight_id' => $flight->id,
            'flight_number' => $flight->flight_number,
            'time_type' => $timeType, // e.g., 'scheduled_departure'
            'new_time' => $newTime->toIso8601String(),
        ];

        return $this->sendNotification($webhookUrl, $payload);
    }

    /**
     * Notify n8n that a flight has actually departed.
     */
    public function notifyActualDeparture(Flight $flight): bool
    {
        $webhookUrl = config('services.n8n.webhooks.departure');
        if (!$webhookUrl) {
            Log::warning('N8N_WEBHOOK_DEPARTURE is not set. Skipping notification.');
            return false;
        }
        
        $payload = [
            'flight_id' => $flight->id,
            'flight_number' => $flight->flight_number,
            'actual_departure_time' => $flight->departure->actual_departure_time->toIso8601String(),
            'runway_time' => $flight->departure->runway_time?->toIso8601String(),
            'status' => 'DEP',
        ];

        return $this->sendNotification($webhookUrl, $payload);
    }

    /**
     * Notify n8n that a flight has actually arrived.
     */
    public function notifyActualArrival(Flight $flight): bool
    {
        $webhookUrl = config('services.n8n.webhooks.arrival');
         if (!$webhookUrl) {
            Log::warning('N8N_WEBHOOK_ARRIVAL is not set. Skipping notification.');
            return false;
        }

        $payload = [
            'flight_id' => $flight->id,
            'flight_number' => $flight->flight_number,
            'actual_arrival_time' => $flight->arrival->actual_arrival_time->toIso8601String(),
            'landing_time' => $flight->arrival->landing_time?->toIso8601String(),
            'status' => 'ARR',
        ];

        return $this->sendNotification($webhookUrl, $payload);
    }

    /**
     * Notify n8n of a general status change (e.g., Cancelled, Delayed).
     */
    public function notifyStatusChange(Flight $flight, FlightStatus $newStatus): bool
    {
        $webhookUrl = config('services.n8n.webhooks.status_change');
         if (!$webhookUrl) {
            Log::warning('N8N_WEBHOOK_STATUS_CHANGE is not set. Skipping notification.');
            return false;
        }

        /** @var \App\Models\FlightStatus $newStatus */
        $payload = [
            'flight_id' => $flight->id,
            'flight_number' => $flight->flight_number,
            'new_status_code' => $newStatus->status_code ?? $newStatus->getAttribute('status_code'),
            'new_status_name' => $newStatus->status_name ?? $newStatus->getAttribute('status_name'),
        ];

        return $this->sendNotification($webhookUrl, $payload);
    }


    /**
     * Helper method to send data to an n8n webhook.
     */
    private function sendNotification(string $url, array $payload): bool
    {
        try {
            $response = Http::post($url, $payload);
            
            if ($response->successful()) {
                Log::info('N8N notification sent successfully.', ['url' => $url, 'payload' => $payload]);
                return true;
            } else {
                Log::error('N8N notification failed.', ['url' => $url, 'status' => $response->status(), 'response' => $response->body()]);
                return false;
            }
        } catch (\Exception $e) {
            Log::critical('N8N notification dispatch failed completely.', ['url' => $url, 'error' => $e->getMessage()]);
            return false;
        }
    }
}