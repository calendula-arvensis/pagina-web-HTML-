import { useMemo, useState } from "react"
import type { Color } from "@/types/color"
import {
  PREDEFINED_COLORS,
  type PredefinedColor,
} from "@/constants/predefinedColors"
import { addPredefinedColorToApi } from "@/lib/colorsApi"

type UseColorPaletteParams = {
  colors: Color[]
  apiBaseUrl: string
  onSelectColor: (color: Color) => void
  onColorsChange: (newColors: Color[]) => void
}

export const useColorPalette = ({
  colors,
  apiBaseUrl,
  onSelectColor,
  onColorsChange,
}: UseColorPaletteParams) => {
  const [showModal, setShowModal] = useState(false)
  const [adding, setAdding] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const availablePredefs: PredefinedColor[] = useMemo(
    () =>
      PREDEFINED_COLORS.filter(
        (predef) => !colors.some((c) => c.src === predef.src),
      ),
    [colors],
  )

  const openModal = () => {
    setErrorMsg(null) // al abrir el modal limpiamos errores previos de la paleta
    setShowModal(true)
  }

  const closeModal = () => {
    if (!adding) setShowModal(false)
  }

  const handleAddPredefined = async (predef: PredefinedColor) => {
    // Si por alguna razón ya está, cerramos modal y no hacemos nada
    if (colors.some((c) => c.src === predef.src)) {
      setShowModal(false)
      return;
    }

    try {
      setAdding(true)
      setErrorMsg(null)

      const savedColor = await addPredefinedColorToApi(predef, apiBaseUrl)

      const updated = [...colors, savedColor]
      onColorsChange(updated)
      onSelectColor(savedColor)
      setShowModal(false)
    } catch (err) {
      console.error("Error agregando color predefinido:", err)      
      setErrorMsg("No se pudo agregar el color. Intentalo de nuevo.")      
      setShowModal(false)
    } finally {
      setAdding(false)
    }
  }

  return {
    showModal,
    adding,
    errorMsg,
    availablePredefs,
    openModal,
    closeModal,
    handleAddPredefined,
  }
}
