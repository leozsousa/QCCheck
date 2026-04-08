import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f2f2f2"
  },

  input: {
    color: "#000000",
    backgroundColor: "#f2f2f2",
    borderWidth: 1,
    borderColor: "#cfcfcf",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10
  },

  button: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 10,
    alignItems: "center"
  },
    titulo1: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
  titulo2: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
  subtitulo: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  }
});