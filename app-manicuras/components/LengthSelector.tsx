// Boton de largo
import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { LENGTH_LABELS } from "@/constants/handVariants"

type Props = {
  lengthIndex: number
  onChange: (index: number) => void
}

const LengthSelector: React.FC<Props> = ({ lengthIndex, onChange }) => {
  return (
    <>
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
              onPress={() => onChange(idx)}
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

export default LengthSelector
