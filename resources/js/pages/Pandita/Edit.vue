<script setup>
import AppLayout from '@/layouts/AppLayout.vue';
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

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div class="max-w-2xl py-6 sm:px-6 lg:px-8">
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
