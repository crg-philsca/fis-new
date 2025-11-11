<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations;

class FlightDeparture extends Model
{
    use HasFactory;

    protected $table = 'flight_departures';
    protected $primaryKey = 'flight_id'; // This table's PK is the Flight's ID
    public $incrementing = false;     // It's not an auto-incrementing ID
    public $timestamps = false;         // No created_at/updated_at

    protected $fillable = [
        'flight_id', 'actual_departure_time', 'runway_time', 'gate_id'
    ];

    protected $casts = [
        'actual_departure_time' => 'datetime',
        'runway_time' => 'datetime',
    ];

    /**
     * Get the master flight record.
     */
    public function flight(): Relations\BelongsTo
    {
        return $this->belongsTo(Flight::class, 'flight_id');
    }

    /**
     * Get the gate used for departure.
     */
    public function gate(): Relations\BelongsTo
    {
        return $this->belongsTo(Gate::class, 'gate_id');
    }
}