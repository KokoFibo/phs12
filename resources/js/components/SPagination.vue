<script setup>
import { Link } from '@inertiajs/vue3';
import { computed } from 'vue';

const props = defineProps({
    links: Object, // Data pagination dari Laravel Inertia
});

console.log(props.links); // Debugging untuk cek data

const currentPage = computed(() => props.links?.current_page ?? 1);
const lastPage = computed(() => props.links?.last_page ?? 1);

// Ubah cara cek previous & next agar lebih ketat
const hasPrevious = computed(() => !!props.links?.prev_page_url);
const hasNext = computed(() => !!props.links?.next_page_url);
</script>

<template>
    <div class="mt-4 flex items-center justify-center space-x-4">
        <!-- Tombol Previous -->
        <Link v-if="hasPrevious" :href="props.links.prev_page_url" class="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300">
            Previous
        </Link>

        <!-- Tampilan Halaman -->
        <span class="text-sm text-gray-700"> Page {{ currentPage }} of {{ lastPage }} </span>

        <!-- Tombol Next -->
        <Link v-if="hasNext" :href="props.links.next_page_url" class="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"> Next </Link>
    </div>
</template>
