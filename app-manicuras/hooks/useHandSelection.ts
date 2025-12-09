// Lógica de forma/largo
import { useState } from "react"
import { ImageSourcePropType } from "react-native"
import {
  HAND_VARIANTS,
  LENGTH_OPTIONS,
  HandState,
  LengthKey,
} from "@/constants/handVariants"

const getShapeIndex = (shapeKey: string): number => {
  const idx = HAND_VARIANTS.findIndex((v) => v.shapeKey === shapeKey)
  return idx >= 0 ? idx : 0
}

const getLengthIndex = (lengthKey: LengthKey): number => {
  const idx = LENGTH_OPTIONS.findIndex((o) => o.key === lengthKey)
  return idx >= 0 ? idx : 0
}

/**
 * Hook que maneja el estado de la mano (forma + largo)
 * usando HandState (shapeKey + lengthKey) y mapeando internamente
 * a los índices de HAND_VARIANTS / LENGTH_OPTIONS.
 */
export const useHandSelection = () => {
  const defaultShapeKey = HAND_VARIANTS[0]?.shapeKey ?? ""
  const defaultLengthKey: LengthKey = "corto"

  const [handState, setHandState] = useState<HandState>({
    shape: defaultShapeKey,
    length: defaultLengthKey,
  })

  const shapeIndex = getShapeIndex(handState.shape)
  const lengthIndex = getLengthIndex(handState.length)

  const currentHandImage: ImageSourcePropType =
    HAND_VARIANTS[shapeIndex].images[lengthIndex]

  const setShapeKey = (nextShapeKey: string) => {
    const nextIndex = HAND_VARIANTS.findIndex((v) => v.shapeKey === nextShapeKey)
    if (nextIndex === -1) return

    const currentLengthIndex = getLengthIndex(handState.length)
    const max = HAND_VARIANTS[nextIndex].images.length

    const safeLengthIndex =
      max > 0 ? (currentLengthIndex < max ? currentLengthIndex : max - 1) : 0

    const nextLengthKey = LENGTH_OPTIONS[safeLengthIndex].key

    setHandState({
      shape: nextShapeKey,
      length: nextLengthKey,
    })
  }

  const setLengthKey = (nextLengthKey: LengthKey) => {
    const idx = LENGTH_OPTIONS.findIndex((o) => o.key === nextLengthKey)
    if (idx === -1) return

    const shapeIdx = getShapeIndex(handState.shape)
    const max = HAND_VARIANTS[shapeIdx].images.length
    if (idx >= max) return

    setHandState((prev) => ({
      ...prev,
      length: nextLengthKey,
    }))
  }

  return {
    handState,
    shapeKey: handState.shape,
    lengthKey: handState.length,
    shapeIndex,
    lengthIndex,
    setShapeKey,
    setLengthKey,
    setHandState,
    currentHandImage,
  }
}
