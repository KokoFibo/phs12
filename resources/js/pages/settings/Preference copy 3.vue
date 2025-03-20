<script setup>
import { TransitionRoot } from '@headlessui/vue';
import { Head, useForm, usePage } from '@inertiajs/vue3';
import { watch } from 'vue';

import HeadingSmall from '@/components/HeadingSmall.vue';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar.vue';
import { Label } from '@/components/ui/label';

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

const props = defineProps({
    user: Object,
    viharas: Array,
    panditas: Array,
    errors: Object,
});
// Form data
const form = useForm({
    vihara_id: props.user.vihara_id,
    pandita_id: props.user.pandita_id,
});

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
    <Navbar />

        <Head title="Preference settings" />
       <div class="mx-auto flex max-w-7xl flex-col rounded-xl p-4 text-sm">

        <SettingsLayout>
            <div class="flex flex-col space-y-6">
                <HeadingSmall title="Preference information" description="Update setting preferensi anda" />

                <form @submit.prevent="submit" class="space-y-6">
                    <div class="grid grid-cols-1 gap-4 text-sm md:grid-cols-2 lg:grid-cols-2">
                        <div>
                            <Label for="vihara_id" >Vihara</Label>
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
                            <Label for="pandita_id" >Pandita</Label>
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
            
        </div>
</template>
