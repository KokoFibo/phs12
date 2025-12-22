<?php

namespace App\Http\Controllers;

use App\Models\Dataumat;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function index()
    {

        dd('aman');
        // Dataumat::where('gender', '1')
        //     ->update(['gender' => 'Laki-laki']);

        // Dataumat::where('gender', '2')
        //     ->update(['gender' => 'Perempuan']);
        // dd('done');
    }
}
