<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * Define the routes for the application.
     */
    public function boot(): void
    {
        // 1. Configure standard API rate limiting
        $this->configureRateLimiting();

        $this->routes(function () {
            
            // --- FIX: Loads api.php and assigns /api prefix ---
            Route::prefix('api')
                ->middleware('api')
                ->group(base_path('routes/api.php'));
            // --- END FIX ---

            // 2. Loads the standard web.php routes (for dashboard/Inertia)
            Route::middleware('web')
                ->group(base_path('routes/web.php'));

            // Load other secondary routes
            Route::middleware('web')
                 ->group(base_path('routes/auth.php'));
            
            Route::middleware('web')
                 ->group(base_path('routes/settings.php'));
        });
    }

    /**
     * Configure the rate limits for the application (Standard Practice).
     */
    protected function configureRateLimiting(): void
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });
    }
}