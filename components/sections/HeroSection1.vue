<template>
  <section class="relative py-16 px-4 sm:px-6 lg:px-20 overflow-hidden">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0 z-0">
      <img src="/Routiine.io background.jpeg" alt="Background" class="w-full h-full object-cover opacity-10" />
      <div class="absolute inset-0 bg-gradient-radial from-black/40 via-transparent to-black/10"></div>
    </div>

    <!-- Content Layer -->
    <div class="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">
      <!-- Text Content -->
      <div class="md:w-1/2 text-center md:text-left space-y-6 order-2 md:order-1">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-slate-900 dark:text-white">
          Routiine turns <span class="text-brandGold">sales strategy</span> into <span class="text-signalBlue">daily execution</span>
        </h1>
        <p class="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed sm:leading-snug">
          A behavior-first, signal-powered sales system that transforms habits, drives results, and embeds execution into every conversation.
        </p>
        <div class="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:justify-center md:justify-start gap-4">
          <!-- Primary CTA (Filled) -->
          <NuxtLink
            to="/book"
            class="inline-block border-2 border-brandGold bg-brandGold text-white font-mono font-semibold px-6 py-3 rounded-full transition-colors duration-200 hover:!bg-transparent hover:!text-brandGold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brandGold"
          >
            Start With Structure
          </NuxtLink>

          <!-- Secondary CTA (Outlined) -->
          <NuxtLink
            to="/method"
            class="inline-block border-2 border-brandGold text-brandGold font-mono font-semibold px-6 py-3 rounded-full transition-colors hover:bg-brandGold hover:!text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brandGold"
          >
            Learn the Method
          </NuxtLink>
        </div>
      </div>

      <!-- Mascot Image -->
      <div class="md:w-1/2 text-center order-1 md:order-2">
        <img
          src="/dr-vision-v2.png"
          alt="Dr. Vision, Routiine.io mascot"
          class="w-64 sm:w-72 mx-auto rounded-2xl"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.bg-brandGold { background-color: #C09351; }
.text-brandGold { color: #C09351; }
.bg-signalBlue { background-color: #3B90F9; }
.text-signalBlue { color: #3B90F9; }
.bg-brandDark { background-color: #121212; }
.bg-surfaceDarkest { background-color: #121212; }

.bg-gradient-radial {
  background-image: radial-gradient(circle, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.1) 100%);
}
</style>