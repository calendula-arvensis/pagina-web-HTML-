import React from "react"
import { StyleSheet } from "react-native"

import ColorList from "@/components/ColorList"
import PredefinedColorModal from "@/components/PredefinedColorModal"
import { useColorPalette } from "@/hooks/useColorPalette"
import type { Color } from "@/types/color"

type ColorPaletteProps = {
  colors: Color[]
  selectedColorId: string | null
  apiBaseUrl: string
  onSelectColor: (color: Color) => void
  onColorsChange: (newColors: Color[]) => void
}

const ColorPalette: React.FC<ColorPaletteProps> = ({
  colors,
  selectedColorId,
  apiBaseUrl,
  onSelectColor,
  onColorsChange,
}) => {
  const {
    showModal,
    adding,
    availablePredefs,
    openModal,
    closeModal,
    handleAddPredefined,
  } = useColorPalette({
    colors,
    apiBaseUrl,
    onSelectColor,
    onColorsChange,
  })

  return (
    <>
      <ColorList
        colors={colors}
        selectedColorId={selectedColorId}
        apiBaseUrl={apiBaseUrl}
        onSelectColor={onSelectColor}
        onPressAdd={openModal}
        contentContainerStyle={styles.paletteContent}
      />

      <PredefinedColorModal
        visible={showModal}
        loading={adding}
        availablePredefs={availablePredefs}
        apiBaseUrl={apiBaseUrl}
        onSelect={handleAddPredefined}
        onClose={closeModal}
      />
    </>
  )
}

const styles = StyleSheet.create({
  paletteContent: {
    paddingHorizontal: 16,
  },
})

export default ColorPalette
