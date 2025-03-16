<?php

namespace App\Http\Controllers;

use App\Models\Pandita;
use Illuminate\Http\Request;

class PanditaController extends Controller
{
    // Menampilkan semua data pandita
    public function index(Request $request)
    {
        $query = Pandita::query();

        // Search functionality
        if ($request->has('search')) {
            $query->where('nama_pandita', 'like', '%' . $request->search . '%');
        }

        // Pagination
        $panditas = $query->orderBy('id', 'desc')->paginate(10);

        return inertia('Pandita/Index', [
            'panditas' => $panditas,
            'filters' => $request->only(['search']),
        ]);
    }

    // Menampilkan halaman tambah data
    public function create()
    {
        return inertia('Pandita/Create');
    }

    // Menyimpan data baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_pandita' => 'required|string|max:255',
        ]);

        Pandita::create($validated);

        // return redirect()->route('panditas.index')->with('success', 'Data Pandita berhasil ditambahkan.');
        return redirect()->route('panditas.index')->with('toast', [
            'type' => 'success',
            'message' => 'Data Pandita berhasil ditambahkan.',
        ]);
    }

    // Menampilkan halaman edit data
    public function edit(Pandita $pandita)
    {
        return inertia('Pandita/Edit', [
            'pandita' => $pandita,
        ]);
    }

    // Memperbarui data
    public function update(Request $request, Pandita $pandita)
    {
        $validated = $request->validate([
            'nama_pandita' => 'required|string|max:255',
        ]);

        $pandita->update($validated);

        // return redirect()->route('panditas.index')->with('success', 'Data Pandita berhasil diperbarui.');
        return redirect()->route('panditas.index')->with('toast', [
            'type' => 'success',
            'message' => 'Data Pandita berhasil diperbarui.',
        ]);
    }

    // Menghapus data
    public function destroy(Pandita $pandita)
    {
        $pandita->delete();

        return redirect()->route('panditas.index')->with('toast', [
            'type' => 'success',
            'message' => 'Data Pandita berhasil dihapus.',
        ]);
    }
}
