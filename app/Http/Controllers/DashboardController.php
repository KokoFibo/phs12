<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Dataumat;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $thisYear = now()->year;
        $thisMonth = now()->month;

        $totalUmat = Dataumat::count();
        $umatBulanIni = Dataumat::whereYear('tgl_mohonTao', $thisYear)
            ->whereMonth('tgl_mohonTao', $thisMonth)
            ->count();

        return Inertia::render('Dashboard', [
            'totalUmat' => $totalUmat,
            'umatBulanIni' => $umatBulanIni,
        ]);
    }
}
