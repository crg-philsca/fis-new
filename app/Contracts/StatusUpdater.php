<?php

namespace App\Contracts; // Product Interface

// Defines the contract for processing and persisting status changes. (ISP, SRP)
interface StatusUpdater
{
    /**
     * Processes an incoming payload and updates the flight status and history.
     * @param array $payload The incoming data payload from N8n.
     * @return \App\Models\Flight The updated Flight model instance.
     */
    public function updateStatus(array $payload);
}