<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'resend' => [
        'key' => env('RESEND_KEY'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    // N8n webhook endpoints for outbound notifications
    'n8n' => [
        'webhooks' => [
            'gate_change'   => env('N8N_WEBHOOK_GATE_CHANGE'),
            'baggage_change'=> env('N8N_WEBHOOK_BAGGAGE_CHANGE'),
            'time_update'   => env('N8N_WEBHOOK_TIME_UPDATE'),
            'departure'     => env('N8N_WEBHOOK_DEPARTURE'),
            'arrival'       => env('N8N_WEBHOOK_ARRIVAL'),
            'status_change' => env('N8N_WEBHOOK_STATUS_CHANGE'),
        ],
    ],

];
