<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Airport extends Model
{
    // Database Table Name
    protected $table = 'airports';
    
    // Primary Key (Natural Key)
    protected $primaryKey = 'iata_code'; 
    
    // Key Type
    protected $keyType = 'string';
    
    // Not Auto-Incrementing
    public $incrementing = false; 
    public $timestamps = false;

    // Mass Assignable Fields
    protected $fillable = [
        'iata_code',
        'airport_name',
        'city',
        'country',
        'timezone',
    ];
    
    // --- Relationships ---
    
    // Flights departing from this airport
    public function departingFlights()
    {
        return $this->hasMany(Flight::class, 'origin_code', 'iata_code');
    }
    
    // Flights arriving at this airport
    public function arrivingFlights()
    {
        return $this->hasMany(Flight::class, 'destination_code', 'iata_code');
    }

    // Terminals belonging to this airport
    public function terminals()
    {
        return $this->hasMany(Terminal::class, 'iata_code', 'iata_code');
    }
}