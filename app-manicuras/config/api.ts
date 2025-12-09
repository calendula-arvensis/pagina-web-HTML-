/**
 * Lee la URL base de la API desde las variables de entorno de Expo.
 */
const rawBase = process.env.EXPO_PUBLIC_API_BASE_URL ?? ""

/**
 * Normaliza la URL base para evitar dobles barras al concatenar paths.
 */
const normalizeBaseUrl = (url: string): string => {
  return url.replace(/\/+$/, "")
}

/**
 * URL base de la API del backend.
 * Si no está configurada, queda como string vacío.
 */
export const API_BASE_URL: string = rawBase ? normalizeBaseUrl(rawBase) : ""

/**
 * Indica si la API está configurada correctamente.
 */
export const isApiConfigured = (): boolean => API_BASE_URL.length > 0
