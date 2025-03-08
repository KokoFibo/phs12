<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\Kota;
use App\Models\Pandita;
use App\Models\User;
use App\Models\Vihara;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PreferenceController extends Controller
{
    // public function index()
    // {
    //     $user = User::find(auth()->user()->id);
    //     $kotas = Kota::all();
    //     $groups = Group::all();
    //     $viharas = Vihara::all();
    //     $panditas = Pandita::all();
    //     return Inertia::render('settings/Preference', [
    //         'user' => $user,
    //         'kotas' => $kotas,
    //         'groups' => $groups,
    //         'viharas' => $viharas,
    //         'panditas' => $panditas
    //     ]);
    // }

    // public function update(Request $request, $id)
    public function update(Request $request)
    {

        // $request->validate($this->rules());
        $data = User::findOrFail(auth()->user()->id);
        $data->kota_id = $request->kota_id;
        $data->group_id = $request->group_id;
        $data->vihara_id = $request->vihara_id;
        $data->pandita_id = $request->pandita_id;
        $data->save();
        return redirect()->route('dataumats.index')->with('success', 'Data Umat berhasil diperbarui.');
    }

    public function index()
    {
        // Ambil user yang sedang login
        $user = auth()->user();

        // Ambil semua data kota, groups, viharas, dan panditas
        $kotas = Kota::all();
        $groups = Group::all();
        $viharas = Vihara::all();
        $panditas = Pandita::all();

        // Kirim data ke frontend dengan Inertia
        return Inertia::render('settings/Preference', [
            'user' => $user,
            'kotas' => $kotas,
            'groups' => $groups,
            'viharas' => $viharas,
            'panditas' => $panditas
        ]);
    }

    // Method untuk mendapatkan groups berdasarkan kota_id
    public function getGroups($kotaId)
    {
        // Ambil groups yang terkait dengan kota_id
        $groups = Group::where('kota_id', $kotaId)->get();

        // Kembalikan data dalam format JSON
        return response()->json(['groups' => $groups]);
    }

    // Method untuk mendapatkan viharas berdasarkan kota_id
    public function getViharas($kotaId)
    {
        // Ambil viharas yang terkait dengan kota_id
        $viharas = Vihara::where('kota_id', $kotaId)->get();

        // Kembalikan data dalam format JSON
        return response()->json(['viharas' => $viharas]);
    }

    // Method untuk mendapatkan panditas berdasarkan kota_id
    public function getPanditas($kotaId)
    {
        // Ambil panditas yang terkait dengan kota_id
        $panditas = Pandita::where('kota_id', $kotaId)->get();

        // Kembalikan data dalam format JSON
        return response()->json(['panditas' => $panditas]);
    }
}
