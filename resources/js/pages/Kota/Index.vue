<script setup>
import Pagination from '@/components/Pagination.vue';
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/solid';
import { router } from '@inertiajs/vue3';
import { ref, watch } from 'vue';

import AppLayout from '@/layouts/AppLayout.vue';
import { Head, Link, usePage } from '@inertiajs/vue3';
import { useToast } from 'vue-toastification';
const toast = useToast();
const page = usePage();
// @click="router.delete(route('kotas.destroy', kota.id))"

const confirmDelete = (id) => {
    if (window.confirm('Apakah yakin ingin menghapus data ini?')) {
        router.delete(route('kotas.destroy', id));
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
        title: 'Kota',
        href: '/kotas',
    },
];
defineProps({
    kotas: Object,
    filters: Object,
});

const search = ref('');

function applyFilters() {
    router.get(
        '/kotas',
        {
            search: search.value,
        },
        {
            preserveState: true,
        },
    );
}
</script>

<template>
    <Head title="Kota" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div class="flex flex-col justify-between gap-2 md:mb-4 md:w-1/2 md:flex-row md:items-center">
                <input
                    v-model="search"
                    type="text"
                    placeholder="Cari..."
                    class="rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-3/4"
                    @input="applyFilters"
                />
                <Link
                    :href="route('kotas.create')"
                    class="rounded bg-blue-500 py-2 text-center text-white hover:bg-blue-600 md:w-1/4 md:px-4 md:py-2"
                >
                    Tambah Kota
                </Link>
                <!-- <Link :href="route('kotas.create')" class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"> Tambah Data Kota </Link> -->
            </div>

            <table class="min-w-full border bg-white">
                <thead>
                    <tr>
                        <th class="border-b p-2 text-left font-medium text-gray-700">Nama Kota</th>
                        <th class="border-b p-2 text-left font-medium text-gray-700">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="kota in kotas.data" :key="kota.id" class="border-b text-sm">
                        <td class="p-2">{{ kota.nama_kota }}</td>
                        <td class="flex space-x-2 p-2">
                            <Link :href="route('kotas.edit', kota.id)" class="rounded bg-green-500 px-2 py-1 text-sm text-white hover:bg-green-600">
                                <PencilIcon class="h-4 w-4" />
                            </Link>
                            <button @click="confirmDelete(kota.id)" class="rounded bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600">
                                <TrashIcon class="h-4 w-4" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Pagination :links="kotas.links" />
        </div>
    </AppLayout>
</template>
