<script setup>
import AppLayout from '@/layouts/AppLayout.vue';
import { useAuthStore } from '@/Stores/authStore';
import { useForm } from '@inertiajs/vue3';
import { ref, watch } from 'vue';

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
    status: '',
    keterangan: '',
});

if (userStore.setviharaSendiri === true) {
    form.kota_id = userStore.user.kota_id;
    form.group_id = userStore.user.group_id;
    form.vihara_id = userStore.user.vihara_id;
    form.pandita_id = userStore.user.pandita_id;
}
// console.log(userStore.setviharaSendiri);
function clearData() {
    form.reset();
}

// State untuk menyimpan daftar groups dan viharas
// const kotas = ref([]);
// const groups = ref([]);
// const viharas = ref([]);
const lockPandita = ref(userStore.lockPandita);
const lockVihara = ref(userStore.lockVihara);

// watch(lockPandita, (newValue) => {
//     userStore.setLockPandita(newValue); // ✅ Memanggil setter dengan nilai baru
// });
// watch(lockVihara, (newValue) => {
//     userStore.setLock(newValue); // ✅ Memanggil setter dengan nilai baru
// });

watch(
    () => userStore.lockVihara, // Perubahan yang dipantau
    (newValue) => {
        if (newValue) {
            userStore.setLock(false); // Reset lock jika setviharaSendiri aktif
            lockVihara.value = false;
            form.pandita_id = userStore.user.pandita_id;
        }
    },
);

watch(
    () => userStore.lockPandita, // Perubahan yang dipantau
    (newValue) => {
        if (newValue) {
            userStore.setLock(false); // Reset lock jika setviharaSendiri aktif
            lockPandita.value = false;
            form.pandita_id = userStore.user.pandita_id;
        }
    },
);

function submit() {
    form.post(route('dataumats.store'), {
        onSuccess: () => form.reset(),
    });
}
</script>

