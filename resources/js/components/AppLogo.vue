<script setup></script>

<template>
    <!-- <div class="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground"> -->
    <div class="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
        <!-- <AppLogoIcon class="size-5 fill-current text-white dark:text-black" /> -->
        <!-- <img src="{{ asset('images/logo.png')}}" alt="logo" /> -->
        <img :src="'/images/logo.png'" alt="Gambar" />
    </div>
    <div class="ml-1 grid flex-1 text-left text-sm">
        <span class="mb-0.5 truncate font-semibold leading-none">Vihara Pelita Hati</span>
    </div>
</template>
