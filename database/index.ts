import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// Use individual environment variables for connection
const projectRef = process.env.SUPABASE_PROJECT_REF
const password = process.env.SUPABASE_DB_PASSWORD

if (!projectRef || !password) {
  throw new Error('SUPABASE_PROJECT_REF and SUPABASE_DB_PASSWORD must be defined')
}

// URL-encode the password to handle special characters
const encodedPassword = encodeURIComponent(password)
const connectionString = `postgresql://postgres.${projectRef}:${encodedPassword}@aws-0-eu-west-3.pooler.supabase.com:6543/postgres`

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, { prepare: false })
export const db = drizzle(client, { schema })

export * from './schema'