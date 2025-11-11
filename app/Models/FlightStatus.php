<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FlightStatus extends Model
{
    // Database Table Name
    protected $table = 'flight_status';
    
    // Mass Assignable Fields
    protected $fillable = [
        'status_code',
        'status_name',
    ];

    // Disable default timestamps, as the 'timestamp' column is manually managed
    public $timestamps = false;

    // --- Relationships ---

    // Flights associated with this status
    public function flights()
    {
        return $this->hasMany(Flight::class, 'status_id', 'id');
    }
}
