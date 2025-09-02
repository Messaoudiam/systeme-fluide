import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '~/database/schema'

/**
 * Instance de connexion PostgreSQL singleton
 */
let connection: postgres.Sql | null = null
let db: ReturnType<typeof drizzle> | null = null

/**
 * Obtient une instance de base de données Drizzle
 * Utilise un singleton pour réutiliser la connexion
 */
export async function useDatabase() {
  if (!db) {
    // Configuration de la connexion PostgreSQL
    const connectionString = `postgresql://postgres.${process.env.SUPABASE_PROJECT_REF}:${process.env.SUPABASE_DB_PASSWORD}@aws-0-eu-west-3.pooler.supabase.com:6543/postgres?sslmode=require`
    
    if (!process.env.SUPABASE_PROJECT_REF || !process.env.SUPABASE_DB_PASSWORD) {
      throw new Error('Variables d\'environnement Supabase manquantes')
    }
    
    // Créer la connexion postgres
    connection = postgres(connectionString, {
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: true } : { rejectUnauthorized: false },
      max: 10, // Pool de connexions
    })
    
    // Créer l'instance Drizzle
    db = drizzle(connection, { schema })
  }
  
  return db
}

/**
 * Ferme la connexion à la base de données
 * Utile pour les tests ou l'arrêt propre du serveur
 */
export async function closeDatabase() {
  if (connection) {
    await connection.end()
    connection = null
    db = null
  }
}