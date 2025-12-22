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

    public function pdfView()
    {
        $pdfData = session('pdfData');

        if (!$pdfData) {
            abort(404, 'Data tidak ditemukan');
        }

        return view('exports.data-umat-pdf', $pdfData);
    }

    public function exportPdf(Request $request)
    {
        // dd($request->all());
        // Ambil parameter request
        $search      = $request->input('search');
        $sortBy      = $request->input('sort_by', 'id');
        $sortOrder   = $request->input('sort_order', 'desc');

        $usiaStart   = $request->input('filter_usia_start') !== null && $request->input('filter_usia_start') !== ''
            ? (int)$request->filter_usia_start
            : 0;

        $usiaEnd     = $request->input('filter_usia_end') !== null && $request->input('filter_usia_end') !== ''
            ? (int)$request->filter_usia_end
            : 120;

        // ===========================
        // ✅ VALIDASI: CEK APAKAH ADA FILTER AKTIF
        // ===========================
        $hasActiveFilters =
            !empty($search) ||
            $request->has('filter_kota') ||
            $request->has('filter_group') ||
            $request->has('filter_vihara') ||
            $request->has('filter_pandita') ||
            $request->has('filter_tahun') ||
            $request->has('filter_vegetarian') ||
            $request->has('filter_sidang_dharma');

        $hasActiveFilters =
            $search  == "" &&
            $request->filter_kota == "" &&
            $request->filter_group == "" &&
            $request->filter_vihara == "" &&
            $request->filter_pandita == "" &&
            $request->filter_tahun == "" &&
            $request->filter_vegetarian == "" &&
            $request->filter_sidang_dharma == "" &&
            $usiaStart == 0 &&
            $usiaEnd == 120;

        if ($hasActiveFilters) {
            return redirect()
                ->route('dataumats.index')
                ->with('toast', [
                    'type' => 'error',
                    'message' => 'Minimal satu filter harus dipilih sebelum export data.'
                ]);
        }

        // Query dasar dengan EAGER LOADING
        $query = Dataumat::with(['kota', 'vihara', 'pandita', 'group']);

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
        // 🔥 FILTER USIA (hanya jika bukan default)
        // ===========================
        if ($usiaStart > 0 || $usiaEnd < 120) {
            $query->whereRaw("TIMESTAMPDIFF(YEAR, tgl_lahir, CURDATE()) BETWEEN ? AND ?", [$usiaStart, $usiaEnd]);
        }

        // ===========================
        // 🥬 FILTER VEGETARIAN
        // ===========================
        if ($request->filter_vegetarian == 1) {
            $query->whereNotNull('tgl_vtotal');
        } elseif ($request->filter_vegetarian == 2) {
            $query->whereNull('tgl_vtotal');
        }

        // ===========================
        // 📘 FILTER SIDANG DHARMA
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
        // AMBIL DATA
        // ===========================
        $data = $query->get();

        // Validasi: jika data kosong setelah filter
        if ($data->isEmpty()) {
            if ($request->expectsJson()) {
                return response()->json([
                    'error' => 'Tidak ada data yang ditemukan dengan filter yang dipilih.'
                ], 404);
            }

            return back()->with('error', 'Tidak ada data yang ditemukan dengan filter yang dipilih.');
        }

        // ===========================
        // PREPARE DATA UNTUK EXPORT
        // ===========================
        $filters = [
            'search' => $request->input('search'),
            'filter_kota' => $request->input('filter_kota'),
            'filter_group' => $request->input('filter_group'),
            'filter_vihara' => $request->input('filter_vihara'),
            'filter_pandita' => $request->input('filter_pandita'),
            'filter_tahun' => $request->input('filter_tahun'),
            'filter_usia_start' => $usiaStart,
            'filter_usia_end' => $usiaEnd,
            'filter_vegetarian' => $request->input('filter_vegetarian'),
            'filter_sidang_dharma' => $request->input('filter_sidang_dharma'),
        ];

        $totalData = $data->count();


        // Generate nama file PDF
        $filename = 'data-umat-' . date('Y-m-d-H-i-s') . '.pdf';

        // return view('exports.data-umat-pdf', [
        //     'data' => $data,
        //     'filters' => $filters,
        //     'totalData' => $totalData,
        //     'tanggalExport' => now()->format('d F Y H:i:s')
        // ]);

        $template =  view('exports.data-umat-pdf',  [
            'data' => $data,
            'filters' => $filters,
            'totalData' => $totalData,
            'tanggalExport' => now()->format('d F Y H:i:s')
        ])->render();

        // Simpan data ke session untuk diakses oleh view PDF
        $pdf = Browsershot::html($template)
            ->showBackground()
            ->noSandbox()
            ->setOption('landscape', true)
            ->format('A4')
            ->pdf(); // hasil binary


        // Generate PDF menggunakan Browsershot

        // $pdf = Browsershot::url(route('dataumat.pdf-view'))
        //     ->showBackground()
        //     ->noSandbox()
        //     ->setOption('landscape', true)
        //     ->format('A4')
        //     ->pdf();

        return response($pdf)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'attachment; filename="' . $filename . '"');

        return redirect()->route('dataumats.index')->with('toast', [
            'type' => 'success',
            'message' => 'Data Umat berhasil ditambahkan!',
        ]);
    }

    public function exportExcel(Request $request)
    {
        // Ambil parameter request
        $search      = $request->input('search');
        $sortBy      = $request->input('sort_by', 'id');
        $sortOrder   = $request->input('sort_order', 'desc');

        $usiaStart   = $request->input('filter_usia_start') !== null && $request->input('filter_usia_start') !== ''
            ? (int)$request->filter_usia_start
            : 0;

        $usiaEnd     = $request->input('filter_usia_end') !== null && $request->input('filter_usia_end') !== ''
            ? (int)$request->filter_usia_end
            : 120;

        // ===========================
        // ✅ VALIDASI: CEK APAKAH ADA FILTER AKTIF
        // ===========================
        $hasActiveFilters =
            !empty($search) ||
            $request->has('filter_kota') ||
            $request->has('filter_group') ||
            $request->has('filter_vihara') ||
            $request->has('filter_pandita') ||
            $request->has('filter_tahun') ||
            $request->has('filter_vegetarian') ||
            $request->has('filter_sidang_dharma');

        $hasActiveFilters =
            $search  == "" &&
            $request->filter_kota == "" &&
            $request->filter_group == "" &&
            $request->filter_vihara == "" &&
            $request->filter_pandita == "" &&
            $request->filter_tahun == "" &&
            $request->filter_vegetarian == "" &&
            $request->filter_sidang_dharma == "" &&
            $usiaStart == 0 &&
            $usiaEnd == 120;

        if ($hasActiveFilters) {
            return redirect()
                ->route('dataumats.index')
                ->with('toast', [
                    'type' => 'error',
                    'message' => 'Minimal satu filter harus dipilih sebelum export data.'
                ]);
        }

        // Query dasar dengan EAGER LOADING
        $query = Dataumat::with(['kota', 'vihara', 'pandita', 'group']);

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
        // 🔥 FILTER USIA (hanya jika bukan default)
        // ===========================
        if ($usiaStart > 0 || $usiaEnd < 120) {
            $query->whereRaw("TIMESTAMPDIFF(YEAR, tgl_lahir, CURDATE()) BETWEEN ? AND ?", [$usiaStart, $usiaEnd]);
        }

        // ===========================
        // 🥬 FILTER VEGETARIAN
        // ===========================
        if ($request->filter_vegetarian == 1) {
            $query->whereNotNull('tgl_vtotal');
        } elseif ($request->filter_vegetarian == 2) {
            $query->whereNull('tgl_vtotal');
        }

        // ===========================
        // 📘 FILTER SIDANG DHARMA
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
        // AMBIL DATA
        // ===========================
        $data = $query->get();

        // Validasi: jika data kosong setelah filter
        if ($data->isEmpty()) {
            if ($request->expectsJson()) {
                return response()->json([
                    'error' => 'Tidak ada data yang ditemukan dengan filter yang dipilih.'
                ], 404);
            }

            return back()->with('error', 'Tidak ada data yang ditemukan dengan filter yang dipilih.');
        }

        // ===========================
        // PREPARE DATA UNTUK EXPORT
        // ===========================
        $filters = [
            'search' => $request->input('search'),
            'filter_kota' => $request->input('filter_kota'),
            'filter_group' => $request->input('filter_group'),
            'filter_vihara' => $request->input('filter_vihara'),
            'filter_pandita' => $request->input('filter_pandita'),
            'filter_tahun' => $request->input('filter_tahun'),
            'filter_usia_start' => $usiaStart,
            'filter_usia_end' => $usiaEnd,
            'filter_vegetarian' => $request->input('filter_vegetarian'),
            'filter_sidang_dharma' => $request->input('filter_sidang_dharma'),
        ];

        $totalData = $data->count();

        // ===========================
        // EXPORT KE EXCEL
        // ===========================


        return Excel::download(
            new DataumatExport($data, $filters, $totalData),
            'data-umat-' . date('Y-m-d-H-i') . '.xlsx'
        );
    }



    public function cek()
    {

        // $data = Dataumat::where('tgl_mohonTao', null)->get();
        // dd($data);

        // Ambil group_id yang memiliki lebih dari 1 kota_id
        $groupIds = Dataumat::select('group_id')
            ->groupBy('group_id')
            ->havingRaw('COUNT(DISTINCT kota_id) > 1')
            ->pluck('group_id');

        // Ambil pasangan group_id dan kota_id
        $groupKotaList = Dataumat::select('group_id', 'kota_id')
            ->whereIn('group_id', $groupIds)
            ->distinct()
            ->get();

        // Kelompokkan berdasarkan group_id
        $grouped = $groupKotaList->groupBy('group_id');

        // Siapkan hasil akhir: nama_group → [nama_kota, ...]
        $results = [];

        foreach ($grouped as $groupId => $items) {
            $group = Group::find($groupId);
            $kotaIds = $items->pluck('kota_id')->unique();
            $kotas = Kota::whereIn('id', $kotaIds)->pluck('nama_kota')->toArray();

            $results[] = [
                'nama_group' => $group?->nama_group ?? "(Tanpa Nama)",
                'nama_kotas' => $kotas,
            ];
        }

        return view('group_kota_list', compact('results'));
    }

    public function detail($id)
    {
        $umat = Dataumat::with(['kota', 'group', 'vihara', 'pandita'])->findOrFail($id);
        $umur = $umat->tgl_lahir ? Carbon::parse($umat->tgl_lahir)->age : null;
        $chienkhun = namaGender($umat->gender, $umat->tgl_lahir);
        $vihara = Vihara::find($umat->vihara_asal);
        $vihara_asal = $vihara->nama_vihara;
        $tanggal_mohon_Tao_lunar = lunarInChinese($umat->tgl_mohonTao_lunar);
        return Inertia::render('Dataumat/Index', [
            'umat' => $umat,
            'umur' => $umur,
            'vihara_asal' => $vihara_asal,
            'chienkhun' => $chienkhun,
            'tanggal_mohon_Tao_lunar' => $tanggal_mohon_Tao_lunar,
        ]);
    }
    protected function rules()
    {
        return [
            // 'kota_id' => 'required|exists:kotas,id',
            // 'group_id' => 'required|exists:groups,id',
            'vihara_id' => 'required|exists:viharas,id',
            'pandita_id' => 'required|exists:panditas,id',
            'nama_umat' => 'required|string|max:255',
            'nama_alias' => 'nullable|string|max:255',
            'mandarin' => 'nullable|string|max:255',
            'gender' => 'required|string|in:Laki-laki,Perempuan',
            'tgl_lahir' => 'required|date|before_or_equal:today',
            'alamat' => 'required|string',
            'telp' => 'nullable|string|max:20',
            'hp' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'pengajak' => 'required|string|max:255',
            'penjamin' => 'required|string|max:255',
            'tgl_mohonTao' => 'nullable|date|before_or_equal:today',
            'tgl_sd3h' => 'nullable|date|before_or_equal:today',
            'tgl_vtotal' => 'nullable|date|before_or_equal:today',
            'status' => 'nullable|string|max:255',
            'keterangan' => 'nullable|string',
        ];
    }

    public function getNamaById($id)
    {
        return optional(User::find($id))->name;
    }



    public function index(Request $request)
    {
        // ==================================================
        // REQUEST & DEFAULT
        // ==================================================
        $search     = $request->search;
        $sortBy     = $request->input('sort_by', 'id');
        $sortOrder  = $request->input('sort_order', 'desc');
        $perPage    = $request->input('per_page', 10);

        $usiaStart  = $request->filled('filter_usia_start') ? (int) $request->filter_usia_start : 0;
        $usiaEnd    = $request->filled('filter_usia_end')   ? (int) $request->filter_usia_end   : 120;

        // ==================================================
        // SORT WHITELIST
        // ==================================================
        $allowedSort = ['id', 'nama_umat', 'created_at'];
        if (!in_array($sortBy, $allowedSort)) {
            $sortBy = 'id';
        }

        // ==================================================
        // FILTER USIA (OPTIMIZED)
        // ==================================================
        $tglLahirStart = now()->subYears($usiaEnd)->startOfDay();
        $tglLahirEnd   = now()->subYears($usiaStart)->endOfDay();

        // ==================================================
        // MAIN QUERY (TABLE DATA)
        // ==================================================
        $query = Dataumat::query()
            ->with([
                'createdBy:id,name',
                'kota:id,nama_kota',
                'group:id,nama_group',
                'vihara:id,nama_vihara',
                'pandita:id,nama_pandita',
            ])

            // SEARCH
            ->when($search, function ($q) use ($search) {
                $q->where(function ($qq) use ($search) {
                    $qq->where('nama_umat', 'like', "%{$search}%")
                        ->orWhere('nama_alias', 'like', "%{$search}%")
                        ->orWhere('mandarin', 'like', "%{$search}%");
                });
            })

            // FILTER USIA (HANYA TABLE)
            ->whereBetween('tgl_lahir', [$tglLahirStart, $tglLahirEnd])

            // STATUS
            ->when($request->filter_vegetarian == 1, fn($q) => $q->whereNotNull('tgl_vtotal'))
            ->when($request->filter_vegetarian == 2, fn($q) => $q->whereNull('tgl_vtotal'))

            ->when($request->filter_sidang_dharma == 1, fn($q) => $q->whereNotNull('tgl_sd3h'))
            ->when($request->filter_sidang_dharma == 2, fn($q) => $q->whereNull('tgl_sd3h'))

            // RELASI
            ->when($request->filter_kota, fn($q) => $q->where('kota_id', $request->filter_kota))
            ->when($request->filter_group, fn($q) => $q->where('group_id', $request->filter_group))
            ->when($request->filter_vihara, fn($q) => $q->where('vihara_id', $request->filter_vihara))
            ->when($request->filter_pandita, fn($q) => $q->where('pandita_id', $request->filter_pandita))
            ->when($request->filter_tahun, fn($q) => $q->whereYear('tgl_mohonTao', $request->filter_tahun))

            ->orderBy($sortBy, $sortOrder);

        $dataumats = $query->paginate($perPage)->withQueryString();

        // ==================================================
        // DROPDOWN — KOTA
        // ==================================================
        $kotas_list = Kota::whereIn(
            'id',
            Dataumat::select('kota_id')->distinct()
        )->orderBy('nama_kota')->get();

        // ==================================================
        // DROPDOWN — GROUP (DEPEND KOTA)
        // ==================================================
        $groups_list = Group::whereIn(
            'id',
            Dataumat::when(
                $request->filter_kota,
                fn($q) =>
                $q->where('kota_id', $request->filter_kota)
            )->select('group_id')->distinct()
        )->orderBy('nama_group')->get();

        // ==================================================
        // DROPDOWN — VIHARA (DEPEND KOTA + GROUP)
        // ==================================================
        $viharaQuery = Dataumat::query()
            ->when(
                $request->filter_kota,
                fn($q) =>
                $q->where('kota_id', $request->filter_kota)
            )
            ->when(
                $request->filter_group,
                fn($q) =>
                $q->where('group_id', $request->filter_group)
            )
            ->select('vihara_id')
            ->distinct();

        $viharas_list = Vihara::whereIn('id', $viharaQuery)
            ->orderBy('nama_vihara')
            ->get();

        // ==================================================
        // DROPDOWN — PANDITA (OPTIONAL)
        // ==================================================
        $panditas_list = Pandita::whereIn(
            'id',
            Dataumat::when(
                $request->filter_kota,
                fn($q) =>
                $q->where('kota_id', $request->filter_kota)
            )
                ->when(
                    $request->filter_group,
                    fn($q) =>
                    $q->where('group_id', $request->filter_group)
                )
                ->when(
                    $request->filter_vihara,
                    fn($q) =>
                    $q->where('vihara_id', $request->filter_vihara)
                )
                ->select('pandita_id')
                ->distinct()
        )->orderBy('nama_pandita')->get();

        // ==================================================
        // DROPDOWN — TAHUN (PALING SERING SALAH)
        // ❗ TIDAK PAKAI FILTER USIA
        // ==================================================
        $tahuns_list = Dataumat::query()
            ->when(
                $request->filter_kota,
                fn($q) =>
                $q->where('kota_id', $request->filter_kota)
            )
            ->when(
                $request->filter_group,
                fn($q) =>
                $q->where('group_id', $request->filter_group)
            )
            ->when(
                $request->filter_vihara,
                fn($q) =>
                $q->where('vihara_id', $request->filter_vihara)
            )
            ->whereNotNull('tgl_mohonTao')
            ->selectRaw('YEAR(tgl_mohonTao) as tahun')
            ->distinct()
            ->orderByDesc('tahun')
            ->pluck('tahun');

        // ==================================================
        // TRANSFORM TABLE DATA
        // ==================================================
        $dataumats->getCollection()->transform(function ($u) {
            return [
                'id' => $u->id,
                'nama_umat' => $u->nama_umat,
                'nama_alias' => $u->nama_alias,
                'mandarin'  => $u->mandarin,
                'tgl_lahir' => $u->tgl_lahir,
                'umur'      => $u->tgl_lahir ? Carbon::parse($u->tgl_lahir)->age : null,
                'gender'    => $u->gender,
                'status'    => $u->status,
                'created_at' => $u->created_at,
                'created_by_name' => $u->createdBy->name ?? null,
                'chienkhun' => namaGender($u->gender, $u->tgl_lahir),

                'kota_nama'   => $u->kota->nama_kota ?? '-',
                'group_nama'  => $u->group->nama_group ?? '-',
                'vihara_id'   => $u->vihara_id,
                'vihara_nama' => $u->vihara->nama_vihara ?? '-',
                'pandita_id'  => $u->pandita_id,
                'pandita_nama' => $u->pandita->nama_pandita ?? '-',
            ];
        });

        // ==================================================
        // RETURN
        // ==================================================
        return Inertia::render('Dataumat/Index', [
            'dataumats' => $dataumats->items(),

            'kotas_list'   => $kotas_list,
            'groups_list'  => $groups_list,
            'viharas_list' => $viharas_list,
            'panditas_list' => $panditas_list,
            'tahuns_list'  => $tahuns_list,

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
                'filter_tahun' => $request->filter_tahun,
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










    // Endpoint untuk mendapatkan groups berdasarkan kota_id
    public function getGroupsByKota(Request $request, $id)
    {
        // echo ($request);
        $groups = Group::where('kota_id', $request->kota_id)->get();
        $kotas = Kota::all();
        return Inertia::render('Dataumat/Create', [

            'kotas' => $kotas,
            'groups' => $groups,
            'kota_id' => $request->kota_id,
        ]);
    }

    // Endpoint untuk mendapatkan viharas berdasarkan group_id

    public function getViharasByGroup(Request $request, $group_id)
    {
        $viharas = Vihara::where('group_id', $group_id)->get();
        $kotas = Kota::all();
        $panditas = Pandita::all();
        return Inertia::render('Dataumat/Create', [
            'kotas' => $kotas,
            'panditas' => $panditas,
            'viharas' => $viharas,
        ]);
    }
    public function getGroupsByKotaEdit(Request $request, $id)
    {
        // echo ($request);
        $groups = Group::where('kota_id', $request->kota_id)->get();
        $kotas = Kota::all();
        return Inertia::render('Dataumat/Edit', [

            'kotas' => $kotas,
            'groups' => $groups,
            'kota_id' => $request->kota_id,
        ]);
    }

    // Endpoint untuk mendapatkan viharas berdasarkan group_id

    public function getViharasByGroupEdit(Request $request, $group_id)
    {
        $viharas = Vihara::where('group_id', $group_id)->get();
        $kotas = Kota::all();
        $groups = Group::all();
        $panditas = Pandita::all();
        return Inertia::render('Dataumat/Edit', [
            'kotas' => $kotas,
            'groups' => $groups,
            'panditas' => $panditas,
            'viharas' => $viharas,
        ]);
    }

    // Menampilkan halaman tambah data
    public function create()
    {
        // $kotas = Kota::all();
        $panditas = Pandita::all();
        $viharas = Vihara::with(['group.kota'])->get();

        return inertia('Dataumat/Create', [
            // 'kotas' => $kotas,
            'panditas' => $panditas,
            'viharas' => $viharas,
        ]);
    }
    public function edit($id)
    {
        $dataumat = Dataumat::findOrFail($id);
        return Inertia::render('Dataumat/Edit', [
            'dataumat' => $dataumat,
            'kotas' => Kota::all(),
            'groups' => Group::all(),
            'viharas' => Vihara::all(),
            'panditas' => Pandita::all(),
        ]);
    }

    // Menyimpan data baru
    public function store(Request $request)
    {
        // dd($vihara->group->kota->id, $vihara->group_id);
        $request->validate($this->rules());
        $vihara = Vihara::with('group.kota')->find($request->vihara_id);
        $data = new Dataumat();
        $data->group_id = $vihara->group_id;
        $data->kota_id = $vihara->group->kota->id;
        $data->vihara_id = $request->vihara_id;
        $data->vihara_asal = $request->vihara_id;
        $data->pandita_id = $request->pandita_id;
        $data->tgl_lahir = $request->tgl_lahir;
        $data->nama_umat = $request->nama_umat;
        $data->nama_alias = $request->nama_alias;
        $data->mandarin = $request->mandarin;
        $data->gender = $request->gender;
        $data->tgl_mohonTao = $request->tgl_mohonTao;
        $data->alamat = $request->alamat;
        $data->telp = $request->telp;
        $data->hp = $request->hp;
        $data->email = $request->email;
        $data->pengajak = $request->pengajak;
        $data->penjamin = $request->penjamin;
        $data->pandita_id = $request->pandita_id;
        $data->tgl_mohonTao_lunar = convertToLunar($request->tgl_mohonTao);
        $data->tgl_sd3h = $request->tgl_sd3h;
        $data->tgl_vtotal = $request->tgl_vtotal;
        $data->status = $request->status;
        $data->keterangan = $request->keterangan;
        $data->created_by = auth()->user()->id;
        $data->save();
        // return redirect()->route('dataumats.index')->with('success', 'Data Umat berhasil ditambahkan.');
        return redirect()->route('dataumats.index')->with('toast', [
            'type' => 'success',
            'message' => 'Data Umat berhasil ditambahkan!',
        ]);
    }



    public function update(Request $request, $id)
    {

        $request->validate($this->rules());
        $vihara = Vihara::with('group.kota')->find($request->vihara_id);
        $data = Dataumat::findOrFail($id);
        $data->kota_id = $vihara->group->kota->id;
        $data->group_id = $vihara->group_id;
        $data->vihara_id = $request->vihara_id;
        $data->pandita_id = $request->pandita_id;
        $data->tgl_lahir = $request->tgl_lahir;
        $data->nama_umat = $request->nama_umat;
        $data->nama_alias = $request->nama_alias;
        $data->mandarin = $request->mandarin;
        $data->gender = $request->gender;
        $data->tgl_mohonTao = $request->tgl_mohonTao;
        $data->alamat = $request->alamat;
        $data->kota_id = $request->kota_id;
        $data->telp = $request->telp;
        $data->hp = $request->hp;
        $data->email = $request->email;
        $data->pengajak = $request->pengajak;
        $data->penjamin = $request->penjamin;
        $data->pandita_id = $request->pandita_id;
        $data->tgl_mohonTao_lunar = convertToLunar($request->tgl_mohonTao);
        $data->tgl_sd3h = $request->tgl_sd3h;
        $data->tgl_vtotal = $request->tgl_vtotal;
        $data->status = $request->status;
        $data->keterangan = $request->keterangan;
        $data->save();
        // return redirect()->route('dataumats.index')->with('success', 'Data Umat berhasil diperbarui.');
        return redirect()->route('dataumats.index')->with('toast', [
            'type' => 'success',
            'message' => 'Data Umat berhasil diperbarui.',
        ]);
    }

    // Menghapus data
    public function destroy(Dataumat $dataumat)
    {
        $dataumat->delete();

        // return redirect()->route('dataumats.index')->with('success', 'Data Umat berhasil dihapus.');
        return redirect()->route('dataumats.index')->with('toast', [
            'type' => 'success',
            'message' => 'Data Umat berhasil dihapus.',
        ]);
    }
}
