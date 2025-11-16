import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\FlightStatusUpdateController::index
 * @see app/Http/Controllers/FlightStatusUpdateController.php:40
 * @route '/flights/status-update'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/flights/status-update',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FlightStatusUpdateController::index
 * @see app/Http/Controllers/FlightStatusUpdateController.php:40
 * @route '/flights/status-update'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FlightStatusUpdateController::index
 * @see app/Http/Controllers/FlightStatusUpdateController.php:40
 * @route '/flights/status-update'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\FlightStatusUpdateController::index
 * @see app/Http/Controllers/FlightStatusUpdateController.php:40
 * @route '/flights/status-update'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\FlightStatusUpdateController::index
 * @see app/Http/Controllers/FlightStatusUpdateController.php:40
 * @route '/flights/status-update'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\FlightStatusUpdateController::index
 * @see app/Http/Controllers/FlightStatusUpdateController.php:40
 * @route '/flights/status-update'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\FlightStatusUpdateController::index
 * @see app/Http/Controllers/FlightStatusUpdateController.php:40
 * @route '/flights/status-update'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\FlightStatusUpdateController::update
 * @see app/Http/Controllers/FlightStatusUpdateController.php:112
 * @route '/flights/status-update/{flight}/status'
 */
export const update = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/flights/status-update/{flight}/status',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\FlightStatusUpdateController::update
 * @see app/Http/Controllers/FlightStatusUpdateController.php:112
 * @route '/flights/status-update/{flight}/status'
 */
update.url = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{flight}', parsedArgs.flight.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FlightStatusUpdateController::update
 * @see app/Http/Controllers/FlightStatusUpdateController.php:112
 * @route '/flights/status-update/{flight}/status'
 */
update.post = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\FlightStatusUpdateController::update
 * @see app/Http/Controllers/FlightStatusUpdateController.php:112
 * @route '/flights/status-update/{flight}/status'
 */
    const updateForm = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\FlightStatusUpdateController::update
 * @see app/Http/Controllers/FlightStatusUpdateController.php:112
 * @route '/flights/status-update/{flight}/status'
 */
        updateForm.post = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, options),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\FlightStatusUpdateController::gate
 * @see app/Http/Controllers/FlightStatusUpdateController.php:138
 * @route '/flights/status-update/{flight}/gate'
 */
export const gate = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: gate.url(args, options),
    method: 'post',
})

gate.definition = {
    methods: ["post"],
    url: '/flights/status-update/{flight}/gate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\FlightStatusUpdateController::gate
 * @see app/Http/Controllers/FlightStatusUpdateController.php:138
 * @route '/flights/status-update/{flight}/gate'
 */
gate.url = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return gate.definition.url
            .replace('{flight}', parsedArgs.flight.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FlightStatusUpdateController::gate
 * @see app/Http/Controllers/FlightStatusUpdateController.php:138
 * @route '/flights/status-update/{flight}/gate'
 */
gate.post = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: gate.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\FlightStatusUpdateController::gate
 * @see app/Http/Controllers/FlightStatusUpdateController.php:138
 * @route '/flights/status-update/{flight}/gate'
 */
    const gateForm = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: gate.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\FlightStatusUpdateController::gate
 * @see app/Http/Controllers/FlightStatusUpdateController.php:138
 * @route '/flights/status-update/{flight}/gate'
 */
        gateForm.post = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: gate.url(args, options),
            method: 'post',
        })
    
    gate.form = gateForm
/**
* @see \App\Http\Controllers\FlightStatusUpdateController::baggage
 * @see app/Http/Controllers/FlightStatusUpdateController.php:164
 * @route '/flights/status-update/{flight}/baggage-claim'
 */
export const baggage = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: baggage.url(args, options),
    method: 'post',
})

baggage.definition = {
    methods: ["post"],
    url: '/flights/status-update/{flight}/baggage-claim',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\FlightStatusUpdateController::baggage
 * @see app/Http/Controllers/FlightStatusUpdateController.php:164
 * @route '/flights/status-update/{flight}/baggage-claim'
 */
baggage.url = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return baggage.definition.url
            .replace('{flight}', parsedArgs.flight.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FlightStatusUpdateController::baggage
 * @see app/Http/Controllers/FlightStatusUpdateController.php:164
 * @route '/flights/status-update/{flight}/baggage-claim'
 */
baggage.post = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: baggage.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\FlightStatusUpdateController::baggage
 * @see app/Http/Controllers/FlightStatusUpdateController.php:164
 * @route '/flights/status-update/{flight}/baggage-claim'
 */
    const baggageForm = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: baggage.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\FlightStatusUpdateController::baggage
 * @see app/Http/Controllers/FlightStatusUpdateController.php:164
 * @route '/flights/status-update/{flight}/baggage-claim'
 */
        baggageForm.post = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: baggage.url(args, options),
            method: 'post',
        })
    
    baggage.form = baggageForm
/**
* @see \App\Http\Controllers\FlightStatusUpdateController::bulk
 * @see app/Http/Controllers/FlightStatusUpdateController.php:190
 * @route '/flights/status-update/bulk'
 */
export const bulk = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulk.url(options),
    method: 'post',
})

bulk.definition = {
    methods: ["post"],
    url: '/flights/status-update/bulk',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\FlightStatusUpdateController::bulk
 * @see app/Http/Controllers/FlightStatusUpdateController.php:190
 * @route '/flights/status-update/bulk'
 */
bulk.url = (options?: RouteQueryOptions) => {
    return bulk.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FlightStatusUpdateController::bulk
 * @see app/Http/Controllers/FlightStatusUpdateController.php:190
 * @route '/flights/status-update/bulk'
 */
bulk.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulk.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\FlightStatusUpdateController::bulk
 * @see app/Http/Controllers/FlightStatusUpdateController.php:190
 * @route '/flights/status-update/bulk'
 */
    const bulkForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: bulk.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\FlightStatusUpdateController::bulk
 * @see app/Http/Controllers/FlightStatusUpdateController.php:190
 * @route '/flights/status-update/bulk'
 */
        bulkForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: bulk.url(options),
            method: 'post',
        })
    
    bulk.form = bulkForm
const status = {
    index: Object.assign(index, index),
update: Object.assign(update, update),
gate: Object.assign(gate, gate),
baggage: Object.assign(baggage, baggage),
bulk: Object.assign(bulk, bulk),
}

export default status