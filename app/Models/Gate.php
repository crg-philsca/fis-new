<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gate extends Model
{
    // Database Table Name
    protected $table = 'gates';

    // Mass Assignable Fields
    protected $fillable = [
        'terminal_id',
        'gate_number',
    ];

    // Disable default timestamps, as the 'timestamp' column is manually managed
    public $timestamps = false;

    // --- Relationships ---

    // Parent Terminal
    public function terminal()
    {
        return $this->belongsTo(Terminal::class, 'terminal_id', 'id');
    }

    // Scheduled Flights assigned to this gate
    public function flights()
    {
        return $this->hasMany(Flight::class, 'gate_id', 'id');
    }

    // Actual departures from this gate
    public function departures()
    {
        return $this->hasMany(FlightDeparture::class, 'departure_gate_id', 'id');
    }
}