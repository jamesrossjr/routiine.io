<template>
    <!-- Routiine Philosophy Section -->
    <section class="bg-brandDark text-white py-20 px-6 md:px-12 text-center">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-extrabold leading-tight">
          It's not what you know.<br />
          It's what you do daily.
        </h2>
        <p class="mt-6 text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
          Routiine is built on one simple belief: knowledge without execution is wasted. We give salespeople the behavioral systems to apply what they already know—at the moment it matters.
        </p>
        <div class="mt-8">
          <NuxtLink
            to="/philosophy"
            class="inline-block border-2 border-brandGold bg-brandGold text-white font-mono font-semibold px-6 py-3 rounded-full transition-colors duration-200 hover:!bg-transparent hover:!text-brandGold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brandGold"
          >
            Explore the Philosophy
          </NuxtLink>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  // PhilosophyTeaser component
  </script>
  
  <style scoped>
  .bg-brandDark { background-color: #1A1A1A; }
  .bg-brandGold { background-color: #C09351; }
  .text-brandGold { color: #C09351; }
  .bg-signalTeal { background-color: #3BA3A3; }
  .text-signalTeal { color: #3BA3A3; }
  .text-white\/90 { color: rgba(255, 255, 255, 0.9); }
  </style>
  