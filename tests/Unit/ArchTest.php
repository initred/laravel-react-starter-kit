<?php

declare(strict_types=1);

use Illuminate\Database\Eloquent\Model;

arch()->preset()->php();
arch()->preset()->strict()
    ->ignoring('App\Models')
    ->ignoring('Database\Factories')
    ->ignoring('Database\Seeders');
arch()->preset()->security();

arch('controllers')
    ->expect('App\Http\Controllers')
    ->not->toBeUsed();

arch('models')
    ->expect('App\Models')
    ->toBeClasses()
    ->toBeFinal()
    ->toExtend(Model::class)
    ->toUseStrictTypes();

//
