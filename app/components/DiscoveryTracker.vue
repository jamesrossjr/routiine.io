<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import Chart from 'chart.js/auto'
import type { Chart as ChartJS } from 'chart.js'

// Placeholder for future theme support
const _containerClass = computed(() =>
  colorMode.value === 'dark'
    ? 'bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white'
    : 'bg-gradient-to-b from-slate-100 via-slate-100 to-slate-100 text-slate-900'
)
// Signal point interface
interface SignalPoint {
  id: string
  name: string
  color: string
  bgColor: string
  borderColor: string
  notes: string
  rating: number
  assessed: boolean
  icon: string
}

// Client information
const clientInfo = reactive({
  name: 'Client Name',
  date: new Date().toISOString().split('T')[0],
  salesPerson: 'Sales Rep Name'
})

// Define signal points
const signalPoints = reactive<SignalPoint[]>([
  {
    id: 'surface-trigger',
    name: 'Surface Trigger',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500',
    notes: '',
    rating: 3,
    assessed: false,
    icon: 'i-heroicons-flag'
  },
  {
    id: 'personal-disruption',
    name: 'Personal Disruption',
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500',
    notes: '',
    rating: 3,
    assessed: false,
    icon: 'i-heroicons-user-minus'
  },
  {
    id: 'financial-consequence',
    name: 'Financial Consequence',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500',
    notes: '',
    rating: 3,
    assessed: false,
    icon: 'i-heroicons-currency-dollar'
  },
  {
    id: 'operational-impact',
    name: 'Operational Impact',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500',
    notes: '',
    rating: 3,
    assessed: false,
    icon: 'i-heroicons-cog-6-tooth'
  },
  {
    id: 'internal-visibility',
    name: 'Internal Visibility',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500',
    notes: '',
    rating: 3,
    assessed: false,
    icon: 'i-heroicons-eye'
  },
  {
    id: 'future-risk',
    name: 'Future Risk',
    color: 'text-teal-500',
    bgColor: 'bg-teal-500/10',
    borderColor: 'border-teal-500',
    notes: '',
    rating: 3,
    assessed: false,
    icon: 'i-heroicons-chart-bar'
  },
  {
    id: 'ownership-commitment',
    name: 'Ownership & Commitment',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500',
    notes: '',
    rating: 3,
    assessed: false,
    icon: 'i-heroicons-hand-raised'
  }
])

// UI state
const activeSignal = ref<SignalPoint | null>(null)
const isDetailView = ref(false)
const assessedCount = ref(0)
const chartCanvas = ref<HTMLCanvasElement | null>(null)
const currentScore = ref(0)
let signalChart: ChartJS | null = null
let animationTimeoutId: number | null = null

// Get color mode from Nuxt
const colorMode = useColorMode()

// Constants
const MAX_POSSIBLE_TOTAL = 35 // Maximum total score (7 signals × 5 max rating)

// Open signal details
function openSignalDetail(signal: SignalPoint) {
  activeSignal.value = signal
  isDetailView.value = true
}

// Close signal details
function closeSignalDetail() {
  isDetailView.value = false
  setTimeout(() => {
    activeSignal.value = null
  }, 300) // Wait for transition to complete
}

// Save assessment
function saveSignalAssessment(signal: SignalPoint) {
  if (!signal.assessed) {
    signal.assessed = true
    assessedCount.value++
  }

  // Calculate the new total score
  const newScore = calculateTotalScore()

  // Log for debugging purposes - can be removed in production
  console.log(`Saving signal: ${signal.name}, Rating: ${signal.rating}, New total score: ${newScore}`)

  // Start animation to the new score value
  animateScoreChange(newScore)

  closeSignalDetail()

  // Update chart after slight delay
  setTimeout(() => {
    updateChart()
  }, 100)
}

// Calculate total signal score - the sum of all ratings from assessed signals
function calculateTotalScore(): number {
  const total = signalPoints.reduce((sum, point) => {
    // Only include assessed signals in the calculation
    return point.assessed ? sum + point.rating : sum
  }, 0)

  // Add safety check to ensure we never exceed MAX_POSSIBLE_TOTAL
  return Math.min(total, MAX_POSSIBLE_TOTAL)
}

