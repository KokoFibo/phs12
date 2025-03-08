<script setup>
import { TransitionRoot } from '@headlessui/vue';
import { Head, useForm, usePage } from '@inertiajs/vue3';

import DeleteUser from '@/components/DeleteUser.vue';
import HeadingSmall from '@/components/HeadingSmall.vue';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/AppLayout.vue';
import SettingsLayout from '@/layouts/settings/Layout.vue';

const props = defineProps({
    mustVerifyEmail: Boolean,
    status: String,
});

const breadcrumbs = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
];

const page = usePage();
const user = page.props.auth.user;

const form = useForm({
    kota_id: user.kota_id,
    group_id: user.group_id,
    vihara_id: user.vihara_id,
    pandita_id: user.pandita_id,
});

const submit = () => {
    form.patch(route('profile.update'), {
        preserveScroll: true,
    });
};
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbs">
        <Head title="Preference settings" />

        <SettingsLayout>
            <div class="flex flex-col space-y-6">
                <HeadingSmall title="Profile information" description="Update setting preferensi anda" />

                <form @submit.prevent="submit" class="space-y-6">
                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <label for="kota_id" class="block text-sm font-medium text-gray-700">Kota</label>
                            <select
                                v-model="form.kota_id"
                                id="kota_id"
                                class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
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
                                class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
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
                                class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
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
                                class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
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

            <DeleteUser />
        </SettingsLayout>
    </AppLayout>
</template>
