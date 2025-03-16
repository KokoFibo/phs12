<script setup>
import { router } from '@inertiajs/vue3';

const logout = () => {
    router.post(route('logout'));
};

defineProps({
    name: String,
});
</script>

<template>
    <div class="main">
        <div class="parent">
            <div class="info glass">
                <h4 class="mb-5 text-2xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Dear {{ name }},</h4>
                <p class="mb-1 text-xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                    Terima kasih sudah mendaftar, Untuk sementara akun anda belum aktif
                </p>
                <p class="mb-1 text-xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Silakan Hubungi Admin untuk mengaktifkan akun anda.</p>
                <h1 class="mb-5 text-xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Terima Kasih</h1>
                <button @click="logout" class="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">Logout</button>
            </div>
        </div>
    </div>
</template>
<style>
.main {
    width: 100%;
    /* background: url({{ asset('img/background-biru.jpg') }}); */
    background: url('images/wallpaper.jpg');
    background-position: center;
    background-size: cover;
    height: 100vh;
    position: fixed;
}

.glass {
    /* From https://css.glass */
    background: rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.parent {
    display: flex;
    height: 100vh;
}

.btnrev {
    background-color: transparent;
    border-color: blue;
    color: blue;
}

.info {
    padding: 30px;
    margin: auto;
}
</style>
