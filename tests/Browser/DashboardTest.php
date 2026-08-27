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
