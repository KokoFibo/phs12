<script setup>
import Navbar from '@/components/Navbar.vue';

import DropdownPandita from '@/components/DropdownPandita.vue';
import DropdownVihara from '@/components/DropdownVihara.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { useAuthStore } from '@/Stores/authStore';
import { Head, router, useForm } from '@inertiajs/vue3';
import { onMounted, ref, watch } from 'vue';

const searchQuery = ref('');
const isOpen = ref(false);
// Filter dropdown berdasarkan pencarian
// const filteredViharas = computed(() => props.viharas.filter((vihara) => vihara.nama_vihara.toLowerCase().includes(searchQuery.value.toLowerCase())));

// Ambil nama vihara yang terpilih
// const selectedVihara = computed(() => {
//     const vihara = props.viharas.find((v) => v.id === form.vihara_id);
//     return vihara ? vihara.nama_vihara : 'Pilih Vihara';
// });
const userStore = useAuthStore();

const breadcrumbs = [
    {
        title: 'Tambah Data Umat',
        href: '/dataumats/create',
    },
];

const props = defineProps({
    kotas: Array,
    panditas: Array,
    viharas: Array,
    errors: Object,
});

const form = useForm({
    kota_id: '',
    group_id: '',
    vihara_id: '',
    pandita_id: '',
    nama_umat: '',
    nama_alias: '',
    mandarin: '',
    gender: '',
    tgl_lahir: '',
    umur_sekarang: null,
    alamat: '',
    telp: '',
    hp: '',
    email: '',
    pengajak: '',
    penjamin: '',
    tgl_mohonTao: '',
    tgl_mohonTao_lunar: '',
    tgl_sd3h: '',
    tgl_vtotal: '',
    status: 'Active',
    keterangan: '',
});

function clearData() {
    form.reset();
}

const lockPandita = ref(userStore.lock_pandita);
const lockVihara = ref(userStore.lock_vihara);

onMounted(() => {
    form.vihara_id = userStore.vihara_id;
    form.pandita_id = userStore.pandita_id;
}),
    watch(
        () => form.vihara_id, // Perubahan yang dipantau
        (newValue) => {
            if (newValue) {
                // userStore.setViharaId = newValue;
                userStore.setViharaId(newValue || null);
            }
        },
    ),
    watch(
        () => form.pandita_id, // Perubahan yang dipantau
        (newValue) => {
            if (newValue) {
                // userStore.setPanditaId = newValue;
                userStore.setPanditaId(newValue || null);
            }
        },
    );

watch(
    () => userStore.vihara_default,
    (newValue) => {
        if (newValue) {
            userStore.setViharaId(userStore.vihara_id_default);
            form.vihara_id = userStore.vihara_id_default;
            userStore.setPanditaId(userStore.pandita_id_default);
            form.pandita_id = userStore.pandita_id_default;
        } else {
            userStore.setViharaId(form.vihara_id);
            userStore.setPanditaId(form.pandita_id);
        }
    },
);

function submit() {
    form.post(route('dataumats.store'), {
        onSuccess: () => form.reset(),
    });
}
function back() {
    router.get('/dataumats');
}
</script>

