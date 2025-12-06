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

type Color = {
  id: string;
  src: string; // ej: "colores/img1.jpg"
};

type ColorsResponse = {
  colores: Color[];
};

// URL base del backend (Render o local), viene de app-manicuras/.env
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? "";

export default function Index() {
  const [colors, setColors] = useState<Color[]>([]);
  const [selectedColorId, setSelectedColorId] = useState<string | null>(null);
  const [selectedColorUri, setSelectedColorUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const loadColors = async () => {
      try {
        if (!API_BASE_URL) {
          console.warn("EXPO_PUBLIC_API_BASE_URL no está definida");
        }

        const res = await fetch(`${API_BASE_URL}/colores.json`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json: ColorsResponse = await res.json();
        const data = json.colores ?? [];

        setColors(data);

        if (data.length > 0) {
          const first = data[0];
          const firstUri = `${API_BASE_URL}/${first.src}`;
          setSelectedColorId(first.id);
          setSelectedColorUri(firstUri);
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
      {/* ZONA DE IMÁGENES SUPERPUESTAS */}
      <View style={styles.imageContainer}>
        {/* Primero el color (uñas) */}
        {selectedColorUri && (
          <ImageViewer imgSource={{ uri: selectedColorUri }} />
        )}

        {/* Superpuesta la imagen mesa + mano */}
        <ImageViewer imgSource={PlaceholderImage} />
      </View>

      {/* PALETA DE COLORES */}
      <View style={styles.paletteContainer}>
        {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

        <FlatList
          data={colors}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.paletteContent}
          renderItem={({ item }) => {
            const fullUri = `${API_BASE_URL}/${item.src}`;
            const isSelected = item.id === selectedColorId;

            return (
              <TouchableOpacity
                style={[
                  styles.colorButton,
                  isSelected && styles.colorButtonSelected,
                ]}
                onPress={() => {
                  setSelectedColorId(item.id);
                  setSelectedColorUri(fullUri);
                }}
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
    justifyContent: "center",
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
