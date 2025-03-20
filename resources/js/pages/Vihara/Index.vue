<script setup>
import Navbar from '@/components/Navbar.vue';
import SimplePagination from '@/components/SimplePagination.vue';
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/solid';
import { Head, Link, router, usePage } from '@inertiajs/vue3';
import { ref, watch } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();
const page = usePage();

const confirmDelete = (id) => {
    if (window.confirm('Apakah yakin ingin menghapus data ini?')) {
        router.delete(route('viharas.destroy', id));
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
        title: 'Vihara',
        href: '/viharas',
    },
];
defineProps({
    viharas: Object,
    groups: Object,
    kotas: Object,
    filters: Object,
});

const search = ref('');
const perPage = ref(10);
const groupFilter = ref('');
const kotaFilter = ref('');

async function fetchData() {
    try {
        const page = await new Promise((resolve, reject) => {
            router.get(
                '/viharas',
                {
                    search: search.value,
                    perPage: perPage.value,
                    groupFilter: groupFilter.value,
                    kotaFilter: kotaFilter.value,
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
    router.get(route('viharas.edit', id)); // Pastikan named route sesuai dengan Laravel
}
</script>

<template>
    <Head title="Vihara" />

    <Navbar />
    <div class="mx-auto flex max-w-7xl flex-col rounded-xl p-4 text-sm bg-white dark:bg-gray-900 dark:text-gray-200">
        <div class="mb-3 hidden rounded-lg border p-2 md:block dark:border-gray-700">
            <h2 class="text-xl text-gray-500 dark:text-gray-300">Vihara</h2>
        </div>

        <div class="flex w-full flex-col gap-2 md:flex-row md:items-center md:gap-5">
            <div class="flex flex-col gap-2 md:flex-row md:gap-5">
                <div class="flex w-full items-center justify-between gap-3">
                    <input
                        v-model="search"
                        type="text"
                        placeholder="Cari ..."
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

                <select
                    v-model="groupFilter"
                    @change="fetchData"
                    class="rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                >
                    <option value="">Pilih Group</option>
                    <!-- Opsi default -->
                    <option v-for="g in groups" :key="g.id" :value="g.id">{{ g.nama_group }}</option>
                </select>
                <select
                    v-model="kotaFilter"
                    @change="fetchData"
                    class="rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                >
                    <option value="">Pilih Kota</option>
                    <!-- Opsi default -->
                    <option v-for="k in kotas" :key="k.id" :value="k.id">
                        {{ k.nama_kota }}
                    </option>
                </select>
            </div>
            <Link
                :href="route('viharas.create')"
                class="rounded bg-blue-500 px-4 py-2 text-center text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
            >
                Tambah Data Vihara
            </Link>
        </div>

        <div class="w-full overflow-x-auto py-4">
            <table class="min-w-full table-auto divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <th class="cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                            Nama Vihara
                        </th>
                        <th class="cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                            Group
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
                    <tr v-for="vihara in viharas.data" :key="vihara.id" class="border-b text-sm">
                        <td class="whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300">{{ vihara.nama_vihara }}</td>
                        <td class="whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300">
                            {{ vihara.group ? vihara.group.nama_group : '-' }}
                        </td>
                        <td class="whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300">
                            {{ vihara.group && vihara.group.kota ? vihara.group.kota.nama_kota : '-' }}
                        </td>
                        <td class="space-x-1 px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                            <button
                                @click="navigateToEdit(vihara.id)"
                                class="rounded bg-green-500 px-2 py-1 text-sm text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                            >
                                <PencilIcon class="h-4 w-4" />
                            </button>

                            <button
                                @click="confirmDelete(vihara.id)"
                                class="rounded bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                            >
                                <TrashIcon class="h-4 w-4" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <SimplePagination :links="viharas.links" class="dark:text-gray-300" />
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
