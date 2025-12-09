import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

export type OptionItem = {
  key: string
  label: string
}

type Props = {
  title: string
  options: OptionItem[]
  selectedKey: string
  onChange: (key: string) => void
}

const OptionSelector: React.FC<Props> = ({
  title,
  options,
  selectedKey,
  onChange,
}) => {
  return (
    <>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.row}>
        {options.map((opt) => {
          const selected = opt.key === selectedKey
          return (
            <TouchableOpacity
              key={opt.key}
              style={[
                styles.optionButton,
                selected && styles.optionButtonSelected,
              ]}
              onPress={() => onChange(opt.key)}
            >
              <Text
                style={[
                  styles.optionButtonText,
                  selected && styles.optionButtonTextSelected,
                ]}
              >
                {opt.label}
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

export default OptionSelector
