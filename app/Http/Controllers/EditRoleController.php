<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EditRoleController extends Controller
{
    public function index()
    {
        $users = User::orderBy('id', 'desc')->paginate(10);
        return Inertia::render('Editrole/Index', [
            'users' => $users
        ]);
    }

    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();

        // return redirect()->route('groups.index')->with('success', 'Data Group berhasil dihapus.');
        return redirect()->route('editroles.index')->with('toast', [
            'type' => 'success',
            'message' => 'Data User berhasil dihapus.',
        ]);
    }

    public function edit($id)
    {

        $user = User::find($id);

        return inertia('Editrole/Edit', [
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
        return redirect()->route('editroles.index')->with('toast', [
            'type' => 'success',
            'message' => 'Role sudah berhasil dirubah.',
        ]);
    }
}
