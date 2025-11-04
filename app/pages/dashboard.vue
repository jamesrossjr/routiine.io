<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <Navbar />

    <div class="flex">
      <!-- Sidebar -->
      <Sidebar />

      <!-- Main Content -->
      <main class="flex-1 p-6">
        <div class="max-w-7xl mx-auto">
          <!-- Header -->
          <div class="mb-6">
            <h1 class="text-2xl font-semibold text-gray-900">
              Sales Dashboard
            </h1>
            <p class="text-gray-500">
              Monitor your sales signals and activities
            </p>
          </div>

          <!-- Stats Overview -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <StatsCard
              title="Active Signals"
              value="24"
              change="+5"
              change-type="increase"
              icon="lightning-bolt"
            />
            <StatsCard
              title="New Leads"
              value="18"
              change="+12"
              change-type="increase"
              icon="user-plus"
            />
            <StatsCard
              title="Conversion Rate"
              value="32%"
              change="-2%"
              change-type="decrease"
              icon="chart-bar"
            />
          </div>

          <!-- Two-column layout -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Signals Feed (2/3 width) -->
            <div class="lg:col-span-2">
              <div class="bg-white rounded-lg shadow p-6 mb-6">
                <div class="flex justify-between items-center mb-4">
                  <h2 class="text-lg font-medium text-gray-900">
                    Recent Signals
                  </h2>
                  <NuxtLink
                    to="/signals"
                    class="text-sm text-primary-600 hover:text-primary-700"
                  >
                    View all
                  </NuxtLink>
                </div>
                <SignalFeed />
              </div>

              <!-- Activities -->
              <div class="bg-white rounded-lg shadow p-6">
                <div class="flex justify-between items-center mb-4">
                  <h2 class="text-lg font-medium text-gray-900">
                    Latest Activities
                  </h2>
                  <NuxtLink
                    to="/activities"
                    class="text-sm text-primary-600 hover:text-primary-700"
                  >
                    View all
                  </NuxtLink>
                </div>
                <ActivityFeed />
              </div>
            </div>

            <!-- Sidebar content (1/3 width) -->
            <div class="space-y-6">
              <!-- CRM Connection Status -->
              <div class="bg-white rounded-lg shadow p-6">
                <h2 class="text-lg font-medium text-gray-900 mb-4">
                  CRM Status
                </h2>
                <CrmConnectionStatus />
              </div>

              <!-- Quick Actions -->
              <div class="bg-white rounded-lg shadow p-6">
                <h2 class="text-lg font-medium text-gray-900 mb-4">
                  Quick Actions
                </h2>
                <QuickActionsList />
              </div>

              <!-- Upcoming Tasks -->
              <div class="bg-white rounded-lg shadow p-6">
                <h2 class="text-lg font-medium text-gray-900 mb-4">
                  Upcoming Tasks
                </h2>
                <TasksList />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
// You can add your component imports and logic here
</script>
