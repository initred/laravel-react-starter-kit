<?php

declare(strict_types=1);

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Contracts\Session\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;

it('configures two-factor rate limiter', function (): void {
    $request = Request::create('/two-factor-challenge', 'POST');
    $request->setLaravelSession(resolve(Session::class));
    $request->session()->put('login.id', 'test-user-id');

    $limiter = RateLimiter::limiter('two-factor');
    $result = $limiter($request);

    expect($result)->toBeInstanceOf(Limit::class);
});
