<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Flight;
use App\Services\FlightOperationsService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class FlightUpdateController extends Controller
{
    public function __construct(protected FlightOperationsService $flightService) {}

    public function updateGate(Request $request, Flight $flight): JsonResponse
    {
        $validated = $request->validate([
            'gate_id' => 'required|integer|exists:gates,id',
        ]);

        try {
            $this->flightService->assignGate($flight, $validated['gate_id']);
            
            return response()->json(['message' => 'Gate updated successfully.']);

        } catch (\Exception $e) {
            // Log the error
            return response()->json(['message' => 'Failed to update gate.'], 500);
        }
    }
}