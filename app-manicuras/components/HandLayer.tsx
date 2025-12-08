import React, { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native"
import ImageViewer from "@/components/ImageViewer"

type Props = {
  // Capa de color (viene del padre)
  selectedColorUri: string | null
}

// Matriz de formas y largos (solo la usa este componente)
type HandVariant = {
  shapeKey: string
  label: string
  images: ImageSourcePropType[]
}

const HAND_VARIANTS: HandVariant[] = [
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

const LENGTH_LABELS = ["Corto", "Medio", "Largo"]

const HandLayer: React.FC<Props> = ({ selectedColorUri }) => {
  const [shapeIndex, setShapeIndex] = useState(0)
  const [lengthIndex, setLengthIndex] = useState(0)

  const currentHandImage: ImageSourcePropType =
    HAND_VARIANTS[shapeIndex].images[lengthIndex]

  return (
    <>
      {/* IMÁGENES SUPERPUESTAS (color + mano) */}
      <View style={styles.imageContainer}>
        {/* Color de uñas (fondo) */}
        {selectedColorUri && (
          <ImageViewer imgSource={{ uri: selectedColorUri }} />
        )}

        {/* Mano + mesa (forma + largo) */}
        <ImageViewer imgSource={currentHandImage} />
      </View>

      {/* CONTROLES DE FORMA Y LARGO */}
      <View style={styles.handControlsContainer}>
        <Text style={styles.sectionTitle}>Forma de uñas</Text>
        <View style={styles.row}>
          {HAND_VARIANTS.map((variant, idx) => {
            const selected = idx === shapeIndex
            return (
              <TouchableOpacity
                key={variant.shapeKey}
                style={[
                  styles.optionButton,
                  selected && styles.optionButtonSelected,
                ]}
                onPress={() => setShapeIndex(idx)}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    selected && styles.optionButtonTextSelected,
                  ]}
                >
                  {variant.label}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>

        <Text style={styles.sectionTitle}>Largo</Text>
        <View style={styles.row}>
          {LENGTH_LABELS.map((label, idx) => {
            const selected = idx === lengthIndex
            return (
              <TouchableOpacity
                key={label}
                style={[
                  styles.optionButton,
                  selected && styles.optionButtonSelected,
                ]}
                onPress={() => setLengthIndex(idx)}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    selected && styles.optionButtonTextSelected,
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignSelf: "center",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  handControlsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  sectionTitle: {
    color: "#fff",
    fontWeight: "600",
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
  },
  optionButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ffffff88",
    marginRight: 8,
    backgroundColor: "#f9a8d4",
  },
  optionButtonSelected: {
    backgroundColor: "#fff",
    borderColor: "#fff",
  },
  optionButtonText: {
    fontSize: 12,
    color: "#ffffff",
  },
  optionButtonTextSelected: {
    color: "#f472b6",
    fontWeight: "600",
  },
})

export default HandLayer
