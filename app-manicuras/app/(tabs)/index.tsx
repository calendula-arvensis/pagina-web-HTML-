import React, { useEffect, useState } from "react"
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from "react-native"
import ColorPalette from "@/components/ColorPalette"
import HandLayer from "@/components/HandLayer"
import type { Color } from "@/types/color"

// URL base del backend
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? ""

// Tipos para la respuesta inicial
type ColorsResponse = {
  colores: Color[]
}

export default function Index() {
  const [colors, setColors] = useState<Color[]>([])
  const [selectedColorId, setSelectedColorId] = useState<string | null>(null)
  const [selectedColorUri, setSelectedColorUri] = useState<string | null>(null)

  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    const loadColors = async () => {
      try {
        if (!API_BASE_URL) {
          console.warn("EXPO_PUBLIC_API_BASE_URL no está definida")
        }

        const res = await fetch(`${API_BASE_URL}/colores.json`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)

        const json: ColorsResponse = await res.json()
        const data = json.colores ?? []

        setColors(data)

        if (data.length > 0) {
          const first = data[0]
          const firstUri = `${API_BASE_URL}/${first.src}`
          setSelectedColorId(first.id)
          setSelectedColorUri(firstUri)
        }
      } catch (err) {
        console.error("Error cargando colores:", err)
        setErrorMsg("No se pudieron cargar los colores.")
      } finally {
        setLoading(false)
      }
    }

    loadColors()
  }, [])

  const handleSelectColor = (color: Color) => {
    setSelectedColorId(color.id)
    setSelectedColorUri(`${API_BASE_URL}/${color.src}`)
  }

  const handleColorsChange = (newColors: Color[]) => {
    setColors(newColors)
  }

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* Capa de color + mano + controles de forma/largo */}
      <HandLayer selectedColorUri={selectedColorUri} />

      {/* Paleta de colores + botón + */}
      <View style={styles.paletteContainer}>
        {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

        <ColorPalette
          colors={colors}
          selectedColorId={selectedColorId}
          apiBaseUrl={API_BASE_URL}
          onSelectColor={handleSelectColor}
          onColorsChange={handleColorsChange}
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
