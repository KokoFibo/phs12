<script setup>
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { computed, ref } from 'vue';

const props = defineProps({
    viharas: Array,
    modelValue: String,
    errors: Object,
});

const emit = defineEmits(['update:modelValue']);

const searchQuery = ref('');
const isOpen = ref(false);

const filteredViharas = computed(() => props.viharas.filter((vihara) => vihara.nama_vihara.toLowerCase().includes(searchQuery.value.toLowerCase())));

const selectedVihara = computed(() => {
    const vihara = props.viharas.find((v) => v.id === props.modelValue);
    return vihara ? vihara.nama_vihara : 'Pilih Vihara';
});

const selectVihara = (vihara) => {
    emit('update:modelValue', vihara.id);
    searchQuery.value = vihara.nama_vihara;
    isOpen.value = false;
};
const handleScroll = (event) => {
    event.stopPropagation();
};
</script>

<template>
    <div>
        <label class="block text-sm font-medium text-gray-700">Vihara</label>
        <Popover v-model:open="isOpen">
            <PopoverTrigger as-child>
                <Button variant="outline" class="w-full justify-between">
                    {{ selectedVihara }}
                </Button>
            </PopoverTrigger>
            <PopoverContent class="w-[300px] p-2">
                <Input v-model="searchQuery" placeholder="Cari Vihara..." class="mb-2" />
                <ScrollArea class="max-h-40 overflow-auto" @wheel="handleScroll">
                    <ul v-if="filteredViharas.length">
                        <li
                            v-for="vihara in filteredViharas"
                            :key="vihara.id"
                            class="cursor-pointer rounded-md p-2 hover:bg-gray-100"
                            @click="selectVihara(vihara)"
                        >
                            {{ vihara.nama_vihara }}
                        </li>
                    </ul>
                    <p v-else class="p-2 text-sm text-gray-500">Vihara tidak ditemukan</p>
                </ScrollArea>
            </PopoverContent>
        </Popover>
        <p v-if="errors?.vihara_id" class="text-sm text-red-500">{{ errors.vihara_id }}</p>
    </div>
</template>
