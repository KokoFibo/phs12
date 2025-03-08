<?php

use Carbon\Carbon;
use Overtrue\ChineseCalendar\Calendar;

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
