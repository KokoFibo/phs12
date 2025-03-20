<script setup>
import Navbar from '@/components/Navbar.vue';

import { Head, router, useForm } from '@inertiajs/vue3';
import { defineProps } from 'vue';

const breadcrumbs = [
    {
        title: 'Edit Pandita',
        href: '/panditas',
    },
];

function back() {
    router.get('/panditas');
}

const props = defineProps({
    pandita: Object,
});
console.log(props.pandita);

const form = useForm({
    nama_pandita: props.pandita?.nama_pandita || '',
});

function submit() {
    form.put(route('panditas.update', props.pandita.id), {
        onSuccess: () => form.reset(),
    });
}
</script>

<template>
    <Head title="Edit Pandita" />

    <Navbar />
    <div class="mx-auto flex max-w-7xl flex-col rounded-xl p-4 text-sm bg-white dark:bg-gray-900 dark:text-gray-200">
        <div class="mb-3 hidden rounded-lg border p-2 md:block dark:border-gray-700">
            <h2 class="text-xl text-gray-500 dark:text-gray-300">Edit Pandita</h2>
        </div>
        <div class="mt-3 max-w-7xl rounded-lg border p-3 py-6 sm:px-6 lg:px-8 dark:border-gray-700 dark:bg-gray-800">
            <form @submit.prevent="submit" class="space-y-4">
                <!-- Nama Pandita -->
                <div>
                    <label for="nama_pandita" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Pandita</label>
                    <input
                        v-model="form.nama_pandita"
                        type="text"
                        id="nama_pandita"
                        class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                        required
                    />
                    <p v-if="form.errors.nama_pandita" class="text-sm text-red-500 dark:text-red-400">{{ form.errors.nama_pandita }}</p>
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