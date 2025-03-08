<script setup>
import AppLayout from '@/layouts/AppLayout.vue';
import { Link, useForm } from '@inertiajs/vue3';

// Props dari backend
const props = defineProps({
    vihara: Object, // Data vihara yang akan diedit
    groups: Array, // Daftar semua group untuk dropdown
});

// Debug props untuk memastikan data diterima dengan benar
console.log('Vihara Data:', props.vihara);
console.log('Groups Data:', props.groups);

// Form untuk mengedit data vihara
const form = useForm({
    nama_vihara: props.vihara.nama_vihara || '', // Inisialisasi dengan nama vihara
    group_id: props.vihara.group_id || '', // Inisialisasi dengan group_id
});

// Fungsi untuk mengirimkan form ke backend
function submit() {
    form.put(route('viharas.update', props.vihara.id), {
        onSuccess: () => {
            form.reset(); // Reset form setelah berhasil
        },
    });
}
</script>

<template>
    <Head title="Edit Vihara" />

    <AppLayout title="Edit Vihara">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <!-- Form Edit -->
                <form @submit.prevent="submit" class="space-y-4">
                    <!-- Nama Vihara -->
                    <div>
                        <label for="nama_vihara" class="block text-sm font-medium text-gray-700">Nama Vihara</label>
                        <input
                            v-model="form.nama_vihara"
                            type="text"
                            id="nama_vihara"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            required
                        />
                        <p v-if="form.errors.nama_vihara" class="text-sm text-red-500">{{ form.errors.nama_vihara }}</p>
                    </div>

                    <!-- Group -->
                    <div>
                        <label for="group_id" class="block text-sm font-medium text-gray-700">Group</label>
                        <select
                            v-model="form.group_id"
                            id="group_id"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            required
                        >
                            <option value="" disabled>Pilih Group</option>
                            <option v-for="group in groups" :key="group.id" :value="group.id">
                                {{ group.nama_group }}
                            </option>
                        </select>
                        <p v-if="form.errors.group_id" class="text-sm text-red-500">{{ form.errors.group_id }}</p>
                    </div>

                    <!-- Tombol Simpan dan Batal -->
                    <div class="flex justify-end space-x-4">
                        <button type="submit" class="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600" :disabled="form.processing">
                            Perbarui
                        </button>
                        <Link :href="route('viharas.index')" class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"> Batal </Link>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
