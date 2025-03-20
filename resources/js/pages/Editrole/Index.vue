<script setup>
import SimplePagination from '@/components/SimplePagination.vue';
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/solid';
import { Head, router } from '@inertiajs/vue3';
import Navbar from '@/components/Navbar.vue';


import { Link, usePage } from '@inertiajs/vue3';
import { watch } from 'vue';

import { ref } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();
const page = usePage();

const breadcrumbs = [
    {
        title: 'Edit Role',
        href: '/editrole',
    },
];

async function fetchData() {
    try {
        const page = await new Promise((resolve, reject) => {
            router.get(
                '/editroles',
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

watch(
    () => page.props.flash.toast,
    (flash) => {
        if (flash?.message) {
            toast[flash.type ?? 'info'](flash.message);
        }
    },
    { immediate: true },
);

const search = ref('');
const perPage = ref(10);
// Props dari backend
defineProps({
    users: Object, // Daftar semua group dengan pagination
});

function role_name($id) {
    switch ($id) {
        case 0:
            return 'Belum ada Role';
            break;
        case 1:
            return 'Admin';
            break;
        case 2:
            return 'Super Admin';
            break;
        case 3:
            return 'Developer';
            break;
    }
}

const confirmDelete = (id) => {
    if (window.confirm('Apakah yakin ingin menghapus data ini?')) {
        router.delete(route('editroles.destroy', id));
    }
};
</script>

<template>
<Navbar />
    <Head title="User Role" />
    <div class="mx-auto flex max-w-7xl flex-col rounded-xl p-4 text-sm bg-white dark:bg-gray-900 dark:text-gray-200">

        <div class="mb-3 hidden rounded-lg border p-2 md:block dark:border-gray-700">
            <h2 class="text-xl text-gray-500 dark:text-gray-300">User Role</h2>
        </div>
        <div class="flex w-full flex-col gap-2 md:flex-row md:items-center md:gap-5">
            <div class="flex flex-col gap-2 md:flex-row md:gap-5">
                <div class="flex w-full items-center justify-between gap-3">
                    <input
                        v-model="search"
                        type="text"
                        placeholder="Cari ..."
                        class="w-3/4 rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:ring-blue-400"
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
        </div>
        <!-- table -->
        <div class="w-full overflow-x-auto py-4">
            <table class="min-w-full border bg-white dark:bg-gray-800 dark:border-gray-700">
                <thead>
                    <tr>
                        <th class="border-b p-2 text-left font-medium text-gray-700 dark:text-gray-300"></th>
                        <th class="border-b p-2 text-left font-medium text-gray-700 dark:text-gray-300">Nama</th>
                        <th class="border-b p-2 text-left font-medium text-gray-700 dark:text-gray-300">Email</th>
                        <th class="border-b p-2 text-left font-medium text-gray-700 dark:text-gray-300">Role</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users.data" :key="user.id" class="border-b dark:border-gray-700">
                        <td class="flex space-x-2 p-2">
                            <Link
                                :href="route('editroles.edit', user.id)"
                                class="rounded bg-green-500 px-2 py-1 text-sm text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                            >
                                <PencilIcon class="h-4 w-4" />
                            </Link>
                            <button
                                @click="confirmDelete(user.id)"
                                class="rounded bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                            >
                                <TrashIcon class="h-4 w-4" />
                            </button>
                        </td>
                        <td class="p-2 text-gray-700 dark:text-gray-300">{{ user.name }}</td>
                        <td class="p-2 text-gray-700 dark:text-gray-300">{{ user.email }}</td>
                        <td class="p-2 text-gray-700 dark:text-gray-300">{{ role_name(user.role) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <SimplePagination :links="users.links" class="dark:text-gray-300" />
    </div>
</template>
<style scoped>
/* Ensure only the table is scrollable horizontally */

th,
td {
    white-space: nowrap;
}
</style>