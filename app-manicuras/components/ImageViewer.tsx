import React, { useState } from "react"
import { Image } from "expo-image"
import {
  ImageSourcePropType,
  StyleSheet,
  Dimensions,
  View,
  Text,
} from "react-native"

const { width, height } = Dimensions.get("window")

type Props = {
  imgSource: ImageSourcePropType
}

export default function ImageViewer({ imgSource }: Props) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <View style={[styles.image, styles.fallbackContainer]}>
        <Text style={styles.fallbackText}>Imagen no disponible</Text>
      </View>
    )
  }

  return (
    <Image
      source={imgSource}
      style={styles.image}
      contentFit="cover"
      contentPosition="left center"
      onError={(e) => {
        console.error("Error cargando imagen principal:")
        setFailed(true)
      }}
    />
  )
}

const styles = StyleSheet.create({
  image: {
    width: width * 0.9,
    height: height * 0.44,
    borderRadius: 18,
    position: "absolute",
    margin: width * 0.05,
  },
  fallbackContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fce4ec",
  },
  fallbackText: {
    color: "#ad1457",
    fontSize: 12,
    textAlign: "center",
    paddingHorizontal: 8,
  },
})
