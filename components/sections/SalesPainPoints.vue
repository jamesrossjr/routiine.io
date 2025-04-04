<template>
  <section class="py-20 px-6 sm:px-12 lg:px-20 bg-white dark:bg-brandDark text-center">
    <div class="max-w-5xl mx-auto space-y-12">
      <h2 class="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
        Why Sales Teams Choose <span class="text-brandGold">Routiine</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        <div class="space-y-4">
          <h3 class="text-xl font-bold text-signalBlue">Behavior Over Theory</h3>
          <p class="text-slate-600 dark:text-white">
            Routiine turns strategy into structured action. No fluff. No forgotten playbooks.
          </p>
        </div>
        <div class="space-y-4">
          <h3 class="text-xl font-bold text-signalBlue">Signal-Driven Execution</h3>
          <p class="text-slate-600 dark:text-white">
            Salespeople respond to buyer behavior—not guesses. Routiine guides execution based on real-time signals.
          </p>
        </div>
        <div class="space-y-4">
          <h3 class="text-xl font-bold text-signalBlue">Structure Meets Flow</h3>
          <p class="text-slate-600 dark:text-white">
            Routines, prompts, and systems built to fit your method—not override it.
          </p>
        </div>
      </div>
      <div class="pt-10">
        <NuxtLink
          to="/method"
          class="inline-block border-2 border-brandGold text-brandGold font-mono font-semibold px-6 py-3 rounded-full transition-colors hover:bg-brandGold hover:!text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brandGold"
        >
          Learn the Method
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
// SalesPoints component styled to match updated brand system
</script>

<style scoped>
.bg-brandGold { background-color: #C09351; }
.text-brandGold { color: #C09351; }
.bg-signalBlue { background-color: #3B90F9; }
.text-signalBlue { color: #3B90F9; }
.bg-brandDark { background-color: #121212; }
.text-white { color: #0000; }
</style>