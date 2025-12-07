import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Text,
  ImageSourcePropType,
} from "react-native";
import ImageViewer from "@/components/ImageViewer";

// ----- Tipos de datos -----
type Color = {
  id: string;
  src: string; // ej: "colores/img1.jpg"
};

type ColorsResponse = {
  colores: Color[];
};

// URL base del backend (Render o local), viene de app-manicuras/.env
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? "";

// ----- Matriz de formas y largos (versión React Native) -----
// Equivalente a formasYLargos del script.js, pero con require estático.
type HandVariant = {
  shapeKey: string;
  label: string;
  images: ImageSourcePropType[]; // largo1, largo2, largo3
};

const HAND_VARIANTS: HandVariant[] = [
  {
    shapeKey: "redondas",
    label: "Redondas",
    images: [
      require("@/assets/images/fondo-mesa-manicura/redondas/largo1.png"),
      require("@/assets/images/fondo-mesa-manicura/redondas/largo2.png"),
      require("@/assets/images/fondo-mesa-manicura/redondas/largo3.png"),
    ],
  },
  {
    shapeKey: "cuadradas",
    label: "Cuadradas",
    images: [
      require("@/assets/images/fondo-mesa-manicura/cuadradas/largo1.png"),
      require("@/assets/images/fondo-mesa-manicura/cuadradas/largo2.png"),
      require("@/assets/images/fondo-mesa-manicura/cuadradas/largo3.png"),
    ],
  },
  {
    shapeKey: "puntiagudas",
    label: "Puntiagudas",
    images: [
      require("@/assets/images/fondo-mesa-manicura/puntiagudas/largo1.png"),
      require("@/assets/images/fondo-mesa-manicura/puntiagudas/largo2.png"),
      require("@/assets/images/fondo-mesa-manicura/puntiagudas/largo3.png"),
    ],
  },
];

// etiquetas para los largos (columnas)
const LENGTH_LABELS = ["Corto", "Medio", "Largo"];

export default function Index() {
  const [colors, setColors] = useState<Color[]>([]);
  const [selectedColorId, setSelectedColorId] = useState<string | null>(null);
  const [selectedColorUri, setSelectedColorUri] = useState<string | null>(null);

  // índices de la mano (forma y largo)
  const [shapeIndex, setShapeIndex] = useState<number>(0); // 0 = redondas
  const [lengthIndex, setLengthIndex] = useState<number>(0); // 0 = corto

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Imagen actual de la mano (mesa + dedos) según forma y largo
  const currentHandImage: ImageSourcePropType =
    HAND_VARIANTS[shapeIndex].images[lengthIndex];

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
        {/* 1) Color (uñas) - capa de fondo (viene de la API) */}
        {selectedColorUri && (
          <ImageViewer imgSource={{ uri: selectedColorUri }} />
        )}

        {/* 2) Mano/mesa (forma + largo) - capa superior (estática por require) */}
        <ImageViewer imgSource={currentHandImage} />
      </View>

      {/* BOTONES DE FORMAS Y LARGOS */}
      <View style={styles.handControlsContainer}>
        <Text style={styles.sectionTitle}>Forma de uñas</Text>
        <View style={styles.row}>
          {HAND_VARIANTS.map((variant, index) => {
            const selected = index === shapeIndex;
            return (
              <TouchableOpacity
                key={variant.shapeKey}
                style={[
                  styles.optionButton,
                  selected && styles.optionButtonSelected,
                ]}
                onPress={() => setShapeIndex(index)}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    selected && styles.optionButtonTextSelected,
                  ]}
                >
                  {variant.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Largo</Text>
        <View style={styles.row}>
          {LENGTH_LABELS.map((label, index) => {
            const selected = index === lengthIndex;
            return (
              <TouchableOpacity
                key={label}
                style={[
                  styles.optionButton,
                  selected && styles.optionButtonSelected,
                ]}
                onPress={() => setLengthIndex(index)}
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
            );
          })}
        </View>
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
  handControlsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
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
