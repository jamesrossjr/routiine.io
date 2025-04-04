<template>
    <section class="bg-black text-ivory py-24 px-6 md:px-16 relative overflow-hidden">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-playfair mb-12 opacity-0 animate-fade-up delay-100">
          Real Results
        </h2>
  
        <!-- Stats -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
          <div
            v-for="(stat, i) in stats"
            :key="i"
            class="rounded-xl border border-brand-brass p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-goldGlow opacity-0 animate-fade-up"
            :style="`animation-delay: ${200 + i * 100}ms`"
          >
            <p class="text-3xl md:text-4xl font-bold text-brand-gold mb-2 font-playfair">{{ stat.value }}</p>
            <p class="text-sm font-inter text-ivory">{{ stat.label }}</p>
          </div>
        </div>
  
        <!-- Testimonials Slider -->
        <div class="relative">
          <div class="rounded-2xl border border-brand-brass p-6 max-w-3xl mx-auto bg-[#111] text-left transition-opacity duration-500">
            <p class="text-base md:text-lg font-inter italic mb-4 text-ivory">“{{ testimonials[current].quote }}”</p>
            <p class="text-sm font-semibold text-brand-gold">{{ testimonials[current].name }}</p>
            <p class="text-xs text-slate-400">{{ testimonials[current].title }}</p>
          </div>
        </div>
      </div>
    </section>
</template>
  
<script setup>
  import { ref, onMounted } from 'vue'
  
  const stats = [
    { value: '+32%', label: 'Win Rate Increase' },
    { value: '2x', label: 'Faster Onboarding' },
    { value: '+90%', label: 'Manager Satisfaction' },
  ]
  
  const testimonials = [
    {
      name: 'Jordan Reyes',
      title: 'VP Sales, VelocityWorks',
      quote: 'Routiine changed how we coach—now our reps hit targets consistently and confidently.',
    },
    {
      name: 'Alex Chen',
      title: 'Sales Enablement Lead, Finexa',
      quote: 'The behavioral tracking gave us clarity and alignment we never had before.',
    },
    {
      name: 'Samantha Lee',
      title: 'Revenue Ops Manager, StreamCore',
      quote: 'Our onboarding time dropped in half. The framework is gold—literally and figuratively.',
    },
  ]
  
  const current = ref(0)
  
  onMounted(() => {
    setInterval(() => {
      current.value = (current.value + 1) % testimonials.length
    }, 6000)
  })
</script>
  
<style scoped>
  
  /* Glow */
  .hover\:shadow-goldGlow:hover {
    box-shadow: 0 8px 20px rgba(212, 175, 55, 0.15);
  }
  
  /* Scroll Animations */
  @keyframes fade-up {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-up {
    animation: fade-up 0.8s ease-out forwards;
  }
  .delay-100 {
    animation-delay: 0.1s;
  }
</style>
  