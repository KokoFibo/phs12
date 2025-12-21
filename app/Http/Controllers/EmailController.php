<?php

namespace App\Http\Controllers;

use App\Models\Dataumat;
use Illuminate\Http\Request;
use App\Mail\IntroductionEmail;
use App\Mail\sendAttachmentMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class EmailController extends Controller
{
    public function sendEmail(Request $request)
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



        // dd($request->emailTo, $request->email_excel, $request->email_pdf);




        $to = $request->emailTo;
        $tanggalExport =  now()->format('d F Y H:i:s');
        $email_excel = $request->email_excel;
        $email_pdf = $request->email_pdf;

        try {
            Mail::send(new sendAttachmentMail($to, $data, $filters, $totalData, $tanggalExport, $email_excel, $email_pdf));

            return redirect()->route('dataumats.index')->with('toast', [
                'type' => 'success',
                'message' => 'Email sudah dikirim!',
            ]);
        } catch (\Exception $e) {
            return $e->getMessage();
            return redirect()->route('dataumats.index')->with('toast', [
                'type' => 'error',
                'message' => 'Gagal kirim email!',
            ]);
        }
    }
}
