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
    protected function rules()
    {
        return [
            'kota_id' => 'required|exists:kotas,id',
            'group_id' => 'required|exists:groups,id',
            'vihara_id' => 'required|exists:viharas,id',
            'pandita_id' => 'required|exists:panditas,id',
            'nama_umat' => 'required|string|max:255',
            'nama_alias' => 'nullable|string|max:255',
            'mandarin' => 'nullable|string|max:255',
            'gender' => 'nullable|string|in:Laki-laki,Perempuan',
            'tgl_lahir' => 'nullable|date|before_or_equal:today',
            'alamat' => 'nullable|string',
            'telp' => 'nullable|string|max:20',
            'hp' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'pengajak' => 'nullable|string|max:255',
            'penjamin' => 'nullable|string|max:255',
            'tgl_mohonTao' => 'nullable|date|before_or_equal:today',
            'tgl_sd3h' => 'nullable|date|before_or_equal:today',
            'tgl_vtotal' => 'nullable|date|before:today',
            'status' => 'nullable|string|max:255',
            'keterangan' => 'nullable|string',
        ];
    }


    public function index(Request $request)
    {
        // Ambil filter dari request
        $search = $request->input('search');
        $sortBy = $request->input('sort_by', 'id');
        $sortOrder = $request->input('sort_order', 'asc');
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
        $query->orderBy($sortBy, $sortOrder);
        $dataumats = $query->paginate($perPage);

        // Ambil data referensi
        $kotas = Kota::all()->keyBy('id');
        $groups = Group::all()->keyBy('id');
        $viharas = Vihara::all()->keyBy('id');
        $panditas = Pandita::all()->keyBy('id');

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
                'kota_id' => $umat->kota_id,
                'kota_nama' => $umat->kota_id && isset($kotas[$umat->kota_id]) ? $kotas[$umat->kota_id]->nama_kota : 'Tidak Ada Kota',
                'group_id' => $umat->group_id,
                'group_nama' => $umat->group_id && isset($groups[$umat->group_id]) ? $groups[$umat->group_id]->nama_group : 'Tidak Ada Group',
                'vihara_id' => $umat->vihara_id,
                'vihara_nama' => $umat->vihara_id && isset($viharas[$umat->vihara_id]) ? $viharas[$umat->vihara_id]->nama_vihara : 'Tidak Ada Vihara',
                'pandita_id' => $umat->pandita_id,
                'pandita_nama' => $umat->pandita_id && isset($panditas[$umat->pandita_id]) ? $panditas[$umat->pandita_id]->nama_pandita : 'Tidak Ada Pandita',
            ];
        });

        // Kirim data ke frontend via Inertia
        return Inertia::render('Dataumat/Index', [
            'dataumats' => $dataumats->items(),
            'kotas' => $kotas->values(),
            'groups' => $groups->values(),
            'viharas' => $viharas->values(),
            'panditas' => $panditas->values(),
            'pagination' => [
                'total' => $dataumats->total(),
                'per_page' => $dataumats->perPage(),
                'current_page' => $dataumats->currentPage(),
                'last_page' => $dataumats->lastPage(),
            ],
        ]);
    }



    // Endpoint untuk mendapatkan groups berdasarkan kota_id
    public function getGroupsByKota($kota_id)
    {
        $groups = Group::where('kota_id', $kota_id)->get();
        return response()->json($groups);
    }

    // Endpoint untuk mendapatkan viharas berdasarkan group_id
    public function getViharasByGroup($group_id)
    {
        $viharas = Vihara::where('group_id', $group_id)->get();
        return response()->json($viharas);
    }

    // Menampilkan halaman tambah data
    public function create()
    {
        $kotas = Kota::all();
        $panditas = Pandita::all();

        return inertia('Dataumat/Create', [
            'kotas' => $kotas,
            'panditas' => $panditas,
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
        $request->validate($this->rules());
        $data = new Dataumat();
        $data->kota_id = $request->kota_id;
        $data->group_id = $request->group_id;
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
        return redirect()->route('dataumats.index')->with('success', 'Data Umat berhasil ditambahkan.');
    }



    public function update(Request $request, $id)
    {

        $request->validate($this->rules());
        $data = Dataumat::findOrFail($id);
        $data->kota_id = $request->kota_id;
        $data->group_id = $request->group_id;
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
        return redirect()->route('dataumats.index')->with('success', 'Data Umat berhasil diperbarui.');
    }

    // Menghapus data
    public function destroy(Dataumat $dataumat)
    {
        $dataumat->delete();

        return redirect()->route('dataumats.index')->with('success', 'Data Umat berhasil dihapus.');
    }
}
