<template>
    <!-- Call to Action -->
    <section class="relative py-24 text-center bg-brandDark text-white overflow-hidden" aria-labelledby="cta-title">
      <!-- Background Image with Overlay -->
      <div class="absolute inset-0 z-0">
        <img src="/Routiine.io background.jpeg" alt="Background" class="w-full h-full object-cover opacity-10" />
      </div>
  
      <!-- CTA Content -->
      <div class="relative z-10">
        <h2 id="cta-title" class="text-4xl md:text-5xl font-serif font-bold mb-6">
          Train like a Pro. Sell like a Legend.
        </h2>
        <NuxtLink
          to="/book"
          class="inline-block mt-8 border-2 border-brandGold text-brandGold font-mono font-semibold px-6 py-3 rounded-full transition-colors hover:bg-brandGold hover:!text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brandGold"
        >
          Book a Demo
        </NuxtLink>
      </div>
    </section>
  </template>
  
  <style scoped>
  .bg-brandDark { background-color: #121212; }
  .text-brandGold { color: #C09351; }
  .text-white { color: #FFFFFF; }
  .border-brandGold { border-color: #C09351; }
  .hover\:bg-brandGold:hover { background-color: #C09351; }
  </style>