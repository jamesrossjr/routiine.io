<template>
  <UContainer
    id="dashboard"
    class="py-10"
  >
    <UPage>
      <header class="bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800 px-6 pt-4 pb-2 flex items-center justify-between relative">
        <div class="absolute inset-x-0 top-0 h-[1px] bg-gray-200 dark:bg-slate-700" />
        <div class="flex justify-between items-center w-full">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
            Dashboard
          </h2>
        </div>
      </header>

      <UPageBody>
        <UPageGrid class="gap-6">
          <!-- Activity Chart -->
          <UCard class="col-span-12 md:col-span-6">
            <template #header>
              Monthly Activity vs Conversion
            </template>
            <ClientOnly>
              <div class="h-48">
                <canvas
                  id="activityChart"
                  class="w-full h-full"
                />
              </div>
            </ClientOnly>
          </UCard>

          <!-- Signal Topics Chart -->
          <UCard class="col-span-12 md:col-span-6">
            <template #header>
              Conversation Topics Breakdown
            </template>
            <ClientOnly>
              <div class="h-48">
                <canvas
                  id="topicsChart"
                  class="w-full h-full"
                />
              </div>
            </ClientOnly>
          </UCard>

          <!-- Learning Hub -->
          <UCard class="col-span-12 md:col-span-4">
            <template #header>
              Learning Hub
            </template>
            <ul class="text-sm space-y-2">
              <li class="flex justify-between">
                <span>Handled Price Objection</span>
                <UBadge
                  color="success"
                  variant="subtle"
                >
                  +3pts
                </UBadge>
              </li>
              <li class="flex justify-between">
                <span>Improved Signal Discovery</span>
                <UBadge
                  color="success"
                  variant="subtle"
                >
                  +2pts
                </UBadge>
              </li>
              <li class="flex justify-between">
                <span>Missed Early Framing</span>
                <UBadge
                  color="error"
                  variant="subtle"
                >
                  -1pt
                </UBadge>
              </li>
              <li class="flex justify-between">
                <span>Follow-Up Consistency</span>
                <UBadge
                  color="warning"
                  variant="subtle"
                >
                  Neutral
                </UBadge>
              </li>
              <li class="flex justify-between">
                <span>Used Decision Mapping</span>
                <UBadge
                  color="success"
                  variant="subtle"
                >
                  +2pts
                </UBadge>
              </li>
            </ul>
          </UCard>

          <!-- Sales Performance Overview -->
          <UCard class="col-span-12 md:col-span-8">
            <template #header>
              Sales Performance
            </template>
            <div class="grid grid-cols-2 gap-6 text-sm">
              <div>
                <div class="text-muted">
                  Deals Closed
                </div>
                <div class="text-2xl font-bold text-teal-400">
                  12
                </div>
              </div>
              <div>
                <div class="text-muted">
                  Revenue Generated
                </div>
                <div class="text-2xl font-bold text-teal-400">
                  $84,200
                </div>
              </div>
              <div>
                <div class="text-muted">
                  Pipeline Coverage
                </div>
                <div class="text-2xl font-bold text-yellow-400">
                  3.1x
                </div>
              </div>
              <div>
                <div class="text-muted">
                  Avg. Sales Cycle
                </div>
                <div class="text-2xl font-bold text-sky-400">
                  34 days
                </div>
              </div>
            </div>
          </UCard>

          <!-- Conversion Predictions -->
          <UCard class="col-span-12">
            <template #header>
              Conversion Predictions
            </template>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div
                v-for="client in clients"
                :key="client.name"
                class="p-3 rounded-lg border dark:border-slate-700 bg-gray-50 dark:bg-slate-900"
              >
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm font-semibold">{{ client.name }}</span>
                  <div class="w-16 h-1.5 bg-gray-300 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      class="h-full bg-emerald-400 rounded-full"
                      :style="{ width: client.progress + '%' }"
                    />
                  </div>
                </div>
                <ClientOnly>
                  <div class="h-12">
                    <canvas
                      :id="client.chartId"
                      class="w-full h-full"
                    />
                  </div>
                </ClientOnly>
                <ul class="text-xs text-muted mt-2 space-y-1">
                  <li class="flex justify-between">
                    <span>Deal Size</span>
                    <span>{{ client.size }}</span>
                  </li>
                  <li class="flex justify-between">
                    <span>Last Contact</span>
                    <span>{{ client.lastContact }}</span>
                  </li>
                  <li class="flex justify-between">
                    <span>Stage</span>
                    <span>{{ client.stage }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </UCard>
        </UPageGrid>
      </UPageBody>
    </UPage>
    <footer class="min-h-[calc(100vh-var(--footer-height))] px-6 py-4 text-sm text-gray-500 dark:text-slate-400 text-center border-t border-gray-200 dark:border-slate-700">
      This is a demo environment. All data shown is fictional and for illustrative purposes only.
    </footer>
  </UContainer>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
import Chart from 'chart.js/auto'

const clients = [
  {
    name: 'Acme Corp',
    size: '$42,500',
    lastContact: '2 days ago',
    stage: 'Signal Intake',
    progress: 92,
    chartId: 'clientChart1',
    data: [65, 40, 85]
  },
  {
    name: 'Wayne Enterprises',
    size: '$88,000',
    lastContact: '5 days ago',
    stage: 'Solution Fit & Commitment',
    progress: 67,
    chartId: 'clientChart5',
    data: [30, 65, 78]
  },
  {
    name: 'Stark Industries',
    size: '$120,000',
    lastContact: 'Yesterday',
    stage: 'Close & Launch',
    progress: 90,
    chartId: 'clientChart6',
    data: [75, 85, 95]
  },
  {
    name: 'Oscorp',
    size: '$47,000',
    lastContact: '2 weeks ago',
    stage: 'Post-Sell Success',
    progress: 58,
    chartId: 'clientChart7',
    data: [20, 30, 40]
  },
  {
    name: 'LexCorp',
    size: '$64,000',
    lastContact: '3 weeks ago',
    stage: 'Expansion Opportunity',
    progress: 73,
    chartId: 'clientChart8',
    data: [45, 55, 60]
  }

]

const createLineChart = (id: string) => {
  const ctx = document.getElementById(id) as HTMLCanvasElement | null
  if (!ctx) {
    console.warn(`Canvas not found: #${id}`)
    return
  }

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Activities',
          data: [14, 20, 24, 28],
          borderColor: '#14b8a6',
          backgroundColor: 'rgba(20, 184, 166, 0.2)',
          fill: true,
          tension: 0.4,
          pointRadius: 2
        },
        {
          label: 'Conversions',
          data: [3, 4, 6, 7],
          borderColor: '#38bdf8',
          backgroundColor: 'rgba(56, 189, 248, 0.2)',
          fill: true,
          tension: 0.4,
          pointRadius: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            boxWidth: 8,
            font: { size: 9 }
          }
        }
      },
      scales: {
        x: {
          ticks: { color: '#94a3b8', font: { size: 9 } },
          grid: { display: false }
        },
        y: {
          ticks: { color: '#94a3b8', font: { size: 9 }, stepSize: 10 },
          grid: { color: '#e2e8f0' }
        }
      }
    }
  })
}

