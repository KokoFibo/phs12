<script setup>
import { Head, router, useForm } from '@inertiajs/vue3';

import Navbar from '@/components/Navbar.vue';


const breadcrumbs = [
    {
        title: 'Add Vihara',
        href: '/viharas',
    },
];
defineProps({
    groups: Object,
});

function back() {
    router.get('/viharas');
}

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
    <Head title="Add Vihara" />

    <Navbar />
    <div class="mx-auto flex max-w-7xl flex-col rounded-xl p-4 text-sm bg-white dark:bg-gray-900 dark:text-gray-200">
        <div class="mb-3 hidden rounded-lg border p-2 md:block dark:border-gray-700">
            <h2 class="text-xl text-gray-500 dark:text-gray-300">Add Vihara</h2>
        </div>
        <div class="mt-3 max-w-7xl rounded-lg border p-3 py-6 sm:px-6 lg:px-8 dark:border-gray-700 dark:bg-gray-800">
            <form @submit.prevent="submit" class="space-y-4">
                <!-- Nama Vihara -->
                <div>
                    <label for="nama_vihara" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Vihara</label>
                    <input
                        v-model="form.nama_vihara"
                        type="text"
                        id="nama_vihara"
                        class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                        required
                    />
                    <p v-if="form.errors.nama_vihara" class="text-sm text-red-500 dark:text-red-400">{{ form.errors.nama_vihara }}</p>
                </div>

                <!-- Group -->
                <div>
                    <label for="group_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Group</label>
                    <select
                        v-model="form.group_id"
                        id="group_id"
                        class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                        required
                    >
                        <option value="" disabled>Pilih Group</option>
                        <option v-for="group in groups" :key="group.id" :value="group.id">{{ group.nama_group }}</option>
                    </select>
                    <p v-if="form.errors.group_id" class="text-sm text-red-500 dark:text-red-400">{{ form.errors.group_id }}</p>
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
                        class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
                        :disabled="form.processing"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>