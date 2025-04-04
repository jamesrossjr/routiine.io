<template>
    <section class="py-20 px-6 md:px-16 bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      <div class="max-w-7xl mx-auto text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-playfair text-dark-heading dark:text-light-heading mb-2">
          The M.A.G.I.C. Framework
        </h2>
        <p class="text-base text-dark-body dark:text-light-body font-inter">
          5 foundational systems that structure every Routiine workspace and solution.
        </p>
      </div>
  
      <div class="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        <div
          v-for="(pillar, index) in pillars"
          :key="index"
          class="rounded-2xl border border-brand-gold bg-card-light dark:bg-card-dark text-dark-body dark:text-light-body p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-goldGlow"
        >
          <div class="text-3xl mb-4">{{ pillar.icon }}</div>
          <h3 class="font-playfair text-lg text-dark-heading dark:text-light-heading mb-2">
            {{ pillar.title }}
          </h3>
          <p class="text-sm font-inter leading-snug">
            {{ pillar.description }}
          </p>
        </div>
      </div>
    </section>
</template>
  
<script setup>
  const pillars = [
    {
      title: 'Media',
      icon: '🎤',
      description: 'Design, visuals, and messaging that create clarity, connection, and brand alignment.',
    },
    {
      title: 'Alignment',
      icon: '🧭',
      description: 'Systems that align people, processes, and tools toward a shared purpose.',
    },
    {
      title: 'Growth',
      icon: '🌱',
      description: 'Mechanisms to track progress, scale learning, and drive sustainable success.',
    },
    {
      title: 'Infrastructure',
      icon: '⚙️',
      description: 'The operational backbone: tools, automations, and workflows that scale.',
    },
    {
      title: 'Care',
      icon: '💜',
      description: 'Human-centered design that prioritizes well-being, empathy, and long-term success.',
    },
  ]
</script>
  
<style scoped>
 
  
  /* Fonts */
  .font-playfair {
    font-family: 'Playfair Display', serif;
  }
  .font-inter {
    font-family: 'Inter', sans-serif;
  }
  
  /* Glow on hover */
  .hover\:shadow-goldGlow:hover {
    box-shadow: 0 8px 20px rgba(212, 175, 55, 0.15);
  }
</style>
  