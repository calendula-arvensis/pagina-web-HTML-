// Lógica de forma/largo
import { useState } from "react"
import { ImageSourcePropType } from "react-native"
import { HAND_VARIANTS, LENGTH_LABELS } from "@/constants/handVariants"

export const useHandSelection = () => {
  // Usamos la key de la forma como estado principal
  const [shapeKey, setShapeKeyState] = useState<string>(HAND_VARIANTS[0]?.shapeKey ?? "")
  const [lengthIndex, setLengthIndexState] = useState(0)

  // Buscar el índice de la forma actual a partir del shapeKey
  const shapeIndex = HAND_VARIANTS.findIndex((v) => v.shapeKey === shapeKey)

  // Si por algún motivo no se encuentra, usamos 0 como fallback
  const safeShapeIndex = shapeIndex >= 0 ? shapeIndex : 0

  const currentHandImage: ImageSourcePropType =
    HAND_VARIANTS[safeShapeIndex].images[lengthIndex]

  const setShapeKey = (nextKey: string) => {
    const nextIndex = HAND_VARIANTS.findIndex((v) => v.shapeKey === nextKey)
    if (nextIndex === -1) return // key inválida, no hacemos nada

    setShapeKeyState(nextKey)

    // Ajustar el largo para que siga siendo válido para la nueva forma
    setLengthIndexState((prev) => {
      const max = HAND_VARIANTS[nextIndex].images.length
      if (max === 0) return 0
      return prev < max ? prev : max - 1
    })
  }

  const setLengthIndex = (idx: number) => {
    if (idx < 0 || idx >= LENGTH_LABELS.length) return
    setLengthIndexState(idx)
  }

  return {
    shapeKey,
    shapeIndex: safeShapeIndex,
    lengthIndex,
    setShapeKey,
    setLengthIndex,
    currentHandImage,
  }
}
