<?php

declare(strict_types=1);

use App\Enums\TeamRole;
use App\Models\Team;
use App\Models\User;
use App\Policies\TeamPolicy;

beforeEach(function (): void {
    $this->policy = new TeamPolicy;
});

it('allows anyone to view any teams', function (): void {
    $user = User::factory()->create();

    expect($this->policy->viewAny($user))->toBeTrue();
});

it('allows team members to view team', function (): void {
    $user = User::factory()->create();

    expect($this->policy->view($user, $user->currentTeam))->toBeTrue();
});

it('denies non-members from viewing team', function (): void {
    $user = User::factory()->create();
    $team = Team::factory()->create();

    expect($this->policy->view($user, $team))->toBeFalse();
});

it('allows anyone to create teams', function (): void {
    $user = User::factory()->create();

    expect($this->policy->create($user))->toBeTrue();
});

it('allows users with update permission to update team', function (): void {
    $user = User::factory()->create();

    expect($this->policy->update($user, $user->currentTeam))->toBeTrue();
});

it('denies users without update permission', function (): void {
    $user = User::factory()->create();
    $team = Team::factory()->create();
    $team->members()->attach($user, ['role' => TeamRole::Member->value]);

    expect($this->policy->update($user, $team))->toBeFalse();
});

it('allows users with add member permission', function (): void {
    $user = User::factory()->create();

    expect($this->policy->addMember($user, $user->currentTeam))->toBeTrue();
});

it('denies users without add member permission', function (): void {
    $user = User::factory()->create();
    $team = Team::factory()->create();
    $team->members()->attach($user, ['role' => TeamRole::Member->value]);

    expect($this->policy->addMember($user, $team))->toBeFalse();
});

it('allows users with update member permission', function (): void {
    $user = User::factory()->create();

    expect($this->policy->updateMember($user, $user->currentTeam))->toBeTrue();
});

it('denies users without update member permission', function (): void {
    $user = User::factory()->create();
    $team = Team::factory()->create();
    $team->members()->attach($user, ['role' => TeamRole::Member->value]);

    expect($this->policy->updateMember($user, $team))->toBeFalse();
});

it('allows users with remove member permission', function (): void {
    $user = User::factory()->create();

    expect($this->policy->removeMember($user, $user->currentTeam))->toBeTrue();
});

it('denies users without remove member permission', function (): void {
    $user = User::factory()->create();
    $team = Team::factory()->create();
    $team->members()->attach($user, ['role' => TeamRole::Member->value]);

    expect($this->policy->removeMember($user, $team))->toBeFalse();
});

it('allows users with invite permission', function (): void {
    $user = User::factory()->create();

    expect($this->policy->inviteMember($user, $user->currentTeam))->toBeTrue();
});

it('denies users without invite permission', function (): void {
    $user = User::factory()->create();
    $team = Team::factory()->create();
    $team->members()->attach($user, ['role' => TeamRole::Member->value]);

    expect($this->policy->inviteMember($user, $team))->toBeFalse();
});

it('allows users with cancel invitation permission', function (): void {
    $user = User::factory()->create();

    expect($this->policy->cancelInvitation($user, $user->currentTeam))->toBeTrue();
});

it('denies users without cancel invitation permission', function (): void {
    $user = User::factory()->create();
    $team = Team::factory()->create();
    $team->members()->attach($user, ['role' => TeamRole::Member->value]);

    expect($this->policy->cancelInvitation($user, $team))->toBeFalse();
});

it('allows deletion by owner of non-personal team', function (): void {
    $user = User::factory()->create();
    $team = Team::factory()->create();
    $team->members()->attach($user, ['role' => TeamRole::Owner->value]);

    expect($this->policy->delete($user, $team))->toBeTrue();
});

it('denies deletion of personal team', function (): void {
    $user = User::factory()->create();

    expect($this->policy->delete($user, $user->personalTeam()))->toBeFalse();
});

it('denies deletion by non-owner', function (): void {
    $user = User::factory()->create();
    $team = Team::factory()->create();
    $team->members()->attach($user, ['role' => TeamRole::Member->value]);

    expect($this->policy->delete($user, $team))->toBeFalse();
});
