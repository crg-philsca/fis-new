<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BaggageClaim extends Model
{
    // Database Table Name
    protected $table = 'baggage_claims';

    // Mass Assignable Fields
    protected $fillable = [
        'terminal_id',
        'claim_area',
    ];

    // Disable default timestamps, as the 'timestamp' column is manually managed
    public $timestamps = false;

    // --- Relationships ---

    // Parent Terminal
    public function terminal()
    {
        return $this->belongsTo(Terminal::class, 'terminal_id', 'id');
    }

    // Assigned Flight Arrivals
    public function arrivals()
    {
        return $this->hasMany(FlightArrival::class, 'baggage_claim_id', 'id');
    }
}