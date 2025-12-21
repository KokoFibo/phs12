<table>
    <!-- Header dengan informasi export -->
    <tr>
        <td colspan="21"
            style="font-family: 'Segoe UI Light'; text-align: center; font-size: 16px; font-weight: bold; background-color: #2C5FAA; color: white; padding: 10px;">
            DATA UMAT - EXPORT
        </td>
    </tr>

    <!-- Informasi Filter -->
    @if (count(array_filter($filters)) > 0)
        <tr>
            <td colspan="21"
                style="font-family: 'Segoe UI Light'; background-color: #F0F0F0; padding: 8px; font-style: italic;">
                <strong>Filter:</strong>
                @php
                    $filterInfo = [];
                    if (!empty($filters['search'])) {
                        $filterInfo[] = 'Pencarian: ' . $filters['search'];
                    }
                    if (!empty($filters['filter_kota'])) {
                        $filterInfo[] = 'Kota: ' . getNamaKota($filters['filter_kota']);
                    }
                    if (!empty($filters['filter_group'])) {
                        $filterInfo[] = 'Group: ' . getNamaGroup($filters['filter_group']);
                    }
                    if (!empty($filters['filter_vihara'])) {
                        $filterInfo[] = 'Vihara: ' . getNamaVihara($filters['filter_vihara']);
                    }
                    if (!empty($filters['filter_pandita'])) {
                        $filterInfo[] = 'Pandita: ' . $filters['filter_pandita'];
                    }
                    if (!empty($filters['filter_tahun'])) {
                        $filterInfo[] = 'Tahun: ' . $filters['filter_tahun'];
                    }
                    if (($filters['filter_usia_start'] ?? 0) > 0 || ($filters['filter_usia_end'] ?? 120) < 120) {
                        $filterInfo[] =
                            'Usia: ' .
                            ($filters['filter_usia_start'] ?? 0) .
                            ' - ' .
                            ($filters['filter_usia_end'] ?? 120) .
                            ' tahun';
                    }
                    if (isset($filters['filter_vegetarian'])) {
                        $filterInfo[] = 'Vegetarian: ' . ($filters['filter_vegetarian'] == 1 ? 'Ya' : 'Tidak');
                    }
                    if (isset($filters['filter_sidang_dharma'])) {
                        $filterInfo[] = 'Sidang Dharma: ' . ($filters['filter_sidang_dharma'] == 1 ? 'Sudah' : 'Belum');
                    }
                @endphp
                {{ implode(' | ', $filterInfo) }}
            </td>
        </tr>
    @endif

    <!-- Informasi Total Data -->
    <tr>
        <td colspan="21"
            style="font-family: 'Segoe UI Light'; background-color: #E8E8E8; padding: 8px; font-weight: bold;">
            Total Data: {{ $totalData }} | Export Date: {{ $exportDate }}
        </td>
    </tr>

    <!-- Header Table -->
    <tr>
        <th
            style="font-family: 'Segoe UI Light'; background-color: #4CAF50; color: white; padding: 8px; border: 1px solid #ddd;">
            No</th>
        <th
            style="font-family: 'Segoe UI Light'; background-color: #4CAF50; color: white; padding: 8px; border: 1px solid #ddd;">
            Nama Umat</th>
        <th
            style="font-family: 'Segoe UI Light'; background-color: #4CAF50; color: white; padding: 8px; border: 1px solid #ddd;">
            Nama Alias</th>
        <th
            style="font-family: 'Segoe UI Light'; background-color: #4CAF50; color: white; padding: 8px; border: 1px solid #ddd;">
            Mandarin</th>
        <th
            style="font-family: 'Segoe UI Light'; background-color: #4CAF50; color: white; padding: 8px; border: 1px solid #ddd;">
            Kota</th>
        <th
            style="font-family: 'Segoe UI Light'; background-color: #4CAF50; color: white; padding: 8px; border: 1px solid #ddd;">
            Group</th>
        <th
            style="font-family: 'Segoe UI Light'; background-color: #4CAF50; color: white; padding: 8px; border: 1px solid #ddd;">
            Vihara</th>
        <th
            style="font-family: 'Segoe UI Light'; background-color: #4CAF50; color: white; padding: 8px; border: 1px solid #ddd;">
            Pandita</th>
        <th
            style="font-family: 'Segoe UI Light'; background-color: #4CAF50; color: white; padding: 8px; border: 1px solid #ddd;">
            Usia</th>
        <th
            style="font-family: 'Segoe UI Light'; background-color: #4CAF50; color: white; padding: 8px; border: 1px solid #ddd;">
            Gender</th>
        <th
            style="font-family: 'Segoe UI Light'; background-color: #4CAF50; color: white; padding: 8px; border: 1px solid #ddd;">
            Tahun Mohon Tao</th>
        <th
            style="font-family: 'Segoe UI Light'; background-color: #4CAF50; color: white; padding: 8px; border: 1px solid #ddd;">
            Vegetarian</th>
        <th
            style="font-family: 'Segoe UI Light'; background-color: #4CAF50; color: white; padding: 8px; border: 1px solid #ddd;">
            Sidang Dharma</th>
        <th
            style="font-family: 'Segoe UI Light'; background-color: #4CAF50; color: white; padding: 8px; border: 1px solid #ddd;">
            Alamat</th>
        <th
            style="font-family: 'Segoe UI Light'; background-color: #4CAF50; color: white; padding: 8px; border: 1px solid #ddd;">
            Telepon</th>
        <th
            style="font-family: 'Segoe UI Light'; background-color: #4CAF50; color: white; padding: 8px; border: 1px solid #ddd;">
            HP</th>
        <th
            style="font-family: 'Segoe UI Light'; background-color: #4CAF50; color: white; padding: 8px; border: 1px solid #ddd;">
            Email</th>
        <th
            style="font-family: 'Segoe UI Light'; background-color: #4CAF50; color: white; padding: 8px; border: 1px solid #ddd;">
            Pengajak</th>
        <th
            style="font-family: 'Segoe UI Light'; background-color: #4CAF50; color: white; padding: 8px; border: 1px solid #ddd;">
            Penjamin</th>
        <th
            style="font-family: 'Segoe UI Light'; background-color: #4CAF50; color: white; padding: 8px; border: 1px solid #ddd;">
            Status</th>
        <th
            style="font-family: 'Segoe UI Light'; background-color: #4CAF50; color: white; padding: 8px; border: 1px solid #ddd;">
            Keterangan</th>
    </tr>

    <!-- Data Rows -->
    @foreach ($data as $index => $umat)
        <tr>
            <td style="font-family: 'Segoe UI Light'; padding: 8px; border: 1px solid #ddd;">{{ $index + 1 }}</td>
            <td style="font-family: 'Segoe UI Light'; padding: 8px; border: 1px solid #ddd;">{{ $umat['nama_umat'] }}
            </td>
            <td style="font-family: 'Segoe UI Light'; padding: 8px; border: 1px solid #ddd;">
                {{ $umat['nama_alias'] ?: '-' }}</td>
            <td style="font-family: 'Segoe UI Light'; padding: 8px; border: 1px solid #ddd;">
                {{ $umat['mandarin'] ?: '-' }}</td>
            <td style="font-family: 'Segoe UI Light'; padding: 8px; border: 1px solid #ddd;">
                {{ $umat->kota->nama_kota ?? '-' }}</td>
            <td style="font-family: 'Segoe UI Light'; padding: 8px; border: 1px solid #ddd;">
                {{ $umat->group->nama_group ?? '-' }}</td>
            <td style="font-family: 'Segoe UI Light'; padding: 8px; border: 1px solid #ddd;">
                {{ $umat->vihara->nama_vihara ?? '-' }}</td>
            <td style="font-family: 'Segoe UI Light'; padding: 8px; border: 1px solid #ddd;">
                {{ $umat->pandita->nama_pandita ?? '-' }}</td>
            <td style="font-family: 'Segoe UI Light'; padding: 8px; border: 1px solid #ddd; text-align: center;">
                @if ($umat['tgl_lahir'])
                    @php
                        $usia = \Carbon\Carbon::parse($umat['tgl_lahir'])->age;
                    @endphp
                    {{ $usia }} th
                @else
                    -
                @endif
            </td>
            <td style="font-family: 'Segoe UI Light'; padding: 8px; border: 1px solid #ddd;text-align: center;">
                {{ namaGender($umat['gender'], $umat['tgl_lahir']) }}</td>
            <td style="font-family: 'Segoe UI Light'; padding: 8px; border: 1px solid #ddd;text-align: center;">
                {{ $umat['tgl_mohonTao'] ? \Carbon\Carbon::parse($umat['tgl_mohonTao'])->format('Y') : '-' }}</td>
            <td style="font-family: 'Segoe UI Light'; padding: 8px; border: 1px solid #ddd;text-align: center;">
                {{ $umat['tgl_vtotal'] ? 'Ya' : 'Tidak' }}</td>
            <td style="font-family: 'Segoe UI Light'; padding: 8px; border: 1px solid #ddd;text-align: center;">
                {{ $umat['tgl_sd3h'] ? 'Sudah' : 'Belum' }}</td>
            <td style="font-family: 'Segoe UI Light'; padding: 8px; border: 1px solid #ddd;">
                {{ $umat['alamat'] ?: '-' }}</td>
            <td style="font-family: 'Segoe UI Light'; padding: 8px; border: 1px solid #ddd;">{{ $umat['telp'] ?: '-' }}
            </td>
            <td style="font-family: 'Segoe UI Light'; padding: 8px; border: 1px solid #ddd;">{{ $umat['hp'] ?: '-' }}
            </td>
            <td style="font-family: 'Segoe UI Light'; padding: 8px; border: 1px solid #ddd;">
                {{ $umat['email'] ?: '-' }}</td>
            <td style="font-family: 'Segoe UI Light'; padding: 8px; border: 1px solid #ddd;">
                {{ $umat['pengajak'] ?: '-' }}</td>
            <td style="font-family: 'Segoe UI Light'; padding: 8px; border: 1px solid #ddd;">
                {{ $umat['penjamin'] ?: '-' }}</td>
            <td style="font-family: 'Segoe UI Light'; padding: 8px; border: 1px solid #ddd;">
                {{ $umat['status'] ?: '-' }}</td>
            <td style="font-family: 'Segoe UI Light'; padding: 8px; border: 1px solid #ddd;text-align: center;">
                {{ $umat['keterangan'] ?: '-' }}</td>
        </tr>
    @endforeach

    <!-- Footer dengan total data -->
    <tr>
        <td colspan="21"
            style="font-family: 'Segoe UI Light'; background-color: #f8f9fa; padding: 8px; font-weight: bold; text-align: center; border: 1px solid #ddd;">
            Total Data: {{ $totalData }} | Generated on: {{ $exportDate }}
        </td>
    </tr>
</table>
