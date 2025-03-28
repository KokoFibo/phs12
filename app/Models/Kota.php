<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kota extends Model
{
    protected $fillable = ['nama_kota'];

    public function groups()
    {
        return $this->hasMany(Group::class);
    }
}
