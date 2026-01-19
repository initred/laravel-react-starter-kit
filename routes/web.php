<?php

declare(strict_types=1);

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DocsController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, '__invoke'])->name('home');

Route::prefix('docs')->name('docs.')->group(function (): void {
    Route::get('terms', [DocsController::class, 'terms'])->name('terms');
    Route::get('privacy', [DocsController::class, 'privacy'])->name('privacy');
});

Route::middleware(['auth', 'verified'])->group(callback: function (): void {
    Route::get('dashboard', [DashboardController::class, '__invoke'])->name('dashboard');
});

require __DIR__.'/settings.php';
