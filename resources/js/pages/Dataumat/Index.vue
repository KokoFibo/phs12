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

const toggle = ref(false); // default mobile = off
const is_email = ref(false); // default mobile = off

function sendEmail() {}

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

function reset_filter() {
    // Reset teks pencarian
    searchQuery.value = '';

    // Reset pagination
    pageInput.value = 1;

    // Reset sorting
    sortBy.value = 'id';
    sortOrder.value = 'desc';

    // Reset semua filter
    filter_kota.value = '';
    filter_group.value = '';
    filter_vihara.value = '';
    filter_pandita.value = '';
    filter_tahun.value = '';

    filter_usia_start.value = '';
    filter_usia_end.value = '';

    filter_vegetarian.value = '';
    filter_sidang_dharma.value = '';

    // Fetch ulang data
    fetchData(1);
}

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
const sortOrder = ref('desc');
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
const filter_pandita = ref('');
const filter_tahun = ref('');
const filter_usia_start = ref('');
const filter_usia_end = ref('');
const filter_vegetarian = ref('');
const filter_sidang_dharma = ref('');
const emailTo = ref('');
const email_excel = ref('');
const email_pdf = ref('');

function formatTanggal(dateString) {
    if (!dateString || dateString === '0000-00-00' || dateString === '-') {
        return 'Belum Terdata';
    }

    const opsi = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateString);

    // Menggunakan locale Indonesia ('id-ID')
    return date.toLocaleDateString('id-ID', opsi);
}

// const pageInput = ref(pagination.current_page);
const pageInput = ref(1);

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
        // filter_kota.value = '';
        // filter_vihara.value = '';
    }
});
watch(filter_vihara, (newValue) => {
    if (newValue) {
        // filter_group.value = '';
        // filter_kota.value = '';
        // fetchData();
    }
});
watch(filter_pandita, (newValue) => {
    if (newValue) {
        // filter_group.value = '';
        // filter_kota.value = '';
        // fetchData();
    }
});
watch(filter_tahun, (newValue) => {
    if (newValue) {
        // filter_group.value = '';
        // filter_kota.value = '';
        // fetchData();
    }
});
watch(filter_vegetarian, (newValue) => {
    if (newValue == '1') {
        filter_sidang_dharma.value = '1';
    }
});
watch(filter_usia_start, () => fetchData());
watch(filter_usia_end, () => fetchData());

function fetchEmail() {
    const params = new URLSearchParams({
        search: searchQuery.value ?? '',
        sort_by: sortBy.value,
        sort_order: sortOrder.value,
        per_page: perPage.value,
        page: page.value,
        filter_kota: filter_kota.value,
        filter_group: filter_group.value,
        filter_vihara: filter_vihara.value,
        filter_pandita: filter_pandita.value,
        filter_tahun: filter_tahun.value,
        filter_usia_start: filter_usia_start.value,
        filter_usia_end: filter_usia_end.value,
        filter_vegetarian: filter_vegetarian.value,
        filter_sidang_dharma: filter_sidang_dharma.value,
        emailTo: emailTo.value,
        email_excel: email_excel.value,
        email_pdf: email_pdf.value,
    });

    window.location.href = `/send-email?${params.toString()}`;
}

function fetchPDF() {
    const params = new URLSearchParams({
        search: searchQuery.value ?? '',
        sort_by: sortBy.value,
        sort_order: sortOrder.value,
        per_page: perPage.value,
        page: page.value,
        filter_kota: filter_kota.value,
        filter_group: filter_group.value,
        filter_vihara: filter_vihara.value,
        filter_pandita: filter_pandita.value,
        filter_tahun: filter_tahun.value,
        filter_usia_start: filter_usia_start.value,
        filter_usia_end: filter_usia_end.value,
        filter_vegetarian: filter_vegetarian.value,
        filter_sidang_dharma: filter_sidang_dharma.value,
    });

    window.location.href = `/dataumat/export-pdf?${params.toString()}`;
}

function fetchExcel() {
    const params = new URLSearchParams({
        search: searchQuery.value ?? '',
        sort_by: sortBy.value,
        sort_order: sortOrder.value,
        per_page: perPage.value,
        page: page.value,
        filter_kota: filter_kota.value,
        filter_group: filter_group.value,
        filter_vihara: filter_vihara.value,
        filter_pandita: filter_pandita.value,
        filter_tahun: filter_tahun.value,
        filter_usia_start: filter_usia_start.value,
        filter_usia_end: filter_usia_end.value,
        filter_vegetarian: filter_vegetarian.value,
        filter_sidang_dharma: filter_sidang_dharma.value,
    });

    window.location.href = `/dataumat/export-excel?${params.toString()}`;
}

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
            filter_pandita: filter_pandita.value,
            filter_tahun: filter_tahun.value,

            filter_usia_start: filter_usia_start.value,
            filter_usia_end: filter_usia_end.value,

            filter_vegetarian: filter_vegetarian.value,
            filter_sidang_dharma: filter_sidang_dharma.value,
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
    panditas_list: Array,
    tahuns_list: Array,
});

