import React, { useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from "react-native";

export type Color = {
  id: string;
  src: string; // ej: "colores/img1.jpg"
};

type ColorPaletteProps = {
  colors: Color[];
  selectedColorId: string | null;
  apiBaseUrl: string;
  onSelectColor: (color: Color) => void;
  onColorsChange: (newColors: Color[]) => void;
};

// Colores predefinidos que ya existen en Render/public/colores
type PredefinedColor = {
  key: string;
  label: string;
  src: string;
};

const PREDEFINED_COLORS: PredefinedColor[] = [
  { key: "fucsia", label: "Fucsia", src: "colores/fucsia.png" },
  { key: "naranja", label: "Naranja", src: "colores/naranja.png" },
  { key: "verde", label: "Verde", src: "colores/verde.png" },
];

const ADD_BUTTON_ID = "__add_button__";

const ColorPalette: React.FC<ColorPaletteProps> = ({
  colors,
  selectedColorId,
  apiBaseUrl,
  onSelectColor,
  onColorsChange,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [adding, setAdding] = useState(false);

  // Colores predefinidos que TODAVÍA no están en la paleta (no duplicar por src)
  const availablePredefs: PredefinedColor[] = PREDEFINED_COLORS.filter(
    (predef) => !colors.some((c) => c.src === predef.src)
  );

  // Mezclamos colores + botón +
  const dataWithAdd = [
    ...colors,
    { id: ADD_BUTTON_ID, src: "" } as Color, // ítem fantasma para el botón +
  ];

  const handleChoosePredefined = async (predef: PredefinedColor) => {
    // Si por algún motivo ya existe (race condition), no lo agregamos de nuevo
    if (colors.some((c) => c.src === predef.src)) {
      setShowModal(false);
      return;
    }

    try {
      setAdding(true);

      const newColorToSend: Color = {
        id: `predef-${predef.key}-${Date.now()}`,
        src: predef.src,
      };

      const res = await fetch(`${apiBaseUrl}/api/colores`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newColorToSend),
      });

      if (!res.ok) {
        console.error("Error HTTP al agregar color:", res.status);
        return;
      }

      const savedColor: Color = await res.json();
      const updated = [...colors, savedColor];

      onColorsChange(updated);
      onSelectColor(savedColor);
      setShowModal(false);
    } catch (err) {
      console.error("Error agregando color predefinido", err);
    } finally {
      setAdding(false);
    }
  };

  const renderItem = ({ item }: { item: Color }) => {
    // Botón de +
    if (item.id === ADD_BUTTON_ID) {
      return (
        <TouchableOpacity
          style={styles.addColorCircle}
          onPress={() => setShowModal(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.addColorPlus}>+</Text>
        </TouchableOpacity>
      );
    }

    // Botón de color normal
    const fullUri = `${apiBaseUrl}/${item.src}`;
    const isSelected = item.id === selectedColorId;

    return (
      <TouchableOpacity
        style={[styles.colorButton, isSelected && styles.colorButtonSelected]}
        onPress={() => onSelectColor(item)}
        activeOpacity={0.8}
      >
        <Image source={{ uri: fullUri }} style={styles.colorThumbnail} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <FlatList
        data={dataWithAdd}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.paletteContent}
        renderItem={renderItem}
      />

      {/* Modal de colores predefinidos */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Elegí un color para agregar</Text>

            {adding && (
              <View style={styles.modalLoading}>
                <ActivityIndicator />
                <Text style={styles.modalLoadingText}>Agregando...</Text>
              </View>
            )}

            {!adding && availablePredefs.length === 0 && (
              <Text style={styles.modalInfo}>
                Ya agregaste todos los colores disponibles.
              </Text>
            )}

            {!adding &&
              availablePredefs.length > 0 &&
              availablePredefs.map((predef) => {
                const previewUri = `${apiBaseUrl}/${predef.src}`;
                return (
                  <TouchableOpacity
                    key={predef.key}
                    style={styles.predefRow}
                    onPress={() => handleChoosePredefined(predef)}
                  >
                    <Image
                      source={{ uri: previewUri }}
                      style={styles.predefThumbnail}
                    />
                    <Text style={styles.predefLabel}>{predef.label}</Text>
                  </TouchableOpacity>
                );
              })}

            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => !adding && setShowModal(false)}
            >
              <Text style={styles.modalCloseText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
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
  addColorCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "#ffffff88",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff33",
  },
  addColorPlus: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "600",
    lineHeight: 28,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fefefe",
    borderRadius: 12,
    padding: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  modalInfo: {
    textAlign: "center",
    marginVertical: 16,
    fontSize: 14,
  },
  predefRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  predefThumbnail: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  predefLabel: {
    fontSize: 14,
  },
  modalCloseButton: {
    marginTop: 12,
    alignSelf: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#f06292",
  },
  modalCloseText: {
    color: "#fff",
    fontWeight: "600",
  },
  modalLoading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  modalLoadingText: {
    marginLeft: 8,
  },
});

export default ColorPalette;
