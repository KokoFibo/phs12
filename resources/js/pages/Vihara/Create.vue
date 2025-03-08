<script setup>
import { useForm } from '@inertiajs/vue3';

import AppLayout from '@/layouts/AppLayout.vue';

const breadcrumbs = [
    {
        title: 'Kota',
        href: '/kotas',
    },
];
defineProps({
    groups: Object,
});

const form = useForm({
    nama_vihara: '',
    group_id: '',
});

function submit() {
    form.post(route('viharas.store'), {
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

                    <div>
                        <label for="group_id" class="block text-sm font-medium text-gray-700">Group</label>
                        <select
                            v-model="form.group_id"
                            id="group_id"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            required
                        >
                            <option value="" disabled>Pilih Group</option>
                            <option v-for="group in groups" :key="group.id" :value="group.id">{{ group.nama_group }}</option>
                        </select>
                        <p v-if="form.errors.group_id" class="text-sm text-red-500">{{ form.errors.group_id }}</p>
                    </div>

                    <button type="submit" class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600" :disabled="form.processing">
                        Simpan
                    </button>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
