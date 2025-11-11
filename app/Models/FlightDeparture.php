<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FlightDeparture extends Model
{
    // Database Table Name
    protected $table = 'flight_departures';

    // Primary Key is the Foreign Key (One-to-One mapping)
    protected $primaryKey = 'flight_id'; 
    public $incrementing = false;
    
    // Disable default timestamps, as the table does not have created_at/updated_at
    public $timestamps = false;
    
    protected $fillable = [
        'flight_id',
        'departure_gate_id',
        'actual_departure_time',
        'runway_time',
    ];

    // --- Relationships ---

    // Parent Flight 
    public function flight()
    {
        // FK in this table is 'flight_id', referencing Flight PK 'id'
        return $this->belongsTo(Flight::class, 'flight_id', 'id');
    }

    // Actual Gate Used for Departure
    public function actualGate()
    {
        // FK in this table is 'departure_gate_id', referencing Gate PK 'id'
        return $this->belongsTo(Gate::class, 'departure_gate_id', 'id');
    }
}