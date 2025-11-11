<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations;

class Airline extends Model
{
    use HasFactory;

    protected $table = 'airlines';
    protected $primaryKey = 'airline_code';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    /**
     * Get all flights for this airline.
     */
    public function flights(): Relations\HasMany
    {
        return $this->hasMany(Flight::class, 'airline_code', 'airline_code');
    }

    /**
     * Get the gates this airline is authorized to use.
     * This uses the 'airline_gates' pivot table.
     */
    public function authorizedGates(): Relations\BelongsToMany
    {
        return $this->belongsToMany(
            Gate::class,
            'airline_gates', // Pivot table
            'airline_code',  // Foreign key for this model
            'gate_id'        // Foreign key for the related model
        );
    }
}