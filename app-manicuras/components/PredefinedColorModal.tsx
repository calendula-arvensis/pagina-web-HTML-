import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { PredefinedColor } from "@/constants/predefinedColors";

type Props = {
  visible: boolean;
  loading: boolean;
  availablePredefs: PredefinedColor[];
  apiBaseUrl: string;
  onSelect: (predef: PredefinedColor) => void;
  onClose: () => void;
};

const PredefinedColorModal: React.FC<Props> = ({
  visible,
  loading,
  availablePredefs,
  apiBaseUrl,
  onSelect,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Elegí un color para agregar</Text>

          {loading && (
            <View style={styles.modalLoading}>
              <ActivityIndicator />
              <Text style={styles.modalLoadingText}>Agregando...</Text>
            </View>
          )}

          {!loading && availablePredefs.length === 0 && (
            <Text style={styles.modalInfo}>
              Ya agregaste todos los colores disponibles.
            </Text>
          )}

          {!loading &&
            availablePredefs.length > 0 &&
            availablePredefs.map((predef) => {
              const previewUri = `${apiBaseUrl}/${predef.src}`;
              return (
                <TouchableOpacity
                  key={predef.key}
                  style={styles.predefRow}
                  onPress={() => onSelect(predef)}
                >
                  <Image source={{ uri: previewUri }} style={styles.predefThumbnail} />
                  <Text style={styles.predefLabel}>{predef.label}</Text>
                </TouchableOpacity>
              );
            })}

          <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
            <Text style={styles.modalCloseText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default PredefinedColorModal;
