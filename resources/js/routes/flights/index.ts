import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../wayfinder'
/**
* @see \App\Http\Controllers\FlightScheduleController::schedule
 * @see app/Http/Controllers/FlightScheduleController.php:46
 * @route '/schedule/{type?}'
 */
export const schedule = (args?: { type?: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: schedule.url(args, options),
    method: 'get',
})

schedule.definition = {
    methods: ["get","head"],
    url: '/schedule/{type?}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FlightScheduleController::schedule
 * @see app/Http/Controllers/FlightScheduleController.php:46
 * @route '/schedule/{type?}'
 */
schedule.url = (args?: { type?: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { type: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    type: args[0],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "type",
        ])

    const parsedArgs = {
                        type: args?.type,
                }

    return schedule.definition.url
            .replace('{type?}', parsedArgs.type?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FlightScheduleController::schedule
 * @see app/Http/Controllers/FlightScheduleController.php:46
 * @route '/schedule/{type?}'
 */
schedule.get = (args?: { type?: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: schedule.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\FlightScheduleController::schedule
 * @see app/Http/Controllers/FlightScheduleController.php:46
 * @route '/schedule/{type?}'
 */
schedule.head = (args?: { type?: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: schedule.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\FlightScheduleController::schedule
 * @see app/Http/Controllers/FlightScheduleController.php:46
 * @route '/schedule/{type?}'
 */
    const scheduleForm = (args?: { type?: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: schedule.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\FlightScheduleController::schedule
 * @see app/Http/Controllers/FlightScheduleController.php:46
 * @route '/schedule/{type?}'
 */
        scheduleForm.get = (args?: { type?: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: schedule.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\FlightScheduleController::schedule
 * @see app/Http/Controllers/FlightScheduleController.php:46
 * @route '/schedule/{type?}'
 */
        scheduleForm.head = (args?: { type?: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: schedule.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    schedule.form = scheduleForm
/**
* @see \App\Http\Controllers\FlightConnectionController::connections
 * @see app/Http/Controllers/FlightConnectionController.php:17
 * @route '/connections'
 */
export const connections = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: connections.url(options),
    method: 'get',
})

connections.definition = {
    methods: ["get","head"],
    url: '/connections',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FlightConnectionController::connections
 * @see app/Http/Controllers/FlightConnectionController.php:17
 * @route '/connections'
 */
connections.url = (options?: RouteQueryOptions) => {
    return connections.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FlightConnectionController::connections
 * @see app/Http/Controllers/FlightConnectionController.php:17
 * @route '/connections'
 */
connections.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: connections.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\FlightConnectionController::connections
 * @see app/Http/Controllers/FlightConnectionController.php:17
 * @route '/connections'
 */
connections.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: connections.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\FlightConnectionController::connections
 * @see app/Http/Controllers/FlightConnectionController.php:17
 * @route '/connections'
 */
    const connectionsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: connections.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\FlightConnectionController::connections
 * @see app/Http/Controllers/FlightConnectionController.php:17
 * @route '/connections'
 */
        connectionsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: connections.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\FlightConnectionController::connections
 * @see app/Http/Controllers/FlightConnectionController.php:17
 * @route '/connections'
 */
        connectionsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: connections.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    connections.form = connectionsForm
/**
* @see \App\Http\Controllers\FlightManagementController::management
 * @see app/Http/Controllers/FlightManagementController.php:45
 * @route '/flights/management'
 */
export const management = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: management.url(options),
    method: 'get',
})

management.definition = {
    methods: ["get","head"],
    url: '/flights/management',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FlightManagementController::management
 * @see app/Http/Controllers/FlightManagementController.php:45
 * @route '/flights/management'
 */
management.url = (options?: RouteQueryOptions) => {
    return management.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FlightManagementController::management
 * @see app/Http/Controllers/FlightManagementController.php:45
 * @route '/flights/management'
 */
management.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: management.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\FlightManagementController::management
 * @see app/Http/Controllers/FlightManagementController.php:45
 * @route '/flights/management'
 */
management.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: management.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\FlightManagementController::management
 * @see app/Http/Controllers/FlightManagementController.php:45
 * @route '/flights/management'
 */
    const managementForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: management.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\FlightManagementController::management
 * @see app/Http/Controllers/FlightManagementController.php:45
 * @route '/flights/management'
 */
        managementForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: management.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\FlightManagementController::management
 * @see app/Http/Controllers/FlightManagementController.php:45
 * @route '/flights/management'
 */
        managementForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: management.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    management.form = managementForm
/**
* @see \App\Http\Controllers\FlightManagementController::store
 * @see app/Http/Controllers/FlightManagementController.php:111
 * @route '/flights/management'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/flights/management',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\FlightManagementController::store
 * @see app/Http/Controllers/FlightManagementController.php:111
 * @route '/flights/management'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FlightManagementController::store
 * @see app/Http/Controllers/FlightManagementController.php:111
 * @route '/flights/management'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\FlightManagementController::store
 * @see app/Http/Controllers/FlightManagementController.php:111
 * @route '/flights/management'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\FlightManagementController::store
 * @see app/Http/Controllers/FlightManagementController.php:111
 * @route '/flights/management'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\FlightManagementController::show
 * @see app/Http/Controllers/FlightManagementController.php:178
 * @route '/flights/management/{flight}'
 */
export const show = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/flights/management/{flight}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FlightManagementController::show
 * @see app/Http/Controllers/FlightManagementController.php:178
 * @route '/flights/management/{flight}'
 */
show.url = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{flight}', parsedArgs.flight.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FlightManagementController::show
 * @see app/Http/Controllers/FlightManagementController.php:178
 * @route '/flights/management/{flight}'
 */
show.get = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\FlightManagementController::show
 * @see app/Http/Controllers/FlightManagementController.php:178
 * @route '/flights/management/{flight}'
 */
show.head = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\FlightManagementController::show
 * @see app/Http/Controllers/FlightManagementController.php:178
 * @route '/flights/management/{flight}'
 */
    const showForm = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\FlightManagementController::show
 * @see app/Http/Controllers/FlightManagementController.php:178
 * @route '/flights/management/{flight}'
 */
        showForm.get = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\FlightManagementController::show
 * @see app/Http/Controllers/FlightManagementController.php:178
 * @route '/flights/management/{flight}'
 */
        showForm.head = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\FlightManagementController::update
 * @see app/Http/Controllers/FlightManagementController.php:134
 * @route '/flights/management/{flight}'
 */
export const update = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/flights/management/{flight}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\FlightManagementController::update
 * @see app/Http/Controllers/FlightManagementController.php:134
 * @route '/flights/management/{flight}'
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
* @see \App\Http\Controllers\FlightManagementController::update
 * @see app/Http/Controllers/FlightManagementController.php:134
 * @route '/flights/management/{flight}'
 */
update.put = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\FlightManagementController::update
 * @see app/Http/Controllers/FlightManagementController.php:134
 * @route '/flights/management/{flight}'
 */
    const updateForm = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\FlightManagementController::update
 * @see app/Http/Controllers/FlightManagementController.php:134
 * @route '/flights/management/{flight}'
 */
        updateForm.put = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\FlightManagementController::destroy
 * @see app/Http/Controllers/FlightManagementController.php:157
 * @route '/flights/management/{flight}'
 */
export const destroy = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/flights/management/{flight}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\FlightManagementController::destroy
 * @see app/Http/Controllers/FlightManagementController.php:157
 * @route '/flights/management/{flight}'
 */
destroy.url = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{flight}', parsedArgs.flight.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FlightManagementController::destroy
 * @see app/Http/Controllers/FlightManagementController.php:157
 * @route '/flights/management/{flight}'
 */
destroy.delete = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\FlightManagementController::destroy
 * @see app/Http/Controllers/FlightManagementController.php:157
 * @route '/flights/management/{flight}'
 */
    const destroyForm = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\FlightManagementController::destroy
 * @see app/Http/Controllers/FlightManagementController.php:157
 * @route '/flights/management/{flight}'
 */
        destroyForm.delete = (args: { flight: number | { id: number } } | [flight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const flights = {
    schedule: Object.assign(schedule, schedule),
connections: Object.assign(connections, connections),
management: Object.assign(management, management),
store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default flights