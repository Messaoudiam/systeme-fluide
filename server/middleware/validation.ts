/**
 * Middleware de validation global - ce fichier ne fait rien par défaut
 * Pour utiliser la validation, utilisez les utilitaires dans validator.ts
 * ou les middlewares spécifiques aux routes
 */
export default defineEventHandler(async (_event) => {
  // Ce middleware ne fait rien par défaut
  // Il existe juste pour satisfaire Nuxt qui s'attend à un export default
  return
})