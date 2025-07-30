<?php

use App\Http\Controllers\CaissierController;
use App\Http\Controllers\CaissierHistoriqueController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
// use App\Http\Controllers\ClientController;
use App\Http\Controllers\Adduser;
use App\Http\Controllers\SalonController;
use App\Http\Controllers\CoiffeurController;
use App\Http\Controllers\HistoriqueController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\combocontroller;
use App\Http\Controllers\ClientController;

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
Route::post('/coiffeuradd', [CoiffeurController::class, 'store'])-> name('ajoutcoiffeur');
Route::post('/clientadd', [ClientController::class, 'store'])-> name('ajoutclient');

// les requetes DELETE pour les suppressions
Route::delete('/utilisateur/{id_user}', [Adduser::class, 'destroy'])-> name('supprimerutilisateur');
Route::delete('/salon/{id_salon}', [SalonController::class, 'destroy'])-> name('supprimersalon');
Route::delete('/coiffeur/{id_coiffeur}', [CoiffeurController::class, 'destroy'])-> name('supprimercoiffeur');
Route::delete('/client/{id_client}', [ClientController::class, 'destroy'])-> name('supprimerclient');



Route::get('/gestionnaire', [combocontroller::class, 'create'])
    ->middleware(['auth', 'verified', 'role:admin'])
    ->name('gestionnaire');

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified', 'role:admin'])
    ->name('dashboard');

Route::get('/historique', [HistoriqueController::class, 'index'])
    ->middleware(['auth', 'verified', 'role:admin'])
    ->name('historique');

Route::get('/historique/export', [HistoriqueController::class, 'export'])
    ->middleware(['auth', 'verified', 'role:admin'])
    ->name('historique.export');

Route::get('/caissier', [CaissierController::class, 'index'])
    ->middleware(['auth', 'verified', 'role:caissier'])
    ->name('caissier');

Route::get('/caissier/paiement', [CaissierController::class, 'paiement'])
    ->middleware(['auth', 'verified', 'role:caissier'])
    ->name('caissier.paiement.page');

Route::post('/caissier/paiement', [CaissierController::class, 'processPaiement'])
    ->middleware(['auth', 'verified', 'role:caissier'])
    ->name('caissier.paiement');

Route::get('/caissier/historique', [CaissierHistoriqueController::class, 'index'])
    ->middleware(['auth', 'verified', 'role:caissier'])
    ->name('caissier.historique');

Route::get('/caissier/historique/export', [CaissierHistoriqueController::class, 'export'])
    ->middleware(['auth', 'verified', 'role:caissier'])
    ->name('caissier.historique.export');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__.'/auth.php';
