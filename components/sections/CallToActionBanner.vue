<template>
    <section class="bg-brand-gold text-brand-brown py-16 px-6 text-center overflow-hidden">
      <div class="max-w-4xl mx-auto opacity-0 animate-fade-up">
        <h2 class="text-3xl md:text-4xl font-playfair font-bold mb-4">
          Ready to Reinvent Sales?
        </h2>
        <p class="text-base font-inter mb-8">
          Bring structure, clarity, and performance to every rep on your team.
        </p>
        <NuxtLink
          to="/book"
          class="inline-block px-8 py-4 rounded-full bg-brand-brown text-white font-semibold font-inter text-lg shadow-md transition-all hover:shadow-ctaGlow hover:scale-105"
        >
          Book a Call
        </NuxtLink>
      </div>
    </section>
</template>
  
<script setup>
  // No script logic needed
</script>
  
<style scoped>
  /* Colors */
  .bg-brand-gold {
    background-color: #d6b65c; /* Gold color */
  }
  .text-brand-brown {
    color: #3b2f1c; /* Brown color */
  }
  .bg-brand-brown {
    background-color: #3b2f1c; /* Brown color */
  }
  .text-brand-gold {
    color: #d6b65c; /* Gold color */
  }
  .text-ivory {
    color: #f8f4e3; /* Ivory color */
  }
  .bg-light-bg {
    background-color: #f9f9f9; /* Light background color */
  }
  .bg-dark-bg {
    background-color: #1a1a1a; /* Dark background color */
  }
  .bg-surfaceDarkest { background-color: #121212; }
  /* Fonts */
  .font-playfair {
    font-family: 'Playfair Display', serif;
  }
  .font-inter {
    font-family: 'Inter', sans-serif;
  }
  
  /* Animation */
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
  
  /* Glow on CTA */
  .hover\:shadow-ctaGlow:hover {
    box-shadow: 0 0 18px rgba(59, 47, 28, 0.25);
  }
</style>
  