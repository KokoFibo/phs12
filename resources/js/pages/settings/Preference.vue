<script setup>
import { TransitionRoot } from '@headlessui/vue';
import { Head, useForm, usePage } from '@inertiajs/vue3';
import { ref, watch } from 'vue';

import HeadingSmall from '@/components/HeadingSmall.vue';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/AppLayout.vue';
import SettingsLayout from '@/layouts/settings/Layout.vue';

// Breadcrumbs
const breadcrumbs = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
];

// Inertia Page data
const page = usePage();
// const user = page.props.user; // Ambil user data dari Inertia props
// const kotas = page.props.kotas; // Ambil kotas data dari Inertia props
// const groups = ref(page.props.groups); // Ambil groups data dari Inertia props
// const viharas = ref(page.props.viharas); // Ambil viharas data dari Inertia props
// const panditas = ref(page.props.panditas);
// Ambil panditas data dari Inertia props
const props = defineProps({
    user: Object,
    kotas: Array,
    groups: Array,
    viharas: Array,
    panditas: Array,
    errors: Object,
});
// Form data
const form = useForm({
    kota_id: props.user.kota_id,
    group_id: props.user.group_id,
    vihara_id: props.user.vihara_id,
    pandita_id: props.user.pandita_id,
});
const groups = ref([]);
const viharas = ref([]);
// Watcher untuk perubahan pada kota_id
watch(
    () => form.kota_id,
    async (newKotaId) => {
        if (newKotaId) {
            try {
                const response = await fetch(route('groups.by.kota', newKotaId));
                const data = await response.json();
                groups.value = data;
                form.group_id = props.dataumat.group_id; // Reset group_id
                viharas.value = []; // Reset viharas
                // form.vihara_id = ''; // Reset vihara_id
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        } else {
            groups.value = [];
            viharas.value = [];
            form.group_id = '';
            form.vihara_id = '';
        }
    },
    { immediate: true },
);

// Watch untuk memperbarui viharas saat group_id berubah
watch(
    () => form.group_id,
    async (newGroupId) => {
        if (newGroupId) {
            try {
                const response = await fetch(route('viharas.by.group', newGroupId));
                const data = await response.json();
                viharas.value = data;
                // form.vihara_id = ''; // Reset vihara_id
            } catch (error) {
                console.error('Error fetching viharas:', error);
            }
        } else {
            viharas.value = [];
            form.vihara_id = '';
        }
    },
    { immediate: true },
);

// Kirim form
const submit = () => {
    form.patch(route('preference.update'), {
        preserveScroll: true,
    });
};
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbs">
        <Head title="Preference settings" />

        <SettingsLayout>
            <div class="flex flex-col space-y-6">
                <HeadingSmall title="Preference information" description="Update setting preferensi anda" />

                <form @submit.prevent="submit" class="space-y-6">
                    <div class="grid grid-cols-1 gap-4 text-sm md:grid-cols-2 lg:grid-cols-2">
                        <div>
                            <label for="kota_id" class="block text-sm font-medium text-gray-700">Kota</label>
                            <select
                                v-model="form.kota_id"
                                id="kota_id"
                                class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                required
                            >
                                <option value="" disabled>Pilih Kota</option>
                                <option v-for="kota in kotas" :key="kota.id" :value="kota.id">{{ kota.nama_kota }}</option>
                            </select>
                            <p v-if="errors.kota_id" class="text-sm text-red-500">{{ errors.kota_id }}</p>
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
                            <p v-if="errors.group_id" class="text-sm text-red-500">{{ errors.group_id }}</p>
                        </div>

                        <div>
                            <label for="vihara_id" class="block text-sm font-medium text-gray-700">Vihara</label>
                            <select
                                v-model="form.vihara_id"
                                id="vihara_id"
                                class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                required
                            >
                                <option value="" disabled>Pilih Vihara</option>
                                <option v-for="vihara in viharas" :key="vihara.id" :value="vihara.id">{{ vihara.nama_vihara }}</option>
                            </select>
                            <p v-if="errors.vihara_id" class="text-sm text-red-500">{{ errors.vihara_id }}</p>
                        </div>

                        <div>
                            <label for="pandita_id" class="block text-sm font-medium text-gray-700">Pandita</label>
                            <select
                                v-model="form.pandita_id"
                                id="pandita_id"
                                class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                required
                            >
                                <option value="" disabled>Pilih Pandita</option>
                                <option v-for="pandita in panditas" :key="pandita.id" :value="pandita.id">{{ pandita.nama_pandita }}</option>
                            </select>
                            <p v-if="errors.pandita_id" class="text-sm text-red-500">{{ errors.pandita_id }}</p>
                        </div>
                    </div>

                    <div class="flex items-center gap-4">
                        <Button :disabled="form.processing">Save</Button>

                        <TransitionRoot
                            :show="form.recentlySuccessful"
                            enter="transition ease-in-out"
                            enter-from="opacity-0"
                            leave="transition ease-in-out"
                            leave-to="opacity-0"
                        >
                            <p class="text-sm text-neutral-600">Saved.</p>
                        </TransitionRoot>
                    </div>
                </form>
            </div>
        </SettingsLayout>
    </AppLayout>
</template>
