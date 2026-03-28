<?php

declare(strict_types=1);

use App\Rules\TeamName;

it('fails for reserved keyword names', function (string $name): void {
    $rule = new TeamName;
    $failed = false;

    $rule->validate('name', $name, function () use (&$failed): void {
        $failed = true;
    });

    expect($failed)->toBeTrue();
})->with(['admin', 'api', 'dashboard', 'settings', 'login']);

it('fails for HTTP status code names', function (string $name): void {
    $rule = new TeamName;
    $failed = false;

    $rule->validate('name', $name, function () use (&$failed): void {
        $failed = true;
    });

    expect($failed)->toBeTrue();
})->with(['404', '500', '403']);

it('passes for valid team names', function (string $name): void {
    $rule = new TeamName;
    $failed = false;

    $rule->validate('name', $name, function () use (&$failed): void {
        $failed = true;
    });

    expect($failed)->toBeFalse();
})->with(['My Awesome Team', 'Acme Corp', 'Laravel Lovers']);

it('is case insensitive', function (): void {
    $rule = new TeamName;
    $failed = false;

    $rule->validate('name', 'ADMIN', function () use (&$failed): void {
        $failed = true;
    });

    expect($failed)->toBeTrue();
});
