import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// Environment variables
const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not set')
}

// Create postgres client
const client = postgres(databaseUrl, {
  max: 10, // Connection pool size
  idle_timeout: 20,
  connect_timeout: 10
})

// Create drizzle instance
export const db = drizzle(client, { schema })

// Export schema for use in queries
export { schema }

// Helper to close connection (for testing or graceful shutdown)
export async function closeDatabase() {
  await client.end()
}
