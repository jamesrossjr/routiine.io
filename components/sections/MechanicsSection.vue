<template>
    <section class="py-24 px-6 md:px-16 bg-light-bg dark:bg-dark-bg transition-colors duration-500">
      <div class="max-w-7xl mx-auto text-center mb-20">
        <h2 class="text-4xl md:text-5xl font-playfair font-bold text-dark-heading dark:text-ivory">
          The Mechanics of Routiine
        </h2>
        <p class="text-lg font-inter mt-4 text-slate-700 dark:text-slate-300 max-w-2xl mx-auto">
          Where structure meets psychology. Routiine's system integrates behavior, automation, and clarity into every deal.
        </p>
      </div>
  
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <div
          v-for="(item, index) in mechanics"
          :key="index"
          class="p-8 rounded-2xl border border-gold bg-white dark:bg-dark-surface text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-goldGlow opacity-0 animate-fade-slide"
          :style="`animation-delay: ${100 + index * 100}ms`"
        >
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 rounded-full bg-gold text-black flex items-center justify-center font-bold text-lg shadow-md">
              {{ index + 1 }}
            </div>
            <h3 class="font-playfair text-xl font-semibold text-dark-heading dark:text-ivory">
              {{ item.title }}
            </h3>
          </div>
          <p class="text-base font-inter text-slate-700 dark:text-slate-300 mb-6">
            {{ item.description }}
          </p>
          <NuxtLink :to="item.link" class="inline-block text-gold font-semibold font-inter underline underline-offset-4 hover:text-gold/80">
            {{ item.cta }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  const mechanics = [
    {
      title: 'Structured Adaptability',
      description:
        'A flexible system that blends discipline with agility—guided questions, qualification criteria, and strategic checkpoints.',
      cta: 'See Process Design →',
      link: '/process',
    },
    {
      title: 'Balanced Decision-Making',
      description:
        'Combines buyer signals with intuitive insight—using decision trees, milestone tracking, and signal validation.',
      cta: 'Explore Signal Engine →',
      link: '/signals',
    },
    {
      title: 'Behavioral Installation',
      description:
        'Installs habits through structured routines—daily rhythms, feedback loops, and embedded reinforcement.',
      cta: 'View Behavior Maps →',
      link: '/behavior',
    },
    {
      title: 'Continuous Value Alignment',
      description:
        'Aligns every sales action to customer success—via value mapping, success metrics, and engagement checkpoints.',
      cta: 'Learn About Value Tracking →',
      link: '/value',
    },
    {
      title: 'Evidence Over Emotion',
      description:
        'Routiine replaces gut calls with observable behavior and objective indicators to drive clarity and accountability.',
      cta: 'Tour Signal Checklist →',
      link: '/checklist',
    },
    {
      title: 'Frictionless Reinforcement',
      description:
        'Integrated prompts, playbooks, and coaching loops that make growth continuous, not circumstantial.',
      cta: 'Reinforcement System →',
      link: '/reinforcement',
    },
  ]
  </script>
  
  <style scoped>
  .font-playfair {
    font-family: 'Playfair Display', serif;
  }
  .font-inter {
    font-family: 'Inter', sans-serif;
  }
  .hover\:shadow-goldGlow:hover {
    box-shadow: 0 10px 30px rgba(212, 175, 55, 0.2);
  }
  @keyframes fade-slide {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-slide {
    animation: fade-slide 0.6s ease-out forwards;
  }
  </style>