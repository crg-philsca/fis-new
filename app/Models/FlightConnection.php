<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FlightConnection extends Model
{
    protected $table = 'flight_connections';

    protected $fillable = [
        'arrival_flight_id',
        'departure_flight_id',
        'minimum_connecting_time',
    ];

    // Disable default timestamps, as the 'timestamp' column is manually managed
    public $timestamps = false;

    // --- Relationships ---

    // Arrival Flight in the connection pair
    public function arrivalFlight()
    {
        return $this->belongsTo(Flight::class, 'arrival_flight_id', 'id');
    }

    // Departure Flight in the connection pair
    public function departureFlight()
    {
        return $this->belongsTo(Flight::class, 'departure_flight_id', 'id');
    }
}