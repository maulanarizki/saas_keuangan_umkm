<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // SaaS Launchpad
    Route::get('launchpad', [\App\Http\Controllers\Saas\LaunchpadController::class, 'index'])->name('business.select');
    Route::post('launchpad/{id}', [\App\Http\Controllers\Saas\LaunchpadController::class, 'selectBusiness'])->name('business.set');

    // SaaS Core (Mewajibkan user memilih bisnis terlebih dahulu)
    Route::middleware(['active.business'])->group(function () {
        Route::get('dashboard', function () {
            $businessId = session('active_business_id');
            $income = \App\Models\Transaction::where('business_id', $businessId)->where('type', 'income')->sum('amount');
            $expense = \App\Models\Transaction::where('business_id', $businessId)->where('type', 'expense')->sum('amount');
            
            return inertia('dashboard', [
                'stats' => [
                    'income' => $income,
                    'expense' => $expense,
                    'balance' => $income - $expense
                ]
            ]);
        })->name('dashboard');
        
        Route::resource('transactions', \App\Http\Controllers\Saas\TransactionController::class);
    });

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('users', \App\Http\Controllers\Admin\UserController::class);
        Route::resource('roles', \App\Http\Controllers\Admin\RoleController::class);
        Route::resource('permissions', \App\Http\Controllers\Admin\PermissionController::class);
    });
});

require __DIR__.'/settings.php';
