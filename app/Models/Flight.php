<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Flight extends Model
{
    // Database Table Name
    protected $table = 'flights';
    
    // Mass Assignable Fields
    protected $fillable = [
        'flight_number',
        'airline_code',
        'origin_code',
        'destination_code',
        'aircraft_icao_code',
        'gate_id',
        'status_id',
        'scheduled_departure_time',
    ];

    // Sets the default value for Eloquent to use when reading the model.
    protected $attributes = [
        'status_id' => 1, // Matches SQL DEFAULT 1
    ];
    
    // Explicitly casting date columns to prevent issues in some PHP versions
    protected $dates = [
        'scheduled_departure_time',
        'created_at',
        'updated_at',
    ];
     public $timestamps = true;

    // --- Relationships to Reference Tables ---

    // Origin Airport
    public function originAirport()
    {
        return $this->belongsTo(Airport::class, 'origin_code', 'iata_code');
    }

    // Destination Airport
    public function destinationAirport()
    {
        return $this->belongsTo(Airport::class, 'destination_code', 'iata_code');
    }
    
    // Current Status
    public function status()
    {
        return $this->belongsTo(FlightStatus::class, 'status_id', 'id');
    }
    
    // Assigned Gate
    public function gate()
    {
        return $this->belongsTo(Gate::class, 'gate_id', 'id');
    }
    
    // --- Relationships to Event/Audit Tables ---

    // Actual Departure Event (One-to-One)
    public function departure()
    {
        return $this->hasOne(FlightDeparture::class, 'flight_id', 'id');
    }

    // Actual Arrival Event (One-to-One)
    public function arrival()
    {
        return $this->hasOne(FlightArrival::class, 'flight_id', 'id');
    }
    
    // History Records (Audit Trail)
    public function history()
    {
        return $this->hasMany(FlightTimesHistory::class, 'flight_id', 'id');
    }
    
    // Connections where this flight is the arrival
    public function connectionsAsArrival()
    {
        return $this->hasMany(FlightConnection::class, 'arrival_flight_id', 'id');
    }
    
    // Connection where this flight is the departure (One-to-One by UNIQUE key)
    public function connectionAsDeparture()
    {
        return $this->hasOne(FlightConnection::class, 'departure_flight_id', 'id');
    }
}