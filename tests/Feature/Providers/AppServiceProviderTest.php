<?php

declare(strict_types=1);

use App\Providers\AppServiceProvider;
use Illuminate\Validation\Rules\Password;

it('configures strict password defaults in production', function (): void {
    app()->detectEnvironment(fn (): string => 'production');

    new AppServiceProvider(app())->boot();

    $rules = Password::defaults();

    expect($rules)->toBeInstanceOf(Password::class);
});
