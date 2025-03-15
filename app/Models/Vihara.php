<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vihara extends Model
{
    protected $fillable = ['nama_vihara', 'group_id'];

    // Relasi ke tabel groups
    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    public function kota()
    {
        // return $this->hasOneThrough(Kota::class, Group::class, 'id', 'id', 'group_id', 'kota_id');
        return $this->belongsTo(Group::class);
    }
}
