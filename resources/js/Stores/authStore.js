import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null);
    const kota = ref('');
    const group = ref('');
    const vihara = ref('');
    const pandita = ref('');
    const panditaDefault = ref(true);
    const setviharaSendiri = ref(true);
    const unlock = ref('false');
    const unlockPandita = ref('true');

    function setUnlock(data) {
        unlock.value = data;
    }
    function setUnlockPandita(data) {
        unlockPandita.value = data;
    }
    function setKota(data) {
        kota.value = data;
    }

    function setGroup(data) {
        group.value = data;
    }

    function setVihara(data) {
        vihara.value = data;
    }

    function setUser(data) {
        if (!user.value) {
            // Pastikan hanya menyimpan sekali
            user.value = data;
        }
    }

    function toggleVihara() {
        setviharaSendiri.value = !setviharaSendiri.value;
        // if (setviharaSendiri.value) {
        //     // unlockPandita.value = false;
        //     unlock.value = false;
        // }
    }
    function togglePandita() {
        panditaDefault.value = !panditaDefault.value;
    }

    return {
        user,
        setUser,
        kota,
        setKota,
        group,
        setGroup,
        vihara,
        setVihara,
        setviharaSendiri,
        toggleVihara,
        panditaDefault,
        unlockPandita,
        unlock,
        setUnlock,
        setUnlockPandita,
    };
});
