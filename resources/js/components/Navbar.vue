<script setup>
import { ref, onMounted } from 'vue';
import { Link, router } from '@inertiajs/vue3';
import { MoonIcon, SunIcon, ChevronDownIcon, Bars3Icon, XMarkIcon } from '@heroicons/vue/24/solid';
import { useAuthStore } from '@/Stores/authStore';
import { computed } from 'vue';
const isDarkMode = ref(localStorage.getItem('theme') === 'dark');
const isMenuOpen = ref(false);
const isDataPenunjangOpen = ref(false);
const isSettingOpen = ref(false);


// Toggle Dark Mode
const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDarkMode.value);
};
const userStore = useAuthStore();

// Fungsi Logout
const logout = () => {
    router.post(route('logout'));
};

// Tutup dropdown saat klik di luar
const closeDropdowns = (event) => {
    if (!event.target.closest('.dropdown-menu')) {
        isDataPenunjangOpen.value = false;
        isSettingOpen.value = false;
    }
};

onMounted(() => {
    document.addEventListener('click', closeDropdowns);
});
const greeting = computed(() => {
    const hour = new Date().getHours();
    if (hour < 10) {
        return 'Selamat pagi';
    } else if (hour < 15) {
        return 'Selamat siang';
    } else if (hour < 18) {
        return 'Selamat sore';
    } else {
        return 'Selamat malam';
    }
});
</script>

<template>
    <nav class="sticky top-0 z-40 w-full bg-white shadow-md dark:bg-gray-900">
        <div class="mx-auto flex  items-center justify-between px-4 py-3">
            <!-- Logo -->
            <div class="flex items-center space-x-3">
                <img src="/images/logo.png" alt="Logo" class="h-8" />
                <span class="text-lg font-semibold text-gray-700 dark:text-white">Vihara Pelita Hati</span>
            </div>

            <!-- Desktop Menu -->
            <div class="hidden lg:flex space-x-6">
                <Link :href="route('dashboard')" class="nav-link">Dashboard</Link>
                <Link :href="route('dataumats.index')" class="nav-link">Data Umat</Link>

                <!-- Dropdown Data Penunjang -->
                <div v-if="userStore.user_role >= 2" class="relative dropdown-menu">
                    <button @click.stop="isDataPenunjangOpen = !isDataPenunjangOpen" class="nav-link flex items-center">
                        Data Penunjang <ChevronDownIcon class="h-4 w-4 ml-1" />
                    </button>
                    <div
                        v-if="isDataPenunjangOpen"
                        class="absolute left-0 mt-2 w-48 bg-white shadow-md rounded-md py-2 dark:bg-gray-800"
                    >
                        <Link :href="route('kotas.index')" class="dropdown-item">Data Kota</Link>
                        <Link :href="route('groups.index')" class="dropdown-item">Data Group</Link>
                        <Link :href="route('viharas.index')" class="dropdown-item">Data Vihara</Link>
                        <Link :href="route('panditas.index')" class="dropdown-item">Data Pandita</Link>
                        <Link :href="route('editroles.index')" class="dropdown-item">Edit User Role</Link>

                    </div>
                </div>

                <!-- Dropdown Setting -->
                <div class="relative dropdown-menu">
                    <button @click.stop="isSettingOpen = !isSettingOpen" class="nav-link flex items-center">
                        Setting <ChevronDownIcon class="h-4 w-4 ml-1" />
                    </button>
                    <div
                        v-if="isSettingOpen"
                        class="absolute left-0 mt-2 w-36 bg-white shadow-md rounded-md py-2 dark:bg-gray-800"
                    >
                        <Link :href="route('profile.edit')" class="dropdown-item">Setting</Link>
                        <button @click="logout" class="dropdown-item w-full text-left">Log Out</button>
                    </div>
                </div>
            </div>

           <div class='flex gap-5'>
            <div class="hidden lg:block">
                <p>{{ greeting }},  {{ userStore.user_name }}</p>
            </div>
             <!-- Dark Mode Toggle & Mobile Menu Button -->
            <div class="flex items-center space-x-4">
                <button @click="toggleDarkMode" class="text-gray-700 dark:text-white">
                    <SunIcon v-if="isDarkMode" class="h-6 w-6" />
                    <MoonIcon v-else class="h-6 w-6" />
                </button>
                <button @click="isMenuOpen = !isMenuOpen" class="lg:hidden text-gray-700 dark:text-white">
                    <Bars3Icon v-if="!isMenuOpen" class="h-6 w-6" />
                    <XMarkIcon v-else class="h-6 w-6" />
                </button>
            </div>
           </div>
        </div>

        <!-- Mobile Menu -->
        <div v-if="isMenuOpen" class="lg:hidden bg-white dark:bg-gray-800 shadow-md">
            <div class="px-4 py-2 space-y-2">
                <Link :href="route('dashboard')" class="block nav-link">Dashboard</Link>
                <Link :href="route('dataumats.index')" class="block nav-link">Data Umat</Link>

                <!-- Dropdown Data Penunjang -->
                <div v-if="userStore.user_role >= 2"  class="dropdown-menu">
                    <button @click="isDataPenunjangOpen = !isDataPenunjangOpen" class="nav-link flex justify-between w-full">
                        Data Penunjang <ChevronDownIcon class="h-4 w-4" />
                    </button>
                    <div v-if="isDataPenunjangOpen" class="pl-4 space-y-2">
                        <Link :href="route('kotas.index')" class="dropdown-item">Data Kota</Link>
                        <Link :href="route('groups.index')" class="dropdown-item">Data Group</Link>
                        <Link :href="route('viharas.index')" class="dropdown-item">Data Vihara</Link>
                        <Link :href="route('panditas.index')" class="dropdown-item">Data Pandita</Link>
                        <Link :href="route('editroles.index')" class="dropdown-item">Edit User Role</Link>
                    </div>
                </div>

                <!-- Dropdown Setting -->
                <div class="dropdown-menu">
                    <button @click="isSettingOpen = !isSettingOpen" class="nav-link flex justify-between w-full">
                        Setting <ChevronDownIcon class="h-4 w-4" />
                    </button>
                    <div v-if="isSettingOpen" class="pl-4 space-y-2">
                        <Link :href="route('profile.edit')" class="dropdown-item">Setting</Link>
                        <button @click="logout" class="dropdown-item w-full text-left">Log Out</button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.nav-link {
    @apply text-gray-700 hover:text-blue-500 dark:text-white dark:hover:text-blue-400 transition py-2;
}

.dropdown-item {
    @apply block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700;
}
</style>
