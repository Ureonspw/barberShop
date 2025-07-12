<?php

use App\Http\Controllers\CaissierController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
// use App\Http\Controllers\ClientController;
use App\Http\Controllers\Adduser;
use App\Http\Controllers\SalonController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// les requetes POST pour les controlleurs 
Route::post('/clientsadd', [Adduser::class, 'store'])-> name('ajoututilisateur');
Route::post('/salonadd', [SalonController::class, 'store'])-> name('ajoutsalon');

Route::get('/gestionnaire', function () {
    return Inertia::render('gestionnaireadmin/gestAdmin');
})->middleware(['auth', 'verified', 'role:admin'])
    ->name('gestionnaire');

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified', 'role:admin'])
    ->name('dashboard');

Route::get('/caissier', [CaissierController::class, 'index'])
    ->middleware(['auth', 'verified', 'role:caissier'])
    ->name('caissier');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__.'/auth.php';
