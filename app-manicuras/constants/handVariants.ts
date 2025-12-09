import { ImageSourcePropType } from "react-native"

export type HandVariant = {
  shapeKey: string
  label: string
  images: ImageSourcePropType[]
}

/**
 * Matriz de formas de uñas y sus imágenes por largo.
 * Orden de images: [corto, medio, largo]
 */
export const HAND_VARIANTS: HandVariant[] = [
  {
    shapeKey: "redondas",
    label: "Redondas",
    images: [
      require("@/assets/images/fondo-mesa-manicura/redondas/largo1.png"),
      require("@/assets/images/fondo-mesa-manicura/redondas/largo2.png"),
      require("@/assets/images/fondo-mesa-manicura/redondas/largo3.png"),
    ],
  },
  {
    shapeKey: "cuadradas",
    label: "Cuadradas",
    images: [
      require("@/assets/images/fondo-mesa-manicura/cuadradas/largo1.png"),
      require("@/assets/images/fondo-mesa-manicura/cuadradas/largo2.png"),
      require("@/assets/images/fondo-mesa-manicura/cuadradas/largo3.png"),
    ],
  },
  {
    shapeKey: "puntiagudas",
    label: "Puntiagudas",
    images: [
      require("@/assets/images/fondo-mesa-manicura/puntiagudas/largo1.png"),
      require("@/assets/images/fondo-mesa-manicura/puntiagudas/largo2.png"),
      require("@/assets/images/fondo-mesa-manicura/puntiagudas/largo3.png"),
    ],
  },
]

// ---- Largos por key ----

export const LENGTH_KEYS = ["corto", "medio", "largo"] as const
export type LengthKey = (typeof LENGTH_KEYS)[number]

export type LengthOption = {
  key: LengthKey
  label: string
}

/**
 * Opciones de largo que se muestran en la UI.
 * Orden: corto, medio, largo
 */
export const LENGTH_OPTIONS: LengthOption[] = [
  { key: "corto", label: "Corto" },
  { key: "medio", label: "Medio" },
  { key: "largo", label: "Largo" },
]

// ---- Opciones de forma para la UI ----

export type ShapeOption = {
  key: string
  label: string
}

/**
 * Opciones de forma derivadas de HAND_VARIANTS, para usar en la UI.
 */
export const SHAPE_OPTIONS: ShapeOption[] = HAND_VARIANTS.map((v) => ({
  key: v.shapeKey,
  label: v.label,
}))

// ---- Estado de la mano ----

export type HandState = {
  shape: string // shapeKey de HAND_VARIANTS
  length: LengthKey
}