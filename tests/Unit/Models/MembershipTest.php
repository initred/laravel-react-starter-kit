<?php

declare(strict_types=1);

use App\Enums\TeamRole;
use App\Models\Membership;
use App\Models\Team;
use App\Models\User;

it('has team relationship', function (): void {
    $user = User::factory()->create();
    $membership = $user->teamMemberships()->first();

    expect($membership->team)->toBeInstanceOf(Team::class);
});

it('has user relationship', function (): void {
    $user = User::factory()->create();
    $membership = $user->teamMemberships()->first();

    expect($membership->user)->toBeInstanceOf(User::class);
});

it('casts role to TeamRole enum', function (): void {
    $user = User::factory()->create();
    $membership = $user->teamMemberships()->first();

    expect($membership->role)->toBeInstanceOf(TeamRole::class);
});

it('uses team_members table', function (): void {
    expect((new Membership)->getTable())->toBe('team_members');
});
