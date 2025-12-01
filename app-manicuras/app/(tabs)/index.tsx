import React, { useState } from "react";
import {StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import {Link} from 'expo-router';
import { Background } from "@react-navigation/elements";
import ImageViewer from '@/components/ImageViewer';
import { Image } from "react-native";

const PlaceholderImage = require('@/assets/images/fondo-mesa-manicura/mesa.png');

// Paleta de colores
const COLORS = [
  { id: "img1", source: require("@/assets/images/img1.jpg") },
  { id: "img2", source: require("@/assets/images/img2.jpg") },
  { id: "img3", source: require("@/assets/images/img3.jpg") },
  // ...seguir agregando: img4, img5, biFlag, etc.
];

export default function Index() {

  const [selectedColor, setSelectedColor] = useState(COLORS[0].source);

  return (
    <View style={styles.container}>

      {/* Zona de imágenes (color + mesa superpuestos) */}
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={selectedColor} />
        <ImageViewer imgSource={PlaceholderImage} />
      </View>

      {/* Paleta de colores con scroll horizontal */}
      <View style={styles.paletteContainer}>
        <FlatList
          data={COLORS}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.paletteContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.colorButton,
                item.source === selectedColor && styles.colorButtonSelected,
              ]}
              onPress={() => setSelectedColor(item.source)}
              activeOpacity={0.8}
            >
              <Image
                source={item.source}
                style={styles.colorThumbnail}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f790beff',
  },
  text: {
    color: '#fff',
  },
  imageContainer: {
    flex: 1,
    alignSelf: 'center',
    position: 'relative',
    alignItems: 'center',
  },
  // Paleta
  paletteContainer: {
    paddingVertical: 16,
    marginBottom: 32,
  },
  paletteContent: {
    paddingHorizontal: 16, // separa un poco el primer y último botón del borde
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
});