<template>
    <Head title="Tambah Data Umat" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="mx-auto mt-3 max-w-7xl rounded-lg border py-6 sm:px-6 lg:px-8">
            <p>lockPandita: {{ lockPandita }}</p>
            <p>lockVihara: {{ userStore.lockVihara }}</p>
            <p>form.kota_id : {{ form.kota_id }}</p>
            <form @submit.prevent="submit" class="space-y-6">
                <div class="flex items-center" :class="userStore.setviharaSendiri ? 'justify-between' : 'justify-between'">
                    <div>
                        <label class="inline-flex cursor-pointer items-center">
                            <input type="checkbox" value="" class="peer sr-only" v-model="userStore.lockVihara" />
                            <div
                                class="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-checked:bg-blue-600 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"
                            ></div>
                            <span v-if="userStore.lockVihara" class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Vihara Locked</span>
                            <span v-else class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Vihara Unlocked</span>
                        </label>
                    </div>
                    <div>
                        <label class="inline-flex cursor-pointer items-center">
                            <input type="checkbox" class="peer sr-only" v-model="lockPandita" />
                            <div
                                class="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-checked:bg-blue-600 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"
                            ></div>
                            <span v-if="lockPandita" class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Pandita locked</span>
                            <span v-else class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Pandita Unlocked</span>
                        </label>
                    </div>
                </div>

                <!-- <div v-if="userStore.setviharaSendiri" class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <label for="nama_umat" class="block text-sm font-medium text-gray-700">Vihara</label>
                        <input
                            disabled
                            :value="userStore.vihara"
                            type="text"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <label for="nama_umat" class="block text-sm font-medium text-gray-700">Kota</label>
                        <input
                            disabled
                            :value="userStore.kota"
                            type="text"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <label for="nama_umat" class="block text-sm font-medium text-gray-700">Group</label>
                        <input
                            disabled
                            :value="userStore.group"
                            type="text"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <label for="pandita_id" class="block text-sm font-medium text-gray-700">Pandita</label>
                        <select
                            v-model="form.pandita_id"
                            id="pandita_id"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            :disabled="lockPandita"
                        >
                            <option value="" disabled>Pilih Pandita</option>
                            <option v-for="pandita in panditas" :key="pandita.id" :value="pandita.id">{{ pandita.nama_pandita }}</option>
                        </select>
                        <p v-if="errors.pandita_id" class="text-sm text-red-500">{{ errors.pandita_id }}</p>
                    </div>
                </div> -->
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <label for="vihara_id" class="block text-sm font-medium text-gray-700">Vihara</label>
                        <select
                            v-model="form.vihara_id"
                            id="vihara_id"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            :disabled="userStore.lockVihara"
                        >
                            <option value="" disabled>Pilih Vihara</option>
                            <option v-for="vihara in viharas" :key="vihara.id" :value="vihara.id">{{ vihara.nama_vihara }}</option>
                        </select>
                        <p v-if="errors.vihara_id" class="text-sm text-red-500">{{ errors.vihara_id }}</p>
                    </div>
                    <div>
                        <label for="nama_umat" class="block text-sm font-medium text-gray-700">Kota</label>
                        <input
                            disabled
                            :value="userStore.kota"
                            type="text"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <label for="nama_umat" class="block text-sm font-medium text-gray-700">Group</label>
                        <input
                            disabled
                            :value="userStore.group"
                            type="text"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                    </div>

                    <div>
                        <label for="pandita_id" class="block text-sm font-medium text-gray-700">Pandita</label>
                        <select
                            v-model="form.pandita_id"
                            id="pandita_id"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            :disabled="lockPandita"
                        >
                            <option value="" disabled>Pilih Pandita</option>
                            <option v-for="pandita in panditas" :key="pandita.id" :value="pandita.id">{{ pandita.nama_pandita }}</option>
                        </select>
                        <p v-if="errors.pandita_id" class="text-sm text-red-500">{{ errors.pandita_id }}</p>
                    </div>
                </div>

                <!-- Form Input Lainnya -->
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <label for="nama_umat" class="block text-sm font-medium text-gray-700">Nama Umat</label>
                        <input
                            v-model="form.nama_umat"
                            type="text"
                            id="nama_umat"
                            required
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                        <p v-if="errors.nama_umat" class="text-sm text-red-500">{{ errors.nama_umat }}</p>
                    </div>

                    <div>
                        <label for="nama_alias" class="block text-sm font-medium text-gray-700">Nama Alias</label>
                        <input
                            v-model="form.nama_alias"
                            type="text"
                            id="nama_alias"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                        <p v-if="errors.nama_alias" class="text-sm text-red-500">{{ errors.nama_alias }}</p>
                    </div>
                    <div>
                        <label for="mandarin" class="block text-sm font-medium text-gray-700">Mandarin</label>
                        <input
                            v-model="form.mandarin"
                            type="text"
                            id="mandarin"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                        <p v-if="errors.mandarin" class="text-sm text-red-500">{{ errors.mandarin }}</p>
                    </div>

                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            v-model="form.email"
                            type="email"
                            id="email"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                        <p v-if="errors.email" class="text-sm text-red-500">{{ errors.email }}</p>
                    </div>
                </div>

                <!-- sini -->
                <div class="grid grid-cols-1 gap-4">
                    <div>
                        <label for="alamat" class="block text-sm font-medium text-gray-700">Alamat</label>
                        <textarea
                            v-model="form.alamat"
                            id="alamat"
                            rows="3"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
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
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
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
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                        <p v-if="errors.telp" class="text-sm text-red-500">{{ errors.telp }}</p>
                    </div>

                    <div>
                        <label for="hp" class="block text-sm font-medium text-gray-700">Handphone</label>
                        <input
                            v-model="form.hp"
                            type="text"
                            id="hp"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                        <p v-if="errors.hp" class="text-sm text-red-500">{{ errors.hp }}</p>
                    </div>
                    <div>
                        <label for="gender" class="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
                        <select
                            v-model="form.gender"
                            id="gender"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
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
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                        <p v-if="errors.pengajak" class="text-sm text-red-500">{{ errors.pengajak }}</p>
                    </div>

                    <div>
                        <label for="penjamin" class="block text-sm font-medium text-gray-700">Penjamin</label>
                        <input
                            v-model="form.penjamin"
                            type="text"
                            id="penjamin"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                        <p v-if="errors.penjamin" class="text-sm text-red-500">{{ errors.penjamin }}</p>
                    </div>

                    <div>
                        <label for="tgl_mohonTao" class="block text-sm font-medium text-gray-700">Tanggal Mohon Tao</label>
                        <input
                            v-model="form.tgl_mohonTao"
                            type="date"
                            id="tgl_mohonTao"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                        <p v-if="errors.tgl_mohonTao" class="text-sm text-red-500">{{ errors.tgl_mohonTao }}</p>
                    </div>

                    <div>
                        <label for="tgl_sd3h" class="block text-sm font-medium text-gray-700">Sidang Dharma 3 Hari</label>
                        <input
                            v-model="form.tgl_sd3h"
                            type="date"
                            id="tgl_sd3h"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                        <p v-if="errors.tgl_sd3h" class="text-sm text-red-500">{{ errors.tgl_sd3h }}</p>
                    </div>

                    <div>
                        <label for="tgl_vtotal" class="block text-sm font-medium text-gray-700">Vegetarian Total</label>
                        <input
                            v-model="form.tgl_vtotal"
                            type="date"
                            id="tgl_vtotal"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                        <p v-if="errors.tgl_vtotal" class="text-sm text-red-500">{{ errors.tgl_vtotal }}</p>
                    </div>

                    <div>
                        <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
                        <input
                            v-model="form.status"
                            type="text"
                            id="status"
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
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
                            class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        ></textarea>
                        <p v-if="errors.keterangan" class="text-sm text-red-500">{{ errors.keterangan }}</p>
                    </div>
                </div>
                <div class="flex justify-between">
                    <!-- Tombol Keluar -->
                    <div class="flex justify-end space-x-4">
                        <Link :href="route('dataumats.index')">
                            <button class="rounded bg-gray-800 px-4 py-2 text-sm text-white hover:bg-gray-800" :disabled="form.processing">
                                Keluar
                            </button>
                        </Link>
                    </div>

                    <!-- Tombol Simpan -->
                    <div class="flex justify-end space-x-4">
                        <button
                            type="submit"
                            class="rounded bg-green-500 px-4 py-2 text-sm text-white hover:bg-green-600"
                            :disabled="form.processing"
                        >
                            Simpan
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </AppLayout>
</template>
