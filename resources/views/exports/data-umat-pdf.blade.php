<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <title>Data Umat</title>
    <style>
        body {
            font-family: 'Poppins', sans-serif;
            font-size: 10px;
            margin: 0;
            padding: 0;
        }

        .header {
            text-align: center;
            margin-bottom: 15px;
            border-bottom: 2px solid #333;
            padding-bottom: 8px;
        }

        .header h1 {
            margin: 0;
            color: #333;
            font-size: 16px;
        }

        .header p {
            margin: 5px 0 0 0;
            font-size: 9px;
        }

        .filter-info {
            background: #f8f9fa;
            padding: 8px;
            margin-bottom: 12px;
            border-radius: 3px;
            font-size: 9px;
        }

        .filter-info h3 {
            margin: 0 0 8px 0;
            font-size: 11px;
        }

        .filter-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 4px;
        }

        .table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 8px;
            font-size: 8px;
        }

        .table th {
            background-color: #343a40;
            color: white;
            padding: 6px 4px;
            text-align: left;
            font-size: 9px;
            border: 1px solid #444;
        }

        .table td {
            padding: 4px 3px;
            border: 1px solid #ddd;
        }

        .table tr:nth-child(even) {
            background-color: #f8f9fa;
        }

        .summary {
            margin-top: 15px;
            padding: 8px;
            background: #e9ecef;
            border-radius: 3px;
            font-size: 9px;
        }

        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 8px;
            color: #666;
        }

        .text-center {
            text-align: center;
        }

        .nowrap {
            white-space: nowrap;
        }

        /* Untuk memastikan tidak ada page break di tengah row */
        tr {
            page-break-inside: avoid;
        }
    </style>
</head>

<body>
    <div class="header">
        <h1>DATA UMAT</h1>
        <p>Dicetak pada: {{ $tanggalExport }}</p>
    </div>

    @if (!empty(array_filter($filters)))
        <div class="filter-info">
            <h3>Filter yang diterapkan:</h3>
            <div class="filter-grid">
                @if ($filters['search'])
                    <div><strong>Pencarian:</strong> {{ $filters['search'] }}</div>
                @endif
                @if ($filters['filter_kota'])
                    <div><strong>Kota:</strong> {{ getNamaKota($filters['filter_kota']) }}</div>
                @endif
                @if ($filters['filter_group'])
                    <div><strong>Group:</strong> {{ getNamaGroup($filters['filter_group']) }}</div>
                @endif
                @if ($filters['filter_vihara'])
                    <div><strong>Vihara:</strong> {{ getNamaVihara($filters['filter_vihara']) }}</div>
                @endif
                @if ($filters['filter_pandita'])
                    <div><strong>Pandita:</strong> {{ $filters['filter_pandita'] }}</div>
                @endif
                @if ($filters['filter_tahun'])
                    <div><strong>Tahun:</strong> {{ $filters['filter_tahun'] }}</div>
                @endif
                @if ($filters['filter_usia_start'] > 0 || $filters['filter_usia_end'] < 120)
                    <div><strong>Rentang Usia:</strong> {{ $filters['filter_usia_start'] }} -
                        {{ $filters['filter_usia_end'] }} tahun</div>
                @endif
                @if ($filters['filter_vegetarian'])
                    <div><strong>Vegetarian:</strong> {{ $filters['filter_vegetarian'] == 1 ? 'Ya' : 'Tidak' }}</div>
                @endif
                @if ($filters['filter_sidang_dharma'])
                    <div><strong>Sidang Dharma:</strong>
                        {{ $filters['filter_sidang_dharma'] == 1 ? 'Sudah' : 'Belum' }}</div>
                @endif
            </div>
        </div>
    @endif

    <table class="table">
        <thead>
            <tr>
                <th width="3%" class="text-center">No</th>
                <th width="12%">Nama Umat</th>
                <th width="10%">Nama Mandarin</th>
                <th width="8%">Kota</th>
                <th width="10%">Vihara</th>
                <th width="8%">Group</th>
                {{-- <th width="8%">Tanggal Lahir</th> --}}
                <th width="5%" class="text-center">Usia</th>
                <th width="6%" class="text-center">Vegetarian</th>
                <th width="8%" class="text-center">Sidang Dharma</th>
                <th width="10%">Pandita</th>
                <th width="12%">Alamat</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($data as $key => $umat)
                <tr>
                    <td class="text-center">{{ $key + 1 }}</td>
                    <td class="nowrap">{{ $umat->nama_umat }}</td>
                    <td>{{ $umat->mandarin ?? '-' }}</td>
                    <td>{{ $umat->kota->nama_kota ?? '-' }}</td>
                    <td>{{ $umat->vihara->nama_vihara ?? '-' }}</td>
                    <td>{{ $umat->group->nama_group ?? '-' }}</td>
                    {{-- <td class="nowrap">{{ $umat->tgl_lahir ? date('d/m/Y', strtotime($umat->tgl_lahir)) : '-' }}</td> --}}
                    <td class="text-center">
                        @if ($umat->tgl_lahir)
                            {{ \Carbon\Carbon::parse($umat->tgl_lahir)->age }} th
                        @else
                            -
                        @endif
                    </td>
                    <td class="text-center">{{ $umat->tgl_vtotal ? '✓' : '✗' }}</td>
                    <td class="text-center">{{ $umat->tgl_sd3h ? '✓' : '✗' }}</td>
                    <td>{{ $umat->pandita->nama_pandita ?? '-' }}</td>
                    {{-- <td>{{ Str::limit($umat->alamat, 30) }}</td> --}}
                    <td>{{ $umat->alamat }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <div class="summary">
        <strong>Total Data: {{ $totalData }} record</strong>
    </div>

    <div class="footer">
        <p>Dicetak oleh sistem pada {{ date('d F Y H:i:s') }}</p>
    </div>
</body>

</html>
