<?php

declare(strict_types=1);

use App\Models\TeamInvitation;
use App\Models\User;
use App\Rules\ValidTeamInvitation;

it('fails when value is not a TeamInvitation instance', function (): void {
    $user = User::factory()->create();
    $rule = new ValidTeamInvitation($user);
    $failed = false;

    $rule->validate('invitation', 'not-an-invitation', function () use (&$failed): void {
        $failed = true;
    });

    expect($failed)->toBeTrue();
});

it('fails when user is null', function (): void {
    $rule = new ValidTeamInvitation(null);
    $invitation = TeamInvitation::factory()->create();
    $failed = false;

    $rule->validate('invitation', $invitation, function () use (&$failed): void {
        $failed = true;
    });

    expect($failed)->toBeTrue();
});

it('fails when invitation is already accepted', function (): void {
    $user = User::factory()->create();
    $invitation = TeamInvitation::factory()->accepted()->create(['email' => $user->email]);
    $rule = new ValidTeamInvitation($user);
    $message = '';

    $rule->validate('invitation', $invitation, function ($attr, $msg = null) use (&$message): void {
        $message = $msg ?? $attr;
    });

    expect($message)->toContain('already been accepted');
});

it('fails when invitation is expired', function (): void {
    $user = User::factory()->create();
    $invitation = TeamInvitation::factory()->expired()->create(['email' => $user->email]);
    $rule = new ValidTeamInvitation($user);
    $message = '';

    $rule->validate('invitation', $invitation, function ($attr, $msg = null) use (&$message): void {
        $message = $msg ?? $attr;
    });

    expect($message)->toContain('expired');
});

it('fails when email does not match user email', function (): void {
    $user = User::factory()->create();
    $invitation = TeamInvitation::factory()->create(['email' => 'other@example.com']);
    $rule = new ValidTeamInvitation($user);
    $message = '';

    $rule->validate('invitation', $invitation, function ($attr, $msg = null) use (&$message): void {
        $message = $msg ?? $attr;
    });

    expect($message)->toContain('different email');
});

it('passes for valid pending invitation matching user email', function (): void {
    $user = User::factory()->create();
    $invitation = TeamInvitation::factory()->create(['email' => $user->email]);
    $rule = new ValidTeamInvitation($user);
    $failed = false;

    $rule->validate('invitation', $invitation, function () use (&$failed): void {
        $failed = true;
    });

    expect($failed)->toBeFalse();
});
