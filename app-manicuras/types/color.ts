export type ColorId = string

/**
 * Color de la paleta (tal como lo devuelve y espera el backend).
 * Contracto: { id, src }
 */
export type Color = {
  id: ColorId
  src: string // ej: "colores/fucsia.png"
}
