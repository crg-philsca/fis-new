<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\FlightIntegrationController;

// --- FIS INTEGRATION CONTRACT ROUTES ---

// Endpoint 1: For N8n/ATC to push real-time status updates and events
Route::post('/v1/integration/status-update', [FlightIntegrationController::class, 'updateStatus']);

// Endpoint 2: For N8n/ARS to push new/updated Airport reference data
Route::post('/v1/integration/airport-sync', [FlightIntegrationController::class, 'syncAirport']);

// Endpoint 3: For the local IAOS front-end to read comprehensive flight details
Route::get('/v1/flight-details/{id}', [FlightIntegrationController::class, 'readFlightDetails']);

// Standard Laravel Sanctum route (keep for reference)
// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });