<template>
    <section class="bg-white dark:bg-brandDark py-20 px-6 md:px-12">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
          Built for Every Role in the Sales Org
        </h2>
        <p class="mt-4 text-lg text-slate-700 dark:text-slate-200 max-w-3xl mx-auto">
          Routiine serves the needs of sales reps, managers, and leadership—aligning daily behavior with strategy at every level.
        </p>
      </div>
  
      <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        <!-- Reps -->
        <div class="bg-gray-50 dark:bg-slate-800 rounded-2xl p-8 shadow-md text-left">
          <h3 class="text-xl font-bold text-brandGold mb-2">For Reps</h3>
          <p class="text-slate-700 dark:text-slate-200 mb-4">
            Build winning habits and stay on top of every deal with signal-powered prompts and structured routines.
          </p>
          <NuxtLink to="/solutions/reps" class="text-brandGold font-semibold underline hover:text-signalTeal transition">
            Learn More →
          </NuxtLink>
        </div>
  
        <!-- Managers -->
        <div class="bg-gray-50 dark:bg-slate-800 rounded-2xl p-8 shadow-md text-left">
          <h3 class="text-xl font-bold text-brandGold mb-2">For Managers</h3>
          <p class="text-slate-700 dark:text-slate-200 mb-4">
            Drive consistency across the team, coach smarter with data, and reinforce the behaviors that matter.
          </p>
          <NuxtLink to="/solutions/managers" class="text-brandGold font-semibold underline hover:text-signalTeal transition">
            Learn More →
          </NuxtLink>
        </div>
  
        <!-- Leaders -->
        <div class="bg-gray-50 dark:bg-slate-800 rounded-2xl p-8 shadow-md text-left">
          <h3 class="text-xl font-bold text-brandGold mb-2">For Leaders</h3>
          <p class="text-slate-700 dark:text-slate-200 mb-4">
            Operationalize your sales method, boost forecast accuracy, and scale a performance-driven culture.
          </p>
          <NuxtLink to="/solutions/leaders" class="text-brandGold font-semibold underline hover:text-signalTeal transition">
            Learn More →
          </NuxtLink>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  // PersonaCallouts component
  </script>
  
  <style scoped>
  .bg-brandDark { background-color: #1A1A1A; }
  .text-brandGold { color: #C09351; }
  .text-signalTeal { color: #3BA3A3; }
  </style>
  