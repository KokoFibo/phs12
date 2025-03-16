<script setup>
import AppLayout from '@/layouts/AppLayout.vue';
import { Head, router, useForm } from '@inertiajs/vue3';

const breadcrumbs = [
    {
        title: 'Edit Role',
        href: '/editroles',
    },
];

function back() {
    router.get('/editroles');
}
// Props dari backend
const props = defineProps({
    user: Object, // Data group yang akan diedit
});

// Form untuk mengedit data group
const form = useForm({
    id: props.user.id || '', // Inisialisasi dengan nama group
    name: props.user.name || '', // Inisialisasi dengan nama group
    role: props.user.role || '', // Inisialisasi dengan kota_id
});

// Fungsi untuk mengirimkan form ke backend
function submit() {
    form.put(route('editroles.update', props.user.id), {
        onSuccess: () => {
            form.reset(); // Reset form setelah berhasil
        },
    });
}
</script>

<template>
    <Head title="Edit Role" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div class="max-w-2xl py-6 sm:px-6 lg:px-8">
                <!-- Form Edit -->
                <form @submit.prevent="submit" class="space-y-4">
                    <!-- Nama Group -->
                    <div>
                        <label for="nama_user" class="block text-sm font-medium text-gray-700">Nama</label>
                        <input
                            v-model="form.name"
                            type="text"
                            id="nama_user"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            required
                        />
                        <p v-if="form.errors.name" class="text-sm text-red-500">{{ form.errors.name }}</p>
                    </div>

                    <!-- Kota -->
                    <div>
                        <label for="kota_id" class="block text-sm font-medium text-gray-700">Role</label>
                        <select
                            v-model="form.role"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            required
                        >
                            <option value="">Pilih Role</option>
                            <option value="0">Belum ada Role</option>
                            <option value="1">Admin</option>
                            <option value="2">Super Admin</option>
                        </select>
                        <p v-if="form.errors.role" class="text-sm text-red-500">{{ form.errors.role }}</p>
                    </div>

                    <!-- Tombol Simpan dan Batal -->
                    <div class="flex justify-between">
                        <button @click.prevent="back" class="rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-400" :disabled="form.processing">
                            Back
                        </button>
                        <button type="submit" class="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600" :disabled="form.processing">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
