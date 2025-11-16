<?php

namespace App\Http\Controllers;

use App\Models\Flight;
use App\Models\FlightConnection;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FlightConnectionController extends Controller
{
    /**
     * Display all connecting flights (flights with transfers).
     * Shows flights that require passengers to change planes.
     */
    public function index(Request $request): Response
    {
        // Get all flights that have connections (either inbound or outbound)
        $flights = Flight::with([
            'status',
            'airline',
            'origin',
            'destination',
            'aircraft',
            'departure.gate.terminal',
            'arrival.baggageClaim.terminal',
            'gate.terminal',
            'baggageClaim',
            'inboundConnections',
            'outboundConnections',
        ])
        ->where(function ($query) {
            $query->whereHas('inboundConnections')
                  ->orWhereHas('outboundConnections');
        })
        ->orderBy('scheduled_departure_time', 'asc')
        ->paginate(10)
        ->through(function ($flight) {
            $flight->has_connections = true;
            $flight->type = 'Connection';
            return $flight;
        });

        return Inertia::render('flights/connections', [
            'flights' => $flights,
            'title' => 'Connecting Flights',
            'type' => 'connections',
        ]);
    }
}
