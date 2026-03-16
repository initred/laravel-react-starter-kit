<?php

declare(strict_types=1);

use App\Concerns\ProfileValidationRules;
use Illuminate\Validation\Rules\Unique;

uses(ProfileValidationRules::class);

it('returns profile rules without user id', function (): void {
    $rules = $this->profileRules();

    expect($rules)->toHaveKeys(['name', 'email'])
        ->and($rules['name'])->toBe(['required', 'string', 'max:255'])
        ->and($rules['email'])->toHaveCount(5)
        ->and($rules['email'][4])->toBeInstanceOf(Unique::class);
});

it('returns profile rules with user id', function (): void {
    $rules = $this->profileRules(1);

    expect($rules)->toHaveKeys(['name', 'email'])
        ->and($rules['email'][4])->toBeInstanceOf(Unique::class);
});
