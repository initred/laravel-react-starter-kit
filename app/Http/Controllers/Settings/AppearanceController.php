<?php

declare(strict_types=1);

namespace App\Http\Controllers\Settings;

use Inertia\Response;

final class AppearanceController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(): Response
    {
        return inertia('settings/appearance');
    }
}
