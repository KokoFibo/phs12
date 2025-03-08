<?php

namespace App\Http\Controllers;

use App\Models\Dataumat;
use App\Models\Vihara;
use Illuminate\Http\Request;

class TambahanController extends Controller
{

    public function getGroupId($id)
    {
        return Vihara::where('id', $id)->value('group_id') ?? '';
    }

    public function tambah()
    {
        $datas = Dataumat::all();
        foreach ($datas as $d) {
            $data = Dataumat::find($d->id);
            $grup_id = $this->getGroupId($d->vihara_id);
            if ($grup_id) {
                $data->group_id = $grup_id;
                $data->save();
            }
        }
        dd('done');
    }

    public function siapa()
    {
        $datas = Dataumat::where('vihara_id', 36)->get(); // Ambil data dengan `vihara_id` = 36

        dd($datas); // Tampilkan hasilnya
    }
    public function tanpagroup()
    {
        $data = Dataumat::whereNull('group_id')->orWhere('group_id', '')->get();
        dd($data->toArray());
    }
    // public function index()
    // {
    //     $data = Dataumat::whereNull('group_id')->orWhere('group_id', '')->paginate(10);

    //     return view('umat', compact('data')); // Lebih ringkas dengan `compact()`
    // }

    public function index(Request $request)
    {
        $selectedVihara = $request->input('vihara_id');

        // Ambil vihara_id yang valid dari Dataumat
        $viharaIds = Dataumat::whereNotNull('vihara_id')
            ->where(function ($q) {
                $q->whereNull('group_id')->orWhere('group_id', '');
            })
            ->distinct()
            ->pluck('vihara_id')
            ->map(function ($id) {
                // Konversi ke integer dan filter non-numeric
                return is_numeric($id) ? (int) $id : null;
            })
            ->filter() // Hapus nilai null
            ->toArray();


        // Ambil data Vihara yang ada di $viharaIds
        $viharas = Vihara::whereIn('id', $viharaIds)->get();

        // Debugging: Cek hasil
        // dd($viharaIds, $viharas);

        // Query Dataumat dengan filter
        if ($request->vihara_id) {
            // $data = Dataumat::where('vihara_id', $request->vihara_id)->paginate(10);
            $data = Dataumat::where('vihara_id', $request->vihara_id)->limit(100)->get();
        } else {
            $query = Dataumat::where(function ($q) {
                $q->whereNull('group_id')->orWhere('group_id', '');
            });


            $data = $query->limit(100)->get();
        }




        // dd($viharaIds, $viharas); // Lihat apakah ada data
        return view('umat', [
            'viharas' => $viharas,
            'viharaIds' => $viharaIds,
            'data' => $data,
            'selectedVihara' => $selectedVihara,
        ]);
    }
}
