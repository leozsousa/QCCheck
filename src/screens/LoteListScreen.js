import React, { useState, useContext } from "react";
import { View, FlatList, Text, Pressable, Alert, StyleSheet,Image } from "react-native";
import ListContext from "../context/ListContext";
import ConfirmModal from "../components/ConfirmModal"; 
import AuthContext from "../context/AutoContext";
import { globalStyles } from "../styles/globalstyles";

export default function LoteListScreen({ navigation }) {
  const { list, updateListItem } = useContext(ListContext);
  const { signOut } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [loteSelecionado, setLoteSelecionado] = useState(null);
  
  async function mudarStatus(status, cor) {
    if (loteSelecionado) {
      const loteAtualizado = { ...loteSelecionado, status, cor };
      await updateListItem(loteAtualizado);
      setModalVisible(false);
      setLoteSelecionado(null);
    }
  }
  
  function abrirModal(item) {
    setLoteSelecionado(item);
    setModalVisible(true);
  }

  function alertaSignOut() {
    Alert.alert(
      "Saindo",
      "Deseja realmente sair da conta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sair",
          style: "destructive",
          onPress: async () => {
            signOut();
          },
        },
      ]
    );
  }

  return (
    <View style={[globalStyles.container]}>
      <View style={styles.userArea}>
        <Pressable 
          style={[styles.botaoIcone, { backgroundColor: "#8b8b8b" }]} 
          onPress={alertaSignOut}
        >
          <Image 
            source={{ uri: 'https://jpimg.com.br/uploads/2020/01/o-maskara.jpg' }} 
            style={styles.fotoPerfil} 
          />
        </Pressable>
        <Text style={globalStyles.titulo2}>admin@gmail.com</Text>
      </View>
      <FlatList
        data={list || []}
        style={{flex: 1}}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }} // Espaço extra para o botão não cobrir o último item
        renderItem={({ item }) => (
          <View style={styles.containerItem}>
            <View style={{ flex: 1 }}>
              <Text style={[globalStyles.titulo2, { color: item.cor || "#333" , textAlign: 'left'}]}>
                {item.nome}
              </Text>
              <Text style={[globalStyles.subtitulo, {textAlign: 'left'}]}>
                {item.status || "Pendente"}
              </Text>
            </View>

            <View style={styles.areaBotoes}>
              <Pressable 
                style={[styles.botaoIcone, { backgroundColor: "#2196F3" }]} 
                onPress={() => navigation.navigate("EditarLote", { lote: item })}
              >
                <Text style={styles.textoIcone}>✏️</Text>
              </Pressable>

              <Pressable 
                style={[styles.botaoIcone, { backgroundColor: "#4CAF50" }]} 
                onPress={() => abrirModal(item)}
              >
                <Text style={styles.textoIcone}>✔️</Text>
              </Pressable>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum lote cadastrado</Text>}
      />

      <ConfirmModal 
        visible={modalVisible}
        lote={loteSelecionado}
        onClose={() => setModalVisible(false)}
        onConfirm={(status, cor) => mudarStatus(status, cor)}
      />

      {/* BOTÃO ADICIONAR (FAB) */}
      <Pressable 
        style={[globalStyles.button]}
        onPress={() => navigation.navigate("NovoLote")}
      >
        <Text style={globalStyles.botaoTexto}>Adicionar Lote</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    margin: 24,
    padding: 0,
    marginTop: 34
  },
  userArea: {
    flex: 1,
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    maxHeight: 70
  },
  userText: {
    textAlign: 'center'
  },
  containerItem: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000", // Sombras para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  areaBotoes: { flexDirection: "row", gap: 8 },
  botaoIcone: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  fotoPerfil: {
    width: 50,           // Largura
    height: 50,          // Altura (deve ser igual à largura)
    borderRadius: 50,     // Metade do valor acima
    borderWidth: 2,       // Opcional: borda ao redor
    borderColor: '#FFF',  // Opcional: cor da borda
  },
  textoIcone: { color: "#fff", fontSize: 16 },
  empty: { textAlign: "center", marginTop: 50, fontSize: 16, color: "#999" }
});