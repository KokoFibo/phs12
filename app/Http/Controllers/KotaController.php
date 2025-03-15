<?php

namespace App\Http\Controllers;

use App\Models\Kota;
use Illuminate\Http\Request;

class KotaController extends Controller
{
    // Menampilkan semua data kota
    public function index(Request $request)
    {
        $query = Kota::query();

        // Search functionality
        if ($request->has('search')) {
            $query->where('nama_kota', 'like', '%' . $request->search . '%');
        }

        // Pagination
        $kotas = $query->paginate(10);

        return inertia('Kota/Index', [
            'kotas' => $kotas,
            'filters' => $request->only(['search']),
        ]);
    }

    // Menampilkan halaman tambah data
    public function create()
    {
        return inertia('Kota/Create');
    }

    // Menyimpan data baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_kota' => 'required|string|max:255|unique:kotas,nama_kota',
        ]);

        Kota::create($validated);

        // return redirect()->route('kotas.index')->with('success', 'Data Kota berhasil ditambahkan.');
        return redirect()->route('kotas.index')->with('toast', [
            'type' => 'success',
            'message' => 'Data Kota berhasil ditambahkan.',
        ]);
    }

    // Menampilkan halaman edit data
    public function edit(Kota $kota)
    {
        return inertia('Kota/Edit', [
            'kota' => $kota,
        ]);
    }

    // Memperbarui data
    public function update(Request $request, Kota $kota)
    {
        $validated = $request->validate([
            'nama_kota' => 'required|string|max:255|unique:kotas,nama_kota,' . $kota->id,
        ]);

        $kota->update($validated);

        // return redirect()->route('kotas.index')->with('success', 'Data Kota berhasil diperbarui.');
        return redirect()->route('kotas.index')->with('toast', [
            'type' => 'success',
            'message' => 'Data Kota berhasil diperbarui.',
        ]);
    }

    // Menghapus data
    public function destroy(Kota $kota)
    {
        $kota->delete();

        // return redirect()->route('kotas.index')->with('success', 'Data Kota berhasil dihapus.');
        return redirect()->route('kotas.index')->with('toast', [
            'type' => 'success',
            'message' => 'Data Kota berhasil dihapus.',
        ]);
    }
}
