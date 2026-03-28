<?php

declare(strict_types=1);

use App\Http\Responses\RegisterResponse;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;

it('redirects to dashboard for web requests', function (): void {
    $user = User::factory()->create();

    $request = Request::create('/register', 'POST');
    $request->setUserResolver(fn () => $user);

    $response = (new RegisterResponse)->toResponse($request);

    expect($response->getStatusCode())->toBe(302)
        ->and($response->headers->get('Location'))->toContain('dashboard');
});

it('returns JSON with 201 for API requests', function (): void {
    $user = User::factory()->create();

    $request = Request::create('/register', 'POST', server: ['HTTP_ACCEPT' => 'application/json']);
    $request->setUserResolver(fn () => $user);

    $response = (new RegisterResponse)->toResponse($request);

    expect($response)->toBeInstanceOf(JsonResponse::class)
        ->and($response->getStatusCode())->toBe(201);
});

it('aborts 403 when user has no team', function (): void {
    $user = User::factory()->create();
    $user->teams()->detach();
    $user->update(['current_team_id' => null]);
    $user->unsetRelation('currentTeam');

    $request = Request::create('/register', 'POST');
    $request->setUserResolver(fn () => $user->fresh());

    $response = (new RegisterResponse)->toResponse($request);
})->throws(HttpException::class);
