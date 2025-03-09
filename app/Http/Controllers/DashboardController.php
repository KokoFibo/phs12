<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Dataumat;
use App\Models\Kota;
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

        $user_auth = Auth::user();
        $kota = getNamaKota($user_auth->kota_id);
        $group = getNamaGroup($user_auth->group_id);
        $vihara = getNamaVihara($user_auth->vihara_id);
        return Inertia::render('Dashboard', [
            'totalUmat' => $totalUmat,
            'umatBulanIni' => $umatBulanIni,
            'auth' => [
                'user' => $user_auth,
                'kota' => $kota,
                'group' => $group,
                'vihara' => $vihara,
                // Kirim data user ke Vue
            ],
        ]);
    }
}
