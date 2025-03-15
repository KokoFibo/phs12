<script setup>
import { Link } from '@inertiajs/vue3';

defineProps({
    links: Array,
});
</script>

<template>
    <div v-if="links?.length > 0">
        <div class="mb-1 flex flex-wrap">
            <template v-for="(link, index) in links" :key="index">
                <div v-if="link.url === null" class="mb-1 mr-1 rounded border px-4 py-3 text-sm leading-4 text-gray-400" v-html="link.label"></div>
                <Link
                    v-else
                    class="mb-1 mr-1 inline-block rounded border px-4 py-3 text-sm leading-4 hover:bg-gray-200 focus:border-indigo-500 focus:text-indigo-500"
                    :class="{ 'bg-blue-700 text-white': link.active }"
                    :href="link.url"
                >
                    <span v-html="link.label"></span>
                </Link>
            </template>
        </div>
    </div>
</template>