// Calculate intensity percentage based on MAX_POSSIBLE_TOTAL
const intensityPercentage = computed(() => {
  return (calculateTotalScore() / MAX_POSSIBLE_TOTAL) * 100
})

// Determine level label
const intensityLabel = computed(() => {
  const percentage = intensityPercentage.value

  if (percentage < 20) return 'Minimal'
  if (percentage < 40) return 'Mild'
  if (percentage < 60) return 'Moderate'
  if (percentage < 80) return 'Significant'
  return 'Severe'
})

// Determine color based on intensity
const intensityColor = computed(() => {
  const percentage = intensityPercentage.value

  if (percentage < 20) return '#10b981' // emerald-500
  if (percentage < 40) return '#3b82f6' // blue-500
  if (percentage < 60) return '#facc15' // yellow-500
  if (percentage < 80) return '#f97316' // orange-500
  return '#ef4444' // red-500
})

// Get indicator color for a signal
function getSignalIndicatorColor(signal: SignalPoint): string {
  if (!signal.assessed) return 'bg-slate-600 dark:bg-slate-600'

  if (signal.rating <= 2) return 'bg-emerald-500'
  if (signal.rating <= 3) return 'bg-yellow-500'
  return 'bg-red-500'
}

// Get rating text color
function getRatingColor(rating: number): string {
  if (rating <= 2) return 'text-emerald-500'
  if (rating <= 3) return 'text-yellow-500'
  return 'text-red-500'
}

// Animate score change with improved control
function animateScoreChange(targetScore: number) {
  // Clear any existing animation
  if (animationTimeoutId !== null) {
    window.clearTimeout(animationTimeoutId)
    animationTimeoutId = null
  }

  // Ensure target is valid and within bounds
  targetScore = Math.max(0, Math.min(targetScore, MAX_POSSIBLE_TOTAL))

  // Define animation step function
  const animate = () => {
    if (currentScore.value < targetScore) {
      currentScore.value++
      animationTimeoutId = window.setTimeout(animate, 30)
    } else if (currentScore.value > targetScore) {
      currentScore.value--
      animationTimeoutId = window.setTimeout(animate, 30)
    }

    // Ensure we don't exceed MAX_POSSIBLE_TOTAL during animation
    if (currentScore.value > MAX_POSSIBLE_TOTAL) {
      currentScore.value = MAX_POSSIBLE_TOTAL
    }
  }

  // Start animation
  animate()
}

// Create/update chart
function updateChart() {
  nextTick(() => {
    if (!chartCanvas.value) return

    // Clean up existing chart
    if (signalChart) {
      signalChart.destroy()
      signalChart = null
    }

    const ctx = chartCanvas.value.getContext('2d')
    if (!ctx) return

    // Get the current score (ensure it's within bounds)
    const score = Math.min(calculateTotalScore(), MAX_POSSIBLE_TOTAL)
    const remaining = MAX_POSSIBLE_TOTAL - score

    // Choose background color based on color mode
    const bgColor = colorMode.value === 'dark' ? '#1e293b' : '#f1f5f9'

    signalChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Signal Score', 'Remaining'],
        datasets: [
          {
            data: [score, remaining],
            backgroundColor: [intensityColor.value, bgColor],
            borderWidth: 0,
            circumference: 180,
            rotation: 270
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%',
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        }
      }
    })
  })
}

// Reset assessment
function resetDiscovery() {
  signalPoints.forEach((point) => {
    point.assessed = false
    point.rating = 3
    point.notes = ''
  })

  assessedCount.value = 0
  currentScore.value = 0

  // Clear any existing animation
  if (animationTimeoutId !== null) {
    window.clearTimeout(animationTimeoutId)
    animationTimeoutId = null
  }

  // Update chart
  updateChart()
}

// Toggle color mode
function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  setTimeout(() => {
    updateChart() // Update chart colors when theme changes
  }, 100)
}

// Initialize
onMounted(() => {
  currentScore.value = 0
  updateChart()
})

