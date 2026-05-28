<?php

declare(strict_types=1);

use App\Http\Responses\VerifyEmailResponse;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

it('redirects to team dashboard with verified flag for web requests', function (): void {
    $user = User::factory()->create();

    $request = Request::create('/verify-email', 'GET');
    $request->setUserResolver(fn () => $user);

    $response = (new VerifyEmailResponse)->toResponse($request);

    expect($response->getStatusCode())->toBe(302)
        ->and($response->headers->get('Location'))->toContain('verified=1');
});

it('returns 204 JSON for API requests', function (): void {
    $user = User::factory()->create();

    $request = Request::create('/verify-email', 'GET', server: ['HTTP_ACCEPT' => 'application/json']);
    $request->setUserResolver(fn () => $user);

    $response = (new VerifyEmailResponse)->toResponse($request);

    expect($response)->toBeInstanceOf(JsonResponse::class)
        ->and($response->getStatusCode())->toBe(204);
});
