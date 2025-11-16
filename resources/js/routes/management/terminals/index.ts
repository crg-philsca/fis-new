import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\TerminalManagementController::index
 * @see app/Http/Controllers/TerminalManagementController.php:16
 * @route '/management/terminals'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/management/terminals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TerminalManagementController::index
 * @see app/Http/Controllers/TerminalManagementController.php:16
 * @route '/management/terminals'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TerminalManagementController::index
 * @see app/Http/Controllers/TerminalManagementController.php:16
 * @route '/management/terminals'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TerminalManagementController::index
 * @see app/Http/Controllers/TerminalManagementController.php:16
 * @route '/management/terminals'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TerminalManagementController::index
 * @see app/Http/Controllers/TerminalManagementController.php:16
 * @route '/management/terminals'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TerminalManagementController::index
 * @see app/Http/Controllers/TerminalManagementController.php:16
 * @route '/management/terminals'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TerminalManagementController::index
 * @see app/Http/Controllers/TerminalManagementController.php:16
 * @route '/management/terminals'
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
* @see \App\Http\Controllers\TerminalManagementController::store
 * @see app/Http/Controllers/TerminalManagementController.php:37
 * @route '/management/terminals'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/management/terminals',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TerminalManagementController::store
 * @see app/Http/Controllers/TerminalManagementController.php:37
 * @route '/management/terminals'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TerminalManagementController::store
 * @see app/Http/Controllers/TerminalManagementController.php:37
 * @route '/management/terminals'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\TerminalManagementController::store
 * @see app/Http/Controllers/TerminalManagementController.php:37
 * @route '/management/terminals'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TerminalManagementController::store
 * @see app/Http/Controllers/TerminalManagementController.php:37
 * @route '/management/terminals'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\TerminalManagementController::update
 * @see app/Http/Controllers/TerminalManagementController.php:53
 * @route '/management/terminals/{terminal}'
 */
export const update = (args: { terminal: number | { id: number } } | [terminal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/management/terminals/{terminal}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\TerminalManagementController::update
 * @see app/Http/Controllers/TerminalManagementController.php:53
 * @route '/management/terminals/{terminal}'
 */
update.url = (args: { terminal: number | { id: number } } | [terminal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { terminal: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { terminal: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    terminal: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        terminal: typeof args.terminal === 'object'
                ? args.terminal.id
                : args.terminal,
                }

    return update.definition.url
            .replace('{terminal}', parsedArgs.terminal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TerminalManagementController::update
 * @see app/Http/Controllers/TerminalManagementController.php:53
 * @route '/management/terminals/{terminal}'
 */
update.put = (args: { terminal: number | { id: number } } | [terminal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\TerminalManagementController::update
 * @see app/Http/Controllers/TerminalManagementController.php:53
 * @route '/management/terminals/{terminal}'
 */
    const updateForm = (args: { terminal: number | { id: number } } | [terminal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TerminalManagementController::update
 * @see app/Http/Controllers/TerminalManagementController.php:53
 * @route '/management/terminals/{terminal}'
 */
        updateForm.put = (args: { terminal: number | { id: number } } | [terminal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\TerminalManagementController::destroy
 * @see app/Http/Controllers/TerminalManagementController.php:68
 * @route '/management/terminals/{terminal}'
 */
export const destroy = (args: { terminal: number | { id: number } } | [terminal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/management/terminals/{terminal}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\TerminalManagementController::destroy
 * @see app/Http/Controllers/TerminalManagementController.php:68
 * @route '/management/terminals/{terminal}'
 */
destroy.url = (args: { terminal: number | { id: number } } | [terminal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { terminal: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { terminal: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    terminal: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        terminal: typeof args.terminal === 'object'
                ? args.terminal.id
                : args.terminal,
                }

    return destroy.definition.url
            .replace('{terminal}', parsedArgs.terminal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TerminalManagementController::destroy
 * @see app/Http/Controllers/TerminalManagementController.php:68
 * @route '/management/terminals/{terminal}'
 */
destroy.delete = (args: { terminal: number | { id: number } } | [terminal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\TerminalManagementController::destroy
 * @see app/Http/Controllers/TerminalManagementController.php:68
 * @route '/management/terminals/{terminal}'
 */
    const destroyForm = (args: { terminal: number | { id: number } } | [terminal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TerminalManagementController::destroy
 * @see app/Http/Controllers/TerminalManagementController.php:68
 * @route '/management/terminals/{terminal}'
 */
        destroyForm.delete = (args: { terminal: number | { id: number } } | [terminal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const terminals = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default terminals