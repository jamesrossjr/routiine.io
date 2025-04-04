<template> 
    <section class="relative bg-gradient-to-b from-white via-white to-gray-50 dark:from-brandDark dark:via-brandDark dark:to-black/80 py-28 px-6 md:px-12 overflow-hidden animate-fade-in">
      <div class="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-16">
  
        <!-- Text Content -->
        <div class="md:w-1/2 text-center md:text-left">
          <h2 class="text-4xl md:text-5xl font-extrabold leading-tight text-slate-900 dark:text-white">
            The Routiine Sales Book
          </h2>
          <p class="mt-6 text-lg text-slate-700 dark:text-slate-300">
            Your guide to embedding execution, behavior, and systems thinking into every sales motion.
          </p>
          <ul class="mt-6 space-y-3 text-left text-slate-600 dark:text-slate-400 list-disc list-inside">
            <li>Master the 10 Routiine Core Principles</li>
            <li>Build habits that drive results</li>
            <li>Turn strategy into daily action</li>
            <li>Align sales behavior with buyer signals</li>
          </ul>
          <div class="mt-8">
            <NuxtLink
              to="/book"
              class="inline-block border-2 border-brandGold text-brandGold font-mono font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:bg-brandGold hover:!text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brandGold"
            >
              Download a Free Chapter
            </NuxtLink>
          </div>
        </div>
  
        <!-- Book Image -->
        <div class="md:w-1/2 text-center">
          <img
            src="/Routiine.io book.png"
            alt="Routiine Sales Book Cover"
            class="w-72 mx-auto rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  // BookPromoSection styled like hero section, no background shapes
  </script>
  
  <style scoped>
  .bg-brandGold { background-color: #C79C60; }
  .text-brandGold { color: #C79C60; }
  .bg-signalTeal { background-color: #3BA3A3; }
  .bg-brandDark { background-color: #1A1A1A; }
  .bg-surfaceDarkest { background-color: #121212; }
  
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fade-in {
    animation: fade-in 0.6s ease-out;
  }
  </style>
  