<script setup>
import { ref, computed, watch } from 'vue';
import { Link, router } from '@inertiajs/vue3';

const props = defineProps({
    links: Array,
});

// Hitung total halaman
const totalPages = computed(() => (props.links.length > 2 ? props.links.length - 2 : 1));

// Ambil halaman saat ini dari link yang aktif
const currentPage = computed(() => {
    const activeLink = props.links.find((link) => link.active);
    return activeLink ? parseInt(activeLink.label) : 1;
});

const pageInput = ref(currentPage.value);

// Fungsi untuk berpindah ke halaman tertentu
const goToPage = () => {
    if (pageInput.value >= 1 && pageInput.value <= totalPages.value) {
        const selectedPage = props.links.find(link => link.label == pageInput.value);
        if (selectedPage && selectedPage.url) {
            router.get(selectedPage.url);
        }
    }
};

// Pindah halaman otomatis saat input berubah
watch(pageInput, goToPage);
</script>

<template>
    <div v-if="links?.length > 0" class="flex items-center justify-center gap-2 dark:bg-gray-900 dark:text-gray-200">
        <!-- Tombol First -->
        <template v-if="links[1]?.url !== null">
            <Link
                :href="links[1].url"
                class="rounded border px-3 py-1 text-xs md:px-4 md:py-2 md:text-sm text-gray-600 shadow-sm transition hover:bg-gray-100 active:scale-95 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
                &laquo; First
            </Link>
        </template>
        <span v-else class="rounded border bg-gray-200 px-3 py-1 text-xs md:px-4 md:py-2 md:text-sm text-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500">&laquo; First</span>

        <!-- Tombol Previous -->
        <template v-if="links[0]?.url !== null">
            <Link
                :href="links[0].url"
                class="rounded border px-3 py-1 text-xs md:px-4 md:py-2 md:text-sm text-gray-600 shadow-sm transition hover:bg-gray-100 active:scale-95 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
                &lsaquo; Prev
            </Link>
        </template>
        <span v-else class="rounded border bg-gray-200 px-3 py-1 text-xs md:px-4 md:py-2 md:text-sm text-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500">&lsaquo; Prev</span>

        <!-- Input Halaman -->
        <div class="flex items-center gap-1 text-xs md:text-sm">
            <input
                v-model.number="pageInput"
                type="number"
                min="1"
                :max="totalPages"
                class="w-12 md:w-16 rounded border px-1 py-0.5 md:px-2 md:py-1 text-center shadow focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
            />
            <span class="text-gray-600 dark:text-gray-300">/ {{ totalPages }}</span>
        </div>

        <!-- Tombol Next -->
        <template v-if="links[links.length - 1]?.url !== null">
            <Link
                :href="links[links.length - 1].url"
                class="rounded border px-3 py-1 text-xs md:px-4 md:py-2 md:text-sm text-gray-600 shadow-sm transition hover:bg-gray-100 active:scale-95 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
                Next &rsaquo;
            </Link>
        </template>
        <span v-else class="rounded border bg-gray-200 px-3 py-1 text-xs md:px-4 md:py-2 md:text-sm text-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500">Next &rsaquo;</span>

        <!-- Tombol Last -->
        <template v-if="links[links.length - 2]?.url !== null">
            <Link
                :href="links[links.length - 2].url"
                class="rounded border px-3 py-1 text-xs md:px-4 md:py-2 md:text-sm text-gray-600 shadow-sm transition hover:bg-gray-100 active:scale-95 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
                Last &raquo;
            </Link>
        </template>
        <span v-else class="rounded border bg-gray-200 px-3 py-1 text-xs md:px-4 md:py-2 md:text-sm text-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500">Last &raquo;</span>
    </div>
</template>