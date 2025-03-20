import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null);

    // const vihara = ref('');
    const vihara_id = ref('');
    const pandita_id = ref('');
    const lock_vihara = ref('true');
    const lock_pandita = ref('true');
    const vihara_id_default = ref('true');
    const pandita_id_default = ref('true');
    const vihara_default = ref(true);
    const user_role = ref();

    function setUserRole(data) {
        user_role.value = data;
    }
    function setViharaDefault(data) {
        vihara_default.value = data;
    }

    function setPanditaIdDefault(data) {
        pandita_id_default.value = data;
    }
    function setViharaIdDefault(data) {
        vihara_id_default.value = data;
    }

    function setViharaId(data) {
        vihara_id.value = data;
    }

    function setPanditaId(data) {
        pandita_id.value = data;
    }

    function setLockVihara(data) {
        lockVihara.value = data;
    }
    function setLockPandita(data) {
        lockPandita.value = data;
    }

    function setUser(data) {
        if (!user.value) {
            // Pastikan hanya menyimpan sekali
            user.value = data;
        }
    }

    function toggleVihara() {
        setviharaSendiri.value = !setviharaSendiri.value;
    }
    // function togglePandita() {
    //     panditaDefault.value = !panditaDefault.value;
    // }

    return {
        user,
        setUser,
        vihara_id,
        setViharaId,

        pandita_id,
        setPanditaId,

        toggleVihara,
        lock_vihara,
        setLockVihara,
        lock_pandita,
        setLockPandita,
        pandita_id_default,
        setPanditaIdDefault,
        vihara_id_default,
        setViharaIdDefault,
        vihara_default,
        setViharaDefault,
        user_role,
        setUserRole,
    };
});
