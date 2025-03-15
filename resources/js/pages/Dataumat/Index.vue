<script setup>
import AppLayout from '@/layouts/AppLayout.vue';
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/solid';
import { Head, router, usePage } from '@inertiajs/vue3';
import debounce from 'lodash/debounce';
import { onMounted, ref, watch } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();
const page = usePage();

const confirmDelete = (id) => {
    if (window.confirm('Apakah yakin ingin menghapus data ini?')) {
        router.delete(`/dataumats/${id}`, {
            onSuccess: () => {
                toast.success('Data Umat berhasil dihapus.');
                fetchData(); // Refresh data after deletion
            },
        });
    }
};

// Pantau flash message dari Laravel
watch(
    () => page.props.flash.toast,
    (flash) => {
        if (flash?.message) {
            toast[flash.type ?? 'info'](flash.message);
        }
    },
    { immediate: true },
);

const breadcrumbs = [
    {
        title: 'Data Umat',
        href: '/dataumats',
    },
];

const dataumats = ref([]);
const pagination = ref({});
const searchQuery = ref('');
const sortBy = ref('id');
const sortOrder = ref('asc');
const perPage = ref(10);

const isModalOpen = ref(false);
const selectedUmat = ref(null);
const umur = ref(null);
const chienkhun = ref(null);
const tanggal_mohon_Tao_lunar = ref(null);

const loading = ref(false);

function openDetailModal(id) {
    loading.value = true;
    router.get(
        route('dataumats.detail', id),
        {},
        {
            preserveState: true,
            onSuccess: (page) => {
                selectedUmat.value = page.props.umat;
                umur.value = page.props.umur;
                chienkhun.value = page.props.chienkhun;
                tanggal_mohon_Tao_lunar.value = page.props.tanggal_mohon_Tao_lunar;
                isModalOpen.value = true;
                loading.value = false;
            },
        },
    );
}

function closeModal() {
    isModalOpen.value = false;
    selectedUmat.value = null;
    umur.value = null;
    chienkhun.value = null;
    tanggal_mohon_Tao_lunar.value = null;
}
// console.log('nama umat: ', props.umat.nama_umat);
const getGenderClass = (jeniskelamin) => {
    return ['乾', '童'].includes(jeniskelamin) ? 'text-blue-500' : 'text-pink-500';
};

function fetchData(page = 1) {
    router.get(
        '/dataumats',
        {
            search: searchQuery.value,
            sort_by: sortBy.value,
            sort_order: sortOrder.value,
            per_page: perPage.value,
            page: page,
        },
        {
            preserveState: true,
            onSuccess: (page) => {
                dataumats.value = page.props.dataumats;
                pagination.value = page.props.pagination;
            },
        },
    );
}

function handleSort(column) {
    if (sortBy.value === column) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortBy.value = column;
        sortOrder.value = 'asc';
    }
    fetchData();
}

// Gunakan debounce untuk mencegah terlalu banyak request saat mengetik
const handleSearch = debounce(() => {
    fetchData();
}, 500);

function goToPage(page) {
    fetchData(page);
}

onMounted(() => {
    fetchData();
});

// Watcher untuk perPage agar memicu fetchData
watch(perPage, () => {
    fetchData();
});

// Function to navigate to the "Add Data Umat" page
function navigateToAddData() {
    router.visit('/dataumats/create');
}

// Function to navigate to the "Edit Data Umat" page
function navigateToEdit(id) {
    router.get(route('dataumats.edit', id)); // Pastikan named route sesuai dengan Laravel
}

// Function to delete a record
// function deleteRecord(id) {
//     if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
//         router.delete(`/dataumats/${id}`, {
//             onSuccess: () => {
//                 fetchData(); // Refresh data after deletion
//             },
//         });
//     }
// }
</script>

