<script setup>
import DropdownPandita from '@/components/DropdownPandita.vue';
import DropdownVihara from '@/components/DropdownVihara.vue';

import AppLayout from '@/layouts/AppLayout.vue';
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

// const groups = ref([]);
// const viharas = ref([]);
// const panditas = ref([]);
// console.log('group', props.dataumat.group_id);
// console.log('vihara', props.dataumat.vihara_id);

function back() {
    router.get('/dataumats');
}

// Watch untuk memperbarui groups saat kota_id berubah
// watch(
//     () => form.kota_id,
//     (newKotaId) => {
//         if (newKotaId) {
//             router.get(
//                 route('groups.by.kota.edit', newKotaId),
//                 {},
//                 {
//                     preserveState: true,
//                     preserveScroll: true,
//                     // only: ['groups'],
//                     onSuccess: ({ props }) => {
//                         groups.value = props.groups;
//                         form.group_id = props.dataumat.group_id; // Reset group_id
//                         viharas.value = []; // Reset viharas
//                     },
//                     onError: (error) => {
//                         console.error('Error fetching groups:', error);
//                     },
//                 },
//             );
//         } else {
//             groups.value = [];
//             viharas.value = [];
//             form.group_id = '';
//             form.vihara_id = '';
//         }
//     },
//     // { immediate: true },
// );

