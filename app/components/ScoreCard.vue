<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import Chart from 'chart.js/auto'
import type { ChartTypeRegistry, Point, BubbleDataPoint } from 'chart.js'

// Types
interface Signal {
  type: 'positive' | 'negative'
  name: string
  impact: number
  timestamp: number
}

// Constants
const MAX_SIGNALS = 5
const ANIMATION_SPEED = 20 // ms per frame
const SIMULATION_INTERVAL = 3000 // ms between signal updates
const BATCH_INTERVAL = 80 // ms between chart updates

// Get color mode from Nuxt
const colorMode = useColorMode()

// State
const score = ref(0)
const targetScore = ref(0)
const signals = ref<Signal[]>([
  { type: 'positive', name: 'Email response', impact: 5, timestamp: Date.now() - 5000 },
  { type: 'positive', name: 'PageView pattern', impact: 3, timestamp: Date.now() - 4000 },
  { type: 'negative', name: 'Decreased engagement', impact: -4, timestamp: Date.now() - 3000 },
  { type: 'positive', name: 'Form submission', impact: 6, timestamp: Date.now() - 2000 },
  { type: 'negative', name: 'Session time dropped', impact: -2, timestamp: Date.now() - 1000 }
])

// References for cleanup
let chart: Chart<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown> | null = null
let animationTimeout: number | null = null
let simulationInterval: number | null = null
let chartUpdateTimeout: number | null = null

// Computed properties
const activityTrend = computed(() => {
  const positiveCount = signals.value.filter(s => s.type === 'positive').length
  const negativeCount = signals.value.filter(s => s.type === 'negative').length
  return positiveCount > negativeCount ? 12 : -8
})

const conversionTrend = computed(() => {
  const netImpact = signals.value.reduce((sum, s) => sum + s.impact, 0)
  return netImpact > 0 ? 4 : -3
})

const signalCount = computed(() => signals.value.length)

const visibleSignals = computed(() => {
  return [...signals.value]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, MAX_SIGNALS)
})

const placeholderCount = computed(() =>
  Math.max(0, MAX_SIGNALS - visibleSignals.value.length)
)

const scoreColor = computed(() => {
  if (score.value > 70) return '#0d9488' // teal-600
  if (score.value > 50) return '#0ea5e9' // sky-500
  if (score.value > 30) return '#f59e0b' // amber-500
  return '#ef4444' // red-500
})

const chartBackgroundColor = computed(() =>
  colorMode.value === 'dark' ? '#1e293b' : '#f1f5f9'
)

const containerClass = computed(() =>
  colorMode.value === 'dark'
    ? 'bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white'
    : 'bg-gradient-to-b from-slate-100 via-white to-slate-100 text-slate-900'
)

// Methods
function calculateScore(): number {
  const impact = signals.value.reduce((sum, s) => sum + s.impact, 0)
  return Math.min(100, Math.max(0, 50 + impact * 2))
}

function createChart() {
  const canvas = document.getElementById('momentum-chart') as HTMLCanvasElement | null
  if (!canvas) return

  // Clean up existing chart
  if (chart) {
    chart.destroy()
    chart = null
  }

  try {
    chart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: ['Score', 'Remaining'],
        datasets: [{
          data: [score.value, 100 - score.value],
          backgroundColor: [scoreColor.value, chartBackgroundColor.value],
          borderWidth: 0,
          circumference: 180,
          rotation: 270
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '80%',
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        },
        layout: {
          padding: {
            bottom: 30
          }
        }
      }
    })
  } catch (error) {
    console.error('Chart creation error:', error)
  }
}

function updateChart() {
  if (!chart) {
    createChart()
    return
  }

  try {
    if (chart.data?.datasets?.[0]) {
      chart.data.datasets[0].data = [score.value, 100 - score.value]
      chart.data.datasets[0].backgroundColor = [scoreColor.value, chartBackgroundColor.value]
      chart.update('active')
    }
  } catch (error) {
    console.error('Chart update error:', error)
    createChart() // Try re-creating on error
  }
}

function animateScore() {
  // Clear existing animation
  if (animationTimeout !== null) {
    window.clearTimeout(animationTimeout)
    animationTimeout = null
  }

  // Adjust speed based on difference
  const difference = Math.abs(targetScore.value - score.value)
  const speed = Math.max(10, ANIMATION_SPEED / (difference > 10 ? 2 : 1))

  let lastUpdate = 0

  const animate = () => {
    const now = Date.now()
    let changed = false

    if (score.value < targetScore.value) {
      score.value++
      changed = true
    } else if (score.value > targetScore.value) {
      score.value--
      changed = true
    } else {
      return // Done animating
    }

    // Batch updates to avoid excessive redraws
    if (changed && (now - lastUpdate > BATCH_INTERVAL)) {
      updateChart()
      lastUpdate = now
    }

    animationTimeout = window.setTimeout(animate, speed)
  }

  animate()
}

