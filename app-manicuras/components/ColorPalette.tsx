import React from "react"
import { StyleSheet, View, Text } from "react-native"

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
    errorMsg,
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
      {/* Zona de paleta + mensaje de error local */}
      <View style={styles.paletteWrapper}>
        {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

        <ColorList
          colors={colors}
          selectedColorId={selectedColorId}
          apiBaseUrl={apiBaseUrl}
          onSelectColor={onSelectColor}
          onPressAdd={openModal}
          contentContainerStyle={styles.paletteContent}
        />
      </View>

      {/* Modal de colores predefinidos */}
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
  paletteWrapper: {
    paddingVertical: 0,
  },
  paletteContent: {
    paddingHorizontal: 16,
  },
  errorText: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 4,
    fontSize: 12,
  },
})

export default ColorPalette
