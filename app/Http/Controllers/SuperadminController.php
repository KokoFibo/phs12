<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SuperadminController extends Controller
{
    public function index()
    {
        $users = User::paginate(10);
        return Inertia::render('Superadmin/Index', [
            'users' => $users
        ]);
    }

    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();

        // return redirect()->route('groups.index')->with('success', 'Data Group berhasil dihapus.');
        return redirect()->route('superadmins.index')->with('toast', [
            'type' => 'success',
            'message' => 'Data User berhasil dihapus.',
        ]);
    }

    public function edit($id)
    {

        $user = User::find($id);

        return inertia('Superadmin/Edit', [
            'user' => $user,
        ]);
    }

    // public function update(Request $request, Group $group)
    public function update(Request $request)
    {

        // dd($request->id, $request->role);
        $user = User::find($request->id);
        $user->role = $request->role;
        $user->save();


        // return redirect()->route('groups.index')->with('success', 'Data Group berhasil diperbarui.');
        return redirect()->route('superadmins.index')->with('toast', [
            'type' => 'success',
            'message' => 'Data Group berhasil diperbarui.',
        ]);
    }
}
