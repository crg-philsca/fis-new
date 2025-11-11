<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations;

class FlightArrival extends Model
{
    use HasFactory;

    protected $table = 'flight_arrivals';
    protected $primaryKey = 'flight_id';
    public $incrementing = false;
    public $timestamps = false;
    
    protected $fillable = [
        'flight_id', 'actual_arrival_time', 'landing_time', 'baggage_claim_id'
    ];

    protected $casts = [
        'actual_arrival_time' => 'datetime',
        'landing_time' => 'datetime',
    ];

    /**
     * Get the master flight record.
     */
    public function flight(): Relations\BelongsTo
    {
        return $this->belongsTo(Flight::class, 'flight_id');
    }

    /**
     * Get the baggage claim carousel used.
     */
    public function baggageClaim(): Relations\BelongsTo
    {
        return $this->belongsTo(BaggageClaim::class, 'baggage_claim_id');
    }
}