// Cleanup
onBeforeUnmount(() => {
  if (signalChart) {
    signalChart.destroy()
    signalChart = null
  }

  if (animationTimeoutId !== null) {
    window.clearTimeout(animationTimeoutId)
    animationTimeoutId = null
  }
})
</script>

<template>
  <UContainer class="py-12 flex justify-center items-center">
    <UCard
      :ui="{ base: 'shadow-none text-center' }"
      class="bg-transparent border-0"
    >
      <!-- Outer container styled with dark/light mode support -->
      <div
        class="w-[320px] sm:w-[360px] md:w-[400px] aspect-[9/18] rounded-[2.5rem] p-6 flex flex-col justify-between bg-slate-100 dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-slate-900 dark:text-white transition-colors duration-300"
        aria-label="Signal Discovery"
        role="region"
      >
        <!-- MAIN VIEW -->
        <div
          v-if="!isDetailView"
          class="h-full flex flex-col"
        >
          <!-- App Header -->
          <div class="flex justify-between items-center mb-4">
            <div>
              <h2 class="text-xl font-medium">
                Signal Discovery
              </h2>
              <p class="text-slate-500 dark:text-slate-400 text-xs">
                {{ clientInfo.date }}
              </p>
            </div>
            <div class="flex items-center space-x-2">
              <input
                v-model="clientInfo.name"
                placeholder="Client"
                class="bg-white dark:bg-slate-800/40 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm rounded-md px-2 py-1 max-w-[120px]"
              >
              <!-- Theme toggle button -->
              <button
                class="p-1 rounded-md text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
                title="Toggle light/dark mode"
                @click="toggleColorMode"
              >
                <span
                  v-if="colorMode.value === 'dark'"
                  class="block w-5 h-5"
                >
                  <!-- Sun icon for dark mode -->
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
                  <!-- Moon icon for light mode -->
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
          </div>

          <!-- Signal Score Chart -->
          <div class="signal-chart relative h-48 my-2">
            <canvas
              ref="chartCanvas"
              aria-label="Signal Score Visualization"
            />
            <div class="absolute inset-0 flex flex-col items-center justify-end pb-6">
              <span
                class="text-5xl font-bold"
                :style="`color: ${intensityColor}`"
                aria-live="polite"
              >
                {{ currentScore }}
              </span>
              <p class="text-xs text-slate-600 dark:text-slate-300 mt-1">
                signal score
                <span
                  class="ml-2 px-1.5 py-0.5 text-[10px] rounded-full font-medium"
                  :class="intensityPercentage < 60 ? 'bg-blue-500/20 text-blue-600 dark:text-blue-300' : 'bg-red-500/20 text-red-600 dark:text-red-300'"
                >
                  {{ intensityLabel }}
                </span>
              </p>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {{ assessedCount }}/{{ signalPoints.length }} points assessed
              </p>
            </div>
          </div>

          <!-- Signal Points Buttons -->
          <div class="mt-4 flex-grow overflow-y-auto pr-2 scrollbars-hidden">
            <p class="text-xs text-slate-500 dark:text-slate-400 mb-2">
              Select a signal to assess:
            </p>

            <div class="space-y-2.5">
              <div
                v-for="point in signalPoints"
                :key="point.id"
                class="flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-all duration-200 border-l-2"
                :class="[
                  point.assessed ? point.borderColor : 'border-slate-300 dark:border-slate-600',
                  'bg-white hover:bg-slate-50 dark:bg-slate-800/60 dark:hover:bg-slate-700/60'
                ]"
                @click="openSignalDetail(point)"
              >
                <div class="flex items-center">
                  <div :class="[point.color, 'mr-3']">
                    <div :class="[point.icon, 'w-5 h-5']" />
                  </div>
                  <span :class="point.assessed ? point.color : 'text-slate-700 dark:text-slate-300'">
                    {{ point.name }}
                  </span>
                </div>

                <div class="flex items-center space-x-2">
                  <!-- Rating if assessed -->
                  <span
                    v-if="point.assessed"
                    :class="getRatingColor(point.rating)"
                    class="text-sm font-medium"
                  >
                    {{ point.rating }}
                  </span>

                  <!-- Indicator dot -->
                  <div
                    class="w-3 h-3 rounded-full"
                    :class="getSignalIndicatorColor(point)"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- App Footer -->
          <div class="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700/50">
            <div class="flex justify-between">
              <button
                class="px-4 py-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
                :disabled="assessedCount === 0"
                @click="resetDiscovery"
              >
                Reset
              </button>

              <button
                class="px-4 py-2 bg-blue-600 text-white rounded-md transition-colors"
                :disabled="assessedCount < signalPoints.length"
                :class="assessedCount < signalPoints.length ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'"
              >
                Save
              </button>
            </div>
          </div>
        </div>

        <!-- DETAIL VIEW -->
        <div
          v-else-if="isDetailView && activeSignal"
          class="h-full flex flex-col"
        >
          <!-- Header -->
          <div class="flex justify-between items-center mb-4">
            <div class="flex items-center">
              <div :class="[activeSignal.color, 'mr-3']">
                <div :class="[activeSignal.icon, 'w-5 h-5']" />
              </div>
              <h3 :class="[activeSignal.color, 'text-xl font-medium']">
                {{ activeSignal.name }}
              </h3>
            </div>

            <button
              class="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white bg-transparent p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/60"
              @click="closeSignalDetail"
            >
              ✕
            </button>
          </div>

          <!-- Signal intensity selector with Minimal/Moderate/Severe buttons -->
          <div class="mb-6">
            <div class="flex justify-between items-center mb-2">
              <label class="text-sm text-slate-600 dark:text-slate-300">Signal Intensity</label>
              <span
                :class="getRatingColor(activeSignal.rating)"
                class="font-semibold"
              >
                {{ activeSignal.rating }}/5
              </span>
            </div>

            <!-- Severity rating buttons -->
            <div class="flex justify-between gap-2 mb-3">
              <button
                class="flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all"
                :class="activeSignal.rating <= 2
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/50'"
                @click="activeSignal.rating = 1"
              >
                Minimal
              </button>
              <button
                class="flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all"
                :class="activeSignal.rating === 3
                  ? 'bg-yellow-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/50'"
                @click="activeSignal.rating = 3"
              >
                Moderate
              </button>
              <button
                class="flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all"
                :class="activeSignal.rating >= 4
                  ? 'bg-red-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/50'"
                @click="activeSignal.rating = 5"
              >
                Severe
              </button>
            </div>

            <!-- Slider for fine-tuning -->
            <input
              v-model.number="activeSignal.rating"
              type="range"
              min="1"
              max="5"
              step="1"
              class="w-full h-2 bg-gradient-to-r from-emerald-500 via-yellow-500 to-red-500 rounded-full appearance-none cursor-pointer"
            >

            <div class="flex justify-between text-xs text-slate-400 dark:text-slate-500 mt-1">
              <span>Minimal</span>
              <span>Moderate</span>
              <span>Severe</span>
            </div>
          </div>

          <!-- Notes field -->
          <div class="flex-grow overflow-y-auto mb-4">
            <label class="text-sm text-slate-600 dark:text-slate-300 block mb-2">Notes</label>
            <textarea
              v-model="activeSignal.notes"
              class="w-full h-40 bg-white dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-2 focus:ring-1 focus:ring-slate-500 focus:outline-none rounded-md"
              :placeholder="`Add notes about this signal...`"
            />
          </div>

          <!-- Actions -->
          <div class="pt-3 border-t border-slate-200 dark:border-slate-700/50 mt-auto">
            <div class="flex justify-between">
              <button
                class="px-4 py-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
                @click="closeSignalDetail"
              >
                Cancel
              </button>

              <button
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                @click="saveSignalAssessment(activeSignal)"
              >
                Save Signal
              </button>
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

/* Hide range input track in webkit */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
}

/* Smooth transition for buttons */
.transition-all {
  transition: all 0.3s ease;
}

/* Ensure smooth transition between light/dark modes */
.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
