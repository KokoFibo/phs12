<script setup>
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import { SidebarTrigger } from '@/components/ui/sidebar';

import { MoonIcon, SunIcon } from '@heroicons/vue/24/outline';
import { onMounted, ref } from 'vue';

// defineProps<{
//     breadcrumbs?: BreadcrumbItemType[];
// }>();
const props = defineProps({
    breadcrumbs: Array, // Karena BreadcrumbItemType[] adalah array, ubah ke Array
});

const isDark = ref(false);

const toggleDarkMode = () => {
    isDark.value = !isDark.value;
    if (isDark.value) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
};

onMounted(() => {
    if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        isDark.value = true;
        document.documentElement.classList.add('dark');
    }
});
</script>

<template>
    <header
        class="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-sidebar-border/70 px-6 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 md:px-4"
    >
        <div class="flex items-center gap-2">
            <SidebarTrigger class="-ml-1" />
            <template v-if="breadcrumbs.length > 0">
                <Breadcrumbs :breadcrumbs="breadcrumbs" />
            </template>
        </div>
        <div>
            <button @click="toggleDarkMode" class="p-2 text-gray-900 dark:text-white">
                <SunIcon v-if="!isDark" class="h-6 w-6" />
                <MoonIcon v-else class="h-6 w-6" />
            </button>
        </div>
    </header>
</template>
