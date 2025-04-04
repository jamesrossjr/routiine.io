<template>
  <div class="relative min-h-screen">
    <!-- Global Background Layer -->
    <div
      class="fixed inset-0 -z-10 transition-colors duration-300"
      :class="colorMode.value === 'dark' ? 'bg-brandDark' : 'bg-white'"
    ></div>

    <!-- Main App Content -->
    <Header />
    <NuxtPage />
    <Footer />
  </div>
</template>

<script setup>
import { useColorMode } from '@vueuse/core'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'

const colorMode = useColorMode()
</script>