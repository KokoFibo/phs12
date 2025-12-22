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
    <div
        class="flex min-h-screen flex-col items-center bg-gradient-to-b from-blue-200 to-white p-6 text-[#1b1b18] dark:bg-[#0a0a0a] lg:justify-center lg:p-8"
    >
        <header class="not-has-[nav]:hidden mb-6 w-full max-w-[335px] text-sm lg:max-w-4xl">
            <nav class="flex items-center justify-end gap-4">
                <Link
                    v-if="$page.props.auth.user"
                    :href="route('dashboard')"
                    class="inline-flex items-center justify-center rounded-md border border-blue-600 bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition-all hover:border-blue-700 hover:bg-blue-700 dark:border-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                    Dashboard
                </Link>

                <template v-else>
                    <Link
                        :href="route('login')"
                        class="inline-flex items-center justify-center rounded-md border border-blue-600 bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition-all hover:border-blue-700 hover:bg-blue-700 dark:border-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
                    >
                        Log in
                    </Link>
                </template>
            </nav>
        </header>
        <div class="duration-750 starting:opacity-0 flex w-full items-center justify-center opacity-100 transition-opacity lg:grow">
            <main class="flex flex-col items-center p-8 text-center">
                <div class="flex flex-col items-center gap-6 lg:flex-row">
                    <div class="max-w-md text-center lg:text-left">
                        <h1 class="text-4xl font-bold md:text-5xl">Team Management</h1>
                        <h1 class="text-4xl font-bold md:text-5xl">Vihara Pelita Hati</h1>
                        <p class="mt-4 text-balance text-lg text-gray-700 md:text-lg">
                            Semangat! Bersama kita bisa, jadikan hari ini lebih baik, teruslah menginspirasi, dedikasi kalian luar biasa, setiap usaha
                            berarti.
                        </p>
                    </div>
                    <div>
                        <img src="images/flowers.png" alt="Bunga" class="h-80 w-80 rounded-2xl md:h-96 md:w-96" />
                    </div>
                </div>
            </main>
        </div>

        <div class="h-14.5 hidden lg:block"></div>
    </div>
</template>
