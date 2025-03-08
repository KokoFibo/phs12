<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\Vihara;
use Illuminate\Http\Request;

class ViharaController extends Controller
{
    // Menampilkan semua data vihara
    public function index(Request $request)
    {
        $query = Vihara::query()->with(['group.kota']); // Load relasi group dan kota

        if ($request->has('search')) {
            $search = $request->search;

            $query->where('nama_vihara', 'like', "%$search%")
                ->orWhereHas('group', function ($q) use ($search) {
                    $q->where('nama_group', 'like', "%$search%");
                })
                ->orWhereHas('group.kota', function ($q) use ($search) {
                    $q->where('nama_kota', 'like', "%$search%");
                });
        }

        $viharas = $query->paginate(10);
        // dd($viharas->toArray());
        return inertia('Vihara/Index', [
            'viharas' => $viharas,
            'filters' => $request->only(['search']),
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

        return redirect()->route('viharas.index')->with('success', 'Data Vihara berhasil ditambahkan.');
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

        return redirect()->route('viharas.index')->with('success', 'Data Vihara berhasil diperbarui.');
    }

    // Menghapus data
    public function destroy(Vihara $vihara)
    {
        $vihara->delete();

        return redirect()->route('viharas.index')->with('success', 'Data Vihara berhasil dihapus.');
    }
}
