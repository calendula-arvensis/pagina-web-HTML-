import React, { useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from "react-native";

import AddColorButton from "@/components/AddColorButton";
import PredefinedColorModal from "@/components/PredefinedColorModal";
import { PREDEFINED_COLORS, PredefinedColor } from "@/constants/predefinedColors";

export type Color = {
  id: string;
  src: string;
};

type ColorPaletteProps = {
  colors: Color[];
  selectedColorId: string | null;
  apiBaseUrl: string;
  onSelectColor: (color: Color) => void;
  onColorsChange: (newColors: Color[]) => void;
};

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

  // Filtrar predefinidos que NO estén todavía en la paleta
  const availablePredefs: PredefinedColor[] = PREDEFINED_COLORS.filter(
    (predef) => !colors.some((c) => c.src === predef.src)
  );

  const dataWithAdd = [
    ...colors,
    { id: ADD_BUTTON_ID, src: "" } as Color,
  ];

  const handleChoosePredefined = async (predef: PredefinedColor) => {
    if (colors.some((c) => c.src === predef.src)) {
      setShowModal(false);
      return;
    }

    try {
      setAdding(true);

      const newColor: Color = {
        id: `predef-${predef.key}-${Date.now()}`,
        src: predef.src,
      };

      const res = await fetch(`${apiBaseUrl}/api/colores`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newColor),
      });

      if (!res.ok) {
        console.error("Error HTTP al agregar color:", res.status);
        return;
      }

      const saved = await res.json();
      const updated = [...colors, saved];

      onColorsChange(updated);
      onSelectColor(saved);
      setShowModal(false);
    } catch (err) {
      console.error("Error agregando color predefinido", err);
    } finally {
      setAdding(false);
    }
  };

  const renderItem = ({ item }: { item: Color }) => {
    if (item.id === ADD_BUTTON_ID) {
      return <AddColorButton onPress={() => setShowModal(true)} />;
    }

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

      <PredefinedColorModal
        visible={showModal}
        loading={adding}
        availablePredefs={availablePredefs}
        apiBaseUrl={apiBaseUrl}
        onSelect={handleChoosePredefined}
        onClose={() => !adding && setShowModal(false)}
      />
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
});

export default ColorPalette;
