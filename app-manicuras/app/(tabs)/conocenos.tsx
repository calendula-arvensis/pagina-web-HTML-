import { Text, View, StyleSheet } from "react-native";

export default function ConocenosScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <Text style={styles.title}>¡Hola! Somos el grupo 4</Text>

        <Text style={styles.paragraph}>
          Somos Emma, Ari y Juli, estudiantes de la Facultad de Informática de la UNCo.
        </Text>

        <Text style={styles.paragraph}>
          Este es nuestro proyecto para la materia de Laboratorio de Programación.  
        </Text>

        <Text style={styles.paragraph}>¡Esperamos que te guste!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f790beff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  textBox: {
    maxWidth: 350,
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  paragraph: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 22,
  },
});