const formatDateTime = (dateString) => {
    return new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Jakarta', // Sesuaikan timezone
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
                <button @click="toggle = !toggle" class="rounded-lg bg-blue-500 p-2 text-right">
                    <FunnelIcon class="h-4 w-4" />
                </button>
            </div>
            <div v-if="toggle" class="space-y-3 transition-all duration-300 ease-out">
                <!-- FILTER BARIS 1 -->
                <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <select
                        v-model="filter_kota"
                        @change="fetchData"
                        class="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    >
                        <option value="">Semua Kota</option>
                        <option v-for="kota in kotas_list" :key="kota.id" :value="kota.id">
                            {{ kota.nama_kota }}
                        </option>
                    </select>

                    <select
                        v-model="filter_group"
                        @change="fetchData"
                        class="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    >
                        <option value="">Semua Group</option>
                        <option v-for="group in groups_list" :key="group.id" :value="group.id">
                            {{ group.nama_group }}
                        </option>
                    </select>

                    <select
                        v-model="filter_vihara"
                        @change="fetchData"
                        class="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    >
                        <option value="">Semua Vihara</option>
                        <option v-for="vihara in viharas_list" :key="vihara.id" :value="vihara.id">
                            {{ vihara.nama_vihara }}
                        </option>
                    </select>

                    <select
                        v-model="filter_tahun"
                        @change="fetchData"
                        class="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    >
                        <option value="">Semua Tahun</option>
                        <option v-for="tahun in tahuns_list" :key="tahun" :value="tahun">
                            {{ tahun }}
                        </option>
                    </select>
                </div>

                <!-- FILTER BARIS 2 -->
                <div class="space-y-3">
                    <!-- usia -->
                    <div class="grid grid-cols-2 gap-3">
                        <input
                            v-model="filter_usia_start"
                            type="text"
                            placeholder="Mulai usia"
                            class="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                        />

                        <input
                            v-model="filter_usia_end"
                            type="text"
                            placeholder="Sampai usia"
                            class="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                        />
                    </div>
                </div>
                <div class="space-y-3 lg:grid lg:grid-cols-3 lg:gap-3 lg:space-y-0">
                    <!-- vegetarian -->
                    <select
                        v-model="filter_vegetarian"
                        @change="fetchData"
                        class="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    >
                        <option value="">Vegetarian (Semua)</option>
                        <option value="1">Vegetarian</option>
                        <option value="2">Belum Vegetarian</option>
                    </select>

                    <!-- sidang dharma -->
                    <select
                        v-if="filter_vegetarian != '1'"
                        v-model="filter_sidang_dharma"
                        @change="fetchData"
                        class="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    >
                        <option value="">Sidang Dharma 3 Hari (Semua)</option>
                        <option value="1">Sudah Pernah</option>
                        <option value="2">Belum Pernah</option>
                    </select>

                    <div class="gap-2 space-y-2 lg:flex lg:justify-end lg:space-y-0">
                        <!-- reset -->
                        <button
                            @click="fetchExcel"
                            class="w-full rounded-md bg-green-600 p-2 text-center text-sm font-semibold text-white shadow hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                        >
                            Excel
                        </button>

                        <!-- PDF Sementara diatngguhkan -->
                        <!-- <button
                            @click="fetchPDF"
                            class="w-full rounded-md bg-red-600 p-2 text-center text-sm font-semibold text-white shadow hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
                        >
                            PDF
                        </button> -->
                        <!-- Email Sementara diatngguhkan -->

                        <!-- <button
                            @click="is_email = !is_email"
                            class="w-full rounded-md bg-black p-2 text-center text-sm font-semibold text-white shadow hover:bg-black dark:bg-black dark:hover:bg-black"
                        >
                            Email to
                        </button> -->
                        <!-- reset -->
                        <button
                            @click="reset_filter"
                            class="w-full rounded-md bg-blue-600 p-2 text-center text-sm font-semibold text-white shadow hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                        >
                            Reset Filter
                        </button>
                    </div>
                </div>
                <div class="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-start" v-if="is_email == true">
                    <!-- Input Email -->
                    <input
                        v-model="emailTo"
                        type="email"
                        placeholder="Masukkan email"
                        class="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 lg:w-2/3"
                    />

                    <!-- Grup Checkbox -->
                    <div class="flex items-center gap-4">
                        <!-- Excel Checkbox -->
                        <label class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <input type="checkbox" v-model="email_excel" class="h-4 w-4 rounded border-gray-300 dark:border-gray-700" />
                            Excel
                        </label>

                        <!-- PDF Checkbox -->
                        <label class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <input type="checkbox" v-model="email_pdf" class="h-4 w-4 rounded border-gray-300 dark:border-gray-700" />
                            PDF
                        </label>
                    </div>

                    <!-- Button Kirim -->
                    <button
                        @click="fetchEmail"
                        class="w-full rounded-md bg-red-600 p-2 text-center text-sm font-semibold text-white shadow hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 lg:w-auto"
                    >
                        Kirim Email
                    </button>
                </div>
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
                            @click="handleSort('tgl_lahir')"
                            class="cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                        >
                            Tanggal Lahir
                        </th>
                        <th
                            @click="handleSort('jenis_kelamin')"
                            class="cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                        >
                            Gender
                        </th>
                        <th
                            @click="handleSort('tgl_mohonTao')"
                            class="cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                        >
                            Tgl Mohon Tao
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

                        <th
                            v-if="userStore.user_role === 3"
                            @click="handleSort('created_at')"
                            class="cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                        >
                            Created at
                        </th>
                        <th
                            v-if="userStore.user_role === 3"
                            @click="handleSort('created_by')"
                            class="cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                        >
                            Created by
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                    <tr v-for="dataumat in dataumats" :key="dataumat.id" :class="dataumat.status === 'Inactive' ? 'bg-slate-200' : ''">
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
                        <td class="whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300">{{ formatTanggal(dataumat.tgl_lahir) }}</td>

                        <td class="whitespace-normal px-4 py-2 text-sm" :class="getGenderClass(dataumat.chienkhun)">
                            <!-- {{ dataumat.gender }} -->
                            {{ dataumat.chienkhun }}
                        </td>
                        <td class="whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300">
                            {{ formatTanggal(dataumat.tgl_mohonTao) }}
                        </td>
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
                        <td v-if="userStore.user_role === 3" class="whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300">
                            {{ formatDateTime(dataumat.created_at) }}
                        </td>
                        <td v-if="userStore.user_role === 3" class="whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300">
                            {{ dataumat.created_by_name }}
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- Modal Detail -->
            <transition name="fade">
                <!-- Modal data umat -->
                <div
                    v-if="isModalOpen"
                    class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-md transition-all"
                    @click.self="closeModal"
                >
                    <div
                        class="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl dark:bg-gray-900"
                    >
                        <div class="flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6 text-white">
                            <div>
                                <h2 class="text-2xl font-extrabold tracking-tight">Detail Data Umat</h2>
                                <p class="mt-1 text-sm text-blue-100">ID: {{ selectedUmat?.id }} • {{ selectedUmat?.status }}</p>
                            </div>
                            <button @click="closeModal" class="rounded-full p-2 transition-colors hover:bg-white/20">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div class="custom-scrollbar flex-1 overflow-y-auto bg-slate-50 p-8 dark:bg-gray-950">
                            <div v-if="loading" class="flex justify-center py-20">
                                <div class="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
                            </div>

                            <div v-else-if="selectedUmat" class="grid grid-cols-1 gap-8 lg:grid-cols-3">
                                <div class="space-y-6 lg:col-span-1">
                                    <div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                                        <h3 class="mb-4 text-xs font-bold uppercase tracking-widest text-blue-600">Informasi Utama</h3>
                                        <div class="space-y-4">
                                            <div>
                                                <label class="block text-[10px] font-bold uppercase text-gray-400">Nama Lengkap</label>
                                                <p class="text-lg font-bold leading-tight text-gray-800 dark:text-white">
                                                    {{ selectedUmat.nama_umat }}
                                                </p>
                                            </div>
                                            <div>
                                                <label class="block text-[10px] font-bold uppercase text-gray-400">Mandarin / Alias</label>
                                                <p class="text-sm font-semibold text-indigo-600">
                                                    {{ selectedUmat.mandarin }}
                                                    <span class="font-normal text-gray-400">({{ selectedUmat.nama_alias }})</span>
                                                </p>
                                            </div>
                                            <div class="grid grid-cols-2 gap-4 pt-2">
                                                <div>
                                                    <label class="block text-[10px] font-bold uppercase text-gray-400">Umur</label>
                                                    <p class="text-sm font-medium">{{ umur }} Tahun</p>
                                                </div>
                                                <div>
                                                    <label class="block text-[10px] font-bold uppercase text-gray-400">Gender</label>
                                                    <p class="text-sm font-medium">{{ chienkhun }}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                                        <h3 class="mb-4 text-xs font-bold uppercase tracking-widest text-blue-600">Kontak & Alamat</h3>
                                        <div class="space-y-4 text-sm">
                                            <div class="flex items-start gap-3">
                                                <span class="rounded-lg bg-blue-50 p-2 text-blue-600">📱</span>
                                                <div>
                                                    <p class="font-bold">HP: {{ selectedUmat.hp || '-' }}</p>
                                                    <p class="text-wrap text-xs text-gray-500">Telp: {{ selectedUmat.telp || '-' }}</p>
                                                </div>
                                            </div>
                                            <div class="flex items-start gap-3">
                                                <span class="rounded-lg bg-orange-50 p-2 text-orange-600">📍</span>
                                                <div>
                                                    <p class="font-bold">{{ selectedUmat.kota.nama_kota }}</p>
                                                    <p class="text-xs leading-relaxed text-gray-500">{{ selectedUmat.alamat }}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="space-y-6 lg:col-span-2">
                                    <div
                                        class="grid grid-cols-1 gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:grid-cols-2"
                                    >
                                        <div class="mb-2 flex items-center justify-between border-b pb-2 md:col-span-2">
                                            <h3 class="text-xs font-bold uppercase tracking-widest text-blue-600">Afiliasi & Vihara</h3>
                                            <span class="rounded bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-700">{{
                                                selectedUmat.group.nama_group
                                            }}</span>
                                        </div>

                                        <div class="space-y-1">
                                            <label class="text-[10px] font-bold uppercase leading-none text-gray-400">Vihara Aktif</label>
                                            <p class="text-sm font-bold text-gray-800 dark:text-gray-200">{{ selectedUmat.vihara.nama_vihara }}</p>
                                        </div>
                                        <div class="space-y-1">
                                            <label class="text-[10px] font-bold uppercase leading-none text-gray-400">Vihara Asal</label>
                                            <p class="text-sm font-semibold text-gray-600">{{ vihara_asal }}</p>
                                        </div>
                                        <div class="space-y-1">
                                            <label class="text-[10px] font-bold uppercase leading-none text-gray-400">Pandita</label>
                                            <p class="text-sm font-bold text-gray-800 dark:text-gray-200">{{ selectedUmat.pandita.nama_pandita }}</p>
                                        </div>
                                        <div class="space-y-1">
                                            <label class="text-[10px] font-bold uppercase leading-none text-gray-400">Pengajak / Penjamin</label>
                                            <p class="text-sm font-semibold text-gray-600">
                                                {{ selectedUmat.pengajak }} / {{ selectedUmat.penjamin }}
                                            </p>
                                        </div>
                                    </div>

                                    <div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                                        <h3 class="mb-4 text-xs font-bold uppercase tracking-widest text-blue-600">Riwayat Spiritual</h3>
                                        <div class="grid grid-cols-1 gap-x-12 gap-y-6 sm:grid-cols-2">
                                            <div class="relative border-l-2 border-blue-100 pl-6">
                                                <div class="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-4 border-white bg-blue-600"></div>
                                                <label class="block text-[10px] font-bold uppercase text-gray-400">Mohon Tao</label>
                                                <p class="text-sm font-bold text-gray-800 dark:text-gray-200">
                                                    {{ formatTanggal(selectedUmat.tgl_mohonTao) }}
                                                </p>
                                                <p class="text-xs text-gray-500">{{ tanggal_mohon_Tao_lunar }}</p>
                                            </div>

                                            <div class="relative border-l-2 border-green-100 pl-6">
                                                <div class="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-4 border-white bg-green-500"></div>
                                                <label class="block text-[10px] font-bold uppercase text-gray-400">Sidang Dharma (SD3H)</label>
                                                <p class="text-sm font-bold text-gray-800 dark:text-gray-200">
                                                    {{ formatTanggal(selectedUmat.tgl_sd3h) || '-' }}
                                                </p>
                                            </div>

                                            <div class="relative border-l-2 border-purple-100 pl-6">
                                                <div
                                                    class="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-4 border-white bg-purple-500"
                                                ></div>
                                                <label class="block text-[10px] font-bold uppercase text-gray-400">Vegetarian Total</label>
                                                <p class="text-sm font-bold text-gray-800 dark:text-gray-200">
                                                    {{ formatTanggal(selectedUmat.tgl_vtotal) || '-' }}
                                                </p>
                                            </div>

                                            <div class="relative border-l-2 border-gray-100 pl-6">
                                                <div class="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-4 border-white bg-gray-400"></div>
                                                <label class="block text-[10px] font-bold uppercase text-gray-400">Keterangan</label>
                                                <p class="text-xs italic text-gray-500">
                                                    {{ selectedUmat.keterangan || 'Tidak ada keterangan tambahan.' }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex justify-end border-t bg-white px-8 py-5 dark:bg-gray-900">
                            <button
                                @click="closeModal"
                                class="transform rounded-2xl bg-slate-900 px-10 py-3 font-bold text-white shadow-lg transition-all hover:bg-black active:scale-95"
                            >
                                Tutup Detail
                            </button>
                        </div>
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
