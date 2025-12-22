<script setup>
import { Head, Link, router } from '@inertiajs/vue3';

const logout = () => {
    router.post(route('logout'));
};
</script>

<template>
    <Head title="Welcome">
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
    </Head>

    <div class="min-h-screen overflow-x-hidden bg-[#f8fafc] font-sans selection:bg-blue-100">
        <div class="pointer-events-none fixed inset-0 overflow-hidden">
            <div class="animate-blob absolute -right-[5%] -top-[5%] h-[50%] w-[50%] rounded-full bg-blue-100/40 blur-3xl"></div>
            <div
                class="animate-blob animation-delay-2000 absolute -bottom-[10%] -left-[5%] h-[50%] w-[50%] rounded-full bg-indigo-50/60 blur-3xl"
            ></div>
        </div>

        <div class="relative flex min-h-screen flex-col items-center">
            <header class="animate-fade-in-down w-full max-w-7xl px-6 py-6 lg:px-12">
                <nav class="flex items-center justify-end">
                    <Link
                        v-if="$page.props.auth.user"
                        :href="route('dashboard')"
                        class="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-blue-600 px-8 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 active:scale-95"
                    >
                        <span>Dashboard</span>
                    </Link>

                    <template v-else>
                        <Link
                            :href="route('login')"
                            class="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-blue-600 px-8 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 active:scale-95"
                        >
                            <span class="relative">Log in</span>
                        </Link>
                    </template>
                </nav>
            </header>

            <main class="flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-6 py-12 lg:px-12">
                <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
                    <div class="animate-fade-in-left order-2 text-center lg:order-1 lg:text-left">
                        <div
                            class="mb-6 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-600 shadow-sm"
                        >
                            Official Platform
                        </div>
                        <h1 class="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-7xl">
                            <span
                                class="animate-text-shimmer block bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-[length:200%_auto] bg-clip-text p-3 text-blue-600 text-transparent"
                                >Team Admin</span
                            >
                            <span class="mt-2 block">Vihara Pelita Hati</span>
                        </h1>
                        <p class="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-600 lg:mx-0">
                            Semangat! Bersama kita bisa, jadikan hari ini lebih baik, teruslah menginspirasi, dedikasi kalian luar biasa, setiap usaha
                            berarti.
                        </p>

                        <div class="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                            <div class="h-1.5 w-20 rounded-full bg-gradient-to-r from-blue-600 to-transparent"></div>
                        </div>
                    </div>

                    <div class="animate-fade-in-right order-1 flex justify-center lg:order-2 lg:justify-end">
                        <div class="group relative">
                            <div
                                class="absolute -inset-4 animate-pulse rounded-[3rem] bg-gradient-to-r from-blue-200 to-indigo-200 opacity-20 blur-2xl transition duration-1000 group-hover:opacity-40"
                            ></div>

                            <div
                                class="animate-float relative overflow-hidden rounded-[2.5rem] bg-white p-3 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] ring-1 ring-slate-100"
                            >
                                <img
                                    src="images/flowers.png"
                                    alt="Bunga"
                                    class="h-72 w-72 rounded-[2rem] object-cover transition-transform duration-1000 group-hover:scale-110 md:h-96 md:w-96"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer class="animate-fade-in py-8 text-sm text-slate-400">&copy; {{ new Date().getFullYear() }} Vihara Pelita Hati</footer>
        </div>
    </div>
</template>

<style scoped>
/* Base Smoothing */
div {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

/* Custom Keyframes */
@keyframes blob {
    0%,
    100% {
        transform: translate(0, 0) scale(1);
    }
    33% {
        transform: translate(30px, -50px) scale(1.1);
    }
    66% {
        transform: translate(-20px, 20px) scale(0.9);
    }
}

@keyframes float {
    0%,
    100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-15px);
    }
}

@keyframes fade-in-down {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fade-in-left {
    from {
        opacity: 0;
        transform: translateX(-30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes fade-in-right {
    from {
        opacity: 0;
        transform: translateX(30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes text-shimmer {
    to {
        background-position: 200% center;
    }
}

/* Utility Classes */
.animate-blob {
    animation: blob 10s infinite alternate;
}

.animate-float {
    animation: float 6s ease-in-out infinite;
}

.animate-fade-in-down {
    animation: fade-in-down 1s ease-out forwards;
}

.animate-fade-in-left {
    animation: fade-in-left 1s ease-out 0.2s forwards;
    opacity: 0;
}

.animate-fade-in-right {
    animation: fade-in-right 1s ease-out 0.4s forwards;
    opacity: 0;
}

.animate-text-shimmer {
    animation: text-shimmer 4s linear infinite;
}

.animation-delay-2000 {
    animation-delay: 2s;
}

.animate-fade-in {
    animation: opacity 2s ease-in;
}
</style>
