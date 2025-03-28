<script setup>
import Navbar from '@/components/Navbar.vue';
// import SimplePagination from '@/components/SimplePagination.vue';
// import AppLayout from '@/layouts/AppLayout.vue';
// import DropdownViharaUmat from '@/components/DropdownViharaUmat.vue';

import { useAuthStore } from '@/Stores/authStore';
import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    FunnelIcon,
    MagnifyingGlassIcon,
    PencilIcon,
    TrashIcon,
} from '@heroicons/vue/24/solid';

import { Head, router, usePage } from '@inertiajs/vue3';
import debounce from 'lodash/debounce';
import { onMounted, ref, watch } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();
const page = usePage();
const userStore = useAuthStore();

console.log(userStore.user_role);
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
const vihara_asal = ref(null);

const tanggal_mohon_Tao_lunar = ref(null);

const loading = ref(false);
const filter_kota = ref('');
const filter_group = ref('');
const filter_vihara = ref('');

// const pageInput = ref(pagination.current_page);
const pageInput = ref(1);
const toggle = ref(false);

watch(pageInput, (newValue) => {
    goToPage(newValue);
});
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
                vihara_asal.value = page.props.vihara_asal;
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
    vihara_asal.value = null;
    tanggal_mohon_Tao_lunar.value = null;
}
// console.log('nama umat: ', props.umat.nama_umat);
const getGenderClass = (jeniskelamin) => {
    return ['乾', '童'].includes(jeniskelamin) ? 'text-blue-500' : 'text-pink-500';
};

watch(filter_kota, (newValue) => {
    if (newValue) {
        filter_group.value = '';
        filter_vihara.value = '';
    }
});

watch(filter_group, (newValue) => {
    if (newValue) {
        filter_kota.value = '';
        filter_vihara.value = '';
    }
});

watch(filter_vihara, (newValue) => {
    if (newValue) {
        filter_group.value = '';
        filter_kota.value = '';
        fetchData();
    }
});

