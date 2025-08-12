import { eq } from 'drizzle-orm'
import { db, users } from '~/database'
import { hashPassword } from './password'

/**
 * Crée les utilisateurs de test avec des mots de passe hashés
 */
export async function seedTestUsers() {
  try {
    
    const testUsers = [
      {
        email: 'admin@test.fr',
        password: 'admin123',
        firstName: 'Admin',
        lastName: 'Test',
        role: 'admin' as const
      },
      {
        email: 'user@test.fr',
        password: 'user123',
        firstName: 'Utilisateur',
        lastName: 'Test',
        role: 'user' as const
      }
    ]

    for (const testUser of testUsers) {
      // Vérifier si l'utilisateur existe déjà
      const existingUser = await db.select().from(users).where(eq(users.email, testUser.email)).limit(1)
      
      if (existingUser.length === 0) {
        // Hasher le mot de passe
        const hashedPassword = await hashPassword(testUser.password)
        
        // Créer l'utilisateur
        await db.insert(users).values({
          email: testUser.email,
          password: hashedPassword,
          firstName: testUser.firstName,
          lastName: testUser.lastName,
          role: testUser.role
        })
        
        console.log(`✅ Utilisateur créé: ${testUser.email}`)
      } else {
        console.log(`ℹ️  Utilisateur existant: ${testUser.email}`)
      }
    }

    return { success: true, message: 'Utilisateurs de test créés avec succès' }
  } catch (error) {
    console.error('Erreur lors de la création des utilisateurs de test:', error)
    return { success: false, error: 'Erreur lors de la création des utilisateurs de test' }
  }
}