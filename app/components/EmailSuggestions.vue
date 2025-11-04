<!-- components/ai/EmailSuggestions.vue -->
<template>
  <div class="bg-white rounded-lg shadow-sm p-4">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold text-gray-900 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2 text-blue-600"
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
        AI Email Suggestions
      </h2>
      <div>
        <button
          class="text-sm text-blue-600 hover:text-blue-800 flex items-center"
          :disabled="isLoading"
          @click="generateSuggestions"
        >
          <svg
            v-if="isLoading"
            class="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <svg
            v-else
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
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          {{ isLoading ? 'Generating...' : 'Generate' }}
        </button>
      </div>
    </div>

    <!-- Loading state -->
    <div
      v-if="isLoading && !emails.length"
      class="py-8 flex justify-center"
    >
      <div class="flex flex-col items-center">
        <svg
          class="animate-spin h-8 w-8 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <p class="mt-2 text-sm text-gray-500">
          AI is crafting email templates...
        </p>
        <p class="text-xs text-gray-400 mt-1">
          Personalizing for this contact
        </p>
      </div>
    </div>

    <!-- Error state -->
    <div
      v-else-if="error"
      class="bg-red-50 border-l-4 border-red-400 p-4"
    >
      <div class="flex">
        <div class="flex-shrink-0">
          <svg
            class="h-5 w-5 text-red-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-red-700">
            {{ error }}
          </p>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div
      v-else-if="!emails.length"
      class="py-6 text-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="mx-auto h-12 w-12 text-gray-400"
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
      <h3 class="mt-2 text-sm font-medium text-gray-900">
        No email suggestions yet
      </h3>
      <p class="mt-1 text-sm text-gray-500">
        Click the button above to generate personalized emails
      </p>
    </div>

    <!-- Email tabs -->
    <div v-else>
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-6">
          <button
            v-for="(email, index) in emails"
            :key="index"
            class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
            :class="selectedEmailIndex === index ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            @click="selectedEmailIndex = index"
          >
            {{ email.type === 'follow_up' ? 'Follow-up' : (email.type === 'value_proposition' ? 'Value Prop' : 'Meeting Request') }}
          </button>
        </nav>
      </div>

      <!-- Selected email preview -->
      <div class="py-4">
        <div v-if="selectedEmail">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Subject</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <input
                v-model="selectedEmail.subject"
                type="text"
                class="block w-full pr-10 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Email subject"
              >
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Body</label>
            <div class="mt-1">
              <textarea
                v-model="selectedEmail.body"
                rows="8"
                class="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md"
                placeholder="Email body"
              />
            </div>
          </div>

          <div class="mt-4 flex justify-end space-x-3">
            <button
              class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              @click="copyToClipboard"
            >
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
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                />
              </svg>
              Copy
            </button>
            <button
              class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              @click="useEmail"
            >
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
              Use This Email
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmailSuggestions',
  props: {
    contact: {
      type: Object,
      required: true
    }
  },
  emits: ['copied', 'email-selected'],
  data() {
    return {
      isLoading: false,
      error: null,
      emails: [],
      selectedEmailIndex: 0
    }
  },
  computed: {
    selectedEmail() {
      return this.emails[this.selectedEmailIndex] || null
    }
  },
  methods: {
    async generateSuggestions() {
      this.isLoading = true
      this.error = null

      try {
        // Here you would call your API to generate email suggestions
        // Example:
        // const response = await this.$api.generateEmailSuggestions(this.contact);
        // this.emails = response.data;

        // Simulated response for demo purposes
        await new Promise(resolve => setTimeout(resolve, 2000))
        this.emails = [
          {
            type: 'follow_up',
            subject: 'Following up on our previous conversation',
            body: `Hi ${this.contact.firstName},\n\nI hope this email finds you well. I wanted to follow up on our previous conversation about ${this.contact.company}'s needs.\n\nLet me know if you have any questions or if you'd like to schedule a quick call to discuss further.\n\nBest regards,\n[Your Name]`
          },
          {
            type: 'value_proposition',
            subject: `How we can help ${this.contact.company} increase revenue`,
            body: `Hi ${this.contact.firstName},\n\nI've been researching ${this.contact.company} and I believe our solution can help you with [specific pain point].\n\nOur clients typically see a 30% increase in efficiency and 25% cost reduction within the first 3 months.\n\nWould you be open to a 15-minute call to explore if this might be valuable for your team?\n\nBest regards,\n[Your Name]`
          },
          {
            type: 'meeting_request',
            subject: 'Quick call next week?',
            body: `Hi ${this.contact.firstName},\n\nI'd love to schedule a quick 15-minute call to learn more about your priorities at ${this.contact.company} and see if there might be ways we can help.\n\nHow does your calendar look next Tuesday or Wednesday afternoon?\n\nBest regards,\n[Your Name]`
          }
        ]

        this.selectedEmailIndex = 0
      } catch (err) {
        this.error = 'Failed to generate email suggestions. Please try again.'
        console.error(err)
      } finally {
        this.isLoading = false
      }
    },
    copyToClipboard() {
      if (!this.selectedEmail) return

      const content = `Subject: ${this.selectedEmail.subject}\n\n${this.selectedEmail.body}`
      navigator.clipboard.writeText(content)
        .then(() => {
          this.$emit('copied')
          // You could also show a toast notification here
        })
        .catch((err) => {
          console.error('Failed to copy text: ', err)
        })
    },
    useEmail() {
      if (!this.selectedEmail) return
      this.$emit('email-selected', this.selectedEmail)
    }
  }
}
</script>