function setTargetScore(newTarget: number) {
  targetScore.value = Math.min(100, Math.max(0, newTarget))
  animateScore()
}

function getRandomSignal(positive: boolean): Signal {
  const options = positive
    ? [
        { name: 'New page view', impact: 3 },
        { name: 'Form initiated', impact: 4 },
        { name: 'Email opened', impact: 2 },
        { name: 'Video watched', impact: 5 },
        { name: 'Live chat started', impact: 3 },
        { name: 'Product clicked', impact: 2 },
        { name: 'Download initiated', impact: 4 }
      ]
    : [
        { name: 'Abandoned cart', impact: -4 },
        { name: 'Bounce detected', impact: -3 },
        { name: 'Session timeout', impact: -2 },
        { name: 'Form abandoned', impact: -5 },
        { name: 'Error occurred', impact: -3 },
        { name: 'Page load slow', impact: -2 },
        { name: 'Exit from funnel', impact: -4 }
      ]

  const random = Math.floor(Math.random() * options.length)
  const selected = options[random] || (positive
    ? { name: 'Default positive', impact: 3 }
    : { name: 'Default negative', impact: -3 })

  return {
    type: positive ? 'positive' : 'negative',
    name: selected.name,
    impact: selected.impact,
    timestamp: Date.now()
  }
}

function simulateSignals() {
  const action = Math.random()

  if (action > 0.8 && signals.value.length > 3) {
    // Remove a signal (20% chance if more than 3)
    const index = Math.floor(Math.random() * signals.value.length)
    signals.value.splice(index, 1)
  } else if (action > 0.6 || signals.value.length < 3) {
    // Add a signal (40% chance or if less than 3)
    const isPositive = Math.random() > 0.4
    signals.value.push(getRandomSignal(isPositive))
  }

  // Debounce score updates
  if (chartUpdateTimeout !== null) {
    window.clearTimeout(chartUpdateTimeout)
  }

  chartUpdateTimeout = window.setTimeout(() => {
    setTargetScore(calculateScore())
    chartUpdateTimeout = null
  }, 50)
}

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

function addSignal(type: 'positive' | 'negative', name: string, impact: number) {
  signals.value.push({
    type,
    name,
    impact,
    timestamp: Date.now()
  })
  setTargetScore(calculateScore())
}

function cleanup() {
  if (chart) {
    chart.destroy()
    chart = null
  }

  if (animationTimeout !== null) {
    window.clearTimeout(animationTimeout)
    animationTimeout = null
  }

  if (simulationInterval !== null) {
    window.clearInterval(simulationInterval)
    simulationInterval = null
  }

  if (chartUpdateTimeout !== null) {
    window.clearTimeout(chartUpdateTimeout)
    chartUpdateTimeout = null
  }
}

// Watchers
watch(() => colorMode.value, () => {
  nextTick(() => updateChart())
})

// Lifecycle hooks
onMounted(async () => {
  await nextTick()

  // Initialize with calculated score
  const initialScore = calculateScore()
  targetScore.value = initialScore
  score.value = initialScore

  // Create chart
  createChart()

  // Start simulation
  simulationInterval = window.setInterval(simulateSignals, SIMULATION_INTERVAL)
})

onBeforeUnmount(cleanup)
</script>

