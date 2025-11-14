<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Flight;
use App\Models\Gate; // Import Gate model
use App\Services\FlightOperationsService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class FlightUpdateController extends Controller
{
    public function __construct(protected FlightOperationsService $flightService) {}

    public function updateGate(Request $request, Flight $flight): JsonResponse
    {
        $validated = $request->validate([
            'gate_id' => 'required|integer|exists:gates,id',
        ]);

        try {
            // Find the Gate model instance required by the service layer
            $gate = Gate::find($validated['gate_id']);

            if (!$gate) {
                // This scenario should be rare due to validation, but handled defensively
                throw ValidationException::withMessages(['gate_id' => 'Gate not found.']);
            }

            // Pass the model instance to the service
            $this->flightService->assignGate($flight, $gate);
            
            return response()->json(['message' => 'Gate updated successfully.']);

        } catch (\Exception $e) {
            // Log the error
            return response()->json(['message' => 'Failed to update gate.'], 500);
        }
    }
}