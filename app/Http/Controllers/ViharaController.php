<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\Kota;
use App\Models\Vihara;
use Illuminate\Http\Request;

class ViharaController extends Controller
{
    // Menampilkan semua data vihara
    public function index(Request $request)
    {
        // Menentukan jumlah item per halaman (default 10)
        $perPage = $request->perPage ?: 10;

        // Query utama dengan relasi group dan kota
        $query = Vihara::query()->with(['group.kota']);

        // Filter berdasarkan pencarian jika search tidak kosong
        if ($request->filled('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('nama_vihara', 'like', "%$search%")
                    ->orWhereHas('group', function ($q) use ($search) {
                        $q->where('nama_group', 'like', "%$search%");
                    })
                    ->orWhereHas('group.kota', function ($q) use ($search) {
                        $q->where('nama_kota', 'like', "%$search%");
                    });
            });
        }

        // Filter berdasarkan group_id jika ada
        if ($request->filled('groupFilter')) {
            $query->where('group_id', intval($request->groupFilter));
        }

        // 🔥 **Filter berdasarkan kota_id**
        if ($request->filled('kotaFilter')) {
            $query->whereHas('group.kota', function ($q) use ($request) {
                $q->where('id', intval($request->kotaFilter));
            });
        }

        // Debugging: Lihat query sebelum dieksekusi
        // dd($query->toSql(), $query->getBindings());

        // Paginasi hasil query
        $viharas = $query->orderBy('id', 'desc')->paginate($perPage);

        // Ambil daftar grup unik
        $groups = Group::select('id', 'nama_group')->distinct()->get();

        // Ambil daftar kota unik
        $kotas = Kota::select('id', 'nama_kota')->distinct()->get();

        // Kirim data ke frontend melalui Inertia
        return inertia('Vihara/Index', [
            'viharas' => $viharas,
            'groups' => $groups,
            'kotas' => $kotas,
        ]);
    }


    public function edit(Vihara $vihara)
    {
        $groups = Group::all(); // Ambil semua group untuk dropdown
        $vihara->load('group'); // Load relasi group

        return inertia('Vihara/Edit', [
            'vihara' => $vihara,
            'groups' => $groups,
        ]);
    }

    // Menampilkan halaman tambah data
    public function create()
    {
        $groups = Group::all(); // Ambil semua group untuk dropdown
        return inertia('Vihara/Create', [
            'groups' => $groups,
        ]);
    }

    // Menyimpan data baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_vihara' => 'required|string|max:255|unique:viharas,nama_vihara',
            'group_id' => 'required|exists:groups,id',
        ]);

        Vihara::create($validated);

        // return redirect()->route('viharas.index')->with('success', 'Data Vihara berhasil ditambahkan.');
        return redirect()->route('viharas.index')->with('toast', [
            'type' => 'success',
            'message' => 'Data Vihara berhasil ditambahkan.',
        ]);
    }

    // Menampilkan halaman edit data


    // Memperbarui data
    public function update(Request $request, Vihara $vihara)
    {
        $validated = $request->validate([
            'nama_vihara' => 'required|string|max:255|unique:viharas,nama_vihara,' . $vihara->id,
            'group_id' => 'required|exists:groups,id',
        ]);

        $vihara->update($validated);

        // return redirect()->route('viharas.index')->with('success', 'Data Vihara berhasil diperbarui.');
        return redirect()->route('viharas.index')->with('toast', [
            'type' => 'success',
            'message' => 'Data Vihara berhasil diperbarui.',
        ]);
    }

    // Menghapus data
    public function destroy(Vihara $vihara)
    {
        $vihara->delete();

        // return redirect()->route('viharas.index')->with('success', 'Data Vihara berhasil dihapus.');
        return redirect()->route('viharas.index')->with('toast', [
            'type' => 'success',
            'message' => 'Data Vihara berhasil dihapus.',
        ]);
    }
}
