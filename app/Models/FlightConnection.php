<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations;

class FlightConnection extends Model
{
    use HasFactory;

    protected $table = 'flight_connections';
    public $timestamps = false;

    /**
     * Get the arriving flight.
     */
    public function arrivalFlight(): Relations\BelongsTo
    {
        return $this->belongsTo(Flight::class, 'arrival_flight_id');
    }

    /**
     * Get the departing flight.
     */
    public function departureFlight(): Relations\BelongsTo
    {
        return $this->belongsTo(Flight::class, 'departure_flight_id');
    }
}