<?php

namespace App\Http\Controllers;

use App\Models\BaggageClaim;
use App\Models\Terminal;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BaggageClaimManagementController extends Controller
{
    /**
     * Display a listing of baggage claim areas with assignments.
     */
    public function index(): Response
    {
        $baggageClaims = BaggageClaim::with([
            'terminal.airport'
        ])->get()->map(function ($claim) {
            // Get current arrivals for this baggage claim
            $currentArrivals = $claim->arrivals()
                ->whereHas('flight', function ($q) {
                    $q->whereBetween('scheduled_arrival_time', [
                        now()->startOfDay(),
                        now()->addDay()->endOfDay()
                    ]);
                })
                ->with(['flight.status', 'flight.airline', 'flight.origin'])
                ->get();

            return [
                'id' => $claim->id,
                'claim_area' => $claim->claim_area,
                'terminal' => [
                    'id' => $claim->terminal->id,
                    'code' => $claim->terminal->terminal_code,
                    'name' => $claim->terminal->name,
                    'airport' => $claim->terminal->airport->iata_code,
                ],
                'current_flights' => $currentArrivals->map(function ($arrival) {
                    return [
                        'flight_number' => $arrival->flight->flight_number,
                        'airline' => $arrival->flight->airline?->airline_name ?? 'N/A',
                        'origin' => $arrival->flight->origin?->iata_code ?? 'N/A',
                        'status' => $arrival->flight->status?->status_name ?? 'N/A',
                        'scheduled_arrival' => $arrival->flight->scheduled_arrival_time?->format('H:i') ?? 'N/A',
                    ];
                }),
                'is_active' => $currentArrivals->isNotEmpty(),
            ];
        });

        $terminals = Terminal::with('airport')->get();

        return Inertia::render('management/baggage-claims', [
            'baggageClaims' => $baggageClaims,
            'terminals' => $terminals,
        ]);
    }

    /**
     * Store a newly created baggage claim area.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'terminal_id' => 'required|exists:terminals,id',
            'claim_area' => 'required|string|max:50',
        ]);

        BaggageClaim::create($validated);

        return redirect()->back()->with('success', 'Baggage claim area created successfully.');
    }

    /**
     * Update the specified baggage claim area.
     */
    public function update(Request $request, BaggageClaim $baggageClaim)
    {
        $validated = $request->validate([
            'claim_area' => 'sometimes|string|max:50',
            'terminal_id' => 'sometimes|exists:terminals,id',
        ]);

        $baggageClaim->update($validated);

        return redirect()->back()->with('success', 'Baggage claim area updated successfully.');
    }

    /**
     * Remove the specified baggage claim area.
     */
    public function destroy(BaggageClaim $baggageClaim)
    {
        // Check if baggage claim has active flights
        if ($baggageClaim->arrivals()->whereHas('flight', function ($query) {
            $query->whereIn('status_id', function ($q) {
                $q->select('id')
                    ->from('flight_status')
                    ->whereIn('status_code', ['SCH', 'BRD', 'ARR']);
            });
        })->exists()) {
            return redirect()->back()->with('error', 'Cannot delete baggage claim area with active flights.');
        }

        $baggageClaim->delete();

        return redirect()->back()->with('success', 'Baggage claim area deleted successfully.');
    }
}
