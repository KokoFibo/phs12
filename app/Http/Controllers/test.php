<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Kota;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Group;
use App\Models\Vihara;
use App\Models\Pandita;
use App\Models\Dataumat;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\DataumatExport;
use Spatie\Browsershot\Browsershot;
use Illuminate\Support\Facades\URL;



class DataumatController extends Controller
{

    public function index(Request $request)
    {
        // Ambil parameter request
        $search      = $request->input('search');
        $sortBy      = $request->input('sort_by', 'id');
        $sortOrder   = $request->input('sort_order', 'desc');
        $perPage     = $request->input('per_page', 10);

        $usiaStart   = $request->input('filter_usia_start') !== null && $request->input('filter_usia_start') !== ''
            ? (int)$request->filter_usia_start
            : 0;

        $usiaEnd     = $request->input('filter_usia_end') !== null && $request->input('filter_usia_end') !== ''
            ? (int)$request->filter_usia_end
            : 120;

        // Query dasar
        $query = Dataumat::query();

        // ===========================
        // 🔍 FILTER PENCARIAN
        // ===========================
        $query->when($search, function ($q) use ($search) {
            $q->where(function ($q) use ($search) {
                $q->where('nama_umat', 'like', "%{$search}%")
                    ->orWhere('nama_alias', 'like', "%{$search}%")
                    ->orWhere('mandarin', 'like', "%{$search}%");
            });
        });


        // ===========================
        // 🔥 FILTER USIA
        // ===========================
        $query->whereRaw("
        TIMESTAMPDIFF(YEAR, tgl_lahir, CURDATE()) BETWEEN ? AND ?
    ", [$usiaStart, $usiaEnd]);


        // ===========================
        // 🥬 FILTER VEGETARIAN (tgl_vtotal)
        // 0 = semua
        // 1 = vegetarian (ada tanggal)
        // 2 = belum vegetarian (null)
        // ===========================
        if ($request->filter_vegetarian == 1) {
            $query->whereNotNull('tgl_vtotal');
        } elseif ($request->filter_vegetarian == 2) {
            $query->whereNull('tgl_vtotal');
        }


        // ===========================
        // 📘 FILTER SIDANG DHARMA (tgl_sd3h)
        // 0 = semua
        // 1 = sudah sidang
        // 2 = belum sidang
        // ===========================
        if ($request->filter_sidang_dharma == 1) {
            $query->whereNotNull('tgl_sd3h');
        } elseif ($request->filter_sidang_dharma == 2) {
            $query->whereNull('tgl_sd3h');
        }


        // ===========================
        // FILTER KOTA, GROUP, VIHARA
        // ===========================
        $query->when($request->filter_kota, fn($q) => $q->where('kota_id', $request->filter_kota));
        $query->when($request->filter_group, fn($q) => $q->where('group_id', $request->filter_group));
        $query->when($request->filter_vihara, fn($q) => $q->where('vihara_id', $request->filter_vihara));
        $query->when($request->filter_pandita, fn($q) => $q->where('pandita_id', $request->filter_pandita));
        $query->when($request->filter_tahun, fn($q) => $q->whereYear('tgl_mohonTao', $request->filter_tahun));


        // ===========================
        // SORTING
        // ===========================
        $query->orderBy($sortBy, $sortOrder);

        // ===========================
        // PAGINATION
        // ===========================
        $dataumats = $query->paginate($perPage)->withQueryString();


        // ===========================
        // REFERENSI DATA
        // ===========================
        $kotas = Kota::all()->keyBy('id');
        $groups = Group::all()->keyBy('id');
        $viharas = Vihara::all()->keyBy('id');
        $panditas = Pandita::all()->keyBy('id');


        // ===========================
        // DROPDOWN KOTA
        // ===========================
        $kotas_list = Kota::whereIn(
            'id',
            Dataumat::select('kota_id')->distinct()
        )->orderBy('nama_kota')->get();


        // ===========================
        // DROPDOWN GROUP
        // ===========================
        $filteredGroupIds = Dataumat::when($request->filter_kota, function ($q) use ($request) {
            $q->where('kota_id', $request->filter_kota);
        })->select('group_id')->distinct()->pluck('group_id');

        if ($filteredGroupIds->isEmpty() && $request->filter_kota) {
            $filteredGroupIds = Dataumat::select('group_id')->distinct()->pluck('group_id');
        }

        $groups_list = Group::whereIn('id', $filteredGroupIds)->orderBy('nama_group')->get();


        // ===========================
        // DROPDOWN VIHARA
        // ===========================
        if ($request->filter_group && $request->filter_kota && $request->filter_vihara) {

            $filteredViharaIds = Dataumat::where('group_id', $request->filter_group)
                ->where('kota_id', $request->filter_kota)
                ->where('vihara_id', $request->filter_vihara)
                ->select('vihara_id')->distinct()->pluck('vihara_id');
        } elseif ($request->filter_group) {

            $filteredViharaIds = Dataumat::where('group_id', $request->filter_group)
                ->select('vihara_id')->distinct()->pluck('vihara_id');
        } elseif ($request->filter_kota) {

            $filteredViharaIds = Dataumat::where('kota_id', $request->filter_kota)
                ->select('vihara_id')->distinct()->pluck('vihara_id');
        } else {

            $filteredViharaIds = Dataumat::select('vihara_id')->distinct()->pluck('vihara_id');
        }

        $viharas_list = Vihara::whereIn('id', $filteredViharaIds)
            ->orderBy('nama_vihara')->get();


        // ===========================
        // DROPDOWN PANDITA
        // ===========================
        $filteredPanditaIds = Dataumat::query()
            ->when($request->filter_group, fn($q) => $q->where('group_id', $request->filter_group))
            ->when($request->filter_kota, fn($q) => $q->where('kota_id', $request->filter_kota))
            ->when($request->filter_vihara, fn($q) => $q->where('vihara_id', $request->filter_vihara))
            ->select('pandita_id')->distinct()->pluck('pandita_id');

        $panditas_list = Pandita::whereIn('id', $filteredPanditaIds)
            ->orderBy('nama_pandita')->get();


        // ===========================
        // DROPDOWN TAHUN
        // ===========================
        // $tahuns_list = Dataumat::selectRaw('YEAR(tgl_mohonTao) as tahun')
        //     ->whereNotNull('tgl_mohonTao')
        //     ->distinct()
        //     ->orderBy('tahun', 'desc')
        //     ->pluck('tahun');

        $tahunQuery = Dataumat::query()
            ->when($request->filter_kota, fn($q) => $q->where('kota_id', $request->filter_kota))
            ->when($request->filter_group, fn($q) => $q->where('group_id', $request->filter_group))
            ->when($request->filter_vihara, fn($q) => $q->where('vihara_id', $request->filter_vihara))
            // ->when($request->filter_pandita, fn($q) => $q->where('pandita_id', $request->filter_pandita))
            ->whereNotNull('tgl_mohonTao')
            ->selectRaw('YEAR(tgl_mohonTao) as tahun')
            ->distinct()
            ->orderBy('tahun', 'desc');

        $tahuns_list = $tahunQuery->pluck('tahun');





        // ===========================
        // TRANSFORM DATA
        // ===========================
        $dataumats->getCollection()->transform(function ($umat) use ($kotas, $groups, $viharas, $panditas) {
            return [
                'id' => $umat->id,
                'nama_umat' => $umat->nama_umat,
                'nama_alias' => $umat->nama_alias,
                'mandarin' => $umat->mandarin,
                'tgl_lahir' => $umat->tgl_lahir,
                'umur' => $umat->tgl_lahir ? Carbon::parse($umat->tgl_lahir)->age : null,
                'gender' => $umat->gender,
                'status' => $umat->status,
                'created_at' => $umat->created_at,
                'created_by_name' => optional(User::find($umat->created_by))->name,
                'chienkhun' => namaGender($umat->gender, $umat->tgl_lahir),
                'kota_nama' => $kotas[$umat->kota_id]->nama_kota ?? 'Tidak Ada Kota',
                'group_nama' => $groups[$umat->group_id]->nama_group ?? 'Tidak Ada Group',
                'vihara_id' => $umat->vihara_id,
                'vihara_nama' => $viharas[$umat->vihara_id]->nama_vihara ?? 'Tidak Ada Vihara',
                'pandita_id' => $umat->pandita_id,
                'pandita_nama' => $panditas[$umat->pandita_id]->nama_pandita ?? 'Tidak Ada Pandita',
            ];
        });


        // ===========================
        // RETURN KE INERTIA
        // ===========================
        // $testdata = collect($dataumats->items())->first();
        // dd($sortBy, $sortOrder, $testdata);
        return Inertia::render('Dataumat/Index', [
            'dataumats' => $dataumats->items(),
            'kotas' => $kotas->values(),
            'groups' => $groups->values(),
            'viharas' => $viharas->values(),
            'panditas' => $panditas->values(),

            'kotas_list' => $kotas_list,
            'groups_list' => $groups_list,
            'viharas_list' => $viharas_list,
            'panditas_list' => $panditas_list,
            'tahuns_list' => $tahuns_list,

            'filters' => [
                'search' => $search,
                'filter_kota' => $request->filter_kota,
                'filter_group' => $request->filter_group,
                'filter_vihara' => $request->filter_vihara,
                'filter_pandita' => $request->filter_pandita,
                'filter_usia_start' => $usiaStart,
                'filter_usia_end' => $usiaEnd,
                'filter_vegetarian' => $request->filter_vegetarian,
                'filter_sidang_dharma' => $request->filter_sidang_dharma,
                'sort_by' => $sortBy,
                'sort_order' => $sortOrder,
            ],

            'pagination' => [
                'total' => $dataumats->total(),
                'per_page' => $dataumats->perPage(),
                'current_page' => $dataumats->currentPage(),
                'last_page' => $dataumats->lastPage(),
            ],
        ]);
    }
}
