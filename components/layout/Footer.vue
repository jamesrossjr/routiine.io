<template>
  <footer class="relative bg-gradient-to-t from-black/80 via-brandDark to-brandDark text-white py-12 overflow-hidden animate-fade-in" role="contentinfo">
    <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
      <div class="text-center md:text-left">
        <div class="text-xl font-serif font-bold mb-2">Routiine.io</div>
        <p class="text-sm text-white/70">© 2025 All rights reserved.</p>
      </div>

      <nav aria-label="Footer navigation" class="text-center">
        <h4 class="text-sm font-semibold mb-1 uppercase text-white/80">Explore</h4>
        <div class="flex flex-col items-center space-y-2">
          <NuxtLink to="/method" class="text-brandGold font-mono font-medium text-sm px-3 py-1.5 rounded-full transition-all duration-200 hover:px-2.5 hover:py-1 hover:bg-brandGold hover:!text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brandGold">Method</NuxtLink>
          <NuxtLink to="/platform" class="text-brandGold font-mono font-medium text-sm px-3 py-1.5 rounded-full transition-all duration-200 hover:px-2.5 hover:py-1 hover:bg-brandGold hover:!text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brandGold">Platform</NuxtLink>
          <NuxtLink to="/book" class="text-brandGold font-mono font-medium text-sm px-3 py-1.5 rounded-full transition-all duration-200 hover:px-2.5 hover:py-1 hover:bg-brandGold hover:!text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brandGold">Book</NuxtLink>
        </div>
      </nav>

      <nav aria-label="Support navigation" class="text-center">
        <h4 class="text-sm font-semibold mb-1 uppercase text-white/80">Support</h4>
        <div class="flex flex-col items-center space-y-2">
          <NuxtLink to="/resources" class="text-brandGold font-mono font-medium text-sm px-3 py-1.5 rounded-full transition-all duration-200 hover:px-2.5 hover:py-1 hover:bg-brandGold hover:!text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brandGold">Resources</NuxtLink>
          <NuxtLink to="/faq" class="text-brandGold font-mono font-medium text-sm px-3 py-1.5 rounded-full transition-all duration-200 hover:px-2.5 hover:py-1 hover:bg-brandGold hover:!text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brandGold">FAQ</NuxtLink>
          <NuxtLink to="/privacy" class="text-brandGold font-mono font-medium text-sm px-3 py-1.5 rounded-full transition-all duration-200 hover:px-2.5 hover:py-1 hover:bg-brandGold hover:!text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brandGold">Privacy Policy</NuxtLink>
        </div>
      </nav>

      <div class="text-center">
        <h4 class="text-sm font-semibold mb-1 uppercase text-white/80">Get in Touch</h4>
        <div class="flex flex-col items-center space-y-2">
          <NuxtLink to="/contact" class="text-brandGold font-mono font-medium text-sm px-3 py-1.5 rounded-full transition-all duration-200 hover:px-2.5 hover:py-1 hover:bg-brandGold hover:!text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brandGold">Contact Us</NuxtLink>
          <NuxtLink to="/careers" class="text-brandGold font-mono font-medium text-sm px-3 py-1.5 rounded-full transition-all duration-200 hover:px-2.5 hover:py-1 hover:bg-brandGold hover:!text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brandGold">Careers</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.bg-brandDark { background-color: #1A1A1A; }
.text-brandGold { color: #C09351; }

@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}
</style>