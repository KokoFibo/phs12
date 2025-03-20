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
function navigateToEdit(id) {
    router.get(route('panditas.edit', id)); // Pastikan named route sesuai dengan Laravel
}
</script>

<template>
    <Head title="Pandita" />

    <Navbar />
    <div class="mx-auto flex max-w-7xl flex-col rounded-xl p-4 text-sm bg-white dark:bg-gray-900 dark:text-gray-200">
        <div class="mb-3 hidden rounded-lg border p-2 md:block dark:border-gray-700">
            <h2 class="text-xl text-gray-500 dark:text-gray-300">Vihara</h2>
        </div>
        <div class="flex w-full flex-col gap-2 md:flex-row md:items-center md:gap-5">
            <input
                v-model="search"
                type="text"
                placeholder="Cari..."
                class="w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:focus:ring-blue-400 dark:text-gray-200 md:w-3/4"
                @input="applyFilters"
            />
            <Link
                :href="route('panditas.create')"
                class="w-full rounded bg-blue-500 px-4 py-2 text-center text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white md:w-1/4"
            >
                Tambah Data Pandita
            </Link>
        </div>

        <div class="w-full overflow-x-auto py-4">
            <table class="min-w-full table-auto divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <th class="cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                            Nama Pandita
                        </th>
                        <th class="cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                            Aksi
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                    <tr v-for="pandita in panditas.data" :key="pandita.id" class="border-b text-sm">
                        <td class="whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300">{{ pandita.nama_pandita }}</td>
                        <td class="space-x-1 px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                            <button
                                @click="navigateToEdit(pandita.id)"
                                class="rounded bg-green-500 px-2 py-1 text-sm text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                            >
                                <PencilIcon class="h-4 w-4" />
                            </button>
                            <button
                                @click="confirmDelete(pandita.id)"
                                class="rounded bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                            >
                                <TrashIcon class="h-4 w-4" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <SimplePagination :links="panditas.links" class="dark:text-gray-300" />
    </div>
</template>