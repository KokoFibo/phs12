<script setup>
import AppLayout from '@/layouts/AppLayout.vue';
import { Link, useForm } from '@inertiajs/vue3';

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

    <AppLayout title="Edit Group">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <!-- Form Edit -->
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
                    <div class="flex justify-end space-x-4">
                        <button type="submit" class="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600" :disabled="form.processing">
                            Perbarui
                        </button>
                        <Link :href="route('groups.index')" class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"> Batal </Link>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
