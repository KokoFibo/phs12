<script setup>
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
        router.delete(route('panditas.destroy', id));
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
        title: 'Pandita',
        href: '/panditas',
    },
];

defineProps({
    panditas: Object,
    filters: Object,
});

const search = ref('');

function applyFilters() {
    router.get(
        '/panditas',
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
    <Head title="Pandita" />

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
                <Link :href="route('panditas.create')" class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"> Tambah Data Pandita </Link>
            </div>

            <table class="min-w-full border bg-white">
                <thead>
                    <tr>
                        <th class="border-b p-2 text-left font-medium text-gray-700">Nama Pandita</th>
                        <th class="border-b p-2 text-left font-medium text-gray-700">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="pandita in panditas.data" :key="pandita.id" class="border-b text-sm">
                        <td class="p-2">{{ pandita.nama_pandita }}</td>
                        <td class="flex space-x-2 p-2">
                            <Link
                                :href="route('panditas.edit', pandita.id)"
                                class="rounded bg-green-500 px-2 py-1 text-sm text-white hover:bg-green-600"
                            >
                                <PencilIcon class="h-4 w-4" />
                            </Link>

                            <button @click="confirmDelete(pandita.id)" class="rounded bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600">
                                <TrashIcon class="h-4 w-4" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Pagination :links="panditas.links" />
        </div>
    </AppLayout>
</template>
