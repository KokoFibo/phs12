<script setup>
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
    <Head title="Data Umat" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div class="mb-4 flex items-center justify-between">
                <input
                    v-model="search"
                    type="text"
                    placeholder="Cari..."
                    class="rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    @input="applyFilters"
                />
                <Link :href="route('kotas.create')" class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"> Tambah Data Kota </Link>
            </div>

            <table class="min-w-full border bg-white">
                <thead>
                    <tr>
                        <th class="border-b p-2 text-left font-medium text-gray-700">Nama Kota</th>
                        <th class="border-b p-2 text-left font-medium text-gray-700">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="kota in kotas.data" :key="kota.id" class="border-b">
                        <td class="p-2">{{ kota.nama_kota }}</td>
                        <td class="space-x-2 p-2">
                            <Link :href="route('kotas.edit', kota.id)" class="rounded bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600">
                                Edit
                            </Link>
                            <button
                                @click="router.delete(route('kotas.destroy', kota.id))"
                                class="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                            >
                                Hapus
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <pagination :links="kotas.links" />
    </AppLayout>
</template>
