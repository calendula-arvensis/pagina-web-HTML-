import React from "react"
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from "react-native"

import HandLayer from "@/components/HandLayer"
import ColorPalette from "@/components/ColorPalette"
import { API_BASE_URL } from "@/config/api"
import { useColors } from "@/hooks/useColors"

export default function Index() {
  const {
    colors,
    selectedColorId,
    selectedColorUri,
    loading,
    errorMsg,
    selectColor,
    updateColors,
  } = useColors()

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Cargando colores...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* Capa de color + mano */}
      <HandLayer selectedColorUri={selectedColorUri} />

      {/* Paleta de colores */}
      <View style={styles.paletteContainer}>
        {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

        <ColorPalette
          colors={colors}
          selectedColorId={selectedColorId}
          apiBaseUrl={API_BASE_URL}
          onSelectColor={selectColor}
          onColorsChange={updateColors}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f790beff",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 8,
    color: "#fff",
  },
  paletteContainer: {
    paddingVertical: 16,
    marginBottom: 32,
  },
  errorText: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
  },
})

