# Système de Validation

Ce document décrit le système de validation complet implémenté dans Système Fluide.

## Vue d'ensemble

Le système de validation utilise **Zod** pour fournir une validation robuste et cohérente à travers toute l'application :

- **Validation côté client** : Pour l'expérience utilisateur
- **Validation côté serveur** : Pour la sécurité et l'intégrité des données
- **Validation des types TypeScript** : Pour la sûreté de type à la compilation

## Structure

```
server/utils/validation/
├── schemas.ts           # Schémas de base pour l'API
├── security.ts         # Schémas sécurisés avec protection XSS/injection
└── validator.ts         # Utilitaires de validation serveur

utils/validation/
└── client-schemas.ts    # Schémas pour la validation côté client

composables/
├── useValidation.ts     # Composable principal de validation
└── useFormErrors.ts     # Gestion des erreurs de formulaire

components/form/
├── ValidatedInput.vue   # Input avec validation intégrée
└── ValidatedSelect.vue  # Select avec validation intégrée

types/
└── errors.ts           # Types pour la gestion d'erreurs
```

## Utilisation côté serveur

### 1. Validation basique d'API

```typescript
// server/api/example.post.ts
import { loginSchema } from '~/server/utils/validation/schemas'
import { validateRequestBody } from '~/server/utils/validation/validator'

export default defineEventHandler(async (event) => {
  // Validation automatique du body
  const body = await validateRequestBody(loginSchema)(event)
  
  // body est maintenant typé et validé
  console.log(body.email) // string valide
  console.log(body.password) // string valide
})
```

### 2. Validation sécurisée

```typescript
// Pour les données sensibles, utilisez les schémas sécurisés
import { secureRegisterSchema } from '~/server/utils/validation/security'

export default defineEventHandler(async (event) => {
  const body = await validateRequestBody(secureRegisterSchema)(event)
  // Validation renforcée contre XSS, injection, etc.
})
```

### 3. Validation manuelle

```typescript
import { validateData } from '~/server/utils/validation/validator'
import { userIdSchema } from '~/server/utils/validation/schemas'

const validation = validateData(userIdSchema, someValue)
if (!validation.success) {
  throw createError({
    statusCode: 400,
    statusMessage: validation.error?.message
  })
}
```

## Utilisation côté client

### 1. Composable de validation

```vue
<script setup>
import { useValidation } from '~/composables/useValidation'
import { loginFormSchema } from '~/utils/validation/client-schemas'

const { validate, createFormValidation } = useValidation()

const formData = reactive({
  email: '',
  password: ''
})

const formValidation = createFormValidation(loginFormSchema)

async function handleSubmit() {
  if (formValidation.validateForm(formData)) {
    // Envoyer les données - elles sont valides
    await submitForm(formData)
  }
}

function validateEmail() {
  formValidation.validateSingleField('email', formData.email, formData)
}
</script>
```

### 2. Composants de formulaire validés

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <ValidatedInput
      v-model="formData.email"
      type="email"
      label="Email"
      placeholder="votre@email.com"
      :error-message="formValidation.getFieldError('email')"
      @blur="validateEmail"
      required
    />
    
    <ValidatedInput
      v-model="formData.password"
      type="password"
      label="Mot de passe"
      :error-message="formValidation.getFieldError('password')"
      required
    />
    
    <button type="submit" :disabled="formValidation.state.hasErrors">
      Se connecter
    </button>
  </form>
</template>
```

### 3. Gestion des erreurs d'API

```vue
<script setup>
import { useFormErrors } from '~/composables/useFormErrors'

const { handleApiError, errors, generalError, clearAllErrors } = useFormErrors()

async function submitForm() {
  try {
    clearAllErrors()
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: formData
    })
    // Succès
  } catch (error) {
    handleApiError(error) // Extrait automatiquement les erreurs de champs
  }
}
</script>

<template>
  <div v-if="generalError" class="error">
    {{ generalError }}
  </div>
  
  <ValidatedInput
    v-model="email"
    :error-message="errors.email"
    label="Email"
  />
</template>
```

## Schémas disponibles

### Schémas de base

- `emailSchema` : Validation d'email avec nettoyage
- `passwordSchema` : Mot de passe sécurisé (8+ caractères, majuscule, minuscule, chiffre)
- `nameSchema` : Noms avec caractères autorisés
- `weightSchema` : Poids (20-300 kg)
- `stepsSchema` : Nombre de pas (0-100000)
- `caloriesSchema` : Calories (0-10000)

### Schémas de formulaires

- `loginFormSchema` : Email + mot de passe
- `registerFormSchema` : Inscription avec confirmation de mot de passe
- `profileFormSchema` : Mise à jour du profil utilisateur
- `weightLogFormSchema` : Enregistrement du poids
- `dailyStepsFormSchema` : Enregistrement des pas
- `dailyCaloriesFormSchema` : Enregistrement des calories

### Schémas sécurisés

- `securePasswordSchema` : Validation très stricte (12+ caractères, caractères spéciaux)
- `secureEmailSchema` : Email avec vérification des domaines suspects
- `secureNameSchema` : Protection contre injection HTML/XSS
- `secureNotesSchema` : Nettoyage XSS pour les commentaires

## Sécurité

### Protection XSS
```typescript
// Détection automatique de contenu malveillant
const notesSchema = z.string().refine((notes) => {
  const xssPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi
  ]
  return !xssPatterns.some(pattern => pattern.test(notes))
}, 'Contenu non autorisé détecté')
```

### Validation des plages
```typescript
// Limites strictes pour éviter les valeurs aberrantes
const secureWeightSchema = z.number()
  .min(20, 'Poids minimum 20 kg')
  .max(300, 'Poids maximum 300 kg')
  .refine((weight) => weight >= 30 && weight <= 250, 
    'Poids en dehors de la plage acceptée')
```

### Nettoyage des données
```typescript
// Nettoyage automatique
const cleanEmailSchema = z.string()
  .email()
  .toLowerCase()
  .trim()
```

## Bonnes pratiques

1. **Toujours valider côté serveur** même si la validation côté client existe
2. **Utiliser les schémas sécurisés** pour les données sensibles
3. **Fournir des messages d'erreur clairs** en français
4. **Valider les paramètres de route** et query params
5. **Utiliser les composants ValidatedInput/ValidatedSelect** pour la cohérence UI
6. **Gérer les erreurs de façon centralisée** avec useFormErrors

## Messages d'erreur

Tous les messages d'erreur sont en français et suivent ces conventions :

- **Champs requis** : "Ce champ est requis"
- **Format invalide** : "Format d'email invalide"
- **Plages numériques** : "Le poids doit être entre 20 et 300 kg"
- **Sécurité** : "Caractères interdits détectés"
- **Longueur** : "Maximum 50 caractères"

## Extensibilité

Pour ajouter de nouveaux schémas :

1. **Créer le schéma Zod** avec validation appropriée
2. **Ajouter des tests** de validation
3. **Exporter le type TypeScript** correspondant
4. **Documenter** les règles de validation
5. **Ajouter aux schémas sécurisés** si nécessaire