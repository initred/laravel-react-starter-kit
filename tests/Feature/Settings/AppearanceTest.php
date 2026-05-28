<?php

declare(strict_types=1);

use App\Models\User;

test('appearance page is displayed', function (): void {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get(route('appearance.edit'));

    $response->assertOk();
});

test('guests are redirected to login', function (): void {
    $response = $this->get(route('appearance.edit'));

    $response->assertRedirect(route('login'));
});
