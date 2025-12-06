import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Text,
} from "react-native";
import ImageViewer from "@/components/ImageViewer";

const PlaceholderImage = require("@/assets/images/fondo-mesa-manicura/mesa.png");

// Tipo de cada color que viene del JSON
type Color = {
  id: string;
  src: string; // ej: "colores/img1.jpg"
};

type ColorsResponse = {
  colores: Color[];
};

// URL base de tu backend (la saco del .env de Expo)
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? "";

export default function Index() {
  const [colors, setColors] = useState<Color[]>([]);
  const [selectedSrc, setSelectedSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const loadColors = async () => {
      
      // Control de la URL del API
      try {
        if (!API_BASE_URL) {
          console.warn("EXPO_PUBLIC_API_BASE_URL no está definida");
        }

        // Leemos directamente colores.json del backend
        const res = await fetch(`${API_BASE_URL}/colores.json`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json: ColorsResponse = await res.json();
        const data = json.colores ?? [];  // Arreglo de colores

        setColors(data);

        if (data.length > 0) {
          // armamos la URL completa de la primera imagen
          setSelectedSrc(`${API_BASE_URL}/${data[0].src}`);
        }
      } catch (err) {
        console.error("Error cargando colores:", err);
        setErrorMsg("No se pudieron cargar los colores.");
      } finally {
        setLoading(false);
      }
    };

    loadColors();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Color elegido + mesa superpuestos */}
      <View style={styles.imageContainer}>
        {selectedSrc && (
          <Image
            source={{ uri: selectedSrc }}
            style={StyleSheet.absoluteFillObject}
            resizeMode="contain"
          />
        )}
        <ImageViewer imgSource={PlaceholderImage} />
      </View>

      {/* Paleta de colores */}
      <View style={styles.paletteContainer}>
        {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

        <FlatList
          data={colors}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.paletteContent}
          renderItem={({ item }) => {
            const fullUri = `${API_BASE_URL}/${item.src}`;  // URL completa de la imagen
            const isSelected = fullUri === selectedSrc;

            return (
              <TouchableOpacity
                style={[
                  styles.colorButton,
                  isSelected && styles.colorButtonSelected,
                ]}
                onPress={() => setSelectedSrc(fullUri)}
                activeOpacity={0.8}
              >
                <Image source={{ uri: fullUri }} style={styles.colorThumbnail} />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f790beff",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    alignSelf: "center",
    position: "relative",
    alignItems: "center",
  },
  paletteContainer: {
    paddingVertical: 16,
    marginBottom: 32,
  },
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
  errorText: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
  },
});
