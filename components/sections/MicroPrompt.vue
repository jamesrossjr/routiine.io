<template>
    <section class="bg-gray-100 dark:bg-surfaceDarkest py-20 px-6 md:px-12">
      <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
  
        <!-- Signal Score Teaser -->
        <div class="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-md">
          <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            How Warm Is This Lead’s Behavior?
          </h3>
          <p class="text-slate-600 dark:text-slate-300 mb-6">
            Choose a response and preview a sample Signal Score – just like Routiine does for reps.
          </p>
  
          <div class="space-y-3">
            <label class="flex items-center gap-2">
              <input type="radio" v-model="response" value="cold" />
              No email opens, no replies
            </label>
            <label class="flex items-center gap-2">
              <input type="radio" v-model="response" value="lukewarm" />
              Opened emails, clicked once
            </label>
            <label class="flex items-center gap-2">
              <input type="radio" v-model="response" value="hot" />
              Replied, scheduled a meeting
            </label>
          </div>
  
          <div class="mt-6">
            <div class="text-sm text-slate-500 dark:text-slate-400 mb-1">Signal Score Preview</div>
            <div class="w-full h-4 bg-slate-300 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                class="h-full transition-all duration-500"
                :class="scoreBarClass"
                :style="{ width: scoreWidth }"
              ></div>
            </div>
            <p class="mt-2 text-sm text-slate-700 dark:text-slate-300 italic">
              {{ scoreText }}
            </p>
          </div>
  
          <div class="mt-6">
            <NuxtLink
              to="/demo"
              class="inline-block border-2 border-brandGold bg-brandGold text-brandDark font-mono font-semibold px-6 py-3 rounded-full transition-colors duration-200 hover:!bg-transparent hover:!text-brandGold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brandGold"
            >
              Try the Full Demo
            </NuxtLink>
          </div>
        </div>
  
        <!-- Micro-Prompt of the Day -->
        <div class="bg-brandDark text-white/80 border border-white/10 p-8 rounded-2xl shadow-md">
          <h3 class="text-2xl font-bold mb-4 text-white">Micro-Prompt of the Day</h3>
          <p class="text-xl italic">“{{ prompt }}”</p>
          <p class="mt-4 text-sm text-white/70">
            Routiine delivers behavioral prompts like these every day—right when your reps need them.
          </p>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  
  const response = ref('')
  const prompts = [
    'Ask before you answer: “What’s the real reason you’re asking that?”',
    'Set next steps before you close the call.',
    'Score the call before logging it—how strong is the next signal?',
    'Silence isn’t interest. Move only when there’s a signal.',
    'Structure beats urgency. Calm the pace, follow the path.'
  ]
  
  const prompt = ref('')
  
  onMounted(() => {
    const index = Math.floor(Math.random() * prompts.length)
    prompt.value = prompts[index]
  })
  
  const scoreWidth = computed(() => {
    switch (response.value) {
      case 'cold':
        return '20%'
      case 'lukewarm':
        return '60%'
      case 'hot':
        return '90%'
      default:
        return '0%'
    }
  })
  
  const scoreText = computed(() => {
    switch (response.value) {
      case 'cold':
        return 'Low signal – deal needs action.'
      case 'lukewarm':
        return 'Moderate signal – potential engagement.'
      case 'hot':
        return 'High signal – move forward with intent.'
      default:
        return 'No signal selected.'
    }
  })
  
  const scoreBarClass = computed(() => {
    switch (response.value) {
      case 'cold':
        return 'bg-red-500'
      case 'lukewarm':
        return 'bg-yellow-500'
      case 'hot':
        return 'bg-green-500'
      default:
        return 'bg-transparent'
    }
  })
  </script>
  
  <style scoped>
  .bg-brandGold { background-color: #C09351; }
  .text-brandGold { color: #C09351; }
  .bg-brandDark { background-color: #1A1A1A; }
  </style>
  