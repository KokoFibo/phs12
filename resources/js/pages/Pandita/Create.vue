<script setup>
import AppLayout from '@/layouts/AppLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';

const breadcrumbs = [
    {
        title: 'Data Umat ',
        href: '/dataumats',
    },
];

const form = useForm({
    nama_pandita: '',
});

function submit() {
    form.post(route('panditas.store'), {
        onSuccess: () => form.reset(),
    });
}
</script>

<template>
    <Head title="Data Umat" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <form @submit.prevent="submit" class="space-y-4">
                    <div>
                        <label for="nama_pandita" class="block text-sm font-medium text-gray-700">Nama Pandita</label>
                        <input
                            v-model="form.nama_pandita"
                            type="text"
                            id="nama_pandita"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            required
                        />
                        <p v-if="form.errors.nama_pandita" class="text-sm text-red-500">{{ form.errors.nama_pandita }}</p>
                    </div>

                    <button type="submit" class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600" :disabled="form.processing">
                        Simpan
                    </button>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
