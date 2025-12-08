// UI de controles usando ShapeSelector y LengthSelector
// app-manicuras/components/HandControls.tsx
import React from "react"
import { View, StyleSheet } from "react-native"
import ShapeSelector from "@/components/ShapeSelector"
import LengthSelector from "@/components/LengthSelector"

type Props = {
  shapeKey: string
  lengthIndex: number
  onShapeChange: (shapeKey: string) => void
  onLengthChange: (index: number) => void
}

const HandControls: React.FC<Props> = ({
  shapeKey,
  lengthIndex,
  onShapeChange,
  onLengthChange,
}) => {
  return (
    <View style={styles.handControlsContainer}>
      <ShapeSelector selectedShapeKey={shapeKey} onChange={onShapeChange} />
      <LengthSelector lengthIndex={lengthIndex} onChange={onLengthChange} />
    </View>
  )
}

const styles = StyleSheet.create({
  handControlsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
})

export default HandControls

