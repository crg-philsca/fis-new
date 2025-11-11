<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations;

/**
 * @property int $id
 * @property string|null $flight_number
 * @property string|null $origin_code
 * @property string|null $destination_code
 * @property int|null $status_id
 * @property \Illuminate\Support\Carbon|null $scheduled_departure_time
 * @property \Illuminate\Support\Carbon|null $scheduled_arrival_time
 */
class Flight extends Model
{
    use HasFactory;

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'scheduled_departure_time' => 'datetime',
        'scheduled_arrival_time' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the master status record (e.g., "Scheduled", "Arrived").
     */
    public function status(): Relations\BelongsTo
    {
        return $this->belongsTo(FlightStatus::class, 'status_id');
    }

    /**
     * Get the origin airport.
     */
    public function origin(): Relations\BelongsTo
    {
        return $this->belongsTo(Airport::class, 'origin_code', 'iata_code');
    }

    /**
     * Get the destination airport.
     */
    public function destination(): Relations\BelongsTo
    {
        return $this->belongsTo(Airport::class, 'destination_code', 'iata_code');
    }

    /**
     * Get the operating airline.
     */
    public function airline(): Relations\BelongsTo
    {
        return $this->belongsTo(Airline::class, 'airline_code', 'airline_code');
    }

    /**
     * Get the specific aircraft model.
     */
    public function aircraft(): Relations\BelongsTo
    {
        return $this->belongsTo(Aircraft::class, 'aircraft_icao_code', 'icao_code');
    }

    /**
     * Get the recorded departure facts (times, gate).
     * This is a 1:1 relationship.
     */
    public function departure(): Relations\HasOne
    {
        return $this->hasOne(FlightDeparture::class, 'flight_id');
    }

    /**
     * Get the recorded arrival facts (times, baggage).
     * This is a 1:1 relationship.
     */
    public function arrival(): Relations\HasOne
    {
        return $this->hasOne(FlightArrival::class, 'flight_id');
    }

    /**
     * Get the full audit log for this flight.
     * NOTE: This uses FlightEvent, not the redundant FlightTimesHistory.
     */
    public function events(): Relations\HasMany
    {
        return $this->hasMany(FlightEvent::class, 'flight_id');
    }

    /**
     * Get all flights that this flight connects *to*.
     */
    public function connections(): Relations\BelongsToMany
    {
        return $this->belongsToMany(
            Flight::class,
            'flight_connections', // The pivot table
            'arrival_flight_id',    // Foreign key on pivot for this model
            'departure_flight_id'   // Foreign key on pivot for the related model
        )->withPivot('minimum_connecting_time');
    }

    /**
     * Get all flights that this flight connects *from*.
     */
    public function connectingFrom(): Relations\BelongsToMany
    {
        return $this->belongsToMany(
            Flight::class,
            'flight_connections',
            'departure_flight_id',
            'arrival_flight_id'
        )->withPivot('minimum_connecting_time');
    }
}