<?php

namespace App\Http\Controllers;

use App\Models\Flight;
use App\Models\FlightStatus;
use App\Models\Airline;
use App\Models\Airport;
use App\Models\Aircraft;
use App\Models\Gate;
use App\Models\BaggageClaim;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class FlightManagementController extends Controller
{
    /**
     * Display a listing of all flights with CRUD operations.
     */
    public function index(Request $request): Response
    {
        $query = Flight::with([
            'status',
            'airline',
            'origin',
            'destination',
            'gate.terminal',
            'baggageClaim',
            'aircraft'
        ]);

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('flight_number', 'like', "%{$search}%")
                  ->orWhere('airline_code', 'like', "%{$search}%")
                  ->orWhere('origin_code', 'like', "%{$search}%")
                  ->orWhere('destination_code', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->has('status') && $request->status) {
            $query->where('status_id', $request->status);
        }

        // Filter by date range
        if ($request->has('date_from')) {
            $query->whereDate('scheduled_departure_time', '>=', $request->date_from);
        }
        if ($request->has('date_to')) {
            $query->whereDate('scheduled_departure_time', '<=', $request->date_to);
        }

        // Order by scheduled departure time
        $query->orderBy('scheduled_departure_time', $request->get('order', 'asc'));

        $flights = $query->paginate(20)->withQueryString();

        // Get dropdown options for create/edit forms
        $statuses = FlightStatus::all(['id', 'status_code', 'status_name']);
        $airlines = Airline::all(['airline_code', 'airline_name']);
        $airports = Airport::all(['iata_code', 'airport_name', 'city']);
        $aircraft = Aircraft::all(['icao_code', 'manufacturer', 'model_name']);
        $gates = Gate::with('terminal')->get();
        $baggageClaims = BaggageClaim::with('terminal')->get();

        return Inertia::render('flights/management', [
            'flights' => $flights,
            'filters' => $request->only(['search', 'status', 'date_from', 'date_to', 'order']),
            'options' => [
                'statuses' => $statuses,
                'airlines' => $airlines,
                'airports' => $airports,
                'aircraft' => $aircraft,
                'gates' => $gates,
                'baggageClaims' => $baggageClaims,
            ],
        ]);
    }

    /**
     * Store a newly created flight in the database.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'flight_number' => 'required|string|max:10',
            'airline_code' => 'required|string|exists:airlines,airline_code',
            'origin_code' => 'required|string|exists:airports,iata_code',
            'destination_code' => 'required|string|exists:airports,iata_code|different:origin_code',
            'aircraft_icao_code' => 'nullable|string|exists:aircrafts,icao_code',
            'gate_id' => 'nullable|exists:gates,id',
            'baggage_claim_id' => 'nullable|exists:baggage_claims,id',
            'status_id' => 'required|exists:flight_status,id',
            'scheduled_departure_time' => 'required|date',
            'scheduled_arrival_time' => 'nullable|date|after:scheduled_departure_time',
        ]);

        $flight = Flight::create($validated);

        return redirect()->back()->with('success', 'Flight created successfully.');
    }

    /**
     * Update the specified flight in the database.
     */
    public function update(Request $request, Flight $flight)
    {
        $validated = $request->validate([
            'flight_number' => 'sometimes|string|max:10',
            'airline_code' => 'sometimes|string|exists:airlines,airline_code',
            'origin_code' => 'sometimes|string|exists:airports,iata_code',
            'destination_code' => 'sometimes|string|exists:airports,iata_code|different:origin_code',
            'aircraft_icao_code' => 'nullable|string|exists:aircrafts,icao_code',
            'gate_id' => 'nullable|exists:gates,id',
            'baggage_claim_id' => 'nullable|exists:baggage_claims,id',
            'status_id' => 'sometimes|exists:flight_status,id',
            'scheduled_departure_time' => 'sometimes|date',
            'scheduled_arrival_time' => 'nullable|date|after:scheduled_departure_time',
        ]);

        $flight->update($validated);

        return redirect()->back()->with('success', 'Flight updated successfully.');
    }

    /**
     * Remove the specified flight from the database.
     */
    public function destroy(Flight $flight)
    {
        // Check if flight has any dependencies (arrivals, departures, connections, events)
        $hasDependencies = $flight->arrival()->exists() 
            || $flight->departure()->exists() 
            || $flight->events()->exists()
            || $flight->connections()->exists()
            || $flight->connectingFrom()->exists();

        if ($hasDependencies) {
            return redirect()->back()->with('error', 'Cannot delete flight with existing records. Archive it instead.');
        }

        $flight->delete();

        return redirect()->back()->with('success', 'Flight deleted successfully.');
    }

    /**
     * Display the specified flight with full details.
     */
    public function show(Flight $flight): Response
    {
        $flight->load([
            'status',
            'airline',
            'origin',
            'destination',
            'gate.terminal',
            'baggageClaim',
            'aircraft',
            'arrival',
            'departure',
            'events' => function ($query) {
                $query->orderBy('timestamp', 'desc')->limit(20);
            },
            'inboundConnections.origin',
            'outboundConnections.destination',
        ]);

        return Inertia::render('flights/show', [
            'flight' => $flight,
        ]);
    }
}
