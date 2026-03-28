<?php

declare(strict_types=1);

namespace Tests\Feature\Settings;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

final class AppearanceTest extends TestCase
{
    use RefreshDatabase;

    public function test_appearance_page_is_displayed(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get(route('appearance.edit'));

        $response->assertOk();
    }

    public function test_guests_are_redirected_to_login(): void
    {
        $response = $this->get(route('appearance.edit'));

        $response->assertRedirect(route('login'));
    }
}
