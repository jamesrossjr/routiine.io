<!-- pages/signals/index.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Top Navigation -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="font-bold text-xl text-blue-600">
            Signals
          </div>
          <div class="flex items-center space-x-4">
            <button
              type="button"
              class="text-gray-400 hover:text-gray-500"
            >
              <span class="sr-only">Search</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <button
              type="button"
              class="text-gray-400 hover:text-gray-500"
            >
              <span class="sr-only">Settings</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Signal Filters -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex overflow-x-auto py-3 space-x-4">
          <button class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap">
            All Signals
          </button>
          <button class="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap">
            Follow-ups
          </button>
          <button class="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap">
            Email Opens
          </button>
          <button class="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap">
            Website Visits
          </button>
          <button class="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap">
            Document Views
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Signals Count Summary -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-2">
          You have 12 active signals
        </h2>
        <p class="text-sm text-gray-500">
          Prioritized based on your sales strategy and signal strength
        </p>
      </div>

      <!-- Signal Cards -->
      <div class="space-y-4">
        <!-- High Priority Signal -->
        <div class="bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-500">
          <div class="flex justify-between items-start mb-3">
            <div>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 mb-2">
                High Priority
              </span>
              <h3 class="font-medium text-gray-900">
                GlobalTech needs follow-up
              </h3>
              <p class="text-sm text-gray-500">
                No contact in 30 days with a late-stage opportunity
              </p>
            </div>
            <div class="bg-red-100 text-red-800 font-medium rounded-full h-10 w-10 flex items-center justify-center">
              92
            </div>
          </div>
          <div class="text-sm text-gray-500 mb-4">
            <p>Last activity: Proposal sent on March 15, 2025</p>
            <p>Contact: Alex Johnson, CTO</p>
            <p>Opportunity value: $95,000</p>
          </div>
          <div class="flex space-x-2">
            <button class="bg-blue-600 text-white text-sm px-4 py-2 rounded-md flex-1 flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Call
            </button>
            <button class="bg-gray-100 text-gray-800 text-sm px-4 py-2 rounded-md flex-1 flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Email
            </button>
            <button class="bg-gray-100 text-gray-800 text-sm px-4 py-2 rounded-md flex-1 flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Note
            </button>
          </div>
        </div>

        <!-- Medium Priority Signal -->
        <div class="bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-500">
          <div class="flex justify-between items-start mb-3">
            <div>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mb-2">
                Medium Priority
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
