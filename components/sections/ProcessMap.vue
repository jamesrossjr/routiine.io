<template>
    <aside
      class="hidden md:flex fixed left-0 top-0 h-full w-20 lg:w-24 px-2 py-6 backdrop-blur bg-white/90 dark:bg-brandDark/80 shadow-lg z-50 flex-col items-center justify-between"
    >
      <template v-for="(step, index) in steps" :key="'step-' + index">
        <div
          ref="el => stepRefs[index] = el"
          class="relative group cursor-pointer flex flex-col items-center flex-1 justify-center"
          @mouseenter="activeStep = index"
          @mouseleave="activeStep = null"
          :class="activeIndex === index ? 'animate-pulse' : ''"
        >
          <!-- Pin -->
          <div
            :class="['w-10 h-10 rounded-full border-2 border-brandGold flex items-center justify-center bg-white dark:bg-brandDark shadow-md transition-transform duration-200', activeIndex === index ? 'scale-110 ring-2 ring-brandGold' : '', 'group-hover:scale-110']"
          >
            <img v-if="activeStep === index" src="/public/Routiine.io logo.png" alt="Pin" class="w-5 h-5 transition-opacity duration-300 opacity-100" />
          </div>
  
          <!-- Connector Line -->
          <div
            v-if="index < steps.length - 1"
            class="w-px flex-1 bg-brandGold"
          ></div>
          <div
            v-else
            class="w-px h-full bg-brandGold"
          ></div>
  
          <!-- Tooltip Label -->
          <div
            v-if="activeStep === index"
            class="absolute left-12 top-1/2 -translate-y-1/2 w-56 text-sm text-white bg-brandDark border border-brandGold p-3 rounded shadow-xl z-50"
          >
            <h4 class="font-bold text-base mb-1">{{ step.title }}</h4>
            <p class="text-xs leading-snug">{{ step.description }}</p>
          </div>
        </div>
      </template>
    </aside>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const activeStep = ref(null)
  const activeIndex = ref(null)
  const stepRefs = []
  
  const steps = [
    { title: 'Initial Signal Intake', description: 'Log inbound/outbound signals, tag sources, route leads, and assess performance insights.' },
    { title: 'Framing & Early Qualification', description: 'Set up front contract, qualification cues, log cues, track objections, and confirm frame outcome.' },
    { title: 'Guided Discovery', description: 'Run structured discovery using pain trackers, behavior logging, and stakeholder mapping.' },
    { title: 'Qualification & Decision Mapping', description: 'Score stakeholder fit, track objections, confirm urgency, build RVR, and advancement plan.' },
    { title: 'Commitment & Fit Validation', description: 'Confirm commitment, test fit, advance to proposal, forecast deal health, and identify upsell triggers.' },
    { title: 'Close, Onboarding & Expansion', description: 'Onboard cleanly, track value delivery, drive advocacy, and trigger expansion signals.' }
  ]
  
  onMounted(() => {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            activeIndex.value = Number(entry.target.getAttribute('data-index'))
          }
        })
      }, {
        threshold: 0.5
      })
  
      stepRefs.forEach((el, i) => {
        if (el) {
          el.setAttribute('data-index', i)
          observer.observe(el)
        }
      })
    }
  })
  </script>
  
  <style scoped>
  .bg-brandDark { background-color: #121212; }
  .border-brandGold { border-color: #C09351; }
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.15); opacity: 0.75; }
  }
  .animate-pulse {
    animation: pulse 1.5s infinite ease-in-out;
  }
  </style>