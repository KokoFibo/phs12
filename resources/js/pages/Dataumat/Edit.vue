<script setup>
import DropdownPandita from '@/components/DropdownPandita.vue';
import DropdownVihara from '@/components/DropdownVihara.vue';

import Navbar from '@/components/Navbar.vue';

import { Head, router, useForm } from '@inertiajs/vue3';

const breadcrumbs = [
    {
        title: 'Edit Data Umat',
        href: '/dataumats/edit',
    },
];
const props = defineProps({
    dataumat: Object,
    kotas: Array,
    groups: Array,
    viharas: Array,
    panditas: Array,
    errors: Object,
});

const form = useForm({
    kota_id: props.dataumat.kota_id,
    group_id: props.dataumat.group_id,
    vihara_id: props.dataumat.vihara_id,
    pandita_id: props.dataumat.pandita_id,
    nama_umat: props.dataumat.nama_umat,
    nama_alias: props.dataumat.nama_alias,
    mandarin: props.dataumat.mandarin,
    gender: props.dataumat.gender,
    tgl_lahir: props.dataumat.tgl_lahir,
    umur_sekarang: props.dataumat.umur_sekarang,
    alamat: props.dataumat.alamat,
    telp: props.dataumat.telp,
    hp: props.dataumat.hp,
    email: props.dataumat.email,
    pengajak: props.dataumat.pengajak,
    penjamin: props.dataumat.penjamin,
    tgl_mohonTao: props.dataumat.tgl_mohonTao,
    tgl_mohonTao_lunar: props.dataumat.tgl_mohonTao_lunar,
    tgl_sd3h: props.dataumat.tgl_sd3h,
    tgl_vtotal: props.dataumat.tgl_vtotal,
    status: props.dataumat.status,
    keterangan: props.dataumat.keterangan,
});

function back() {
    router.get('/dataumats');
}

function submit() {
    router.put(`/dataumats/${props.dataumat.id}`, form, {
        onSuccess: () => {
            form.reset();
        },
    });
}
</script>

<template>
    <Head title="Edit Data Umat" />
    <div class="mx-auto flex max-w-7xl flex-col rounded-xl p-4 text-sm bg-white dark:bg-gray-900 dark:text-gray-200">
        <div class="mb-3 hidden rounded-lg border p-2 md:block dark:border-gray-700">
            <h2 class="text-xl text-gray-500 dark:text-gray-300">Edit data umat</h2>
        </div>
        <div class="mt-3 max-w-7xl rounded-lg border p-3 py-6 sm:px-6 lg:px-8 dark:border-gray-700 dark:bg-gray-800">
            <form @submit.prevent="submit" class="space-y-6">
                <!-- Pilihan Kota, Group, Vihara, Pandita -->
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                            class="mt-1 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                        />
                    </div>
                </div>
                <!-- Form Input Lainnya -->
                <div class="grid grid-cols-1 gap-4 text-sm md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <label for="nama_umat" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Umat</label>
                        <input
                            v-model="form.nama_umat"
                            type="text"
                            id="nama_umat"
                            required
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                        />
                        <p v-if="errors.nama_umat" class="text-sm text-red-500 dark:text-red-400">{{ errors.nama_umat }}</p>
                    </div>
                    <div>
                        <label for="nama_alias" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Alias</label>
                        <input
                            v-model="form.nama_alias"
                            type="text"
                            id="nama_alias"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                        />
                        <p v-if="errors.nama_alias" class="text-sm text-red-500 dark:text-red-400">{{ errors.nama_alias }}</p>
                    </div>
                    <div>
                        <label for="mandarin" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Mandarin</label>
                        <input
                            v-model="form.mandarin"
                            type="text"
                            id="mandarin"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                        />
                        <p v-if="errors.mandarin" class="text-sm text-red-500 dark:text-red-400">{{ errors.mandarin }}</p>
                    </div>
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input
                            v-model="form.email"
                            type="email"
                            id="email"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                        />
                        <p v-if="errors.email" class="text-sm text-red-500 dark:text-red-400">{{ errors.email }}</p>
                    </div>
                </div>
                <div class="grid grid-cols-1 gap-4">
                    <div>
                        <label for="alamat" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Alamat</label>
                        <textarea
                            required
                            v-model="form.alamat"
                            id="alamat"
                            rows="3"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                        ></textarea>
                        <p v-if="errors.alamat" class="text-sm text-red-500 dark:text-red-400">{{ errors.alamat }}</p>
                    </div>
                </div>
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <label for="tgl_lahir" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tanggal Lahir</label>
                        <input
                            v-model="form.tgl_lahir"
                            type="date"
                            id="tgl_lahir"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
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
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                        />
                        <p v-if="errors.telp" class="text-sm text-red-500 dark:text-red-400">{{ errors.telp }}</p>
                    </div>
                    <div>
                        <label for="hp" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Handphone</label>
                        <input
                            v-model="form.hp"
                            type="text"
                            id="hp"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                        />
                        <p v-if="errors.hp" class="text-sm text-red-500 dark:text-red-400">{{ errors.hp }}</p>
                    </div>
                    <div>
                        <label for="gender" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Jenis Kelamin</label>
                        <select
                            v-model="form.gender"
                            id="gender"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
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
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
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
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
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
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                        />
                        <p v-if="errors.tgl_mohonTao" class="text-sm text-red-500 dark:text-red-400">{{ errors.tgl_mohonTao }}</p>
                    </div>
                    <div>
                        <label for="tgl_sd3h" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tanggal SD3H</label>
                        <input
                            v-model="form.tgl_sd3h"
                            type="date"
                            id="tgl_sd3h"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                        />
                        <p v-if="errors.tgl_sd3h" class="text-sm text-red-500 dark:text-red-400">{{ errors.tgl_sd3h }}</p>
                    </div>
                    <div>
                        <label for="tgl_vtotal" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tanggal VTotal</label>
                        <input
                            v-model="form.tgl_vtotal"
                            type="date"
                            id="tgl_vtotal"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                        />
                        <p v-if="errors.tgl_vtotal" class="text-sm text-red-500 dark:text-red-400">{{ errors.tgl_vtotal }}</p>
                    </div>
                    <div>
                        <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                        <input
                            v-model="form.status"
                            type="text"
                            id="status"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                        />
                        <p v-if="errors.status" class="text-sm text-red-500 dark:text-red-400">{{ errors.status }}</p>
                    </div>
                </div>
                <!-- Keterangan -->
                <div class="grid grid-cols-1 gap-4">
                    <div>
                        <label for="keterangan" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Keterangan (Opsional)</label>
                        <textarea
                            v-model="form.keterangan"
                            id="keterangan"
                            rows="3"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                        ></textarea>
                        <p v-if="errors.keterangan" class="text-sm text-red-500 dark:text-red-400">{{ errors.keterangan }}</p>
                    </div>
                </div>
                <!-- Tombol Simpan -->
                <div class="flex justify-between">
                    <button
                        @click.prevent="back"
                        class="rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                        :disabled="form.processing"
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        class="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 dark:text-white"
                        :disabled="form.processing"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>