<template>
    <Head title="Data Umat" />
    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="py-6 sm:px-6 lg:px-8">
            <!-- Header with Search and Add Button -->
            <div class="mb-4 flex items-center gap-5">
                <div>
                    <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Cari data..."
                        class="rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        @input="handleSearch"
                    />
                </div>
                <div class="flex items-center space-x-4">
                    <select
                        v-model="perPage"
                        @change="fetchData"
                        class="rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                    <button @click="navigateToAddData" class="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">Tambah Data</button>
                </div>
            </div>

            <!-- Scrollable Table Container -->
            <div class="w-full overflow-x-auto py-4">
                <table class="min-w-full table-auto divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Aksi</th>

                            <th
                                @click="handleSort('id')"
                                class="cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                ID
                            </th>
                            <th
                                @click="handleSort('nama_umat')"
                                class="cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Nama Umat
                            </th>
                            <th
                                @click="handleSort('nama_alias')"
                                class="cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Nama Alias
                            </th>
                            <th
                                @click="handleSort('mandarin')"
                                class="cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Nama mandarin
                            </th>

                            <th
                                @click="handleSort('tgl_lahir')"
                                class="cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Umur
                            </th>
                            <th
                                @click="handleSort('jenis_kelamin')"
                                class="cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Gender
                            </th>
                            <th
                                @click="handleSort('status')"
                                class="cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Status
                            </th>
                            <th
                                @click="handleSort('kota.nama_kota')"
                                class="cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Kota
                            </th>
                            <th
                                @click="handleSort('group.nama_group')"
                                class="cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Group
                            </th>
                            <th
                                @click="handleSort('vihara.nama_vihara')"
                                class="cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Vihara
                            </th>
                            <th
                                @click="handleSort('pandita.nama_pandita')"
                                class="cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Pandita
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
                        <tr v-for="dataumat in dataumats" :key="dataumat.id">
                            <td class="whitespace-normal px-4 py-2 text-sm text-gray-500">
                                <div class="flex space-x-2">
                                    <button
                                        @click="navigateToEdit(dataumat.id)"
                                        class="rounded bg-yellow-500 px-2 py-1 text-white hover:bg-yellow-600"
                                    >
                                        <PencilIcon class="h-4 w-4" />
                                    </button>
                                    <button @click="confirmDelete(dataumat.id)" class="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600">
                                        <TrashIcon class="h-4 w-4" />
                                    </button>
                                    <button @click="openDetailModal(dataumat.id)" class="rounded bg-blue-500 px-2 py-1 text-white hover:bg-red-600">
                                        <MagnifyingGlassIcon class="h-4 w-4" />
                                    </button>
                                </div>
                            </td>
                            <td class="whitespace-normal px-4 py-2 text-sm text-gray-500">{{ dataumat.id }}</td>
                            <td class="whitespace-normal px-4 py-2 text-sm text-gray-500">{{ dataumat.nama_umat }}</td>
                            <td class="whitespace-normal px-4 py-2 text-sm text-gray-500">{{ dataumat.nama_alias }}</td>
                            <td class="whitespace-normal px-4 py-2 text-sm text-gray-500">{{ dataumat.mandarin }}</td>
                            <td class="whitespace-normal px-4 py-2 text-sm text-gray-500">{{ dataumat.umur }}</td>

                            <td class="whitespace-normal px-4 py-2 text-sm" :class="getGenderClass(dataumat.chienkhun)">
                                {{ dataumat.chienkhun }}
                            </td>

                            <td class="whitespace-normal px-4 py-2 text-sm text-gray-500">{{ dataumat.status }}</td>
                            <td class="whitespace-normal px-4 py-2 text-sm text-gray-500">
                                {{ dataumat.kota_nama }}
                            </td>
                            <td class="whitespace-normal px-4 py-2 text-sm text-gray-500">
                                {{ dataumat.group_nama }}
                            </td>
                            <td class="whitespace-normal px-4 py-2 text-sm text-gray-500">
                                {{ dataumat.vihara_nama }}
                            </td>
                            <td class="whitespace-normal px-4 py-2 text-sm text-gray-500">
                                {{ dataumat.pandita_nama }}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!-- Modal Detail -->
                <transition name="fade">
                    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div class="rounded-lg bg-white p-6 shadow-lg">
                            <h2 class="text-center text-lg font-semibold">Detail Data Umat</h2>

                            <div v-if="loading" class="py-4 text-center text-gray-500">Loading...</div>
                            <div v-else-if="selectedUmat" class="mt-4 grid grid-cols-1 gap-6 text-sm md:grid-cols-2">
                                <!-- Kolom 1 -->
                                <div class="text-sm leading-8">
                                    <p><strong>ID:</strong> {{ selectedUmat.id }}</p>
                                    <p><strong>Nama:</strong> {{ selectedUmat.nama_umat }}</p>
                                    <p><strong>Alias:</strong> {{ selectedUmat.nama_alias }}</p>
                                    <p><strong>Mandarin:</strong> {{ selectedUmat.mandarin }}</p>
                                    <p><strong>Umur:</strong> {{ umur }}</p>
                                    <p><strong>Gender:</strong> {{ chienkhun }}</p>
                                    <p><strong>Pengajak:</strong> {{ selectedUmat.pengajak }}</p>
                                    <p><strong>Pandita:</strong> {{ selectedUmat.pandita.nama_pandita }}</p>
                                    <p><strong>Tanggal Mohon Tao:</strong> {{ selectedUmat.tgl_mohonTao }}</p>
                                    <p><strong>Tanggal Mohon Tao (Lunar):</strong> {{ tanggal_mohon_Tao_lunar }}</p>
                                    <p><strong>Group:</strong> {{ selectedUmat.group.nama_group }}</p>

                                    <p><strong>Alamat:</strong> {{ selectedUmat.alamat }}</p>
                                    <p><strong>Keterangan:</strong> {{ selectedUmat.status }}</p>
                                </div>

                                <!-- Kolom 2 -->
                                <div class="text-sm leading-8">
                                    <p><strong>Kota:</strong> {{ selectedUmat.kota.nama_kota }}</p>
                                    <!-- <p><strong>Kota:</strong> {{ selectedUmat.kota_nama }}</p> -->
                                    <p><strong>Group:</strong> {{ selectedUmat.group.nama_group }}</p>
                                    <!-- <p><strong>Group:</strong> {{ selectedUmat.nama_group }}</p> -->
                                    <p><strong>Vihara:</strong> {{ selectedUmat.vihara.nama_vihara }}</p>
                                    <p><strong>Pandita:</strong> {{ selectedUmat.pandita.nama_pandita }}</p>
                                    <p><strong>HP:</strong> {{ selectedUmat.hp }}</p>
                                    <p><strong>Telp:</strong> {{ selectedUmat.telp }}</p>
                                    <p><strong>Penjamin:</strong> {{ selectedUmat.penjamin }}</p>
                                    <p><strong>Tanggal Sidang Dharma 3 Hari :</strong> {{ selectedUmat.tgl_sd3h }}</p>

                                    <p><strong>Tanggal Vegetarian Total :</strong> {{ selectedUmat.tgl_vtotal }}</p>
                                    <p><strong>Kota:</strong> {{ selectedUmat.kota.nama_kota }}</p>
                                    <p><strong>Vihara:</strong> {{ selectedUmat.vihara.nama_vihara }}</p>

                                    <p><strong>Status:</strong> {{ selectedUmat.status }}</p>
                                </div>
                            </div>

                            <button @click="closeModal" class="mt-6 w-full rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">Tutup</button>
                        </div>
                    </div>
                </transition>
            </div>

            <!-- Pagination -->
            <div class="mt-4 flex items-center gap-5">
                <button
                    :disabled="pagination.current_page === 1"
                    @click="goToPage(pagination.current_page - 1)"
                    class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 disabled:opacity-50"
                >
                    <ChevronLeftIcon class="h-5 w-5" />
                </button>
                <span class="text-sm text-gray-700"> Halaman {{ pagination.current_page }} dari {{ pagination.last_page }} </span>
                <button
                    :disabled="pagination.current_page === pagination.last_page"
                    @click="goToPage(pagination.current_page + 1)"
                    class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 disabled:opacity-50"
                >
                    <ChevronRightIcon class="h-5 w-5" />
                </button>
            </div>
        </div>
    </AppLayout>
</template>

<style scoped>
/* Ensure only the table is scrollable horizontally */
.overflow-x-auto {
    overflow-x: auto;
    max-width: 100%;
}

/* Prevent the entire page from scrolling horizontally */
body {
    overflow-x: hidden;
}

th,
td {
    white-space: nowrap;
}
</style>
