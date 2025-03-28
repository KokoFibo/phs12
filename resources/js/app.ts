import '../css/app.css';

import { useAuthStore } from '@/Stores/authStore'; // Import store auth
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persistedstate'; // Tambahkan persist plugin
import { createApp, h } from 'vue';
import { ZiggyVue } from 'ziggy-js';
import { initializeTheme } from './composables/useAppearance';

// Import Vue Toastification
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.vue`, import.meta.glob('./pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        const pinia = createPinia(); // Inisialisasi Pinia
        pinia.use(piniaPersist); // Gunakan plugin persist

        const app = createApp({ render: () => h(App, props) });

        app.use(plugin)
            .use(pinia) // Gunakan Pinia di aplikasi Vue
            .use(ZiggyVue)
            .use(Toast, {
                position: 'top-right',
                timeout: 3000,
                closeOnClick: true,
                pauseOnHover: true,
            });

        // Simpan data user ke Pinia hanya sekali saat aplikasi dimulai
        const authStore = useAuthStore();
        authStore.setUser(props.auth?.user || null);

        app.mount(el);
    },
    progress: {
        color: '#4B5563',
    },
    preserveState: true, // Tambahkan preserve state agar scroll tidak reset saat refresh
    preserveScroll: true, // Tambahkan preserve scroll agar posisi scroll tetap terjaga saat navigasi
});

// This will set light / dark mode on page load...
initializeTheme();

// Pendaftaran Service Worker untuk PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/service-worker.js')
            .then((registration) => {
                console.log('Service Worker terdaftar dengan sukses:', registration.scope);
            })
            .catch((error) => {
                console.error('Pendaftaran Service Worker gagal:', error);
            });
    });
}
