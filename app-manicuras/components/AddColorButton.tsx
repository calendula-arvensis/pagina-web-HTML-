import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type Props = {
  onPress: () => void;
};

const AddColorButton: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.addColorCircle}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.addColorPlus}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});

export default AddColorButton;
