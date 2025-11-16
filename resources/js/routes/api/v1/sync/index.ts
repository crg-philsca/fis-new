import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\API\FlightIntegrationController::flight
 * @see app/Http/Controllers/API/FlightIntegrationController.php:29
 * @route '/api/v1/sync/flight'
 */
export const flight = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: flight.url(options),
    method: 'post',
})

flight.definition = {
    methods: ["post"],
    url: '/api/v1/sync/flight',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\API\FlightIntegrationController::flight
 * @see app/Http/Controllers/API/FlightIntegrationController.php:29
 * @route '/api/v1/sync/flight'
 */
flight.url = (options?: RouteQueryOptions) => {
    return flight.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\FlightIntegrationController::flight
 * @see app/Http/Controllers/API/FlightIntegrationController.php:29
 * @route '/api/v1/sync/flight'
 */
flight.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: flight.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\API\FlightIntegrationController::flight
 * @see app/Http/Controllers/API/FlightIntegrationController.php:29
 * @route '/api/v1/sync/flight'
 */
    const flightForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: flight.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\API\FlightIntegrationController::flight
 * @see app/Http/Controllers/API/FlightIntegrationController.php:29
 * @route '/api/v1/sync/flight'
 */
        flightForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: flight.url(options),
            method: 'post',
        })
    
    flight.form = flightForm
/**
* @see \App\Http\Controllers\API\FlightIntegrationController::status
 * @see app/Http/Controllers/API/FlightIntegrationController.php:56
 * @route '/api/v1/sync/status'
 */
export const status = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: status.url(options),
    method: 'post',
})

status.definition = {
    methods: ["post"],
    url: '/api/v1/sync/status',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\API\FlightIntegrationController::status
 * @see app/Http/Controllers/API/FlightIntegrationController.php:56
 * @route '/api/v1/sync/status'
 */
status.url = (options?: RouteQueryOptions) => {
    return status.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\FlightIntegrationController::status
 * @see app/Http/Controllers/API/FlightIntegrationController.php:56
 * @route '/api/v1/sync/status'
 */
status.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: status.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\API\FlightIntegrationController::status
 * @see app/Http/Controllers/API/FlightIntegrationController.php:56
 * @route '/api/v1/sync/status'
 */
    const statusForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: status.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\API\FlightIntegrationController::status
 * @see app/Http/Controllers/API/FlightIntegrationController.php:56
 * @route '/api/v1/sync/status'
 */
        statusForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: status.url(options),
            method: 'post',
        })
    
    status.form = statusForm
/**
* @see \App\Http\Controllers\API\FlightIntegrationController::airport
 * @see app/Http/Controllers/API/FlightIntegrationController.php:81
 * @route '/api/v1/sync/airport'
 */
export const airport = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: airport.url(options),
    method: 'post',
})

airport.definition = {
    methods: ["post"],
    url: '/api/v1/sync/airport',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\API\FlightIntegrationController::airport
 * @see app/Http/Controllers/API/FlightIntegrationController.php:81
 * @route '/api/v1/sync/airport'
 */
airport.url = (options?: RouteQueryOptions) => {
    return airport.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\FlightIntegrationController::airport
 * @see app/Http/Controllers/API/FlightIntegrationController.php:81
 * @route '/api/v1/sync/airport'
 */
airport.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: airport.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\API\FlightIntegrationController::airport
 * @see app/Http/Controllers/API/FlightIntegrationController.php:81
 * @route '/api/v1/sync/airport'
 */
    const airportForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: airport.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\API\FlightIntegrationController::airport
 * @see app/Http/Controllers/API/FlightIntegrationController.php:81
 * @route '/api/v1/sync/airport'
 */
        airportForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: airport.url(options),
            method: 'post',
        })
    
    airport.form = airportForm
const sync = {
    flight: Object.assign(flight, flight),
status: Object.assign(status, status),
airport: Object.assign(airport, airport),
}

export default sync