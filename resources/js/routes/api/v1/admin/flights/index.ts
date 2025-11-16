import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\API\Admin\FlightOperationsController::updateGate
 * @see app/Http/Controllers/API/Admin/FlightOperationsController.php:26
 * @route '/api/v1/admin/flights/{flight}/gate'
 */
export const updateGate = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateGate.url(args, options),
    method: 'post',
})

updateGate.definition = {
    methods: ["post"],
    url: '/api/v1/admin/flights/{flight}/gate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\API\Admin\FlightOperationsController::updateGate
 * @see app/Http/Controllers/API/Admin/FlightOperationsController.php:26
 * @route '/api/v1/admin/flights/{flight}/gate'
 */
updateGate.url = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { flight: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { flight: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    flight: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        flight: typeof args.flight === 'object'
                ? args.flight.id
                : args.flight,
                }

    return updateGate.definition.url
            .replace('{flight}', parsedArgs.flight.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\Admin\FlightOperationsController::updateGate
 * @see app/Http/Controllers/API/Admin/FlightOperationsController.php:26
 * @route '/api/v1/admin/flights/{flight}/gate'
 */
updateGate.post = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateGate.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\API\Admin\FlightOperationsController::updateGate
 * @see app/Http/Controllers/API/Admin/FlightOperationsController.php:26
 * @route '/api/v1/admin/flights/{flight}/gate'
 */
    const updateGateForm = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateGate.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\API\Admin\FlightOperationsController::updateGate
 * @see app/Http/Controllers/API/Admin/FlightOperationsController.php:26
 * @route '/api/v1/admin/flights/{flight}/gate'
 */
        updateGateForm.post = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateGate.url(args, options),
            method: 'post',
        })
    
    updateGate.form = updateGateForm
/**
* @see \App\Http\Controllers\API\Admin\FlightOperationsController::updateBaggage
 * @see app/Http/Controllers/API/Admin/FlightOperationsController.php:58
 * @route '/api/v1/admin/flights/{flight}/baggage'
 */
export const updateBaggage = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateBaggage.url(args, options),
    method: 'post',
})

updateBaggage.definition = {
    methods: ["post"],
    url: '/api/v1/admin/flights/{flight}/baggage',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\API\Admin\FlightOperationsController::updateBaggage
 * @see app/Http/Controllers/API/Admin/FlightOperationsController.php:58
 * @route '/api/v1/admin/flights/{flight}/baggage'
 */
updateBaggage.url = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { flight: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { flight: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    flight: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        flight: typeof args.flight === 'object'
                ? args.flight.id
                : args.flight,
                }

    return updateBaggage.definition.url
            .replace('{flight}', parsedArgs.flight.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\Admin\FlightOperationsController::updateBaggage
 * @see app/Http/Controllers/API/Admin/FlightOperationsController.php:58
 * @route '/api/v1/admin/flights/{flight}/baggage'
 */
updateBaggage.post = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateBaggage.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\API\Admin\FlightOperationsController::updateBaggage
 * @see app/Http/Controllers/API/Admin/FlightOperationsController.php:58
 * @route '/api/v1/admin/flights/{flight}/baggage'
 */
    const updateBaggageForm = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateBaggage.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\API\Admin\FlightOperationsController::updateBaggage
 * @see app/Http/Controllers/API/Admin/FlightOperationsController.php:58
 * @route '/api/v1/admin/flights/{flight}/baggage'
 */
        updateBaggageForm.post = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateBaggage.url(args, options),
            method: 'post',
        })
    
    updateBaggage.form = updateBaggageForm
/**
* @see \App\Http\Controllers\API\Admin\FlightOperationsController::updateTime
 * @see app/Http/Controllers/API/Admin/FlightOperationsController.php:78
 * @route '/api/v1/admin/flights/{flight}/time'
 */
export const updateTime = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateTime.url(args, options),
    method: 'post',
})

updateTime.definition = {
    methods: ["post"],
    url: '/api/v1/admin/flights/{flight}/time',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\API\Admin\FlightOperationsController::updateTime
 * @see app/Http/Controllers/API/Admin/FlightOperationsController.php:78
 * @route '/api/v1/admin/flights/{flight}/time'
 */
updateTime.url = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { flight: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { flight: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    flight: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        flight: typeof args.flight === 'object'
                ? args.flight.id
                : args.flight,
                }

    return updateTime.definition.url
            .replace('{flight}', parsedArgs.flight.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\Admin\FlightOperationsController::updateTime
 * @see app/Http/Controllers/API/Admin/FlightOperationsController.php:78
 * @route '/api/v1/admin/flights/{flight}/time'
 */
updateTime.post = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateTime.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\API\Admin\FlightOperationsController::updateTime
 * @see app/Http/Controllers/API/Admin/FlightOperationsController.php:78
 * @route '/api/v1/admin/flights/{flight}/time'
 */
    const updateTimeForm = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateTime.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\API\Admin\FlightOperationsController::updateTime
 * @see app/Http/Controllers/API/Admin/FlightOperationsController.php:78
 * @route '/api/v1/admin/flights/{flight}/time'
 */
        updateTimeForm.post = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateTime.url(args, options),
            method: 'post',
        })
    
    updateTime.form = updateTimeForm
const flights = {
    updateGate: Object.assign(updateGate, updateGate),
updateBaggage: Object.assign(updateBaggage, updateBaggage),
updateTime: Object.assign(updateTime, updateTime),
}

export default flights