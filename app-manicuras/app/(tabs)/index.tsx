import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ImageSourcePropType,
} from "react-native";
import ImageViewer from "@/components/ImageViewer";
import ColorPalette, { Color } from "@/components/ColorPalette";

// URL base del backend
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? "";

// ----- Tipos para la respuesta inicial -----
type ColorsResponse = {
  colores: Color[];
};

// ----- Matriz de formas y largos -----
type HandVariant = {
  shapeKey: string;
  label: string;
  images: ImageSourcePropType[];
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

const LENGTH_LABELS = ["Corto", "Medio", "Largo"];

export default function Index() {
  const [colors, setColors] = useState<Color[]>([]);
  const [selectedColorId, setSelectedColorId] = useState<string | null>(null);
  const [selectedColorUri, setSelectedColorUri] = useState<string | null>(null);

  const [shapeIndex, setShapeIndex] = useState<number>(0);
  const [lengthIndex, setLengthIndex] = useState<number>(0);

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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

  const handleSelectColor = (color: Color) => {
    setSelectedColorId(color.id);
    setSelectedColorUri(`${API_BASE_URL}/${color.src}`);
  };

  const handleColorsChange = (newColors: Color[]) => {
    setColors(newColors);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* IMÁGENES SUPERPUESTAS */}
      <View style={styles.imageContainer}>
        {/* 1) Color de uñas (fondo) */}
        {selectedColorUri && (
          <ImageViewer imgSource={{ uri: selectedColorUri }} />
        )}

        {/* 2) Mano + mesa (forma + largo) */}
        <ImageViewer imgSource={currentHandImage} />
      </View>

      {/* CONTROLES DE FORMA Y LARGO */}
      <View style={styles.handControlsContainer}>
        <Text style={styles.sectionTitle}>Forma de uñas</Text>
        <View style={styles.row}>
          {HAND_VARIANTS.map((variant, idx) => {
            const selected = idx === shapeIndex;
            return (
              <Text
                key={variant.shapeKey}
                style={[
                  styles.optionButton,
                  selected && styles.optionButtonSelected,
                ]}
                onPress={() => setShapeIndex(idx)}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    selected && styles.optionButtonTextSelected,
                  ]}
                >
                  {variant.label}
                </Text>
              </Text>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Largo</Text>
        <View style={styles.row}>
          {LENGTH_LABELS.map((label, idx) => {
            const selected = idx === lengthIndex;
            return (
              <Text
                key={label}
                style={[
                  styles.optionButton,
                  selected && styles.optionButtonSelected,
                ]}
                onPress={() => setLengthIndex(idx)}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    selected && styles.optionButtonTextSelected,
                  ]}
                >
                  {label}
                </Text>
              </Text>
            );
          })}
        </View>
      </View>

      {/* PALETA DE COLORES + BOTÓN + */}
      <View style={styles.paletteContainer}>
        {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

        <ColorPalette
          colors={colors}
          selectedColorId={selectedColorId}
          apiBaseUrl={API_BASE_URL}
          onSelectColor={handleSelectColor}
          onColorsChange={handleColorsChange}
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
  errorText: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
  },
});
