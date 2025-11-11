<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Terminal extends Model
{
    // Database Table Name
    protected $table = 'terminals';

    // Mass Assignable Fields
    protected $fillable = [
        'iata_code',
        'terminal_code',
    ];

    // Disable default timestamps, as the 'timestamp' column is manually managed
    public $timestamps = false;
    
    // --- Relationships ---

    // Parent Airport
    public function airport()
    {
        return $this->belongsTo(Airport::class, 'iata_code', 'iata_code');
    }

    // Child Gates
    public function gates()
    {
        return $this->hasMany(Gate::class, 'terminal_id', 'id');
    }

    // Child Baggage Claims
    public function baggageClaims()
    {
        return $this->hasMany(BaggageClaim::class, 'terminal_id', 'id');
    }
}