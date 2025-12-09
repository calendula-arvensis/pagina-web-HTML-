// Renderiza la lista de colores y el botón de agregar color
import React, { useState } from "react"
import {
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  ViewStyle,
  Text,
} from "react-native"
import AddColorButton from "@/components/AddColorButton"
import type { Color } from "@/types/color"

type Props = {
  colors: Color[]
  selectedColorId: string | null
  apiBaseUrl: string
  contentContainerStyle?: ViewStyle
  onSelectColor: (color: Color) => void
  onPressAdd: () => void
}

const ADD_BUTTON_ID = "__add_button__"

// Subcomponente que maneja error de carga de imagen
const ColorThumbnail: React.FC<{ uri: string }> = ({ uri }) => {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <View style={styles.colorFallback}>
        <Text style={styles.colorFallbackText}>!</Text>
      </View>
    )
  }

  return (
    <Image
      source={{ uri }}
      style={styles.colorThumbnail}
      onError={(e) => {
        console.error("Error cargando imagen de color:", uri, e?.nativeEvent)
        setFailed(true)
      }}
    />
  )
}

const ColorList: React.FC<Props> = ({
  colors,
  selectedColorId,
  apiBaseUrl,
  contentContainerStyle,
  onSelectColor,
  onPressAdd,
}) => {
  const dataWithAdd = [
    ...colors,
    { id: ADD_BUTTON_ID, src: "" } as Color,
  ]

  const renderItem = ({ item }: { item: Color }) => {
    if (item.id === ADD_BUTTON_ID) {
      return <AddColorButton onPress={onPressAdd} />
    }

    const fullUri = `${apiBaseUrl}/${item.src}`
    const isSelected = item.id === selectedColorId

    return (
      <TouchableOpacity
        style={[
          styles.colorButton,
          isSelected && styles.colorButtonSelected,
        ]}
        onPress={() => onSelectColor(item)}
        activeOpacity={0.8}
      >
        <ColorThumbnail uri={fullUri} />
      </TouchableOpacity>
    )
  }

  return (
    <FlatList
      data={dataWithAdd}
      horizontal
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.paletteContent, contentContainerStyle]}
      renderItem={renderItem}
    />
  )
}

const styles = StyleSheet.create({
  paletteContent: {
    paddingHorizontal: 16,
  },
  colorButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "#ffffff88",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  colorButtonSelected: {
    borderColor: "#ffffff",
    borderWidth: 3,
  },
  colorThumbnail: {
    width: "100%",
    height: "100%",
  },
  colorFallback: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffcdd2",
  },
  colorFallbackText: {
    color: "#b71c1c",
    fontWeight: "bold",
    fontSize: 16,
  },
})

export default ColorList

