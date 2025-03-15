<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    protected $fillable = ['nama_group', 'kota_id'];

    // Relasi ke tabel kotas
    public function kota()
    {
        return $this->belongsTo(Kota::class);
        // return $this->belongsTo(Kota::class, 'kota_id', 'id');
    }


    public function viharas()
    {
        return $this->hasMany(Vihara::class);
    }
}
