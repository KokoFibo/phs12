<script setup>
import Pagination from '@/components/Pagination.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { Head, Link, router } from '@inertiajs/vue3';
import { ref } from 'vue';

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
</script>

<template>
    <Head title="Vihara" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div class="mb-4 flex items-center justify-between">
                <div class="flex gap-5">
                    <input
                        v-model="search"
                        type="text"
                        placeholder="Cari ..."
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
                    <select
                        v-model="groupFilter"
                        @change="fetchData"
                        class="rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    >
                        <option value="">Pilih Group</option>
                        <!-- Opsi default -->
                        <option v-for="g in groups" :key="g.id" :value="g.id">{{ g.nama_group }}</option>
                    </select>
                    <select
                        v-model="kotaFilter"
                        @change="fetchData"
                        class="rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    >
                        <option value="">Pilih Kota</option>
                        <!-- Opsi default -->
                        <option v-for="k in kotas" :key="k.id" :value="k.id">
                            {{ k.nama_kota }}
                        </option>
                    </select>
                </div>
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
            <Pagination :links="viharas.links" />
        </div>
        <!-- <Pagination :links="viharas.links" /> -->
    </AppLayout>
</template>
