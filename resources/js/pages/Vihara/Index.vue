<script setup>
import { router } from '@inertiajs/vue3';
import { ref } from 'vue';

import AppLayout from '@/layouts/AppLayout.vue';
import { Link } from '@inertiajs/vue3';

const breadcrumbs = [
    {
        title: 'Vihara',
        href: '/viharas',
    },
];
defineProps({
    viharas: Object,
    filters: Object,
});

const search = ref('');

function applyFilters() {
    router.get(
        '/viharas',
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
    <Head title="Vihara" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div class="mb-4 flex items-center justify-between">
                <input
                    v-model="search"
                    type="text"
                    placeholder="Cari ..."
                    class="rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    @input="applyFilters"
                />
                <Link :href="route('viharas.create')" class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"> Tambah Data Vihara </Link>
            </div>

            <table class="min-w-full border bg-white">
                <thead>
                    <tr>
                        <th class="border-b p-2 text-left font-medium text-gray-700">Nama Vihara</th>
                        <th class="border-b p-2 text-left font-medium text-gray-700">Group</th>
                        <th class="border-b p-2 text-left font-medium text-gray-700">Kota</th>
                        <th class="border-b p-2 text-left font-medium text-gray-700">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="vihara in viharas.data" :key="vihara.id" class="border-b">
                        <td class="p-2">{{ vihara.nama_vihara }}</td>
                        <td class="p-2">
                            {{ vihara.group ? vihara.group.nama_group : '-' }}
                        </td>
                        <td class="p-2">
                            {{ vihara.group && vihara.group.kota ? vihara.group.kota.nama_kota : '-' }}
                        </td>
                        <td class="space-x-2 p-2">
                            <Link
                                :href="route('viharas.edit', vihara.id)"
                                class="rounded bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
                            >
                                Edit
                            </Link>
                            <button
                                @click="router.delete(route('viharas.destroy', vihara.id))"
                                class="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                            >
                                Hapus
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <pagination :links="viharas.links" />
    </AppLayout>
</template>
