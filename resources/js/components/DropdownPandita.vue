<script setup>
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { computed, ref } from 'vue';

const props = defineProps({
    panditas: Array,
    modelValue: String,
    errors: Object,
});

const emit = defineEmits(['update:modelValue']);

const searchQuery = ref('');
const isOpen = ref(false);

const filteredPanditas = computed(() =>
    props.panditas.filter((pandita) => pandita.nama_pandita.toLowerCase().includes(searchQuery.value.toLowerCase())),
);

const selectedPandita = computed(() => {
    const pandita = props.panditas.find((v) => v.id === props.modelValue);
    return pandita ? pandita.nama_pandita : 'Pilih Pandita';
});

const selectPandita = (pandita) => {
    emit('update:modelValue', pandita.id);
    searchQuery.value = pandita.nama_pandita;
    isOpen.value = false;
};
const handleScroll = (event) => {
    event.stopPropagation();
};
</script>

<template>
    <div>
        <label class="block text-sm font-medium text-gray-700">Pandita</label>
        <Popover v-model:open="isOpen">
            <PopoverTrigger as-child>
                <Button variant="outline" class="w-full justify-between">
                    {{ selectedPandita }}
                </Button>
            </PopoverTrigger>
            <PopoverContent class="w-[300px] p-2">
                <Input v-model="searchQuery" placeholder="Cari Pandita..." class="mb-2" />
                <ScrollArea class="max-h-40 overflow-auto" @wheel="handleScroll">
                    <ul v-if="filteredPanditas.length">
                        <li
                            v-for="pandita in filteredPanditas"
                            :key="pandita.id"
                            class="cursor-pointer rounded-md p-2 hover:bg-gray-100"
                            @click="selectPandita(pandita)"
                        >
                            {{ pandita.nama_pandita }}
                        </li>
                    </ul>
                    <p v-else class="p-2 text-sm text-gray-500">Pandita tidak ditemukan</p>
                </ScrollArea>
            </PopoverContent>
        </Popover>
        <p v-if="errors?.pandita_id" class="text-sm text-red-500">{{ errors.pandita_id }}</p>
    </div>
</template>
