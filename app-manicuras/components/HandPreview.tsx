// Solo muestra la mano + color
import React from "react"
import { View, StyleSheet, ImageSourcePropType } from "react-native"
import ImageViewer from "@/components/ImageViewer"

type Props = {
  selectedColorUri: string | null
  currentHandImage: ImageSourcePropType
}

const HandPreview: React.FC<Props> = ({
  selectedColorUri,
  currentHandImage,
}) => {
  return (
    <View style={styles.imageContainer}>
      {/* Capa de color */}
      {selectedColorUri && (
        <ImageViewer imgSource={{ uri: selectedColorUri }} />
      )}

      {/* Mano + mesa */}
      <ImageViewer imgSource={currentHandImage} />
    </View>
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
})

export default HandPreview
