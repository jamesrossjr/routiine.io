<template>
  <header class="sticky top-0 z-50 w-full bg-white/80 dark:bg-brandDark backdrop-blur-lg border-b border-slate-200 dark:border-surfaceDarkest transition-shadow shadow-md">
    <div class="max-w-7xl mx-auto px-4 lg:px-6 py-2 flex items-center justify-between animate-fade-in">
      <!-- Brand Logo -->
      <NuxtLink to="/" class="flex items-center gap-2">
        <img
          :src="isDark ? '/Routiine Logo.png' : '/Routiine.io logo.png'"
          alt="Routiine icon"
          class="h-10 w-auto object-contain"
        />
        <img
          :src="isDark ? '/Routiine.io name.png' : '/Routiine.io name.png'"
          alt="Routiine.io wordmark"
          class="h-40 w-auto object-contain mt-4"
        />
      </NuxtLink>

      <!-- Desktop Nav -->
      <nav class="hidden lg:flex items-center space-x-6 font-mono text-sm font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-100" aria-label="Main Navigation">
        <NuxtLink to="/method" class="nav-link">Method</NuxtLink>
        <NuxtLink to="/platform" class="nav-link">Platform</NuxtLink>
        <NuxtLink to="/consulting" class="nav-link">Consulting</NuxtLink>
        <NuxtLink to="/resources" class="nav-link">Resources</NuxtLink>
      </nav>

      <!-- CTA + Mobile Menu Toggle -->
      <div class="flex items-center gap-4">
        <NuxtLink
          to="/contact"
          class="hidden lg:inline-block border-2 border-brandGold text-brandGold font-mono font-semibold px-6 py-3 rounded-full transition-colors hover:bg-brandGold hover:!text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brandGold"
        >
          Book a Call
        </NuxtLink>
        <button @click="toggleMobileMenu" aria-label="Toggle Navigation" class="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-brandDark shadow-md">
          <span v-if="!mobileMenuOpen" class="block w-5 h-0.5 bg-slate-800 dark:bg-white mb-1 transition-transform"></span>
          <span v-if="!mobileMenuOpen" class="block w-5 h-0.5 bg-slate-800 dark:bg-white mb-1 transition-transform"></span>
          <span v-if="!mobileMenuOpen" class="block w-5 h-0.5 bg-slate-800 dark:bg-white transition-transform"></span>
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-slate-800 dark:text-white">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <transition name="fade-slide">
      <div v-if="mobileMenuOpen" class="lg:hidden px-6 pt-6 pb-10 space-y-6 text-center font-mono text-base font-semibold text-slate-800 dark:text-slate-100 bg-white/90 dark:bg-brandDark backdrop-blur-lg shadow-xl">
        <NuxtLink to="/method" class="block">Method</NuxtLink>
        <NuxtLink to="/platform" class="block">Platform</NuxtLink>
        <NuxtLink to="/consulting" class="block">Consulting</NuxtLink>
        <NuxtLink to="/resources" class="block">Resources</NuxtLink>
        <NuxtLink
          to="/contact"
          class="block mx-auto w-full max-w-[250px] border-2 border-brandGold text-brandGold font-semibold px-6 py-3 rounded-full transition-colors hover:bg-brandGold hover:!text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brandGold"
        >
          Book a Call
        </NuxtLink>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { useColorMode } from '@vueuse/core'
import { ref, computed } from 'vue'

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const mobileMenuOpen = ref(false)
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<style scoped>
.bg-brandGold {
  background-color: #C09351;
}
.text-brandGold {
  color: #C09351;
}
.bg-brandDark {
  background-color: #121212;
}
.border-surfaceDarkest {
  border-color: #121212;
}

.nav-link {
  color: inherit;
  font-weight: 600;
  transition: color 0.3s ease;
}
.nav-link:hover {
  color: #C09351;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>