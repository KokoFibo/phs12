<script setup>
import { Head } from '@inertiajs/vue3';

import AppearanceTabs from '@/components/AppearanceTabs.vue';
import HeadingSmall from '@/components/HeadingSmall.vue';

import Navbar from '@/components/Navbar.vue';

import SettingsLayout from '@/layouts/settings/Layout.vue';

const breadcrumbItems = [
    {
        title: 'Appearance settings',
        href: '/settings/appearance',
    },
];
</script>

<template>
    <Navbar />

        <Head title="Appearance settings" />
       <div class="mx-auto flex max-w-7xl flex-col rounded-xl p-4 text-sm">

        <SettingsLayout>
            <div class="space-y-6">
                <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
                <AppearanceTabs />
            </div>
        </SettingsLayout>
            
        </div>
</template>
