<?php

namespace App\Http\Controllers;

use App\Models\Kota;
use App\Models\Group;
use Illuminate\Http\Request;

class GroupController extends Controller
{


    // Menampilkan semua data group
    // Menampilkan halaman index group
    public function index(Request $request)
    {
        if ($request->perPage == '') $perPage = 10;
        else $perPage = $request->perPage;

        $query = Group::query()->with('kota'); // Load relasi kota

        // Search berdasarkan nama_group atau nama_kota
        if ($request->has('search')) {
            $search = $request->search;

            $query->where('nama_group', 'like', "%$search%")
                ->orWhereHas('kota', function ($q) use ($search) {
                    $q->where('nama_kota', 'like', "%$search%");
                });
        }

        // Pagination
        $groups = $query->paginate($perPage);

        return inertia('Group/Index', [
            'groups' => $groups,
            // 'filters' => $request->only(['search']),
        ]);
    }


    public function create()
    {
        $kotas = Kota::all(); // Ambil semua kota untuk dropdown
        return inertia('Group/Create', [
            'kotas' => $kotas,
        ]);
    }

    // Menyimpan data group baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_group' => 'required|string|max:255|unique:groups,nama_group',
            'kota_id' => 'required|exists:kotas,id',
        ]);

        Group::create($validated);

        // return redirect()->route('groups.index')->with('success', 'Data Group berhasil ditambahkan.');
        return redirect()->route('groups.index')->with('toast', [
            'type' => 'success',
            'message' => 'Data Group berhasil ditambahkan.',
        ]);
    }


    // Menampilkan halaman edit group
    public function edit(Group $group)
    {
        $kotas = Kota::all(); // Ambil semua kota untuk dropdown
        $group->load('kota'); // Load relasi kota

        return inertia('Group/Edit', [
            'group' => $group,
            'kotas' => $kotas,
        ]);
    }

    // Memperbarui data group
    public function update(Request $request, Group $group)
    {
        $validated = $request->validate([
            'nama_group' => 'required|string|max:255|unique:groups,nama_group,' . $group->id,
            'kota_id' => 'required|exists:kotas,id',
        ]);

        $group->update($validated);

        // return redirect()->route('groups.index')->with('success', 'Data Group berhasil diperbarui.');
        return redirect()->route('groups.index')->with('toast', [
            'type' => 'success',
            'message' => 'Data Group berhasil diperbarui.',
        ]);
    }


    // Menghapus data
    public function destroy(Group $group)
    {
        $group->delete();

        // return redirect()->route('groups.index')->with('success', 'Data Group berhasil dihapus.');
        return redirect()->route('groups.index')->with('toast', [
            'type' => 'success',
            'message' => 'Data Group berhasil dihapus.',
        ]);
    }
}
