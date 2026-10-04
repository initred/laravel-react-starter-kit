<?php

declare(strict_types=1);

use App\Models\User;

it('opens the user menu without javascript errors', function (): void {
    $user = User::factory()->create();

    $this->actingAs($user);

    $page = visit(route('dashboard', $user->currentTeam));

    $page->click('@sidebar-menu-button')
        ->assertSee('Settings')
        ->assertNoJavaScriptErrors();
});

it('closes the mobile sidebar after navigating to another page', function (): void {
    $user = User::factory()->create();

    $this->actingAs($user);

    $page = visit(route('profile.edit'))->on()->mobile();

    $page->click('[data-sidebar="trigger"]')
        ->assertVisible('[data-mobile="true"]')
        ->click('Dashboard')
        ->assertPathIs("/{$user->currentTeam->slug}/dashboard")
        ->assertMissing('[data-mobile="true"]')
        ->assertNoJavaScriptErrors();
});
