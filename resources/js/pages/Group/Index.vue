<script setup>
import Navbar from '@/components/Navbar.vue';
import SimplePagination from '@/components/SimplePagination.vue';

// import Pagination from '@/components/Pagination.vue';
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/solid';
import { Head, router } from '@inertiajs/vue3';
import { ref } from 'vue';

import { Link, usePage } from '@inertiajs/vue3';
import { watch } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();
const page = usePage();

const confirmDelete = (id) => {
    if (window.confirm('Apakah yakin ingin menghapus data ini?')) {
        router.delete(route('groups.destroy', id));
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
        title: 'Group',
        href: '/groups',
    },
];
// Props dari backend
defineProps({
    groups: Object, // Daftar semua group dengan pagination
});

// State untuk input search
const search = ref('');
const perPage = ref(10);

async function fetchData() {
    try {
        const page = await new Promise((resolve, reject) => {
            router.get(
                '/groups',
                {
                    search: search.value,
                    perPage: perPage.value,
                },
                {
                    preserveState: true,
                    onSuccess: resolve,
                    onError: reject,
                },
            );
        });

        console.log('Data berhasil dimuat', page.props);
    } catch (error) {
        console.error('Gagal memuat data:', error);
    }
}
function navigateToEdit(id) {
    router.get(route('groups.edit', id)); // Pastikan named route sesuai dengan Laravel
}
</script>

<template>
    <Head title="Group" />

    <Navbar />

    <div class="mx-auto flex max-w-7xl flex-col rounded-xl p-4 text-sm bg-white dark:bg-gray-900 dark:text-gray-200">
        <div class="mb-3 hidden rounded-lg border p-2 md:block dark:border-gray-700">
            <h2 class="text-xl text-gray-500 dark:text-gray-300">Group</h2>
        </div>
        <div class="flex w-full flex-col gap-2 md:flex-row md:items-center md:gap-5">
            <div class="flex flex-col gap-2 md:flex-row md:gap-5">
                <div class="flex w-full items-center justify-between gap-3">
                    <input
                        v-model="search"
                        type="text"
                        placeholder="Cari..."
                        class="w-3/4 rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:focus:ring-blue-400 dark:text-gray-200"
                        @input="fetchData"
                    />
                    <select
                        v-model="perPage"
                        @change="fetchData"
                        class="w-1/4 rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </div>
            </div>
            <div>
                <Link
                    :href="route('groups.create')"
                    class="block rounded bg-blue-500 px-4 py-2 text-center text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
                >
                    Tambah Data Group
                </Link>
            </div>
        </div>

        <!-- Tabel Data -->
        <div class="w-full overflow-x-auto py-4">
            <table class="min-w-full table-auto divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <th class="cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                            Nama Group
                        </th>
                        <th class="cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                            Kota
                        </th>
                        <th class="cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                            Aksi
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                    <tr v-for="group in groups.data" :key="group.id" class="border-b text-sm">
                        <td class="whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300">{{ group.nama_group }}</td>
                        <td class="whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300">{{ group.kota ? group.kota.nama_kota : '-' }}</td>
                        <td class="space-x-1 px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                            <button
                                @click="navigateToEdit(group.id)"
                                class="rounded bg-green-500 px-2 py-1 text-sm text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                            >
                                <PencilIcon class="h-4 w-4" />
                            </button>
                            <button
                                @click="confirmDelete(group.id)"
                                class="rounded bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                            >
                                <TrashIcon class="h-4 w-4" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="mt-4">
            <!-- <Pagination :links="groups.links" /> -->
            <SimplePagination :links="groups.links" class="dark:text-gray-300" />
        </div>
    </div>
</template>
<style scoped>
/* Ensure only the table is scrollable horizontally */

/* Prevent the entire page from scrolling horizontally */

th,
td {
    white-space: nowrap;
}
</style>
