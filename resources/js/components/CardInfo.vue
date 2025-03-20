<template>
    <div class="max-w-sm rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-900 dark:text-gray-200">
        <div class="flex items-center space-x-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-gray-700 dark:text-blue-400">
                <slot name="icon">
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 11c3.866 0 7-3.134 7-7S15.866-3 12-3 5 0.134 5 4s3.134 7 7 7zm0 0v7m0 4h.01"
                        />
                    </svg>
                </slot>
            </div>
            <div>
                <h3 class="text-sm  text-gray-700 dark:text-gray-300">{{ label }}</h3>
                <p class="text-lg  text-gray-900 dark:text-gray-100">{{ jumlah }} Orang</p>
            </div>
        </div>
    </div>
</template>
<script setup>
defineProps({
    label: String,
    jumlah: Number,
});
</script>
