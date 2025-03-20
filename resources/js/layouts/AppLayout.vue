<!-- resources/js/Layouts/AppLayout.vue -->
<script setup>

import Navbar from '@/components/Navbar.vue'

</script>
<template>
  <div>
    <Navbar />
    <main>
      <slot />
    </main>
  </div>
</template>

