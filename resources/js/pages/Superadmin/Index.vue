<script setup>
import Pagination from '@/components/Pagination.vue';
import { Head, router } from '@inertiajs/vue3';

import AppLayout from '@/layouts/AppLayout.vue';
import { Link, usePage } from '@inertiajs/vue3';
import { watch } from 'vue';

import { useToast } from 'vue-toastification';

const toast = useToast();
const page = usePage();

const breadcrumbs = [
    {
        title: 'Super Admin Only',
        href: '/superadmin',
    },
];
watch(
    () => page.props.flash.toast,
    (flash) => {
        if (flash?.message) {
            toast[flash.type ?? 'info'](flash.message);
        }
    },
    { immediate: true },
);
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
        router.delete(route('superadmins.destroy', id));
    }
};
</script>

<template>
    <Head title="Super Admin Only" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div class="max-w-7xl py-6 sm:px-6 lg:px-8">
                <!-- Header -->
                <!-- <div class="mb-4 flex items-center justify-between">
                    <div class="flex gap-3">
                        <input
                            v-model="search"
                            type="text"
                            placeholder="Cari..."
                            class="rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            @input="fetchData"
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

                </div> -->

                <!-- Tabel Data -->
                <table class="min-w-full border bg-white">
                    <thead>
                        <tr>
                            <th class="border-b p-2 text-left font-medium text-gray-700"></th>
                            <th class="border-b p-2 text-left font-medium text-gray-700">Nama</th>
                            <th class="border-b p-2 text-left font-medium text-gray-700">Email</th>
                            <th class="border-b p-2 text-left font-medium text-gray-700">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users.data" :key="user.id" class="border-b">
                            <td class="space-x-2 p-2">
                                <Link
                                    :href="route('superadmins.edit', user.id)"
                                    class="rounded bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
                                >
                                    Edit
                                </Link>
                                <!-- <button
                                    @click="router.delete(route('users.destroy', user.id))"
                                    class="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                                >
                                    Hapus
                                </button> -->
                                <button @click="confirmDelete(user.id)" class="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600">
                                    Delete
                                </button>
                            </td>
                            <td class="p-2">{{ user.name }}</td>
                            <td class="p-2">{{ user.email }}</td>
                            <td class="p-2">{{ role_name(user.role) }}</td>
                        </tr>
                    </tbody>
                </table>

                <!-- Pagination -->
                <div class="mt-4">
                    <!-- <Pagination :links="groups.links" /> -->
                    <Pagination :links="users.links" />
                </div>
            </div>
        </div>
    </AppLayout>
</template>
