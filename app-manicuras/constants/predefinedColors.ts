// app-manicuras/constants/predefinedColors.ts

export type PredefinedColor = {
  /** Clave interna única del color predefinido */
  key: string

  /** Nombre que se muestra en la UI */
  label: string

  /** Ruta relativa que Render debe servir desde /public/colores */
  src: string
}

/**
 * Lista de colores predefinidos que la app puede agregar dinámicamente.
 * Estos archivos deben existir dentro de:
 *    public/colores/
 * en el backend de Render.
 */
export const PREDEFINED_COLORS: PredefinedColor[] = [
  {
    key: "fucsia",
    label: "Fucsia",
    src: "colores/fucsia.png",
  },
  {
    key: "naranja",
    label: "Naranja",
    src: "colores/naranja.png",
  },
  {
    key: "verde",
    label: "Verde",
    src: "colores/verde.png",
  },
]
