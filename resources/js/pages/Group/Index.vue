<script setup>
// import SimplePagination from '@/components/SimplePagination.vue';
import Pagination from '@/components/Pagination.vue';
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/solid';
import { Head, router } from '@inertiajs/vue3';
import { ref } from 'vue';

import AppLayout from '@/layouts/AppLayout.vue';
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
</script>

<template>
    <Head title="Group" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl px-4 md:p-4">
            <div class="py-6 sm:px-6 lg:px-8">
                <!-- Header -->
                <div class="mb-4 flex flex-col gap-4 md:mb-4 md:w-1/2 md:flex-row md:items-center md:justify-between">
                    <div class="flex items-center justify-between gap-3 md:w-2/3">
                        <input
                            v-model="search"
                            type="text"
                            placeholder="Cari..."
                            class="w-3/4 rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            @input="fetchData"
                        />
                        <select
                            v-model="perPage"
                            @change="fetchData"
                            class="w-1/4 rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                    <div>
                        <Link :href="route('groups.create')" class="block rounded bg-blue-500 px-4 py-2 text-center text-white hover:bg-blue-600">
                            Tambah Data Group
                        </Link>
                    </div>
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
                        <tr v-for="group in groups.data" :key="group.id" class="border-b text-sm">
                            <td class="p-2">{{ group.nama_group }}</td>
                            <td class="p-2">{{ group.kota ? group.kota.nama_kota : '-' }}</td>
                            <td class="flex space-x-2 p-2">
                                <Link
                                    :href="route('groups.edit', group.id)"
                                    class="rounded bg-green-500 px-2 py-1 text-sm text-white hover:bg-green-600"
                                >
                                    <PencilIcon class="h-4 w-4" />
                                </Link>
                                <!-- <button
                                    @click="router.delete(route('groups.destroy', group.id))"
                                    class="rounded bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600"
                                >
                                    Hapus
                                </button> -->
                                <button @click="confirmDelete(group.id)" class="rounded bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600">
                                    <TrashIcon class="h-4 w-4" />
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
