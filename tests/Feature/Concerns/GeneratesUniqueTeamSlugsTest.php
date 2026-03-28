<?php

declare(strict_types=1);

use App\Models\Team;

it('generates slug from name', function (): void {
    $team = Team::factory()->create(['name' => 'Acme Corp', 'slug' => null]);

    expect($team->slug)->toBe('acme-corp');
});

it('appends suffix when slug exists', function (): void {
    Team::factory()->create(['name' => 'Acme', 'slug' => 'acme']);
    $team = Team::factory()->create(['name' => 'Acme', 'slug' => null]);

    expect($team->slug)->toBe('acme-1');
});

it('finds next available suffix with gaps', function (): void {
    Team::factory()->create(['name' => 'Acme', 'slug' => 'acme']);
    Team::factory()->create(['name' => 'Acme 1', 'slug' => 'acme-1']);
    Team::factory()->create(['name' => 'Acme 10', 'slug' => 'acme-10']);

    $team = Team::factory()->create(['name' => 'Acme', 'slug' => null]);

    expect($team->slug)->toBe('acme-11');
});

it('excludes specified id on update', function (): void {
    $team = Team::factory()->create(['name' => 'Acme', 'slug' => 'acme']);

    $team->update(['name' => 'Acme']);

    expect($team->fresh()->slug)->toBe('acme');
});

it('considers soft-deleted slugs', function (): void {
    Team::factory()->trashed()->create(['name' => 'Acme', 'slug' => 'acme']);
    $team = Team::factory()->create(['name' => 'Acme', 'slug' => null]);

    expect($team->slug)->toBe('acme-1');
});

it('handles like-matching slug prefixes safely', function (): void {
    Team::factory()->create(['name' => 'Acme Corp', 'slug' => 'acme-corp']);

    $team = Team::factory()->create(['name' => 'Acme', 'slug' => null]);

    expect($team->slug)->toBe('acme-1');
});