const createBarChart = (id: string) => {
  const ctx = document.getElementById(id) as HTMLCanvasElement | null
  if (!ctx) {
    console.warn(`Canvas not found: #${id}`)
    return
  }

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Budget', 'Timeline', 'Authority', 'Need', 'Risk'],
      datasets: [
        {
          label: 'Mentions',
          data: [12, 8, 5, 10, 6],
          backgroundColor: '#60a5fa',
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          ticks: { color: '#94a3b8', font: { size: 9 } },
          grid: { display: false }
        },
        y: {
          ticks: { color: '#94a3b8', font: { size: 9 }, stepSize: 5 },
          grid: { color: '#e2e8f0' }
        }
      }
    }
  })
}

const createClientChart = (id: string, data: number[]) => {
  const ctx = document.getElementById(id) as HTMLCanvasElement | null
  if (!ctx) {
    console.warn(`Canvas not found: #${id}`)
    return
  }

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Meeting', 'Email', 'Call'],
      datasets: [
        {
          data,
          backgroundColor: ['#38bdf8', '#3b82f6', '#6366f1'],
          barThickness: 6,
          borderRadius: 2
        }
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true }
      },
      scales: {
        x: { display: false, max: 100 },
        y: { display: false }
      }
    }
  })
}

onMounted(async () => {
  await nextTick()
  clients.forEach((client) => {
    createClientChart(client.chartId, client.data)
  })

  createLineChart('activityChart')
  createBarChart('topicsChart')
})
</script>
