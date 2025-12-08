import { ImageSourcePropType } from "react-native"

export type HandVariant = {
  shapeKey: string
  label: string
  images: ImageSourcePropType[]
}

/**
 * Matriz de formas de uñas y sus imágenes por largo.
 * Orden de images: [Corto, Medio, Largo]
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

export const LENGTH_LABELS = ["Corto", "Medio", "Largo"] as const
export type LengthLabel = (typeof LENGTH_LABELS)[number]

export type ShapeOption = {
  key: string
  label: string
}

/**
 * Opciones de forma para usar directamente en la UI.
 */
export const SHAPE_OPTIONS: ShapeOption[] = HAND_VARIANTS.map((v) => ({
  key: v.shapeKey,
  label: v.label,
}))
