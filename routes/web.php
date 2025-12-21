<?php

use Inertia\Inertia;
use App\Models\Dataumat;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KotaController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\ViharaController;
use App\Http\Controllers\PanditaController;
use App\Http\Controllers\DataumatController;
use App\Http\Controllers\EditRoleController;
use App\Http\Controllers\NewcomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');




// Route::get('dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');


Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

// Route::middleware(['guest'])->group(function () {});




Route::middleware(['auth'])->group(function () {


    Route::get('/newcomer', [NewcomerController::class, 'index'])->name('newcomer');

    Route::middleware(['Admin'])->group(function () {

        // Route::get('/newcomer', function () {
        //     Inertia::render('Newcomer');
        // })->name('newcomer');

        // route untuk Admin
        Route::get('dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');
        Route::resource('dataumats', DataumatController::class)->names('dataumats');
        Route::get('dataumats/detail/{id}', [DataumatController::class, 'detail'])->name('dataumats.detail');
        Route::get('/groups-by-kota/{kota_id}', [DataumatController::class, 'getGroupsByKota'])->name('groups.by.kota');
        // Route::post('/groups-by-kota', [DataumatController::class, 'getGroupsByKota'])->name('groups.by.kota');
        Route::get('/viharas-by-group/{group}', [DataumatController::class, 'getViharasByGroup'])->name('viharas.by.group');
        Route::get('/groups-by-kota-edit/{kota_id}', [DataumatController::class, 'getGroupsByKotaEdit'])->name('groups.by.kota.edit');
        Route::get('/viharas-by-group-edit/{group}', [DataumatController::class, 'getViharasByGroupEdit'])->name('viharas.by.group.edit');
        Route::get('/cek', [DataumatController::class, 'cek']);
        Route::get('/dataumat/export-excel', [DataumatController::class, 'exportExcel'])
            ->name('dataumat.export.excel');

        // routes/web.php
        Route::get('/dataumat/pdf-view', [DataumatController::class, 'pdfView'])->name('dataumats.pdf-view');
        Route::get('/dataumat/export-pdf', [DataumatController::class, 'exportPdf'])->name('dataumats.export-pdf');

        Route::get('/send-email', [EmailController::class, 'sendEmail']);

        Route::middleware(['SuperAdmin'])->group(function () {

            // route untuk SuperAdmin
            Route::resource('panditas', PanditaController::class)->names('panditas');
            Route::resource('kotas', KotaController::class)->names('kotas');
            Route::resource('groups', GroupController::class)->names('groups');
            Route::resource('viharas', ViharaController::class)->names('viharas');
            Route::resource('editroles', EditRoleController::class)->names('editroles');
            Route::middleware(['Developer'])->group(function () {

                // route untuk developer
                // route::get('/tambah', [TambahanController::class, 'tambah']);
                // route::get('/siapa', [TambahanController::class, 'siapa']);
                // route::get('/tanpagroup', [TambahanController::class, 'tanpagroup']);
                Route::get('/test', [TestController::class, 'index']);
            });
        });
    });
});



require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