function fetchData(page = 1) {
    router.get(
        '/dataumats',
        {
            search: searchQuery.value,
            sort_by: sortBy.value,
            sort_order: sortOrder.value,
            per_page: perPage.value,
            page: page,
            filter_kota: filter_kota.value,
            filter_group: filter_group.value,
            filter_vihara: filter_vihara.value,
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
    if (page == null) pageInput.value = 1;
    else pageInput.value = page;
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
defineProps({
    kotas_list: Object,
    groups_list: Object,
    viharas_list: Array,
});

const formatDateTime = (dateString) => {
  return new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta", // Sesuaikan timezone
  }).format(new Date(dateString));
};
</script>

<template>
    <Navbar />
    <Head title="Data Umat" />
    <!-- <Navbar /> -->

    <div class="mx-auto flex max-w-7xl flex-col rounded-xl bg-white p-4 text-sm dark:bg-gray-900 dark:text-gray-200">
        <div class="mb-3 hidden rounded-lg border p-2 dark:border-gray-700 lg:block">
            <h2 class="text-xl text-gray-500 dark:text-gray-300">Data Umat</h2>
        </div>
        <div class="flex w-full flex-col gap-2 lg:flex-col lg:items-center lg:gap-5">
            <div class="justify-betwen flex w-full items-center gap-3">
                <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Cari data..."
                    class="w-3/5 rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:ring-blue-400"
                    @input="handleSearch"
                />
                <select
                    v-model="perPage"
                    @change="fetchData"
                    class="w-1/5 rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
                <button
                    @click="navigateToAddData"
                    class="hidden w-1/5 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700 lg:block"
                >
                    Tambah Data
                </button>
                <button @click="toggle = !toggle" class="rounded-lg bg-blue-500 p-2 text-right lg:hidden">
                    <FunnelIcon class="h-4 w-4" />
                </button>
            </div>

            <!-- <DropdownViharaUmat  
                            v-model="filter_vihara"
                            :viharas="viharas_list"
                            :errors="errors"
                            class="mt-1  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                        /> -->
            <div v-if="toggle" class="flex w-full items-center justify-between gap-3">
                <select
                    v-model="filter_kota"
                    @change="fetchData"
                    class="block w-1/3 rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                >
                    <option value="" v-if="toggle">Kota</option>
                    <option value="" v-else>Filter by Kota</option>
                    <option v-for="kota in kotas_list" :key="kota.id" :value="kota.id">
                        {{ kota.nama_kota }}
                    </option>
                </select>

                <select
                    v-model="filter_group"
                    @change="fetchData"
                    class="block w-1/3 rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                >
                    <option value="" v-if="toggle">Group</option>
                    <option value="" v-else>Filter by Group</option>
                    <option v-for="group in groups_list" :key="group.id" :value="group.id">
                        {{ group.nama_group }}
                    </option>
                </select>

                <select
                    v-model="filter_vihara"
                    @change="fetchData"
                    class="block w-1/3 rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                >
                    <option value="" v-if="toggle">Vihara</option>
                    <option value="" v-else>Filter by Vihara</option>
                    <option v-for="vihara in viharas_list" :key="vihara.id" :value="vihara.id">
                        {{ vihara.nama_vihara }}
                    </option>
                </select>
            </div>
                <div  v-if="!toggle" class=" hidden lg:flex w-full items-center gap-3">
                    <select
                        v-model="filter_kota"
                        @change="fetchData"
                        class="block w-1/3 rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                    >
                        <option value="" v-if="toggle">Kota</option>
                        <option value="" v-else>Filter by Kota</option>
                        <option v-for="kota in kotas_list" :key="kota.id" :value="kota.id">
                            {{ kota.nama_kota }}
                        </option>
                    </select>

                    <select
                        v-model="filter_group"
                        @change="fetchData"
                        class="block w-1/3 rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                    >
                        <option value="" v-if="toggle">Group</option>
                        <option value="" v-else>Filter by Group</option>
                        <option v-for="group in groups_list" :key="group.id" :value="group.id">
                            {{ group.nama_group }}
                        </option>
                    </select>

                    <select
                        v-model="filter_vihara"
                        @change="fetchData"
                        class="block w-1/3 rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                    >
                        <option value="" v-if="toggle">Vihara</option>
                        <option value="" v-else>Filter by Vihara</option>
                        <option v-for="vihara in viharas_list" :key="vihara.id" :value="vihara.id">
                            {{ vihara.nama_vihara }}
                        </option>
                    </select>
                </div>
            <div class="lg:hidden">
                <button
                    @click="navigateToAddData"
                    class="block w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700"
                >
                    Tambah Data
                </button>
            </div>
        </div>

        <!-- Scrollable Table Container -->
        <div class="w-full overflow-x-auto py-4">
            <table class="min-w-full table-auto divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <th class="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Aksi</th>
                        <th
                            @click="handleSort('id')"
                            class="cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                        >
                            ID
                        </th>
                        <th
                            @click="handleSort('nama_umat')"
                            class="cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                        >
                            Nama Umat
                        </th>
                        <th
                            @click="handleSort('nama_alias')"
                            class="cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                        >
                            Alias
                        </th>
                        <th
                            @click="handleSort('mandarin')"
                            class="cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                        >
                            中文名
                        </th>
                        <th
                            @click="handleSort('tgl_lahir')"
                            class="cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                        >
                            Umur
                        </th>
                        <th
                            @click="handleSort('jenis_kelamin')"
                            class="cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                        >
                            Gender
                        </th>
                        <th
                            @click="handleSort('status')"
                            class="cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                        >
                            Status
                        </th>
                        <th
                            @click="handleSort('kota.nama_kota')"
                            class="cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                        >
                            Kota
                        </th>
                        <th
                            @click="handleSort('group.nama_group')"
                            class="cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                        >
                            Group
                        </th>
                        <th
                            @click="handleSort('vihara.nama_vihara')"
                            class="cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                        >
                            Vihara
                        </th>
                        <th
                            @click="handleSort('pandita.nama_pandita')"
                            class="cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                        >
                            Pandita
                        </th>

                        <th v-if="userStore.user_role===3"
                            @click="handleSort('created_at')"
                            class="cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                        >
                            Created at
                        </th>
                        <th v-if="userStore.user_role===3"
                            @click="handleSort('created_by')"
                            class="cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                        >
                            Created by
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                    <tr v-for="dataumat in dataumats" :key="dataumat.id">
                        <td class="whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300">
                            <div class="flex space-x-2">
                                <button
                                    @click="navigateToEdit(dataumat.id)"
                                    class="rounded bg-green-500 px-2 py-1 text-white hover:bg-yellow-600 dark:bg-green-600 dark:text-white dark:hover:bg-green-700"
                                >
                                    <PencilIcon class="h-4 w-4" />
                                </button>
                                <button
                                    v-if="userStore.user_role > 1"
                                    @click="confirmDelete(dataumat.id)"
                                    class="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600 dark:bg-red-600 dark:text-white dark:hover:bg-red-700"
                                >
                                    <TrashIcon class="h-4 w-4" />
                                </button>
                                <button
                                    @click="openDetailModal(dataumat.id)"
                                    class="rounded bg-blue-500 px-2 py-1 text-white hover:bg-red-600 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700"
                                >
                                    <MagnifyingGlassIcon class="h-4 w-4" />
                                </button>
                            </div>
                        </td>
                        <td class="whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300">{{ dataumat.id }}</td>
                        <td class="whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300">{{ dataumat.nama_umat }}</td>
                        <td class="whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300">{{ dataumat.nama_alias }}</td>
                        <td class="whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300">{{ dataumat.mandarin }}</td>
                        <td class="whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300">{{ dataumat.umur }}</td>
                        <td class="whitespace-normal px-4 py-2 text-sm" :class="getGenderClass(dataumat.chienkhun)">
                            {{ dataumat.chienkhun }}
                        </td>
                        <td class="whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300">{{ dataumat.status }}</td>
                        <td class="whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300">
                            {{ dataumat.kota_nama }}
                        </td>
                        <td class="whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300">
                            {{ dataumat.group_nama }}
                        </td>
                        <td class="whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300">
                            {{ dataumat.vihara_nama }}
                        </td>
                        <td class="whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300">
                            {{ dataumat.pandita_nama }}
                        </td>
                        <td v-if="userStore.user_role===3" class="whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300">
                            {{ formatDateTime(dataumat.created_at) }}
                        </td>
                        <td v-if="userStore.user_role===3" class="whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300">
                            {{ dataumat.created_by_name }}
                        </td>

                        
                    </tr>
                </tbody>
            </table>
            <!-- Modal Detail -->
            <transition name="fade">
                <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <!-- Modal Container -->
                    <div
                        class="max-h-screen w-full overflow-y-auto rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 dark:text-gray-200 sm:max-w-lg"
                    >
                        <h2 class="text-center text-lg font-semibold dark:text-gray-200">Detail Data Umat</h2>
                        <div v-if="loading" class="py-4 text-center text-gray-500 dark:text-gray-400">Loading...</div>
                        <div v-else-if="selectedUmat" class="mt-4 grid grid-cols-1 gap-6 text-sm lg:grid-cols-2">
                            <!-- Kolom 1 -->
                            <div class="text-sm leading-8 dark:text-gray-300">
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
                                <p><strong>Keterangan:</strong> {{ selectedUmat.keterangan }}</p>
                            </div>
                            <!-- Kolom 2 -->
                            <div class="text-sm leading-8 dark:text-gray-300">
                                <p><strong>Kota:</strong> {{ selectedUmat.kota.nama_kota }}</p>
                                <p><strong>Group:</strong> {{ selectedUmat.group.nama_group }}</p>
                                <p><strong>Vihara Aktif:</strong> {{ selectedUmat.vihara.nama_vihara }}</p>
                                <p><strong>Vihara Asal:</strong> {{ vihara_asal }}</p>
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
                        <!-- Tombol Tutup -->
                        <button
                            @click="closeModal"
                            class="mt-6 w-full rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 dark:bg-red-600 dark:text-white dark:hover:bg-red-700"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            </transition>
        </div>
        <!-- Pagination -->
        <!-- ok1 -->
        <!-- <div class="mt-4 flex mx-auto items-center gap-5"> -->
        <div class="mt-3 flex items-center justify-center gap-2 dark:bg-gray-900 dark:text-gray-200">
            <button
                :disabled="pagination.current_page == 1"
                class="rounded border px-3 py-1 text-xs text-gray-600 shadow-sm transition hover:bg-gray-100 active:scale-95 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 lg:px-4 lg:py-2 lg:text-sm"
                @click="goToPage(pagination.first_page)"
            >
                <ChevronDoubleLeftIcon class="h-4 w-4" />
            </button>
            <button
                :disabled="pagination.current_page == 1"
                @click="goToPage(pagination.current_page - 1)"
                class="rounded border px-3 py-1 text-xs text-gray-600 shadow-sm transition hover:bg-gray-100 active:scale-95 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 lg:px-4 lg:py-2 lg:text-sm"
            >
                <ChevronLeftIcon class="h-4 w-4" />
            </button>
            <!-- <span class="text-sm text-gray-700 dark:text-gray-300"> Halaman {{ pagination.current_page }} dari {{ pagination.last_page }} </span> -->
            <!-- Input Halaman -->
            <div class="flex items-center gap-1 text-xs lg:text-sm">
                <input
                    v-model.number="pageInput"
                    type="number"
                    min="1"
                    :max="pagination.last_page"
                    class="w-16 rounded border px-1 py-1 text-center shadow focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                />
                <span class="text-gray-600 dark:text-gray-300">/ {{ pagination.last_page }}</span>
            </div>
            <button
                :disabled="pagination.current_page === pagination.last_page"
                @click="goToPage(pagination.current_page + 1)"
                class="rounded border px-3 py-1 text-xs text-gray-600 shadow-sm transition hover:bg-gray-100 active:scale-95 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 lg:px-4 lg:py-2 lg:text-sm"
            >
                <ChevronRightIcon class="h-4 w-4" />
            </button>
            <button
                :disabled="pagination.current_page === pagination.last_page"
                class="rounded border px-3 py-1 text-xs text-gray-600 shadow-sm transition hover:bg-gray-100 active:scale-95 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 lg:px-4 lg:py-2 lg:text-sm"
                @click="goToPage(pagination.last_page)"
            >
                <ChevronDoubleRightIcon class="h-4 w-4" />
            </button>
        </div>
    </div>
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
