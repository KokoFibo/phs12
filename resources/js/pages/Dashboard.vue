<script setup>
import CardInfo from '@/components/CardInfo.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { useAuthStore } from '@/Stores/authStore';
import { Head } from '@inertiajs/vue3';
import { useToast } from 'vue-toastification';

const toast = useToast();

const showToast = () => {
    toast.success('Berhasil menyimpan data!');
};

const userStore = useAuthStore();

const props = defineProps({
    totalUmat: Number,
    umatBulanIni: Number,
    auth: Object, // Pastikan Laravel mengirimkan `auth`
    // kota: String,
});

// Set user hanya jika belum di-set sebelumnya
// if (!userStore.user) {
//     userStore.setUser(props.auth?.user || null);
// }
console.log('pandita_id: ', props.auth.pandita_id);
userStore.setUser(props.auth?.user || null);
// userStore.setKota(props.auth.kota);
// userStore.setGroup(props.auth.group);
userStore.setPanditaIdDefault(props.auth.pandita_id_default);
userStore.setViharaIdDefault(props.auth.vihara_id_default);
userStore.setPanditaId(props.auth.pandita_id_default);
userStore.setViharaId(props.auth.vihara_id_default);

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];
</script>

<template>
    <Head title="Dashboard" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <button @click="showToast" class="rounded bg-blue-500 p-2 text-white">Tampilkan Toast</button>
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <CardInfo label="Umat Baru Bulan Ini" :jumlah="umatBulanIni" />

            <CardInfo label="Total Umat" :jumlah="totalUmat">
                <template #icon>
                    <svg class="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12 A4 4 0 1 1 8 12 A4 4 0 1 1 16 12z" />
                    </svg>
                </template>
            </CardInfo>
        </div>
    </AppLayout>
</template>
