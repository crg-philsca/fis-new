<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * This is a custom Pivot Model for the gate_restrictions table.
 * It's needed because the pivot table has an extra attribute: 'restriction_type'.
 */
class GateRestriction extends Pivot
{
    /**
     * The table associated with the pivot model.
     *
     * @var string
     */
    protected $table = 'gate_restrictions';

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'gate_id',
        'aircraft_icao_code',
        'restriction_type'
    ];
}