<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Contracts\FlightDataFactory;
use App\Contracts\StatusUpdater;
use App\Services\N8nFlightDataFactory;
use App\Services\N8nStatusUpdaterService;

class AppServiceProvider extends ServiceProvider
{
    // Register any application services.
    public function register(): void
    {
        /* BIND THE ABSTRACT FACTORY INTERFACE TO THE CONCRETE IMPLEMENTATION
        This enables Dependency Inversion: all controllers request the interface,
        and Laravel provides the N8n factory implementation. */

        $this->app->bind(
            FlightDataFactory::class,
            N8nFlightDataFactory::class
        );

        // Bind the StatusUpdater interface so services/controllers can inject it directly
        $this->app->bind(
            StatusUpdater::class,
            N8nStatusUpdaterService::class
        );
    }

    // Bootstrap any application services.
    public function boot(): void
    {
        //
    }
}