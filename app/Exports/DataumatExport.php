<?php

namespace App\Exports;

use Carbon\Carbon;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class DataumatExport implements FromView, ShouldAutoSize
{
    protected $data;
    protected $filters;
    protected $totalData;

    public function __construct($data, $filters = [], $totalData = 0)
    {
        $this->data = $data;
        $this->filters = $filters;
        $this->totalData = $totalData;
    }



    public function view(): View
    {
        return view('exports.dataumat-excel', [
            'data' => $this->data,
            'filters' => $this->filters,
            'totalData' => $this->totalData,
            'exportDate' => Carbon::now()->format('d-m-Y H:i')
        ]);
    }
}
