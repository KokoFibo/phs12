<?php

use Carbon\Carbon;
use App\Models\Kota;
use App\Models\Group;
use App\Models\Vihara;
use Mockery\LegacyMockInterface;
use Overtrue\ChineseCalendar\Calendar;

function namaGender($kode, $tgl_lahir)
{
    // Hitung usia dari tanggal lahir
    $usia = \Carbon\Carbon::parse($tgl_lahir)->age;

    // Jika usia di bawah 16 tahun
    if ($usia <= 16) {
        if ($kode == 1) {
            return '童';
        } elseif ($kode == 2) {
            return '女';
        }
    }

    // Jika usia 16 tahun ke atas
    if ($kode == 1) {
        return '乾';
    } elseif ($kode == 2) {
        return '坤';
    }

    // Jika kode tidak valid
    return null;
}


function lunarInChinese($date)
{
    try {

        // Ubah format tanggal ke integer (tahun, bulan, hari)
        $timestamp = strtotime($date);
        $year = (int)date('Y', $timestamp);
        $month = (int)date('m', $timestamp);
        $day = (int)date('d', $timestamp);
        $calendar = new Calendar();

        // Konversi ke lunar
        $lunar = $calendar->lunar($year, $month, $day);

        // Cek isi array hasil konversi
        // print_r($lunar); // Tambahkan ini untuk debugging

        // return [
        //   'year' => $lunar['lunar_year'] ?? null,
        //   'month' => $lunar['lunar_month'] ?? null,
        //   'day' => $lunar['lunar_day'] ?? null,
        //   'is_leap' => $lunar['is_leap'] ?? null,
        //   'zodiac' => $lunar['animal'] ?? 'Tidak tersedia', // Hindari error dengan default value
        //   'ganzhi_year' => $lunar['ganzhi_year'] ?? 'Tidak tersedia',
        // ];

        return '西元' .  $lunar['lunar_year_chinese'] . '年歲次' . $lunar['ganzhi_year'] . $lunar['lunar_month_chinese'] .  $lunar['lunar_day_chinese'] . '日';
    } catch (\Exception $e) {

        return '';
    }
}

function getNamaKota($id)
{
    $data = Kota::find($id);
    return $data->nama_kota;
}
function getNamaGroup($id)
{
    $data = Group::find($id);
    return $data->nama_group;
}
function getNamaVihara($id)
{
    $data = Vihara::find($id);
    return $data->nama_vihara;
}



function convertToLunar($date)
{
    $calendar = new Calendar();

    // Ubah format tanggal ke integer (tahun, bulan, hari)
    $timestamp = strtotime($date);
    $year = (int)date('Y', $timestamp);
    $month = (int)date('m', $timestamp);
    $day = (int)date('d', $timestamp);

    // Konversi ke lunar
    $lunar = $calendar->solar($year, $month, $day);

    // Cek isi array hasil konversi
    // print_r($lunar); // Tambahkan ini untuk debugging

    // return [
    // 'year' => $lunar['lunar_year'] ?? null,
    // 'month' => $lunar['lunar_month'] ?? null,
    // 'day' => $lunar['lunar_day'] ?? null,
    // 'is_leap' => $lunar['is_leap'] ?? null,
    // 'zodiac' => $lunar['animal'] ?? 'Tidak tersedia', // Hindari error dengan default value
    // 'ganzhi_year' => $lunar['ganzhi_year'] ?? 'Tidak tersedia',
    // ];

    return $lunar['lunar_year'] . '-' . $lunar['lunar_month'] . '-' . $lunar['lunar_day'];
    try {
    } catch (\Exception $e) {
        return '';
    }
}
