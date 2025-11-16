<?php

namespace App\Http\Controllers;

use App\Models\Gate;
use App\Models\Terminal;
use App\Models\Airline;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GateManagementController extends Controller
{
    /**
     * Display a listing of gates with assignments.
     */
    public function index(): Response
    {
        $gates = Gate::with([
            'terminal.airport',
            'authorizedAirlines'
        ])->paginate(10)->through(function ($gate) {
            // Get current departures for this gate
            $currentDepartures = $gate->departures()
                ->whereHas('flight', function ($q) {
                    $q->whereBetween('scheduled_departure_time', [
                        now()->startOfDay(),
                        now()->addDay()->endOfDay()
                    ]);
                })
                ->with(['flight.status', 'flight.airline'])
                ->get();

            return [
                'id' => $gate->id,
                'gate_code' => $gate->gate_code,
                'terminal' => [
                    'id' => $gate->terminal->id,
                    'code' => $gate->terminal->terminal_code,
                    'name' => $gate->terminal->name,
                    'airport' => $gate->terminal->airport->iata_code,
                ],
                'current_flights' => $currentDepartures->map(function ($departure) {
                    return [
                        'flight_number' => $departure->flight->flight_number,
                        'airline' => $departure->flight->airline?->airline_name ?? 'N/A',
                        'status' => $departure->flight->status?->status_name ?? 'N/A',
                        'scheduled_departure' => $departure->flight->scheduled_departure_time->format('H:i'),
                    ];
                }),
                'authorized_airlines' => $gate->authorizedAirlines->pluck('airline_name'),
                'is_occupied' => $currentDepartures->where('flight.status.status_code', 'BRD')->isNotEmpty(),
            ];
        });

        $terminals = Terminal::with('airport')->get();
        $airlines = Airline::all(['airline_code', 'airline_name']);

        return Inertia::render('management/gates', [
            'gates' => $gates->withQueryString(),
            'terminals' => $terminals,
            'airlines' => $airlines,
        ]);
    }

    /**
     * Store a newly created gate.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'terminal_id' => 'required|exists:terminals,id',
            'gate_code' => 'required|string|max:10',
        ]);

        Gate::create($validated);

        return redirect()->back()->with('success', 'Gate created successfully.');
    }

    /**
     * Update the specified gate.
     */
    public function update(Request $request, Gate $gate)
    {
        $validated = $request->validate([
            'gate_code' => 'sometimes|string|max:10',
            'terminal_id' => 'sometimes|exists:terminals,id',
        ]);

        $gate->update($validated);

        return redirect()->back()->with('success', 'Gate updated successfully.');
    }

    /**
     * Remove the specified gate.
     */
    public function destroy(Gate $gate)
    {
        // Check if gate has active flights
        if ($gate->departures()->whereHas('flight', function ($query) {
            $query->whereIn('status_id', function ($q) {
                $q->select('id')
                    ->from('flight_status')
                    ->whereIn('status_code', ['SCH', 'BRD', 'DLY']);
            });
        })->exists()) {
            return redirect()->back()->with('error', 'Cannot delete gate with active flights.');
        }

        $gate->delete();

        return redirect()->back()->with('success', 'Gate deleted successfully.');
    }

    /**
     * Assign authorized airlines to a gate.
     */
    public function assignAirlines(Request $request, Gate $gate)
    {
        $validated = $request->validate([
            'airline_codes' => 'required|array',
            'airline_codes.*' => 'exists:airlines,airline_code',
        ]);

        $gate->authorizedAirlines()->sync($validated['airline_codes']);

        return redirect()->back()->with('success', 'Airline authorizations updated successfully.');
    }
}