<template>
    <Head title="Add Data Umat" />
    <Navbar />
    <div class="mx-auto flex max-w-7xl flex-col rounded-xl p-4 text-sm bg-white dark:bg-gray-900 dark:text-gray-200">
        <div class="mb-3 hidden rounded-lg border p-2 md:block dark:border-gray-700">
            <h2 class="text-xl text-gray-500 dark:text-gray-300">Add data umat</h2>
        </div>
        <div class="mt-3 max-w-7xl rounded-lg border p-3 py-6 sm:px-6 lg:px-8 dark:border-gray-700 dark:bg-gray-800">
            <!-- Checkbox Input Vihara -->
            <form @submit.prevent="submit" class="space-y-6">
                <div class="flex items-center">
                    <div>
                        <label class="inline-flex cursor-pointer items-center">
                            <input type="checkbox" v-model="userStore.vihara_default" class="dark:bg-gray-700 dark:border-gray-600" />
                            <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Input vihara sendiri</span>
                        </label>
                    </div>
                </div>
                <!-- Dropdown Vihara dan Pandita -->
                <div v-if="userStore.vihara_default" class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
                    <div>
                        <label for="pandita_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Vihara</label>
                        <select
                            v-model="form.vihara_id"
                            id="pandita_id"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                            :disabled="lockVihara"
                        >
                            <option value="" disabled>Pilih Vihara</option>
                            <option v-for="vihara in viharas" :key="vihara.id" :value="vihara.id">{{ vihara.nama_vihara }}</option>
                        </select>
                        <p v-if="errors.vihara_id" class="text-sm text-red-500 dark:text-red-400">{{ errors.vihara_id }}</p>
                    </div>
                    <div>
                        <label for="pandita_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Pandita</label>
                        <select
                            v-model="form.pandita_id"
                            id="pandita_id"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                            :disabled="lockPandita"
                        >
                            <option value="" disabled>Pilih Pandita</option>
                            <option v-for="pandita in panditas" :key="pandita.id" :value="pandita.id">{{ pandita.nama_pandita }}</option>
                        </select>
                        <p v-if="errors.pandita_id" class="text-sm text-red-500 dark:text-red-400">{{ errors.pandita_id }}</p>
                    </div>
                </div>
                <div v-else class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
                    <div>
                        <DropdownVihara
                            v-model="form.vihara_id"
                            :viharas="viharas"
                            :errors="errors"
                            class="mt-1 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                        />
                    </div>
                    <div>
                        <DropdownPandita
                            v-model="form.pandita_id"
                            :panditas="panditas"
                            :errors="errors"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                        />
                            <!-- class="mt-1 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200" -->
                    </div>
                </div>
                <!-- Form Input Lainnya -->
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <label for="nama_umat" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Umat</label>
                        <input
                            v-model="form.nama_umat"
                            type="text"
                            id="nama_umat"
                            required
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                        />
                        <p v-if="errors.nama_umat" class="text-sm text-red-500 dark:text-red-400">{{ errors.nama_umat }}</p>
                    </div>
                    <div>
                        <label for="nama_alias" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Alias</label>
                        <input
                            v-model="form.nama_alias"
                            type="text"
                            id="nama_alias"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                        />
                        <p v-if="errors.nama_alias" class="text-sm text-red-500 dark:text-red-400">{{ errors.nama_alias }}</p>
                    </div>
                    <div>
                        <label for="mandarin" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Mandarin</label>
                        <input
                            v-model="form.mandarin"
                            type="text"
                            id="mandarin"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                        />
                        <p v-if="errors.mandarin" class="text-sm text-red-500 dark:text-red-400">{{ errors.mandarin }}</p>
                    </div>
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input
                            v-model="form.email"
                            type="email"
                            id="email"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                        />
                        <p v-if="errors.email" class="text-sm text-red-500 dark:text-red-400">{{ errors.email }}</p>
                    </div>
                </div>
                <!-- Alamat -->
                <div class="grid grid-cols-1 gap-4">
                    <div>
                        <label for="alamat" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Alamat</label>
                        <textarea
                            required
                            v-model="form.alamat"
                            id="alamat"
                            rows="3"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                        ></textarea>
                        <p v-if="errors.alamat" class="text-sm text-red-500 dark:text-red-400">{{ errors.alamat }}</p>
                    </div>
                </div>
                <!-- Tanggal Lahir, Telepon, Handphone, dll. -->
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <label for="tgl_lahir" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tanggal Lahir</label>
                        <input
                            v-model="form.tgl_lahir"
                            type="date"
                            id="tgl_lahir"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                            required
                        />
                        <p v-if="errors.tgl_lahir" class="text-sm text-red-500 dark:text-red-400">{{ errors.tgl_lahir }}</p>
                    </div>
                    <div>
                        <label for="telp" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Telepon</label>
                        <input
                            v-model="form.telp"
                            type="text"
                            id="telp"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                        />
                        <p v-if="errors.telp" class="text-sm text-red-500 dark:text-red-400">{{ errors.telp }}</p>
                    </div>
                    <div>
                        <label for="hp" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Handphone</label>
                        <input
                            v-model="form.hp"
                            type="text"
                            id="hp"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                        />
                        <p v-if="errors.hp" class="text-sm text-red-500 dark:text-red-400">{{ errors.hp }}</p>
                    </div>
                    <div>
                        <label for="gender" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Jenis Kelamin</label>
                        <select
                            v-model="form.gender"
                            id="gender"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                            required
                        >
                            <option value="" disabled>Pilih Jenis Kelamin</option>
                            <option value="Laki-laki">Laki-laki</option>
                            <option value="Perempuan">Perempuan</option>
                        </select>
                        <p v-if="errors.gender" class="text-sm text-red-500 dark:text-red-400">{{ errors.gender }}</p>
                    </div>
                    <div>
                        <label for="pengajak" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Pengajak</label>
                        <input
                            required
                            v-model="form.pengajak"
                            type="text"
                            id="pengajak"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                        />
                        <p v-if="errors.pengajak" class="text-sm text-red-500 dark:text-red-400">{{ errors.pengajak }}</p>
                    </div>
                    <div>
                        <label for="penjamin" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Penjamin</label>
                        <input
                            required
                            v-model="form.penjamin"
                            type="text"
                            id="penjamin"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                        />
                        <p v-if="errors.penjamin" class="text-sm text-red-500 dark:text-red-400">{{ errors.penjamin }}</p>
                    </div>
                    <div>
                        <label for="tgl_mohonTao" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tanggal Mohon Tao</label>
                        <input
                            required
                            v-model="form.tgl_mohonTao"
                            type="date"
                            id="tgl_mohonTao"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                        />
                        <p v-if="errors.tgl_mohonTao" class="text-sm text-red-500 dark:text-red-400">{{ errors.tgl_mohonTao }}</p>
                    </div>
                    <div>
                        <label for="tgl_sd3h" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Sidang Dharma 3 Hari</label>
                        <input
                            v-model="form.tgl_sd3h"
                            type="date"
                            id="tgl_sd3h"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                        />
                        <p v-if="errors.tgl_sd3h" class="text-sm text-red-500 dark:text-red-400">{{ errors.tgl_sd3h }}</p>
                    </div>
                    <div>
                        <label for="tgl_vtotal" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Vegetarian Total</label>
                        <input
                            v-model="form.tgl_vtotal"
                            type="date"
                            id="tgl_vtotal"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                        />
                        <p v-if="errors.tgl_vtotal" class="text-sm text-red-500 dark:text-red-400">{{ errors.tgl_vtotal }}</p>
                    </div>
                    <div>
                        <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                        <input
                            v-model="form.status"
                            type="text"
                            id="status"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                        />
                        <p v-if="errors.status" class="text-sm text-red-500 dark:text-red-400">{{ errors.status }}</p>
                    </div>
                </div>
                <!-- Keterangan -->
                <div class="grid grid-cols-1 gap-4">
                    <div>
                        <label for="keterangan" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Keterangan</label>
                        <textarea
                            v-model="form.keterangan"
                            id="keterangan"
                            rows="3"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                        ></textarea>
                        <p v-if="errors.keterangan" class="text-sm text-red-500 dark:text-red-400">{{ errors.keterangan }}</p>
                    </div>
                </div>
                <!-- Tombol Simpan dan Back -->
                <div class="flex justify-between">
                    <div>
                        <button
                            @click.prevent="back"
                            class="rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                            :disabled="form.processing"
                        >
                            Back
                        </button>
                    </div>
                    <div>
                        <button
                            type="submit"
                            class="rounded bg-green-500 px-4 py-2 text-sm text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 dark:text-white"
                            :disabled="form.processing"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
