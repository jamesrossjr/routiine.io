<template>
<section class="bg-ivory py-28" aria-labelledby="features-title">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <h2 id="features-title" class="text-4xl font-serif font-bold mb-4">Why Routiine?</h2>
        <p class="text-slate-600 dark:text-slate-300 text-lg">Elegant tools and strategic systems that elevate sales performance.</p>

        <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          <article class="bg-white dark:bg-surfaceDark p-6 rounded-lg shadow-md border border-slate-200 dark:border-surfaceDark" aria-label="Behavior-Driven CRM">
            <h3 class="text-xl font-semibold mb-2 font-serif">Behavior-Driven CRM</h3>
            <p class="text-slate-600 dark:text-slate-300">Built on behavioral science to drive habits and consistency in every sales interaction.</p>
          </article>
          <article class="bg-white dark:bg-surfaceDark p-6 rounded-lg shadow-md border border-slate-200 dark:border-surfaceDark" aria-label="Systematized Coaching">
            <h3 class="text-xl font-semibold mb-2 font-serif">Systematized Coaching</h3>
            <p class="text-slate-600 dark:text-slate-300">Coaching and feedback integrated into every stage, ensuring scalable growth and strategy.</p>
          </article>
          <article class="bg-white dark:bg-surfaceDark p-6 rounded-lg shadow-md border border-slate-200 dark:border-surfaceDark" aria-label="Signal-Based Decisions">
            <h3 class="text-xl font-semibold mb-2 font-serif">Signal-Based Decisions</h3>
            <p class="text-slate-600 dark:text-slate-300">Data-driven decision-making powered by real-time signals and routines.</p>
          </article>
        </div>
      </div>
    </section>
</template>
  
<script setup>
  import { ref } from 'vue'
  
  const form = ref({ name: '', email: '' })
  const submitted = ref(false)
  
  function handleSubmit() {
    // Replace with actual form submission logic or API
    submitted.value = true
  }
</script>
  
<style scoped>

  
  /* Font */
  .font-playfair {
    font-family: 'Playfair Display', serif;
  }
  .font-mono {
    font-family: 'ui-monospace', 'SFMono-Regular', monospace;
  }
  .font-inter {
    font-family: 'Inter', sans-serif;
  }
  
  /* Fade animation */
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
  }
</style>
  