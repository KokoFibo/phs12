<script setup>
import Pagination from '@/components/Pagination.vue';
import AppLayout from '@/layouts/AppLayout.vue';
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
</script>

<template>
    <Head title="Vihara" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div class="mb-4 flex flex-col gap-2 md:w-2/3 md:flex-row md:items-center md:gap-5">
                <div class="flex flex-col gap-2 md:flex-row md:gap-5">
                    <div class="flex w-full items-center justify-between gap-3">
                        <input
                            v-model="search"
                            type="text"
                            placeholder="Cari ..."
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
                <Link :href="route('viharas.create')" class="rounded bg-blue-500 px-4 py-2 text-center text-white hover:bg-blue-600">
                    Tambah Data Vihara
                </Link>
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
                    <tr v-for="vihara in viharas.data" :key="vihara.id" class="border-b text-sm">
                        <td class="p-2">{{ vihara.nama_vihara }}</td>
                        <td class="p-2">
                            {{ vihara.group ? vihara.group.nama_group : '-' }}
                        </td>
                        <td class="p-2">
                            {{ vihara.group && vihara.group.kota ? vihara.group.kota.nama_kota : '-' }}
                        </td>
                        <td class="flex space-x-2 p-2">
                            <Link
                                :href="route('viharas.edit', vihara.id)"
                                class="rounded bg-green-500 px-2 py-1 text-sm text-white hover:bg-green-600"
                            >
                                <PencilIcon class="h-4 w-4" />
                            </Link>

                            <button @click="confirmDelete(vihara.id)" class="rounded bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600">
                                <TrashIcon class="h-4 w-4" />
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
