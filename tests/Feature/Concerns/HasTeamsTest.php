<?php

declare(strict_types=1);

use App\Enums\TeamRole;
use App\Models\Team;
use App\Models\User;
use App\Support\TeamPermissions;
use App\Support\UserTeam;

it('returns all teams user belongs to', function (): void {
    $user = User::factory()->create();
    $team = Team::factory()->create();
    $team->members()->attach($user, ['role' => TeamRole::Member->value]);

    expect($user->teams)->toHaveCount(2);
});

it('returns owned teams', function (): void {
    $user = User::factory()->create();
    $team = Team::factory()->create();
    $team->members()->attach($user, ['role' => TeamRole::Member->value]);

    expect($user->ownedTeams)->toHaveCount(1)
        ->and($user->ownedTeams->first()->is_personal)->toBeTrue();
});

it('returns team memberships', function (): void {
    $user = User::factory()->create();

    expect($user->teamMemberships)->toHaveCount(1);
});

it('returns current team', function (): void {
    $user = User::factory()->create();

    expect($user->currentTeam)->toBeInstanceOf(Team::class);
});

it('returns personal team', function (): void {
    $user = User::factory()->create();

    expect($user->personalTeam())->toBeInstanceOf(Team::class)
        ->and($user->personalTeam()->is_personal)->toBeTrue();
});

it('can switch teams', function (): void {
    $user = User::factory()->create();
    $team = Team::factory()->create();
    $team->members()->attach($user, ['role' => TeamRole::Member->value]);

    $result = $user->switchTeam($team);

    expect($result)->toBeTrue()
        ->and($user->fresh()->current_team_id)->toBe($team->id);
});

it('cannot switch to team user does not belong to', function (): void {
    $user = User::factory()->create();
    $team = Team::factory()->create();

    $result = $user->switchTeam($team);

    expect($result)->toBeFalse();
});

it('determines team membership', function (): void {
    $user = User::factory()->create();
    $team = Team::factory()->create();

    expect($user->belongsToTeam($user->currentTeam))->toBeTrue()
        ->and($user->belongsToTeam($team))->toBeFalse();
});

it('determines if team is current', function (): void {
    $user = User::factory()->create();
    $team = Team::factory()->create();

    expect($user->isCurrentTeam($user->currentTeam))->toBeTrue()
        ->and($user->isCurrentTeam($team))->toBeFalse();
});

it('determines team ownership', function (): void {
    $user = User::factory()->create();
    $team = Team::factory()->create();
    $team->members()->attach($user, ['role' => TeamRole::Member->value]);

    expect($user->ownsTeam($user->personalTeam()))->toBeTrue()
        ->and($user->ownsTeam($team))->toBeFalse();
});

it('returns team role', function (): void {
    $user = User::factory()->create();
    $team = Team::factory()->create();
    $team->members()->attach($user, ['role' => TeamRole::Admin->value]);

    $otherTeam = Team::factory()->create();

    expect($user->teamRole($user->personalTeam()))->toBe(TeamRole::Owner)
        ->and($user->teamRole($team))->toBe(TeamRole::Admin)
        ->and($user->teamRole($otherTeam))->toBeNull();
});

it('converts to user teams collection with includeCurrent true', function (): void {
    $user = User::factory()->create();

    $teams = $user->toUserTeams(includeCurrent: true);

    expect($teams)->toHaveCount(1)
        ->and($teams->first())->toBeInstanceOf(UserTeam::class);
});

it('converts to user teams collection with includeCurrent false', function (): void {
    $user = User::factory()->create();
    $team = Team::factory()->create();
    $team->members()->attach($user, ['role' => TeamRole::Member->value]);

    $teams = $user->toUserTeams(includeCurrent: false);

    expect($teams)->toHaveCount(1)
        ->and($teams->first()->id)->toBe($team->id);
});

it('converts to UserTeam object', function (): void {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    $userTeam = $user->toUserTeam($team);

    expect($userTeam)->toBeInstanceOf(UserTeam::class)
        ->and($userTeam->id)->toBe($team->id)
        ->and($userTeam->name)->toBe($team->name)
        ->and($userTeam->slug)->toBe($team->slug)
        ->and($userTeam->isPersonal)->toBe($team->is_personal)
        ->and($userTeam->role)->toBe(TeamRole::Owner->value)
        ->and($userTeam->roleLabel)->toBe('Owner')
        ->and($userTeam->isCurrent)->toBeTrue();
});

it('converts to TeamPermissions for different roles', function (): void {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    $ownerPermissions = $user->toTeamPermissions($team);

    expect($ownerPermissions)->toBeInstanceOf(TeamPermissions::class)
        ->and($ownerPermissions->canUpdateTeam)->toBeTrue()
        ->and($ownerPermissions->canDeleteTeam)->toBeTrue()
        ->and($ownerPermissions->canAddMember)->toBeTrue()
        ->and($ownerPermissions->canUpdateMember)->toBeTrue()
        ->and($ownerPermissions->canRemoveMember)->toBeTrue()
        ->and($ownerPermissions->canCreateInvitation)->toBeTrue()
        ->and($ownerPermissions->canCancelInvitation)->toBeTrue();

    $memberTeam = Team::factory()->create();
    $memberTeam->members()->attach($user, ['role' => TeamRole::Member->value]);

    $memberPermissions = $user->toTeamPermissions($memberTeam);

    expect($memberPermissions->canUpdateTeam)->toBeFalse()
        ->and($memberPermissions->canDeleteTeam)->toBeFalse();
});

it('returns fallback team excluding given team', function (): void {
    $user = User::factory()->create();
    $teamA = Team::factory()->create(['name' => 'Alpha Team']);
    $teamA->members()->attach($user, ['role' => TeamRole::Member->value]);

    $fallback = $user->fallbackTeam($user->currentTeam);

    expect($fallback)->not->toBeNull()
        ->and($fallback->id)->toBe($teamA->id);
});

it('checks team permissions', function (): void {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    expect($user->hasTeamPermission($team, 'team:update'))->toBeTrue()
        ->and($user->hasTeamPermission($team, 'team:delete'))->toBeTrue();

    $memberTeam = Team::factory()->create();
    $memberTeam->members()->attach($user, ['role' => TeamRole::Member->value]);

    expect($user->hasTeamPermission($memberTeam, 'team:update'))->toBeFalse();
});
