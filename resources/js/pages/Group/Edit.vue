<script setup>
import Navbar from '@/components/Navbar.vue';

import { Head, router, useForm } from '@inertiajs/vue3';

const breadcrumbs = [
    {
        title: 'Edit Group',
        href: '/groups',
    },
];

function back() {
    router.get(route('groups.index'));
}
// Props dari backend
const props = defineProps({
    group: Object, // Data group yang akan diedit
    kotas: Array, // Daftar semua kota untuk dropdown
});

// Debug props untuk memastikan data diterima dengan benar
console.log('Group Data:', props.group);
console.log('Kotas Data:', props.kotas);

// Form untuk mengedit data group
const form = useForm({
    nama_group: props.group.nama_group || '', // Inisialisasi dengan nama group
    kota_id: props.group.kota_id || '', // Inisialisasi dengan kota_id
});

// Fungsi untuk mengirimkan form ke backend
function submit() {
    form.put(route('groups.update', props.group.id), {
        onSuccess: () => {
            form.reset(); // Reset form setelah berhasil
        },
    });
}
</script>

<template>
    <Head title="Edit Group" />
    <Navbar />

    <div class="mx-auto flex max-w-7xl flex-col rounded-xl p-4 text-sm bg-white dark:bg-gray-900 dark:text-gray-200">
        <div class="mb-3 hidden rounded-lg border p-2 md:block dark:border-gray-700">
            <h2 class="text-xl text-gray-500 dark:text-gray-300">Edit Group</h2>
        </div>
        <div class="mt-3 max-w-7xl rounded-lg border p-3 py-6 sm:px-6 lg:px-8 dark:border-gray-700 dark:bg-gray-800">
            <!-- Form Edit -->
            <form @submit.prevent="submit" class="space-y-4">
                <!-- Nama Group -->
                <div>
                    <label for="nama_group" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Group</label>
                    <input
                        v-model="form.nama_group"
                        type="text"
                        id="nama_group"
                        class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                        required
                    />
                    <p v-if="form.errors.nama_group" class="text-sm text-red-500 dark:text-red-400">{{ form.errors.nama_group }}</p>
                </div>

                <!-- Kota -->
                <div>
                    <label for="kota_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Kota</label>
                    <select
                        v-model="form.kota_id"
                        id="kota_id"
                        class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                        required
                    >
                        <option value="" disabled>Pilih Kota</option>
                        <option v-for="kota in kotas" :key="kota.id" :value="kota.id">
                            {{ kota.nama_kota }}
                        </option>
                    </select>
                    <p v-if="form.errors.kota_id" class="text-sm text-red-500 dark:text-red-400">{{ form.errors.kota_id }}</p>
                </div>

                <!-- Tombol Simpan dan Batal -->
                <div class="flex justify-between">
                    <button
                        @click.prevent="back"
                        class="rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                        :disabled="form.processing"
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        class="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 dark:text-white"
                        :disabled="form.processing"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>