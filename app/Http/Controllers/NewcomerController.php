<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class NewcomerController extends Controller
{
    public function index()
    {
        $name = auth()->user()->name;
        return Inertia::render('Newcomer', [
            'name' => $name,
        ]);
    }
}
