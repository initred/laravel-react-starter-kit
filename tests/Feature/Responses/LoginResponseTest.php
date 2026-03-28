<?php

declare(strict_types=1);

use App\Http\Responses\LoginResponse;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;

it('redirects to dashboard for web requests', function (): void {
    $user = User::factory()->create();

    $request = Request::create('/login', 'POST');
    $request->setUserResolver(fn () => $user);

    $response = (new LoginResponse)->toResponse($request);

    expect($response->getStatusCode())->toBe(302)
        ->and($response->headers->get('Location'))->toContain('dashboard');
});

it('returns JSON for API requests', function (): void {
    $user = User::factory()->create();

    $request = Request::create('/login', 'POST', server: ['HTTP_ACCEPT' => 'application/json']);
    $request->setUserResolver(fn () => $user);

    $response = (new LoginResponse)->toResponse($request);

    expect($response)->toBeInstanceOf(JsonResponse::class)
        ->and($response->getStatusCode())->toBe(200);
});

it('aborts 403 when user has no team', function (): void {
    $user = User::factory()->create();
    $user->teams()->detach();
    $user->update(['current_team_id' => null]);
    $user->unsetRelation('currentTeam');

    $request = Request::create('/login', 'POST');
    $request->setUserResolver(fn () => $user->fresh());

    $response = (new LoginResponse)->toResponse($request);
})->throws(HttpException::class);
