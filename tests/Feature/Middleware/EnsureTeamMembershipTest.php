<?php

declare(strict_types=1);

use App\Enums\TeamRole;
use App\Http\Middleware\EnsureTeamMembership;
use App\Models\Team;
use App\Models\User;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Route;

beforeEach(function (): void {
    Route::middleware(['web', EnsureTeamMembership::class])
        ->get('/test-team/{current_team}', fn (): ResponseFactory|Response => response('ok'));

    Route::middleware(['web', EnsureTeamMembership::class.':admin'])
        ->get('/test-team-role/{current_team}', fn (): ResponseFactory|Response => response('ok'));

    Route::middleware(['web', EnsureTeamMembership::class])
        ->get('/test-team-param/{team}', fn (): ResponseFactory|Response => response('ok'));
});

it('allows team members through', function (): void {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get('/test-team/'.$user->currentTeam->slug)
        ->assertOk();
});

it('aborts 403 for non-members', function (): void {
    $user = User::factory()->create();
    $team = Team::factory()->create();

    $this->actingAs($user)
        ->get('/test-team/'.$team->slug)
        ->assertForbidden();
});

it('aborts 403 for unauthenticated users', function (): void {
    $team = Team::factory()->create();

    $this->get('/test-team/'.$team->slug)
        ->assertForbidden();
});

it('switches current team when accessing via current_team route parameter', function (): void {
    $user = User::factory()->create();
    $team = Team::factory()->create();
    $team->members()->attach($user, ['role' => TeamRole::Member->value]);

    $this->actingAs($user)
        ->get('/test-team/'.$team->slug)
        ->assertOk();

    expect($user->fresh()->current_team_id)->toBe($team->id);
});

it('enforces minimum role', function (): void {
    $user = User::factory()->create();
    $team = Team::factory()->create();
    $team->members()->attach($user, ['role' => TeamRole::Member->value]);

    $this->actingAs($user)
        ->get('/test-team-role/'.$team->slug)
        ->assertForbidden();
});

it('allows sufficient role', function (): void {
    $user = User::factory()->create();
    $team = Team::factory()->create();
    $team->members()->attach($user, ['role' => TeamRole::Admin->value]);

    $this->actingAs($user)
        ->get('/test-team-role/'.$team->slug)
        ->assertOk();
});

it('resolves team from slug string via team parameter', function (): void {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get('/test-team-param/'.$user->currentTeam->slug)
        ->assertOk();
});

it('aborts 403 for invalid minimum role string', function (): void {
    Route::middleware(['web', EnsureTeamMembership::class.':invalid-role'])
        ->get('/test-invalid-role/{current_team}', fn (): ResponseFactory|Response => response('ok'));

    $user = User::factory()->create();

    $this->actingAs($user)
        ->get('/test-invalid-role/'.$user->currentTeam->slug)
        ->assertForbidden();
});
