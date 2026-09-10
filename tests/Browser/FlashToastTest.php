<?php

declare(strict_types=1);

use App\Models\User;

it('shows a toast after the profile is updated', function (): void {
    $user = User::factory()->create();

    $this->actingAs($user);

    $page = visit(route('profile.edit'));

    $page->fill('name', 'Updated Name')
        ->fill('email', 'updated@example.com')
        ->click('@update-profile-button')
        ->assertSeeIn('[data-slot="toast-title"]', 'Profile updated.')
        ->assertNoJavaScriptErrors();

    $user->refresh();

    expect($user->name)->toBe('Updated Name');
    expect($user->email)->toBe('updated@example.com');
});

it('shows a toast after a team is updated', function (): void {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    $this->actingAs($user);

    $page = visit(route('teams.edit', $team));

    $page->fill('@team-name-input', 'Updated Team')
        ->click('@team-save-button')
        ->assertSeeIn('[data-slot="toast-title"]', 'Team updated.')
        ->assertNoJavaScriptErrors();

    expect($team->refresh()->name)->toBe('Updated Team');
});
