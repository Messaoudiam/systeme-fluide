export const useDatabase = () => {
  const testConnection = async () => {
    try {
      const data = await $fetch('/api/test-db')
      return { success: true, data: data, message: 'Connexion réussie !' }
    } catch (error) {
      console.error('Erreur de connexion DB:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      }
    }
  }

  const createUser = async (userData: {
    email: string
    firstName: string  
    lastName: string
    birthDate?: string
    gender?: string
  }) => {
    try {
      const user = await $fetch('/api/users', {
        method: 'POST',
        body: userData
      })
      return { success: true, data: user }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erreur création utilisateur'
      }
    }
  }

  return {
    testConnection,
    createUser
  }
}