<?php

namespace App\Http\Controllers;

use App\Models\Flight;
use App\Models\FlightStatus;
use App\Models\FlightEvent;
use App\Models\Gate;
use App\Models\BaggageClaim;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

/**
 * FlightStatusUpdateController
 * 
 * FIS Core Function: Quick status updates and real-time flight information distribution
 * 
 * Purpose:
 * - Provide airport staff with quick interface to update flight status, gates, and baggage claims
 * - Process status changes and distribute to connected systems
 * - Log all changes for audit and compliance
 * 
 * Integration Points:
 * - When status changes: Notify PMS, BHS, and passengers
 * - When gate changes: Update BHS baggage routing, notify passengers
 * - When delayed/cancelled: Notify all systems and trigger appropriate actions
 * 
 * This is a core FIS responsibility: Acting as the single source of truth for flight status.
 */
class FlightStatusUpdateController extends Controller
{
    /**
     * Display the quick status update interface.
     * 
     * Shows all flights for quick operational updates.
     * Used by: Airport operations staff, ground handlers
     */
    public function index(Request $request): Response
    {
        // Get all flights
        $flights = Flight::with([
            'status',
            'airline',
            'origin',
            'destination',
            'gate.terminal',
            'baggageClaim'
        ])
            ->orderBy('scheduled_departure_time', 'desc')
            ->get()
            ->map(function ($flight) {
                return [
                    'id' => $flight->id,
                    'flight_number' => $flight->flight_number,
                    'airline' => $flight->airline?->airline_name,
                    'route' => "{$flight->origin?->iata_code} → {$flight->destination?->iata_code}",
                    'scheduled_departure' => $flight->scheduled_departure_time->format('Y-m-d H:i'),
                    'status' => [
                        'id' => $flight->status_id,
                        'code' => $flight->status?->status_code,
                        'name' => $flight->status?->status_name,
                    ],
                    'gate' => [
                        'id' => $flight->gate_id,
                        'code' => $flight->gate?->gate_code,
                        'terminal' => $flight->gate?->terminal?->name ?? $flight->gate?->terminal?->terminal_code,
                    ],
                    'baggage_claim' => [
                        'id' => $flight->baggage_claim_id,
                        'area' => $flight->baggageClaim?->claim_area,
                    ],
                ];
            });

        // Get available options
        $statuses = FlightStatus::all(['id', 'status_code', 'status_name'])->map(function ($status) {
            return [
                'id' => $status->id,
                'code' => $status->status_code,
                'name' => $status->status_name,
            ];
        });
        $gates = Gate::with('terminal')->get()->map(function ($gate) {
            return [
                'id' => $gate->id,
                'code' => $gate->gate_code,
                'terminal' => $gate->terminal?->name ?? $gate->terminal?->terminal_code,
                'display' => ($gate->terminal?->terminal_code ?? '') . '-' . $gate->gate_code,
            ];
        });
        $baggageClaims = BaggageClaim::with('terminal')->get()->map(function ($claim) {
            return [
                'id' => $claim->id,
                'area' => $claim->claim_area,
                'terminal' => $claim->terminal?->name ?? $claim->terminal?->terminal_code,
            ];
        });

        return Inertia::render('flights/status-update', [
            'flights' => $flights,
            'options' => [
                'statuses' => $statuses,
                'gates' => $gates,
                'baggageClaims' => $baggageClaims,
            ],
        ]);
    }

    /**
     * Quick update flight status.
     */
    public function updateStatus(Request $request, Flight $flight)
    {
        $validated = $request->validate([
            'status_id' => 'required|exists:flight_status,id',
            'reason' => 'nullable|string|max:500',
        ]);

        $oldStatus = $flight->status;
        $flight->update(['status_id' => $validated['status_id']]);

        // Log the status change event
        FlightEvent::create([
            'flight_id' => $flight->id,
            'event_type' => 'status_change',
            'old_value' => $oldStatus?->status_name,
            'new_value' => $flight->status->status_name,
            'old_fk_id' => $oldStatus?->id,
            'new_fk_id' => $flight->status_id,
        ]);

        return redirect()->back()->with('success', 'Flight status updated successfully.');
    }

