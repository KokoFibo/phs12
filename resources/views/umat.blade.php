<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <title>Data Tanpa Vihara</title>
</head>

<body>
    <div class="container mt-4">
        <div class="card">
            <div class="card-header">
                <div class="d-flex align-items-center justify-content-between">
                    <h4>Data Tanpa Vihara</h4>
                    <button class="btn btn-primary kembali">
                        Kembali ke dashboard
                    </button>
                </div>
            </div>
            <div class="card-body">
                <form method="GET" action="{{ route('umat.index') }}">
                    <div class="mb-3">
                        <label for="vihara_id" class="form-label">Pilih Vihara:</label>
                        <select name="vihara_id" id="vihara_id" class="form-select" onchange="this.form.submit()">
                            <option value="">Semua Vihara</option>
                            @foreach ($viharaIds as $vihara)
                                {{-- <option value="{{ $vihara->id }}" --}}
                                {{-- <option value="{{ $vihara }}" {{ $selected_vihara == $vihara ? 'selected' : '' }}> --}}
                                <option value="{{ $vihara }}"
                                    {{ request('vihara_id') == $vihara ? 'selected' : '' }}>
                                    {{-- {{ $vihara->nama_vihara }} --}}
                                    {{ $vihara }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                </form>

                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama</th>
                            <th>Alamat</th>
                            <th>Pengajak</th>
                            <th>Penjamin</th>
                            <th>Kode Vihara</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($data as $d)
                            <tr>
                                <td>{{ $d->id }}</td>
                                <td>{{ $d->nama_umat }}</td>
                                <td>{{ $d->alamat }}</td>
                                <td>{{ $d->pengajak }}</td>
                                <td>{{ $d->penjamin }}</td>
                                <td>{{ $d->vihara_id }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>

                <div class="d-flex justify-content-center">
                    {{-- {{ $data->links() }} --}}
                </div>
            </div>
        </div>
    </div>
</body>
<script>
    document.addEventListener("DOMContentLoaded", function() {
        document.querySelectorAll(".kembali").forEach(button => {
            button.addEventListener("click", function() {
                window.location.href = "/dashboard";
            });
        });
    });
</script>

</html>