<template>
  <UContainer class="py-12 flex justify-center items-center">
    <UCard
      :ui="{
        base: 'shadow-none text-center',
        rounded: 'rounded-lg',
        shadow: '',
        padding: 'p-4'
      }"
      class="bg-transparent border-0"
    >
      <div
        :class="containerClass"
        class="w-[320px] sm:w-[360px] md:w-[400px] aspect-[9/18] rounded-[2.5rem] p-6 flex flex-col justify-between transition-colors duration-300"
      >
        <!-- Header -->
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold tracking-tight">
            Momentum Scorecard
          </h2>

          <!-- Theme toggle -->
          <button
            class="p-1.5 rounded-full transition-colors"
            :class="colorMode.value === 'dark'
              ? 'text-slate-400 hover:text-white hover:bg-slate-700'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'"
            aria-label="Toggle color theme"
            @click="toggleColorMode"
          >
            <span
              v-if="colorMode.value === 'dark'"
              class="block w-5 h-5"
            >
              <!-- Sun icon -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </span>
            <span
              v-else
              class="block w-5 h-5"
            >
              <!-- Moon icon -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </span>
          </button>
        </div>

        <!-- Score Circle -->
        <div class="relative h-40 mt-2">
          <div class="w-full h-full">
            <canvas
              id="momentum-chart"
              role="img"
              aria-label="Score Visualization"
            />
          </div>
          <div class="absolute inset-0 flex flex-col items-center justify-end pb-2">
            <span
              class="text-6xl font-bold"
              :style="`color: ${scoreColor}`"
              aria-live="polite"
            >
              {{ score }}
            </span>
            <span
              class="text-xs mt-1"
              :class="colorMode.value === 'dark' ? 'text-slate-400' : 'text-slate-500'"
            >
              momentum score
            </span>
          </div>
        </div>

        <!-- Stats -->
        <div class="text-sm mt-6 space-y-3">
          <!-- Activity Trend -->
          <div class="flex justify-between items-center">
            <p
              :class="activityTrend >= 0
                ? (colorMode.value === 'dark' ? 'text-teal-400' : 'text-teal-600')
                : (colorMode.value === 'dark' ? 'text-red-400' : 'text-red-600')"
              class="flex-grow"
            >
              Activities:
              <span class="font-semibold min-w-[32px] inline-block text-right">
                {{ activityTrend >= 0 ? '+' : '' }}{{ activityTrend }}%
              </span>
            </p>
            <div class="flex items-center ml-2">
              <span
                class="text-xs mr-1"
                :class="activityTrend >= 0
                  ? (colorMode.value === 'dark' ? 'text-teal-400' : 'text-teal-600')
                  : (colorMode.value === 'dark' ? 'text-red-400' : 'text-red-600')"
              >
                {{ activityTrend >= 0 ? '↑' : '↓' }}
              </span>
              <UBadge
                size="xs"
                :color="activityTrend >= 0 ? 'teal' : 'red'"
                variant="subtle"
                class="w-2 h-2 p-0 rounded-full"
              />
            </div>
          </div>

          <!-- Conversion Trend -->
          <div class="flex justify-between items-center">
            <p
              :class="conversionTrend >= 0
                ? (colorMode.value === 'dark' ? 'text-teal-400' : 'text-teal-600')
                : (colorMode.value === 'dark' ? 'text-red-400' : 'text-red-600')"
              class="flex-grow"
            >
              Conversion:
              <span class="font-semibold min-w-[32px] inline-block text-right">
                {{ conversionTrend >= 0 ? '+' : '' }}{{ conversionTrend }}%
              </span>
            </p>
            <div class="flex items-center ml-2">
              <span
                class="text-xs mr-1"
                :class="conversionTrend >= 0
                  ? (colorMode.value === 'dark' ? 'text-teal-400' : 'text-teal-600')
                  : (colorMode.value === 'dark' ? 'text-red-400' : 'text-red-600')"
              >
                {{ conversionTrend >= 0 ? '↑' : '↓' }}
              </span>
              <UBadge
                size="xs"
                :color="conversionTrend >= 0 ? 'teal' : 'red'"
                variant="subtle"
                class="w-2 h-2 p-0 rounded-full"
              />
            </div>
          </div>

          <!-- Signal List -->
          <div class="mt-5">
            <div class="flex justify-between items-center mb-2">
              <p :class="colorMode.value === 'dark' ? 'text-sky-300' : 'text-sky-600'">
                Signals detected
              </p>
              <UBadge
                size="xs"
                color="sky"
                variant="subtle"
                class="font-semibold ml-1"
                style="margin-right: 9px;"
              >
                {{ signalCount }}
              </UBadge>
            </div>

            <div class="h-32 overflow-y-auto pr-2 scrollbars-hidden">
              <div class="space-y-1">
                <!-- Signals -->
                <div
                  v-for="signal in visibleSignals"
                  :key="`signal-${signal.timestamp}`"
                  class="flex justify-between items-center text-xs py-1.5 px-2.5 rounded transition-all duration-200"
                  :class="signal.type === 'positive'
                    ? (colorMode.value === 'dark' ? 'bg-emerald-900/40 border-l-2 border-emerald-500' : 'bg-emerald-100 border-l-2 border-emerald-500')
                    : (colorMode.value === 'dark' ? 'bg-red-900/40 border-l-2 border-red-500' : 'bg-red-100 border-l-2 border-red-500')"
                >
                  <span :class="colorMode.value === 'dark' ? 'text-white' : 'text-slate-900'">
                    {{ signal.name }}
                  </span>
                  <span
                    class="font-medium min-w-[32px] text-right"
                    :class="signal.type === 'positive'
                      ? (colorMode.value === 'dark' ? 'text-emerald-400' : 'text-emerald-600')
                      : (colorMode.value === 'dark' ? 'text-red-400' : 'text-red-600')"
                  >
                    {{ signal.type === 'positive' ? '+' : '' }}{{ signal.impact }}
                  </span>
                </div>

                <!-- Placeholders -->
                <div
                  v-for="i in placeholderCount"
                  :key="`placeholder-${i}`"
                  class="flex justify-between items-center text-xs py-1.5 px-2.5 rounded opacity-0 h-6"
                  aria-hidden="true"
                >
                  <span>Placeholder</span>
                  <span>+0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </UContainer>
</template>

<style scoped>
/* Hide scrollbar but maintain scroll functionality */
.scrollbars-hidden {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.scrollbars-hidden::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

/* Smooth transitions */
.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
