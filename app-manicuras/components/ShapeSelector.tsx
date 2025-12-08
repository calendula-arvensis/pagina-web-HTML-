// Botones de forma
// app-manicuras/components/ShapeSelector.tsx
import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { SHAPE_OPTIONS } from "@/constants/handVariants"

type Props = {
  selectedShapeKey: string
  onChange: (shapeKey: string) => void
}

const ShapeSelector: React.FC<Props> = ({ selectedShapeKey, onChange }) => {
  return (
    <>
      <Text style={styles.sectionTitle}>Forma de uñas</Text>
      <View style={styles.row}>
        {SHAPE_OPTIONS.map((shape) => {
          const selected = shape.key === selectedShapeKey
          return (
            <TouchableOpacity
              key={shape.key}
              style={[
                styles.optionButton,
                selected && styles.optionButtonSelected,
              ]}
              onPress={() => onChange(shape.key)}
            >
              <Text
                style={[
                  styles.optionButtonText,
                  selected && styles.optionButtonTextSelected,
                ]}
              >
                {shape.label}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
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

export default ShapeSelector

