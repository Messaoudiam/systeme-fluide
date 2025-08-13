# Tests - Système Fluide

## Tests fonctionnels

Suite de **29 tests fonctionnels** utilisant **Vitest** pour valider les fonctionnalités critiques de l'application.

## Lancer les tests

```bash
npm run test:functional
```

## Couverture des tests

### Tests basiques (`simple.test.ts`)
- Vérification du fonctionnement de Vitest
- Tests d'utilitaires simples (validation email, formatage)

### Tests d'intégration (`auth-flow.test.ts`) 
- Simulation complète du flux d'authentification
- Validation des données avec Zod
- Simulation JWT (génération/vérification)
- Mock du système de hashage bcrypt
- Simulation du rate limiting

### Tests fonctionnels (`validation-utils.test.ts`)
- Validation d'emails avec différents formats
- Validation de mots de passe sécurisés selon NIST 2025
- Validation de données utilisateur (noms, âge) 
- Validation de données fitness (poids, calories, pas)
- Gestion d'erreurs détaillée avec Zod
- Validation conditionnelle selon le type d'utilisateur

## Composants critiques couverts

✅ **Authentification** - Login/logout/register complet  
✅ **Validation des données** - Zod avec tous les schémas  
✅ **Sécurité** - JWT et hashage des mots de passe  
✅ **Rate limiting** - Protection contre les attaques  
✅ **Gestion d'erreurs** - Messages français et codes HTTP