<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Kota;
use Inertia\Inertia;
use App\Models\Dataumat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        $umatTahunIni = Dataumat::whereYear('tgl_mohonTao', $thisYear)
            ->count();

        $umatTahunLalu = Dataumat::whereYear(
            'tgl_mohonTao',
            Carbon::now()->subYear()->year
        )->count();

        $user_auth = Auth::user();

        $vihara_id_default = $user_auth->vihara_id;
        $pandita_id_default = $user_auth->pandita_id;
        return Inertia::render('Dashboard', [
            'totalUmat' => $totalUmat,
            'umatBulanIni' => $umatBulanIni,
            'umatTahunIni' => $umatTahunIni,
            'umatTahunLalu' => $umatTahunLalu,
            'auth' => [
                'user' => $user_auth,
                'vihara_id_default' => $vihara_id_default,
                'pandita_id_default' => $pandita_id_default,

                // Kirim data user ke Vue
            ],
        ]);
    }
}
