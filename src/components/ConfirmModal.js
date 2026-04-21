import React from "react";
import { Modal, View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { globalStyles } from "../styles/globalstyles";

export default function ConfirmModal({ visible, lote, onClose, onConfirm }) {
  if (!lote) return null;

  const handleReprovar = () => {
    Alert.alert(
      "Confirmar Reprovação",
      `Tem certeza que deseja reprovar o lote ${lote.nome}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sim, Reprovar", 
          style: "destructive", 
          onPress: () => onConfirm("Reprovado", "#e53935") 
        },
      ]
    )
  }

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
    >
      <View style={styles.bg}>
        <View style={styles.card}>
          <Text style={[globalStyles.titulo2, {fontSize: 20}]}>
            Definir Status ({lote.nome})
          </Text>
          
          <View style={styles.gridBotoes}>
            <Pressable 
              style={[globalStyles.button, { backgroundColor: "#00b90f" }]} 
              onPress={() => onConfirm("Aprovado", "#4CAF50")}
            >
              <Text style={globalStyles.botaoTexto}>Aprovar</Text>
            </Pressable>

            <Pressable 
              style={[globalStyles.button, { backgroundColor: "#b9b900" }]} 
              onPress={() => onConfirm("Pendente", "#FFC107")}
            >
              <Text style={globalStyles.botaoTexto}>Pendente</Text>
            </Pressable>

            <Pressable 
              style={[globalStyles.button, { backgroundColor: "#b90000" }]} 
              onPress={handleReprovar} 
            >
              <Text style={globalStyles.botaoTexto}>Reprovar</Text>
            </Pressable>

            <Pressable style={[globalStyles.button, styles.button]} onPress={onClose}>
              <Text style={[globalStyles.botaoTexto, {color: '#000'}]}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  bg:{
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    padding: 20
  },
  card:{
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    gap: 16 
  },
  gridBotoes:{
    width: "100%",
    gap: 10
  },
  button: {
    borderWidth: 1,
    backgroundColor: "#f2f2f2",
    borderColor: "#cfcfcf"
  }
});