<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations;

class Aircraft extends Model
{
    use HasFactory;

    protected $table = 'aircrafts';
    protected $primaryKey = 'icao_code';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    /**
     * Get all flights using this aircraft model.
     */
    public function flights(): Relations\HasMany
    {
        return $this->hasMany(Flight::class, 'aircraft_icao_code', 'icao_code');
    }

    /**
     * Get the gates that this aircraft model is restricted from.
     */
    public function restrictedGates(): Relations\BelongsToMany
    {
        return $this->belongsToMany(
            Gate::class,
            'gate_restrictions',    // The pivot table
            'aircraft_icao_code',   // Foreign key for this model
            'gate_id'               // Foreign key for the related model
        )
        ->using(GateRestriction::class) // <-- Tell Laravel to use your new Pivot Model
        ->withPivot('restriction_type');  // <-- Tell Laravel to include this extra column
    }
}