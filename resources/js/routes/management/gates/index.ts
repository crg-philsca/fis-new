import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\GateManagementController::index
 * @see app/Http/Controllers/GateManagementController.php:17
 * @route '/management/gates'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/management/gates',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\GateManagementController::index
 * @see app/Http/Controllers/GateManagementController.php:17
 * @route '/management/gates'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\GateManagementController::index
 * @see app/Http/Controllers/GateManagementController.php:17
 * @route '/management/gates'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\GateManagementController::index
 * @see app/Http/Controllers/GateManagementController.php:17
 * @route '/management/gates'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\GateManagementController::index
 * @see app/Http/Controllers/GateManagementController.php:17
 * @route '/management/gates'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\GateManagementController::index
 * @see app/Http/Controllers/GateManagementController.php:17
 * @route '/management/gates'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\GateManagementController::index
 * @see app/Http/Controllers/GateManagementController.php:17
 * @route '/management/gates'
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
* @see \App\Http\Controllers\GateManagementController::store
 * @see app/Http/Controllers/GateManagementController.php:69
 * @route '/management/gates'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/management/gates',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\GateManagementController::store
 * @see app/Http/Controllers/GateManagementController.php:69
 * @route '/management/gates'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\GateManagementController::store
 * @see app/Http/Controllers/GateManagementController.php:69
 * @route '/management/gates'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\GateManagementController::store
 * @see app/Http/Controllers/GateManagementController.php:69
 * @route '/management/gates'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\GateManagementController::store
 * @see app/Http/Controllers/GateManagementController.php:69
 * @route '/management/gates'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\GateManagementController::update
 * @see app/Http/Controllers/GateManagementController.php:84
 * @route '/management/gates/{gate}'
 */
export const update = (args: { gate: number | { id: number } } | [gate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/management/gates/{gate}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\GateManagementController::update
 * @see app/Http/Controllers/GateManagementController.php:84
 * @route '/management/gates/{gate}'
 */
update.url = (args: { gate: number | { id: number } } | [gate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { gate: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { gate: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    gate: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        gate: typeof args.gate === 'object'
                ? args.gate.id
                : args.gate,
                }

    return update.definition.url
            .replace('{gate}', parsedArgs.gate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\GateManagementController::update
 * @see app/Http/Controllers/GateManagementController.php:84
 * @route '/management/gates/{gate}'
 */
update.put = (args: { gate: number | { id: number } } | [gate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\GateManagementController::update
 * @see app/Http/Controllers/GateManagementController.php:84
 * @route '/management/gates/{gate}'
 */
    const updateForm = (args: { gate: number | { id: number } } | [gate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\GateManagementController::update
 * @see app/Http/Controllers/GateManagementController.php:84
 * @route '/management/gates/{gate}'
 */
        updateForm.put = (args: { gate: number | { id: number } } | [gate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\GateManagementController::destroy
 * @see app/Http/Controllers/GateManagementController.php:99
 * @route '/management/gates/{gate}'
 */
export const destroy = (args: { gate: number | { id: number } } | [gate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/management/gates/{gate}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\GateManagementController::destroy
 * @see app/Http/Controllers/GateManagementController.php:99
 * @route '/management/gates/{gate}'
 */
destroy.url = (args: { gate: number | { id: number } } | [gate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { gate: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { gate: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    gate: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        gate: typeof args.gate === 'object'
                ? args.gate.id
                : args.gate,
                }

    return destroy.definition.url
            .replace('{gate}', parsedArgs.gate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\GateManagementController::destroy
 * @see app/Http/Controllers/GateManagementController.php:99
 * @route '/management/gates/{gate}'
 */
destroy.delete = (args: { gate: number | { id: number } } | [gate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\GateManagementController::destroy
 * @see app/Http/Controllers/GateManagementController.php:99
 * @route '/management/gates/{gate}'
 */
    const destroyForm = (args: { gate: number | { id: number } } | [gate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\GateManagementController::destroy
 * @see app/Http/Controllers/GateManagementController.php:99
 * @route '/management/gates/{gate}'
 */
        destroyForm.delete = (args: { gate: number | { id: number } } | [gate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\GateManagementController::assignAirlines
 * @see app/Http/Controllers/GateManagementController.php:120
 * @route '/management/gates/{gate}/airlines'
 */
export const assignAirlines = (args: { gate: number | { id: number } } | [gate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assignAirlines.url(args, options),
    method: 'post',
})

assignAirlines.definition = {
    methods: ["post"],
    url: '/management/gates/{gate}/airlines',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\GateManagementController::assignAirlines
 * @see app/Http/Controllers/GateManagementController.php:120
 * @route '/management/gates/{gate}/airlines'
 */
assignAirlines.url = (args: { gate: number | { id: number } } | [gate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { gate: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { gate: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    gate: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        gate: typeof args.gate === 'object'
                ? args.gate.id
                : args.gate,
                }

    return assignAirlines.definition.url
            .replace('{gate}', parsedArgs.gate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\GateManagementController::assignAirlines
 * @see app/Http/Controllers/GateManagementController.php:120
 * @route '/management/gates/{gate}/airlines'
 */
assignAirlines.post = (args: { gate: number | { id: number } } | [gate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assignAirlines.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\GateManagementController::assignAirlines
 * @see app/Http/Controllers/GateManagementController.php:120
 * @route '/management/gates/{gate}/airlines'
 */
    const assignAirlinesForm = (args: { gate: number | { id: number } } | [gate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: assignAirlines.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\GateManagementController::assignAirlines
 * @see app/Http/Controllers/GateManagementController.php:120
 * @route '/management/gates/{gate}/airlines'
 */
        assignAirlinesForm.post = (args: { gate: number | { id: number } } | [gate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: assignAirlines.url(args, options),
            method: 'post',
        })
    
    assignAirlines.form = assignAirlinesForm
const gates = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
assignAirlines: Object.assign(assignAirlines, assignAirlines),
}

export default gates