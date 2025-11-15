<?php

namespace App\Http\Controllers;

use App\Models\Terminal;
use App\Models\Airport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TerminalManagementController extends Controller
{
    /**
     * Display a listing of terminals.
     */
    public function index(): Response
    {
        $terminals = Terminal::with([
            'airport',
            'gates' => function ($query) {
                $query->withCount('departures');
            },
            'baggageClaims'
        ])->get();

        $airports = Airport::all(['iata_code', 'airport_name']);

        return Inertia::render('management/terminals', [
            'terminals' => $terminals,
            'airports' => $airports,
        ]);
    }

    /**
     * Store a newly created terminal.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'iata_code' => 'required|exists:airports,iata_code',
            'terminal_code' => 'required|string|max:10',
            'name' => 'nullable|string|max:255',
        ]);

        Terminal::create($validated);

        return redirect()->back()->with('success', 'Terminal created successfully.');
    }

    /**
     * Update the specified terminal.
     */
    public function update(Request $request, Terminal $terminal)
    {
        $validated = $request->validate([
            'terminal_code' => 'sometimes|string|max:10',
            'name' => 'nullable|string|max:255',
        ]);

        $terminal->update($validated);

        return redirect()->back()->with('success', 'Terminal updated successfully.');
    }

    /**
     * Remove the specified terminal.
     */
    public function destroy(Terminal $terminal)
    {
        // Check if terminal has gates or baggage claims
        if ($terminal->gates()->exists() || $terminal->baggageClaims()->exists()) {
            return redirect()->back()->with('error', 'Cannot delete terminal with assigned gates or baggage claims.');
        }

        $terminal->delete();

        return redirect()->back()->with('success', 'Terminal deleted successfully.');
    }
}
