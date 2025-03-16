<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;

class Dataumat extends Model
{
    protected $fillable = [
        'kota_id',
        'group_id',
        'vihara_id',
        'vihara_asal',
        'pandita_id',
        'nama_umat',
        'nama_alias',
        'mandarin',
        'gender',
        'tgl_lahir',
        'umur_sekarang',
        'alamat',
        'telp',
        'hp',
        'email',
        'pengajak',
        'penjamin',
        'tgl_mohonTao',
        'tgl_mohonTao_lunar',
        'tgl_sd3h',
        'tgl_vtotal',
        'status',
        'keterangan',
    ];

    // Mutator untuk mengubah nama menjadi Title Case saat disimpan
    public function setNamaUmatAttribute($value)
    {
        $this->attributes['nama_umat'] = Str::title($value);
    }

    // Relasi ke tabel kotas
    public function kota()
    {
        return $this->belongsTo(Kota::class);
    }

    // Relasi ke tabel groups
    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    // Relasi ke tabel viharas
    public function vihara()
    {
        return $this->belongsTo(Vihara::class);
    }

    // Relasi ke tabel panditas
    public function pandita()
    {
        return $this->belongsTo(Pandita::class);
    }
}
