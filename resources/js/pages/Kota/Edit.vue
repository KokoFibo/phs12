<script setup>
import { Head, router, useForm } from '@inertiajs/vue3';

import AppLayout from '@/layouts/AppLayout.vue';

const breadcrumbs = [
    {
        title: 'Edit Kota',
        href: '/kotas/create',
    },
];
const props = defineProps({
    kota: Object,
});

const form = useForm({
    nama_kota: props.kota?.nama_kota || '',
});

function submit() {
    form.put(route('kotas.update', props.kota.id), {
        onSuccess: () => form.reset(),
    });
}
function back() {
    router.get('/kotas');
}
</script>

<template>
    <Head title="Edit Kota" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div class="max-w-7xl py-6 sm:px-6 lg:px-8">
                <form @submit.prevent="submit" class="space-y-4">
                    <div>
                        <label for="nama_kota" class="block text-sm font-medium text-gray-700">Nama Kota</label>
                        <input
                            v-model="form.nama_kota"
                            type="text"
                            id="nama_kota"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            required
                        />
                        <p v-if="form.errors.nama_kota" class="text-sm text-red-500">{{ form.errors.nama_kota }}</p>
                    </div>

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
