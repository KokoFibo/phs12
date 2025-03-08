<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dataumats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kota_id');
            $table->foreignId('group_id');
            $table->foreignId('vihara_id');
            $table->foreignId('pandita_id');

            $table->string('nama_umat');
            $table->string('nama_alias')->nullable();
            $table->string('mandarin')->nullable();
            $table->string('gender')->nullable();
            $table->date('tgl_lahir')->nullable();
            $table->text('alamat')->nullable(); // Ubah menjadi TEXT
            $table->string('telp')->nullable();
            $table->string('hp')->nullable();
            $table->string('email')->nullable();
            $table->string('pengajak')->nullable();
            $table->string('penjamin')->nullable();
            $table->date('tgl_mohonTao')->nullable();
            $table->date('tgl_mohonTao_lunar')->nullable();
            $table->date('tgl_sd3h')->nullable();
            $table->date('tgl_vtotal')->nullable();
            $table->string('status')->nullable();
            $table->text('keterangan')->nullable(); // Ubah menjadi TEXT
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dataumats');
    }
};
