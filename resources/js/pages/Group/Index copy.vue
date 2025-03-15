<script setup>
// import SimplePagination from '@/components/SimplePagination.vue';
import Pagination from '@/components/Pagination.vue';
import { router } from '@inertiajs/vue3';
import { ref } from 'vue';

import AppLayout from '@/layouts/AppLayout.vue';
import { Link } from '@inertiajs/vue3';

const breadcrumbs = [
    {
        title: 'Kota',
        href: '/kotas',
    },
];
// Props dari backend
defineProps({
    groups: Object, // Daftar semua group dengan pagination
    filters: Object, // Filter pencarian
});

// State untuk input search
const search = ref('');
// const search = ref(filters.search || '');
const perPage = ref(10);
// const groups = ref([]);

function fetchData() {
    router.get(
        '/groups',
        {
            search: search.value,
            perPage: perPage.value,
        },
        {
            preserveState: true,
            onSuccess: (page) => {
                console.log('Data berhasil dimuat', page.props);
            },
        },
    );
}

// Fungsi untuk menerapkan filter pencarian
function applyFilters() {
    router.get(
        '/groups',
        {
            search: search.value,
        },
        {
            preserveState: true, // Tetap mempertahankan state halaman saat ini
        },
    );
}
</script>

<template>
    <Head title="Data Umat" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div class="max-w-7xl py-6 sm:px-6 lg:px-8">
                <!-- Header -->
                <div class="mb-4 flex items-center justify-between">
                    <div class="flex gap-3">
                        <input
                            v-model="search"
                            type="text"
                            placeholder="Cari..."
                            class="rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            @input="applyFilters"
                        />
                        <select
                            v-model="perPage"
                            @change="fetchData"
                            class="rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                    </div>

                    <Link :href="route('groups.create')" class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"> Tambah Data Group </Link>
                </div>

                <!-- Tabel Data -->
                <table class="min-w-full border bg-white">
                    <thead>
                        <tr>
                            <th class="border-b p-2 text-left font-medium text-gray-700">Nama Group</th>
                            <th class="border-b p-2 text-left font-medium text-gray-700">Kota</th>
                            <th class="border-b p-2 text-left font-medium text-gray-700">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="group in groups.data" :key="group.id" class="border-b">
                            <td class="p-2">{{ group.nama_group }}</td>
                            <td class="p-2">{{ group.kota ? group.kota.nama_kota : '-' }}</td>
                            <td class="space-x-2 p-2">
                                <Link
                                    :href="route('groups.edit', group.id)"
                                    class="rounded bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
                                >
                                    Edit
                                </Link>
                                <button
                                    @click="router.delete(route('groups.destroy', group.id))"
                                    class="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- Pagination -->
                <div class="mt-4">
                    <!-- <Pagination :links="groups.links" /> -->
                    <Pagination :links="groups.links" />
                </div>
            </div>
        </div>
    </AppLayout>
</template>
