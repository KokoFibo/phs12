<script setup>
import AppLayout from '@/layouts/AppLayout.vue';
import { Head, router, useForm } from '@inertiajs/vue3';

const breadcrumbs = [
    {
        title: 'Add Group',
        href: '/groups',
    },
];
// Props dari backend
const props = defineProps({
    kotas: Array, // Daftar semua kota untuk dropdown
});

function back() {
    router.get('/groups');
}

// Debug props untuk memastikan data diterima dengan benar
console.log('Kotas Data:', props.kotas);

// Form untuk menambahkan data group
const form = useForm({
    nama_group: '', // Nama group kosong
    kota_id: '', // Kota ID kosong
});

// Fungsi untuk mengirimkan form ke backend
function submit() {
    form.post(route('groups.store'), {
        onSuccess: () => {
            form.reset(); // Reset form setelah berhasil
        },
    });
}
</script>

<template>
    <Head title="Add Group" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div class="max-w-2xl py-6 sm:px-6 lg:px-8">
                <!-- Form Tambah -->
                <form @submit.prevent="submit" class="space-y-4">
                    <!-- Nama Group -->
                    <div>
                        <label for="nama_group" class="block text-sm font-medium text-gray-700">Nama Group</label>
                        <input
                            v-model="form.nama_group"
                            type="text"
                            id="nama_group"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            required
                        />
                        <p v-if="form.errors.nama_group" class="text-sm text-red-500">{{ form.errors.nama_group }}</p>
                    </div>

                    <!-- Kota -->
                    <div>
                        <label for="kota_id" class="block text-sm font-medium text-gray-700">Kota</label>
                        <select
                            v-model="form.kota_id"
                            id="kota_id"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            required
                        >
                            <option value="" disabled>Pilih Kota</option>
                            <option v-for="kota in kotas" :key="kota.id" :value="kota.id">
                                {{ kota.nama_kota }}
                            </option>
                        </select>
                        <p v-if="form.errors.kota_id" class="text-sm text-red-500">{{ form.errors.kota_id }}</p>
                    </div>

                    <!-- Tombol Simpan dan Batal -->
                    <div class="flex justify-between">
                        <button @click="back" class="rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-400" :disabled="form.processing">
                            Back
                        </button>
                        <button type="submit" class="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600" :disabled="form.processing">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
