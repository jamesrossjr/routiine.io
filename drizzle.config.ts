import type { Config } from 'drizzle-kit'
import 'dotenv/config'

export default {
  schema: './server/database/schema.ts',
  out: './server/database/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgresql://localhost:5432/routiine_db'
  },
  verbose: true,
  strict: true
} satisfies Config
