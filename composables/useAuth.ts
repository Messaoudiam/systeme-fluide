import type {
  AuthUser,
  UserRole,
  LoginCredentials,
  RegisterData,
} from "~/types/auth";

export const useAuth = () => {
  // État réactif de l'utilisateur connecté
  const user = useState<AuthUser | null>("auth.user", () => null);
  const isLoggedIn = computed(() => !!user.value);
  const isAdmin = computed(() => user.value?.role === "admin");
  const isUser = computed(() => user.value?.role === "user");

  // Connexion utilisateur
  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await $fetch<{ user: AuthUser; token: string }>(
        "/api/auth/login",
        {
          method: "POST",
          body: credentials,
        }
      );

      user.value = response.user;

      // Le token JWT est automatiquement stocké dans les cookies côté serveur
      // Pas besoin de le gérer côté client pour la sécurité

      return { success: true, user: response.user };
    } catch (error: unknown) {
      console.error("Erreur de connexion:", error);
      return {
        success: false,
        error:
          (error as { data?: { message?: string }; message?: string })?.data?.message || (error as { message?: string })?.message || "Identifiants invalides",
      };
    }
  };

  // Inscription utilisateur
  const register = async (data: RegisterData) => {
    try {
      const response = await $fetch<{ user: AuthUser; token: string }>(
        "/api/auth/register",
        {
          method: "POST",
          body: data,
        }
      );

      user.value = response.user;

      // Le token JWT est automatiquement stocké dans les cookies côté serveur
      // Pas besoin de le gérer côté client pour la sécurité

      return { success: true, user: response.user };
    } catch (error: unknown) {
      console.error("Erreur d'inscription:", error);
      return {
        success: false,
        error: (error as { data?: { message?: string }; message?: string })?.data?.message || (error as { message?: string })?.message || "Erreur d'inscription",
      };
    }
  };

  // Déconnexion
  const logout = async () => {
    try {
      await $fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Erreur de déconnexion:", error);
    } finally {
      user.value = null;
      // Le cookie JWT est automatiquement supprimé côté serveur
      await navigateTo("/");
    }
  };

  // Vérifier l'authentification au chargement
  const checkAuth = async () => {
    try {
      // En SSR, il faut transférer le cookie entrant vers l'appel $fetch
      const headers = import.meta.server
        ? useRequestHeaders(["cookie"])
        : undefined;
      const response = await $fetch<{ user: AuthUser }>("/api/auth/me", {
        headers,
        credentials: "include",
      });
      user.value = response.user;
      return response.user;
    } catch {
      user.value = null;
      return null;
    }
  };

  // Vérifier si l'utilisateur a un rôle spécifique
  const hasRole = (role: UserRole) => {
    return user.value?.role === role;
  };

  // Vérifier les permissions
  const canAccessAdmin = () => isAdmin.value;
  const canAccessUserFeatures = () => isLoggedIn.value;

  return {
    // État
    user: readonly(user),
    isLoggedIn,
    isAdmin,
    isUser,

    // Actions
    login,
    register,
    logout,
    checkAuth,
    hasRole,
    canAccessAdmin,
    canAccessUserFeatures,
  };
};
