<?php

namespace App\Http\Controllers;

// use App\Models\Group;
// use App\Models\Kota;
use App\Models\Pandita;
use App\Models\User;
use App\Models\Vihara;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PreferenceController extends Controller
{

    public function update(Request $request)
    {
        $data = User::findOrFail(auth()->user()->id);
        $data->vihara_id = $request->vihara_id;
        $data->pandita_id = $request->pandita_id;
        $data->save();
        return redirect()->route('dashboard')->with('success', 'Data Umat berhasil diperbarui.');
    }

    public function index()
    {
        // Ambil user yang sedang login
        $user = auth()->user();

        // Ambil semua data kota, groups, viharas, dan panditas
        $viharas = Vihara::all();
        $panditas = Pandita::all();

        // Kirim data ke frontend dengan Inertia
        return Inertia::render('settings/Preference', [
            'user' => $user,
            'viharas' => $viharas,
            'panditas' => $panditas
        ]);
    }
}
