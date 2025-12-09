// UI de controles usando ShapeSelector y LengthSelector
import React from "react"
import { View, StyleSheet } from "react-native"
import ShapeSelector from "@/components/ShapeSelector"
import LengthSelector from "@/components/LengthSelector"
import { LengthKey } from "@/constants/handVariants"

type Props = {
  shapeKey: string
  lengthKey: LengthKey
  onShapeChange: (shapeKey: string) => void
  onLengthChange: (lengthKey: LengthKey) => void
}

const HandControls: React.FC<Props> = ({
  shapeKey,
  lengthKey,
  onShapeChange,
  onLengthChange,
}) => {
  return (
    <View style={styles.handControlsContainer}>
      <ShapeSelector selectedShapeKey={shapeKey} onChange={onShapeChange} />
      <LengthSelector lengthKey={lengthKey} onChange={onLengthChange} />
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

