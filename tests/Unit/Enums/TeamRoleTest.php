<?php

declare(strict_types=1);

use App\Enums\TeamRole;

it('returns only admin and member for assignable roles', function (): void {
    $assignable = TeamRole::assignable();

    expect($assignable)->toBe([
        ['value' => 'admin', 'label' => 'Admin'],
        ['value' => 'member', 'label' => 'Member'],
    ]);
});

it('returns correct labels for each role', function (): void {
    expect(TeamRole::Owner->label())->toBe('Owner')
        ->and(TeamRole::Admin->label())->toBe('Admin')
        ->and(TeamRole::Member->label())->toBe('Member');
});

it('returns correct permissions for each role', function (): void {
    expect(TeamRole::Owner->permissions())->toBe([
        'team:update',
        'team:delete',
        'member:add',
        'member:update',
        'member:remove',
        'invitation:create',
        'invitation:cancel',
    ])
        ->and(TeamRole::Admin->permissions())->toBe([
            'team:update',
            'invitation:create',
            'invitation:cancel',
        ])
        ->and(TeamRole::Member->permissions())->toBe([]);
});

it('checks permission correctly', function (): void {
    expect(TeamRole::Owner->hasPermission('team:delete'))->toBeTrue()
        ->and(TeamRole::Admin->hasPermission('team:update'))->toBeTrue()
        ->and(TeamRole::Admin->hasPermission('team:delete'))->toBeFalse()
        ->and(TeamRole::Member->hasPermission('team:update'))->toBeFalse();
});

it('returns correct hierarchy levels', function (): void {
    expect(TeamRole::Owner->level())->toBe(3)
        ->and(TeamRole::Admin->level())->toBe(2)
        ->and(TeamRole::Member->level())->toBe(1);
});

it('compares roles with isAtLeast', function (): void {
    expect(TeamRole::Owner->isAtLeast(TeamRole::Admin))->toBeTrue()
        ->and(TeamRole::Owner->isAtLeast(TeamRole::Owner))->toBeTrue()
        ->and(TeamRole::Admin->isAtLeast(TeamRole::Admin))->toBeTrue()
        ->and(TeamRole::Admin->isAtLeast(TeamRole::Member))->toBeTrue()
        ->and(TeamRole::Member->isAtLeast(TeamRole::Admin))->toBeFalse()
        ->and(TeamRole::Member->isAtLeast(TeamRole::Owner))->toBeFalse();
});
