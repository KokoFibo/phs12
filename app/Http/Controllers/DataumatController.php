<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Kota;
use Inertia\Inertia;
use App\Models\Group;
use App\Models\Vihara;
use App\Models\Pandita;
use App\Models\Dataumat;
use Illuminate\Http\Request;



class DataumatController extends Controller
{



    public function detail($id)
    {
        $umat = Dataumat::with(['kota', 'group', 'vihara', 'pandita'])->findOrFail($id);
        $umur = $umat->tgl_lahir ? Carbon::parse($umat->tgl_lahir)->age : null;

        $chienkhun = function () use ($umat) {
            $umur = $umat->tgl_lahir ? Carbon::now()->year - Carbon::parse($umat->tgl_lahir)->year : null;

            if ($umur !== null) {
                if ($umur >= 16) {
                    return $umat->gender === '1' ? '乾' : '坤';
                } else {
                    return $umat->gender === '1' ? '童' : '女';
                }
            }
            return null; // Jika tidak ada tanggal lahir
        };

        $vihara = Vihara::find($umat->vihara_asal);
        $vihara_asal = $vihara->nama_vihara;
        $tanggal_mohon_Tao_lunar = lunarInChinese($umat->tgl_mohonTao_lunar);
        return Inertia::render('Dataumat/Index', [
            'umat' => $umat,
            'umur' => $umur,
            'vihara_asal' => $vihara_asal,
            'chienkhun' => $chienkhun(),
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


    public function index(Request $request)
    {
        // Ambil filter dari request
        $search = $request->input('search');
        $sortBy = $request->input('sort_by', 'id');
        $sortOrder = $request->input('sort_order', 'desc');
        $perPage = $request->input('per_page', 10);

        // Query dataumat dengan filter pencarian
        $query = Dataumat::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('nama_umat', 'like', "%{$search}%")
                    ->orWhere('nama_alias', 'like', "%{$search}%")
                    ->orWhere('mandarin', 'like', "%{$search}%");
            });
        }

        // Sorting dan pagination
        // $query->orderBy($sortBy, $sortOrder);
        $query->orderBy('id', 'desc');
        $query->when($request->filter_kota, function ($q) use ($request) {
            $q->where('kota_id', $request->filter_kota);
        })->when($request->filter_group, function ($q) use ($request) {
            $q->where('group_id', $request->filter_group);
        })->when($request->filter_vihara, function ($q) use ($request) {
            $q->where('vihara_id', $request->filter_vihara);
        });
        $dataumats = $query->paginate($perPage);

        // Ambil data referensi
        $kotas = Kota::all()->keyBy('id');
        $groups = Group::all()->keyBy('id');
        $viharas = Vihara::all()->keyBy('id');
        $panditas = Pandita::all()->keyBy('id');

        $kotas_list = Kota::orderBy('nama_kota', 'asc')->get();
        $groups_list = Group::orderBy('nama_group', 'asc')->get();
        $viharas_list = Vihara::all();


        // Tambahkan perhitungan umur & nama berdasarkan ID
        $dataumats->getCollection()->transform(function ($umat) use ($kotas, $groups, $viharas, $panditas) {
            return [
                'id' => $umat->id,
                'nama_umat' => $umat->nama_umat,
                'nama_alias' => $umat->nama_alias,
                'mandarin' => $umat->mandarin,
                'tgl_lahir' => $umat->tgl_lahir,
                'umur' => $umat->tgl_lahir ? Carbon::parse($umat->tgl_lahir)->age : null,
                // 'umur' => $umat->tgl_lahir ? Carbon::now()->year - Carbon::parse($umat->tgl_lahir)->year : null,
                'gender' => $umat->gender,
                'status' => $umat->status,
                'created_at' => $umat->created_at,

                'chienkhun' => function () use ($umat) {
                    $umur = $umat->tgl_lahir ? Carbon::now()->year - Carbon::parse($umat->tgl_lahir)->year : null;

                    if ($umur !== null) {
                        if ($umur >= 16) {
                            return $umat->gender === 'Laki-laki' ? '乾' : '坤';
                        } else {
                            return $umat->gender === 'Laki-laki' ? '童' : '女';
                        }
                    }

                    return null; // Jika tidak ada tanggal lahir
                },
                // 'kota_id' => $umat->kota_id,
                'kota_nama' => $umat->kota_id && isset($kotas[$umat->kota_id]) ? $kotas[$umat->kota_id]->nama_kota : 'Tidak Ada Kota',
                'group_nama' => $umat->group_id && isset($groups[$umat->group_id]) ? $groups[$umat->group_id]->nama_group : 'Tidak Ada Group',
                // 'group_id' => $umat->group_id,
                // 'group_nama' => $umat->group_id && isset($groups[$umat->group_id]) ? $groups[$umat->group_id]->nama_group : 'Tidak Ada Group',
                'vihara_id' => $umat->vihara_id,
                'vihara_nama' => $umat->vihara_id && isset($viharas[$umat->vihara_id]) ? $viharas[$umat->vihara_id]->nama_vihara : 'Tidak Ada Vihara',
                'pandita_id' => $umat->pandita_id,
                'pandita_nama' => $umat->pandita_id && isset($panditas[$umat->pandita_id]) ? $panditas[$umat->pandita_id]->nama_pandita : 'Tidak Ada Pandita',
            ];
        });
        // Kirim data ke frontend via Inertia
        // dd($dataumats->items());
        return Inertia::render('Dataumat/Index', [
            'dataumats' => $dataumats->items(),
            'kotas' => $kotas->values(),
            'groups' => $groups->values(),
            'viharas' => $viharas->values(),
            'panditas' => $panditas->values(),
            'kotas_list' => $kotas_list,
            'groups_list' => $groups_list,
            'viharas_list' => $viharas_list,
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
        // dd($request);
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
