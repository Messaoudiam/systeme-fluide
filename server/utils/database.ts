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
    // Utiliser l'URL complète de Supabase
    const connectionString = process.env.SUPABASE_DATABASE_URL
    
    if (!connectionString) {
      throw new Error('SUPABASE_DATABASE_URL manquante')
    }
    
    // Créer la connexion postgres
    connection = postgres(connectionString, {
      ssl: { rejectUnauthorized: false }, // Temporairement pour diagnostiquer
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