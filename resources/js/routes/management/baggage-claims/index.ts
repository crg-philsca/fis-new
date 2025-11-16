import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\BaggageClaimManagementController::index
 * @see app/Http/Controllers/BaggageClaimManagementController.php:16
 * @route '/management/baggage-claims'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/management/baggage-claims',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BaggageClaimManagementController::index
 * @see app/Http/Controllers/BaggageClaimManagementController.php:16
 * @route '/management/baggage-claims'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BaggageClaimManagementController::index
 * @see app/Http/Controllers/BaggageClaimManagementController.php:16
 * @route '/management/baggage-claims'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BaggageClaimManagementController::index
 * @see app/Http/Controllers/BaggageClaimManagementController.php:16
 * @route '/management/baggage-claims'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BaggageClaimManagementController::index
 * @see app/Http/Controllers/BaggageClaimManagementController.php:16
 * @route '/management/baggage-claims'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BaggageClaimManagementController::index
 * @see app/Http/Controllers/BaggageClaimManagementController.php:16
 * @route '/management/baggage-claims'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BaggageClaimManagementController::index
 * @see app/Http/Controllers/BaggageClaimManagementController.php:16
 * @route '/management/baggage-claims'
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
* @see \App\Http\Controllers\BaggageClaimManagementController::store
 * @see app/Http/Controllers/BaggageClaimManagementController.php:65
 * @route '/management/baggage-claims'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/management/baggage-claims',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BaggageClaimManagementController::store
 * @see app/Http/Controllers/BaggageClaimManagementController.php:65
 * @route '/management/baggage-claims'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BaggageClaimManagementController::store
 * @see app/Http/Controllers/BaggageClaimManagementController.php:65
 * @route '/management/baggage-claims'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\BaggageClaimManagementController::store
 * @see app/Http/Controllers/BaggageClaimManagementController.php:65
 * @route '/management/baggage-claims'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\BaggageClaimManagementController::store
 * @see app/Http/Controllers/BaggageClaimManagementController.php:65
 * @route '/management/baggage-claims'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\BaggageClaimManagementController::update
 * @see app/Http/Controllers/BaggageClaimManagementController.php:80
 * @route '/management/baggage-claims/{baggageClaim}'
 */
export const update = (args: { baggageClaim: number | { id: number } } | [baggageClaim: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/management/baggage-claims/{baggageClaim}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\BaggageClaimManagementController::update
 * @see app/Http/Controllers/BaggageClaimManagementController.php:80
 * @route '/management/baggage-claims/{baggageClaim}'
 */
update.url = (args: { baggageClaim: number | { id: number } } | [baggageClaim: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { baggageClaim: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { baggageClaim: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    baggageClaim: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        baggageClaim: typeof args.baggageClaim === 'object'
                ? args.baggageClaim.id
                : args.baggageClaim,
                }

    return update.definition.url
            .replace('{baggageClaim}', parsedArgs.baggageClaim.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BaggageClaimManagementController::update
 * @see app/Http/Controllers/BaggageClaimManagementController.php:80
 * @route '/management/baggage-claims/{baggageClaim}'
 */
update.put = (args: { baggageClaim: number | { id: number } } | [baggageClaim: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\BaggageClaimManagementController::update
 * @see app/Http/Controllers/BaggageClaimManagementController.php:80
 * @route '/management/baggage-claims/{baggageClaim}'
 */
    const updateForm = (args: { baggageClaim: number | { id: number } } | [baggageClaim: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\BaggageClaimManagementController::update
 * @see app/Http/Controllers/BaggageClaimManagementController.php:80
 * @route '/management/baggage-claims/{baggageClaim}'
 */
        updateForm.put = (args: { baggageClaim: number | { id: number } } | [baggageClaim: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\BaggageClaimManagementController::destroy
 * @see app/Http/Controllers/BaggageClaimManagementController.php:95
 * @route '/management/baggage-claims/{baggageClaim}'
 */
export const destroy = (args: { baggageClaim: number | { id: number } } | [baggageClaim: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/management/baggage-claims/{baggageClaim}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\BaggageClaimManagementController::destroy
 * @see app/Http/Controllers/BaggageClaimManagementController.php:95
 * @route '/management/baggage-claims/{baggageClaim}'
 */
destroy.url = (args: { baggageClaim: number | { id: number } } | [baggageClaim: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { baggageClaim: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { baggageClaim: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    baggageClaim: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        baggageClaim: typeof args.baggageClaim === 'object'
                ? args.baggageClaim.id
                : args.baggageClaim,
                }

    return destroy.definition.url
            .replace('{baggageClaim}', parsedArgs.baggageClaim.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BaggageClaimManagementController::destroy
 * @see app/Http/Controllers/BaggageClaimManagementController.php:95
 * @route '/management/baggage-claims/{baggageClaim}'
 */
destroy.delete = (args: { baggageClaim: number | { id: number } } | [baggageClaim: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\BaggageClaimManagementController::destroy
 * @see app/Http/Controllers/BaggageClaimManagementController.php:95
 * @route '/management/baggage-claims/{baggageClaim}'
 */
    const destroyForm = (args: { baggageClaim: number | { id: number } } | [baggageClaim: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\BaggageClaimManagementController::destroy
 * @see app/Http/Controllers/BaggageClaimManagementController.php:95
 * @route '/management/baggage-claims/{baggageClaim}'
 */
        destroyForm.delete = (args: { baggageClaim: number | { id: number } } | [baggageClaim: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const baggageClaims = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default baggageClaims