    /**
     * Quick update gate assignment.
     */
    public function updateGate(Request $request, Flight $flight)
    {
        $validated = $request->validate([
            'gate_id' => 'nullable|exists:gates,id',
            'reason' => 'nullable|string|max:500',
        ]);

        $oldGate = $flight->gate;
        $flight->update(['gate_id' => $validated['gate_id']]);

        // Log the gate change event
        FlightEvent::create([
            'flight_id' => $flight->id,
            'event_type' => 'gate_change',
            'old_value' => $oldGate?->gate_code,
            'new_value' => $flight->gate?->gate_code ?? 'Unassigned',
            'old_fk_id' => $oldGate?->id,
            'new_fk_id' => $flight->gate_id,
        ]);

        return redirect()->back()->with('success', 'Gate assignment updated successfully.');
    }

    /**
     * Quick update baggage claim assignment.
     */
    public function updateBaggageClaim(Request $request, Flight $flight)
    {
        $validated = $request->validate([
            'baggage_claim_id' => 'nullable|exists:baggage_claims,id',
            'reason' => 'nullable|string|max:500',
        ]);

        $oldClaim = $flight->baggageClaim;
        $flight->update(['baggage_claim_id' => $validated['baggage_claim_id']]);

        // Log the baggage claim change event
        FlightEvent::create([
            'flight_id' => $flight->id,
            'event_type' => 'baggage_claim_change',
            'old_value' => $oldClaim?->claim_area,
            'new_value' => $flight->baggageClaim?->claim_area ?? 'Unassigned',
            'old_fk_id' => $oldClaim?->id,
            'new_fk_id' => $flight->baggage_claim_id,
        ]);

        return redirect()->back()->with('success', 'Baggage claim assignment updated successfully.');
    }

    /**
     * Bulk update for multiple flights.
     */
    public function bulkUpdate(Request $request)
    {
        $validated = $request->validate([
            'flight_ids' => 'required|array',
            'flight_ids.*' => 'exists:flights,id',
            'update_type' => 'required|in:status,gate,baggage_claim',
            'value' => 'required',
            'reason' => 'nullable|string|max:500',
        ]);

        $flights = Flight::whereIn('id', $validated['flight_ids'])->get();

        foreach ($flights as $flight) {
            switch ($validated['update_type']) {
                case 'status':
                    $oldStatus = $flight->status;
                    $flight->update(['status_id' => $validated['value']]);
                    
                    FlightEvent::create([
                        'flight_id' => $flight->id,
                        'event_type' => 'status_change',
                        'old_value' => $oldStatus?->status_name,
                        'new_value' => $flight->status->status_name,
                        'old_fk_id' => $oldStatus?->id,
                        'new_fk_id' => $flight->status_id,
                    ]);
                    break;

                case 'gate':
                    $oldGate = $flight->gate;
                    $flight->update(['gate_id' => $validated['value']]);
                    
                    FlightEvent::create([
                        'flight_id' => $flight->id,
                        'event_type' => 'gate_change',
                        'old_value' => $oldGate?->gate_code,
                        'new_value' => $flight->gate?->gate_code ?? 'Unassigned',
                        'old_fk_id' => $oldGate?->id,
                        'new_fk_id' => $flight->gate_id,
                    ]);
                    break;

                case 'baggage_claim':
                    $oldClaim = $flight->baggageClaim;
                    $flight->update(['baggage_claim_id' => $validated['value']]);
                    
                    FlightEvent::create([
                        'flight_id' => $flight->id,
                        'event_type' => 'baggage_claim_change',
                        'old_value' => $oldClaim?->claim_area,
                        'new_value' => $flight->baggageClaim?->claim_area ?? 'Unassigned',
                        'old_fk_id' => $oldClaim?->id,
                        'new_fk_id' => $flight->baggage_claim_id,
                    ]);
                    break;
            }
        }

        return redirect()->back()->with('success', count($flights) . ' flights updated successfully.');
    }
}
