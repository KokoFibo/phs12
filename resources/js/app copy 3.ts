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

declare module 'vite/client' {
    interface ImportMetaEnv {
        readonly VITE_APP_NAME: string;
        [key: string]: string | boolean | undefined;
    }

    interface ImportMeta {
        readonly env: ImportMetaEnv;
        readonly glob: <T>(pattern: string) => Record<string, () => Promise<T>>;
    }
}

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
});

// This will set light / dark mode on page load...
initializeTheme();
