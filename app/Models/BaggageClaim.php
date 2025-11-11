<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations;

/**
 * @property string|null $claim_area
 */
class BaggageClaim extends Model
{
    use HasFactory;

    protected $table = 'baggage_claims';
    public $timestamps = false;

    /**
     * Get the terminal this baggage claim belongs to.
     */
    public function terminal(): Relations\BelongsTo
    {
        return $this->belongsTo(Terminal::class, 'terminal_id');
    }

    /**
     * Get all flight arrivals assigned to this claim area.
     */
    public function arrivals(): Relations\HasMany
    {
        return $this->hasMany(FlightArrival::class, 'baggage_claim_id');
    }
}