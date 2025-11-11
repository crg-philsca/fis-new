<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FlightArrival extends Model
{
    protected $table = 'flight_arrivals';

    // Primary Key is the Foreign Key (One-to-One mapping)
    protected $primaryKey = 'flight_id'; 
    public $incrementing = false;

    // Disable default timestamps, as the 'timestamp' column is manually managed
    public $timestamps = false;
    protected $keyType = 'integer';

    protected $fillable = [
        'flight_id',
        'baggage_claim_id',
        'actual_arrival_time',
        'landing_time',
    ];

    // --- Relationships ---

    // Parent Flight
    public function flight()
    {
        return $this->belongsTo(Flight::class, 'flight_id', 'id');
    }

    // Assigned Baggage Claim Area
    public function baggageClaim()
    {
        return $this->belongsTo(BaggageClaim::class, 'baggage_claim_id', 'id');
    }
}