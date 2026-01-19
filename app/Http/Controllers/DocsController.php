<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Inertia\Response;

final class DocsController
{
    public function terms(): Response
    {
        return Inertia::render('docs/terms', [
            'content' => File::get(resource_path('docs/terms.md')),
        ]);
    }

    public function privacy(): Response
    {
        return Inertia::render('docs/privacy', [
            'content' => File::get(resource_path('docs/privacy.md')),
        ]);
    }
}
