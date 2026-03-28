<?php

declare(strict_types=1);

use App\Enums\TeamRole;
use App\Models\Team;
use App\Models\TeamInvitation;
use App\Models\User;

it('uses code as route key', function (): void {
    expect((new TeamInvitation)->getRouteKeyName())->toBe('code');
});

it('determines if invitation is accepted', function (): void {
    $accepted = TeamInvitation::factory()->accepted()->create();
    $pending = TeamInvitation::factory()->create();

    expect($accepted->isAccepted())->toBeTrue()
        ->and($pending->isAccepted())->toBeFalse();
});

it('determines if invitation is pending', function (): void {
    $pending = TeamInvitation::factory()->create();
    $accepted = TeamInvitation::factory()->accepted()->create();
    $expired = TeamInvitation::factory()->expired()->create();

    expect($pending->isPending())->toBeTrue()
        ->and($accepted->isPending())->toBeFalse()
        ->and($expired->isPending())->toBeFalse();
});

it('determines if invitation is expired', function (): void {
    $expired = TeamInvitation::factory()->expired()->create();
    $valid = TeamInvitation::factory()->expiresIn(3, 'days')->create();
    $noExpiry = TeamInvitation::factory()->create(['expires_at' => null]);

    expect($expired->isExpired())->toBeTrue()
        ->and($valid->isExpired())->toBeFalse()
        ->and($noExpiry->isExpired())->toBeFalse();
});

it('has team relationship', function (): void {
    $invitation = TeamInvitation::factory()->create();

    expect($invitation->team)->toBeInstanceOf(Team::class);
});

it('has inviter relationship', function (): void {
    $invitation = TeamInvitation::factory()->create();

    expect($invitation->inviter)->toBeInstanceOf(User::class);
});

it('casts role to TeamRole enum', function (): void {
    $invitation = TeamInvitation::factory()->create(['role' => 'admin']);

    expect($invitation->role)->toBe(TeamRole::Admin);
});
