<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations;

/**
 * @property string $iata_code
 * @property string|null $airport_name
 * @property string|null $city
 * @property string|null $country
 * @property string|null $timezone
 */
class Airport extends Model
{
    use HasFactory;

    protected $table = 'airports';
    protected $primaryKey = 'iata_code';    // PK is the IATA code
    public $incrementing = false;         // It's not an auto-incrementing ID
    protected $keyType = 'string';        // The key is a string
    public $timestamps = false;             // No created_at/updated_at

    protected $fillable = [
        'iata_code', 'airport_name', 'city', 'country', 'timezone'
    ];

    /**
     * Get all terminals associated with this airport.
     */
    public function terminals(): Relations\HasMany
    {
        return $this->hasMany(Terminal::class, 'iata_code', 'iata_code');
    }

    /**
     * Get all flights departing from this airport.
     */
    public function departingFlights(): Relations\HasMany
    {
        return $this->hasMany(Flight::class, 'origin_code', 'iata_code');
    }

    /**
     * Get all flights arriving at this airport.
     */
    public function arrivingFlights(): Relations\HasMany
    {
        return $this->hasMany(Flight::class, 'destination_code', 'iata_code');
    }
}