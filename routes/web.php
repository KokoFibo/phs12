<?php

use App\Http\Controllers\DashboardController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KotaController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\ViharaController;
use App\Http\Controllers\PanditaController;
use App\Http\Controllers\DataumatController;
use App\Http\Controllers\TambahanController;
use App\Models\Dataumat;

Route::get('/groups-by-kota/{kota_id}', [DataumatController::class, 'getGroupsByKota'])->name('groups.by.kota');
Route::get('/viharas-by-group/{group_id}', [DataumatController::class, 'getViharasByGroup'])->name('viharas.by.group');

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

// Route::get('dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');
Route::get('dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::resource('dataumats', DataumatController::class)->names('dataumats');
Route::resource('panditas', PanditaController::class)->names('panditas');
Route::resource('kotas', KotaController::class)->names('kotas');
Route::resource('groups', GroupController::class)->names('groups');
Route::resource('viharas', ViharaController::class)->names('viharas');

route::get('/tambah', [TambahanController::class, 'tambah']);
route::get('/siapa', [TambahanController::class, 'siapa']);
route::get('/tanpagroup', [TambahanController::class, 'tanpagroup']);
route::get('/umat', [TambahanController::class, 'index'])->name('umat.index');
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
