<?php

declare(strict_types=1);

use App\Http\Responses\TwoFactorLoginResponse;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;

it('redirects to team dashboard for web requests', function (): void {
    $user = User::factory()->create();

    $request = Request::create('/two-factor-challenge', 'POST');
    $request->setUserResolver(fn () => $user);

    $response = (new TwoFactorLoginResponse)->toResponse($request);

    expect($response->getStatusCode())->toBe(302)
        ->and($response->headers->get('Location'))->toContain($user->currentTeam->slug.'/dashboard');
});

it('returns JSON for API requests', function (): void {
    $user = User::factory()->create();

    $request = Request::create('/two-factor-challenge', 'POST', server: ['HTTP_ACCEPT' => 'application/json']);
    $request->setUserResolver(fn () => $user);

    $response = (new TwoFactorLoginResponse)->toResponse($request);

    expect($response)->toBeInstanceOf(JsonResponse::class)
        ->and($response->getStatusCode())->toBe(200);
});

it('sets current team when user has no current team', function (): void {
    $user = User::factory()->create();
    $personalTeam = $user->personalTeam();
    $user->update(['current_team_id' => null]);
    $user->unsetRelation('currentTeam');
    $user = $user->fresh();

    $request = Request::create('/two-factor-challenge', 'POST');
    $request->setUserResolver(fn () => $user);

    $response = (new TwoFactorLoginResponse)->toResponse($request);

    expect($user->fresh()->current_team_id)->toBe($personalTeam->id)
        ->and($response->getStatusCode())->toBe(302);
});

it('aborts 403 when user has no team at all', function (): void {
    $user = User::factory()->create();
    $user->teams()->detach();
    $user->update(['current_team_id' => null]);
    $user->unsetRelation('currentTeam');

    $request = Request::create('/two-factor-challenge', 'POST');
    $request->setUserResolver(fn () => $user->fresh());

    $response = (new TwoFactorLoginResponse)->toResponse($request);
})->throws(HttpException::class);