// Watch untuk memperbarui viharas saat group_id berubah
// watch(
//     () => form.group_id,
//     (newGroupId) => {
//         if (newGroupId) {
//             router.get(
//                 route('viharas.by.group.edit', newGroupId),
//                 {},
//                 {
//                     preserveState: true,
//                     preserveScroll: true,
//                     only: ['viharas'],
//                     onSuccess: ({ props }) => {
//                         viharas.value = props.viharas;
//                     },
//                     onError: (error) => {
//                         console.error('Error fetching viharas:', error);
//                     },
//                 },
//             );
//         } else {
//             viharas.value = [];
//             form.vihara_id = '';
//         }
//     },
// );

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

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="mx-auto mt-3 max-w-7xl rounded-lg border py-6 text-sm sm:px-6 lg:px-8">
            <!-- <p>form.kota_id: {{ form.kota_id }}</p>
            <p>form.group_id: {{ form.group_id }}</p>
            <p>form.vihara_id: {{ form.vihara_id }}</p>
            <p>form.pandita_id: {{ form.pandita_id }}</p> -->
            <form @submit.prevent="submit" class="space-y-6">
                <!-- Pilihan Kota, Group, Vihara, Pandita -->
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <DropdownVihara v-model="form.vihara_id" :viharas="viharas" :errors="errors" class="mt-1" />
                    </div>
                    <div>
                        <DropdownPandita v-model="form.pandita_id" :panditas="panditas" :errors="errors" class="mt-1" />
                    </div>
                    <!-- <div>
                        <label for="kota_id" class="block text-sm font-medium text-gray-700">Kota</label>
                        <select
                            v-model="form.kota_id"
                            id="kota_id"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            required
                        >
                            <option value="" disabled>Pilih Kota</option>
                            <option v-for="kota in kotas" :key="kota.id" :value="kota.id">{{ kota.nama_kota }}</option>
                        </select>
                        <p v-if="errors.kota_id" class="text-sm text-red-500">{{ errors.kota_id }}</p>
                    </div>

                    <div>
                        <label for="group_id" class="block text-sm font-medium text-gray-700">Group</label>
                        <select
                            v-model="form.group_id"
                            id="group_id"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            required
                        >
                            <option value="" disabled>Pilih Group</option>
                            <option v-for="group in groups" :key="group.id" :value="group.id">{{ group.nama_group }}</option>
                        </select>
                        <p v-if="errors.group_id" class="text-sm text-red-500">{{ errors.group_id }}</p>
                    </div> -->

                    <!-- <div>
                        <label for="vihara_id" class="block text-sm font-medium text-gray-700">Vihara</label>
                        <select
                            v-model="form.vihara_id"
                            id="vihara_id"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            required
                        >
                            <option value="" disabled>Pilih Vihara</option>
                            <option v-for="vihara in viharas" :key="vihara.id" :value="vihara.id">{{ vihara.nama_vihara }}</option>
                        </select>
                        <p v-if="errors.vihara_id" class="text-sm text-red-500">{{ errors.vihara_id }}</p>
                    </div> -->

                    <!-- <div>
                        <label for="pandita_id" class="block text-sm font-medium text-gray-700">Pandita</label>
                        <select
                            v-model="form.pandita_id"
                            id="pandita_id"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            required
                        >
                            <option value="" disabled>Pilih Pandita</option>
                            <option v-for="pandita in panditas" :key="pandita.id" :value="pandita.id">{{ pandita.nama_pandita }}</option>
                        </select>
                        <p v-if="errors.pandita_id" class="text-sm text-red-500">{{ errors.pandita_id }}</p>
                    </div> -->
                </div>

                <!-- Form Input Lainnya -->
                <div class="grid grid-cols-1 gap-4 text-sm md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <label for="nama_umat" class="block text-sm font-medium text-gray-700">Nama Umat</label>
                        <input
                            v-model="form.nama_umat"
                            type="text"
                            id="nama_umat"
                            required
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                        <p v-if="errors.nama_umat" class="text-sm text-red-500">{{ errors.nama_umat }}</p>
                    </div>

                    <div>
                        <label for="nama_alias" class="block text-sm font-medium text-gray-700">Nama Alias</label>
                        <input
                            v-model="form.nama_alias"
                            type="text"
                            id="nama_alias"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                        <p v-if="errors.nama_alias" class="text-sm text-red-500">{{ errors.nama_alias }}</p>
                    </div>

                    <div>
                        <label for="mandarin" class="block text-sm font-medium text-gray-700">Mandarin</label>
                        <input
                            v-model="form.mandarin"
                            type="text"
                            id="mandarin"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                        <p v-if="errors.mandarin" class="text-sm text-red-500">{{ errors.mandarin }}</p>
                    </div>

                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            v-model="form.email"
                            type="email"
                            id="email"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                        <p v-if="errors.email" class="text-sm text-red-500">{{ errors.email }}</p>
                    </div>
                    <!-- sini -->
                </div>
                <div class="grid grid-cols-1 gap-4">
                    <div>
                        <label for="alamat" class="block text-sm font-medium text-gray-700">Alamat</label>
                        <textarea
                            v-model="form.alamat"
                            id="alamat"
                            rows="3"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        ></textarea>
                        <p v-if="errors.alamat" class="text-sm text-red-500">{{ errors.alamat }}</p>
                    </div>
                </div>
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <label for="tgl_lahir" class="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
                        <input
                            v-model="form.tgl_lahir"
                            type="date"
                            id="tgl_lahir"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            required
                        />
                        <p v-if="errors.tgl_lahir" class="text-sm text-red-500">{{ errors.tgl_lahir }}</p>
                    </div>

                    <div>
                        <label for="telp" class="block text-sm font-medium text-gray-700">Telepon</label>
                        <input
                            v-model="form.telp"
                            type="text"
                            id="telp"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                        <p v-if="errors.telp" class="text-sm text-red-500">{{ errors.telp }}</p>
                    </div>

                    <div>
                        <label for="hp" class="block text-sm font-medium text-gray-700">Handphone</label>
                        <input
                            v-model="form.hp"
                            type="text"
                            id="hp"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                        <p v-if="errors.hp" class="text-sm text-red-500">{{ errors.hp }}</p>
                    </div>
                    <div>
                        <label for="gender" class="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
                        <select
                            v-model="form.gender"
                            id="gender"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            required
                        >
                            <option value="" disabled>Pilih Jenis Kelamin</option>
                            <option value="Laki-laki">Laki-laki</option>
                            <option value="Perempuan">Perempuan</option>
                        </select>
                        <p v-if="errors.gender" class="text-sm text-red-500">{{ errors.gender }}</p>
                    </div>

                    <div>
                        <label for="pengajak" class="block text-sm font-medium text-gray-700">Pengajak</label>
                        <input
                            v-model="form.pengajak"
                            type="text"
                            id="pengajak"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                        <p v-if="errors.pengajak" class="text-sm text-red-500">{{ errors.pengajak }}</p>
                    </div>

                    <div>
                        <label for="penjamin" class="block text-sm font-medium text-gray-700">Penjamin</label>
                        <input
                            v-model="form.penjamin"
                            type="text"
                            id="penjamin"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                        <p v-if="errors.penjamin" class="text-sm text-red-500">{{ errors.penjamin }}</p>
                    </div>

                    <div>
                        <label for="tgl_mohonTao" class="block text-sm font-medium text-gray-700">Tanggal Mohon Tao</label>
                        <input
                            v-model="form.tgl_mohonTao"
                            type="date"
                            id="tgl_mohonTao"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                        <p v-if="errors.tgl_mohonTao" class="text-sm text-red-500">{{ errors.tgl_mohonTao }}</p>
                    </div>

                    <div>
                        <label for="tgl_sd3h" class="block text-sm font-medium text-gray-700">Tanggal SD3H</label>
                        <input
                            v-model="form.tgl_sd3h"
                            type="date"
                            id="tgl_sd3h"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                        <p v-if="errors.tgl_sd3h" class="text-sm text-red-500">{{ errors.tgl_sd3h }}</p>
                    </div>

                    <div>
                        <label for="tgl_vtotal" class="block text-sm font-medium text-gray-700">Tanggal VTotal</label>
                        <input
                            v-model="form.tgl_vtotal"
                            type="date"
                            id="tgl_vtotal"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                        <p v-if="errors.tgl_vtotal" class="text-sm text-red-500">{{ errors.tgl_vtotal }}</p>
                    </div>

                    <div>
                        <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
                        <input
                            v-model="form.status"
                            type="text"
                            id="status"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                        <p v-if="errors.status" class="text-sm text-red-500">{{ errors.status }}</p>
                    </div>
                </div>

                <!-- Alamat -->

                <!-- Keterangan -->
                <div class="grid grid-cols-1 gap-4">
                    <div>
                        <label for="keterangan" class="block text-sm font-medium text-gray-700">Keterangan (Opsional)</label>
                        <textarea
                            v-model="form.keterangan"
                            id="keterangan"
                            rows="3"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        ></textarea>
                        <p v-if="errors.keterangan" class="text-sm text-red-500">{{ errors.keterangan }}</p>
                    </div>
                </div>

                <!-- Tombol Simpan -->
                <div class="flex justify-between">
                    <button @click="kembali" class="rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-400" :disabled="form.processing">
                        Back
                    </button>
                    <button type="submit" class="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600" :disabled="form.processing">
                        Update
                    </button>
                </div>
            </form>
        </div>
    </AppLayout>
</template>
