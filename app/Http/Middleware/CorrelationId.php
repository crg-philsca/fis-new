<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class CorrelationId
{
    public const HEADER = 'X-Correlation-ID';

    public function handle(Request $request, Closure $next)
    {
        $cid = $request->header(self::HEADER) ?: Str::uuid()->toString();
        // Attach to request so controllers/services can retrieve
        $request->attributes->set('correlation_id', $cid);

        // Add to log context
        Log::withContext(['correlation_id' => $cid]);

        $response = $next($request);
        $response->headers->set(self::HEADER, $cid);
        return $response;
    }
}
