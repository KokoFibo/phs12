<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Umat - Export</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @media print {
            .no-print {
                display: none !important;
            }

            .break-before {
                page-break-before: always;
            }

            .break-after {
                page-break-after: always;
            }

            .break-inside {
                page-break-inside: avoid;
            }
        }
    </style>
</head>

<body class="bg-gray-100">
    <div class="container mx-auto p-6">
        <!-- Header -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <div class="flex justify-between items-center">
                <div>
                    <h1 class="text-2xl font-bold text-gray-800">Data Umat</h1>
                    <p class="text-gray-600">Tanggal Export: {{ date('d-m-Y H:i') }}</p>
                    <p class="text-gray-600">Total Data: {{ $total_data }}</p>
                </div>
                <div class="no-print">
                    <button onclick="window.print()"
                        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mr-2">
                        🖨️ Print
                    </button>
                    <button onclick="window.close()"
                        class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
                        ✕ Tutup
                    </button>
                </div>
            </div>

            <!-- Filter Info -->
            @if (
                $filters['search'] ||
                    $filters['filter_kota'] ||
                    $filters['filter_group'] ||
                    $filters['filter_vihara'] ||
                    $filters['filter_pandita'] ||
                    $filters['filter_tahun'] ||
                    $filters['filter_usia_start'] > 0 ||
                    $filters['filter_usia_end'] < 120 ||
                    $filters['filter_vegetarian'] ||
                    $filters['filter_sidang_dharma']
            )
                <div class="mt-4 p-4 bg-yellow-50 rounded-lg">
                    <h3 class="font-semibold text-yellow-800">Filter yang diterapkan:</h3>
                    <div class="flex flex-wrap gap-2 mt-2">

                        @if ($filters['search'])
                            <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Pencarian:
                                "{{ $filters['search'] }}"</span>
                        @endif
                        @if ($filters['filter_kota'])
                            <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Kota:
                                "{{ getNamaKota($filters['filter_kota']) }}"</span>
                        @endif
                        @if ($filters['filter_group'])
                            <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Group:
                                "{{ getNamaGroup($filters['filter_group']) }}"</span>
                        @endif
                        @if ($filters['filter_vihara'])
                            <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Vihara:
                                "{{ getNamaVihara($filters['filter_vihara']) }}"</span>
                        @endif
                        @if ($filters['filter_tahun'])
                            <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Tahun:
                                "{{ $filters['filter_tahun'] }}"</span>
                        @endif
                        @if ($filters['filter_usia_start'] > 0 || $filters['filter_usia_end'] < 120)
                            <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Usia:
                                {{ $filters['filter_usia_start'] }} - {{ $filters['filter_usia_end'] }} tahun</span>
                        @endif
                        @if ($filters['filter_vegetarian'] == 1)
                            <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Vegetarian: Ya</span>
                        @elseif($filters['filter_vegetarian'] == 2)
                            <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Vegetarian:
                                Tidak</span>
                        @endif
                        @if ($filters['filter_sidang_dharma'] == 1)
                            <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Sidang Dharma:
                                Sudah</span>
                        @elseif($filters['filter_sidang_dharma'] == 2)
                            <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Sidang Dharma:
                                Belum</span>
                        @endif
                    </div>
                </div>
            @endif
        </div>

        <!-- Data Table -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                No</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nama Umat</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Alias</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Mandarin</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Kota</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Group</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Vihara</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Pandita</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Usia</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Gender</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tahun Tao</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Vegetarian</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Sidang Dharma</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        @forelse($data as $index => $item)
                            <tr class="hover:bg-gray-50 break-inside">
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ $index + 1 }}</td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm font-medium text-gray-900">{{ $item['nama_umat'] }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {{ $item['nama_alias'] ?: '-' }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {{ $item['mandarin'] ?: '-' }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ $item['nama_kota'] }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ $item['nama_group'] }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {{ $item['nama_vihara'] }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {{ $item['nama_pandita'] }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ $item['usia'] }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ $item['gender'] }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {{ $item['tgl_mohonTao'] }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ $item['tgl_vtotal'] }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {{ $item['tgl_sd3h'] }}</td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="13" class="px-6 py-4 text-center text-sm text-gray-500">
                                    Tidak ada data yang ditemukan
                                </td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Footer -->
        <div class="mt-6 text-center text-gray-500 text-sm no-print">
            <p>Data diambil pada {{ date('d-m-Y H:i:s') }} | Total {{ $total_data }} records</p>
        </div>
    </div>
</body>

</html>
