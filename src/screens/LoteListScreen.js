import React, { useState, useContext, useEffect } from "react";
import { View, FlatList, Text, TextInput, Pressable, Alert, StyleSheet,Image } from "react-native";
import ListContext from "../context/ListContext";
import DetailsModal from "../components/DetailsModal";
import ConfirmModal from "../components/ConfirmModal"; 
import AuthContext from "../context/AutoContext";
import { globalStyles } from "../styles/globalstyles";

export default function LoteListScreen({ navigation }) {
  const { list, updateListItem } = useContext(ListContext)
  const { signOut } = useContext(AuthContext)
  const [modalVisible, setModalVisible] = useState(false)
  const [loteSelecionado, setLoteSelecionado] = useState(null)
  const [busca, setBusca] = useState('')
  const [listaFiltrada, setListaFiltrada] = useState(list)
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [loteParaDetalhe, setLoteParaDetalhe] = useState(null);
  
  async function mudarStatus(status, cor) {
    if (loteSelecionado) {
      const loteAtualizado = { ...loteSelecionado, status, cor };
      await updateListItem(loteAtualizado)
      setModalVisible(false)
      setLoteSelecionado(null)
    }
  }
  
  function abrirModal(item) {
    setLoteSelecionado(item)
    setModalVisible(true)
  }

  function abrirDetalhes(item) {
    setLoteParaDetalhe(item)
    setDetailsVisible(true)
  }

  function handleSearch(text) {
    setBusca(text)
    
    if (text === '') {
      setListaFiltrada(list)
      return
    }

    const dadosFiltrados = list.filter((item) => {
      const itemNome = item.nome ? item.nome.toUpperCase() : ''
      const textData = text.toUpperCase()
      return itemNome.indexOf(textData) > -1
    })

    setListaFiltrada(dadosFiltrados)
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

  useEffect(() => {
    setListaFiltrada(list)
  }, [list]);

  return (
    <View style={[globalStyles.container]}>
      <View style={styles.userArea}>
        <Pressable 
          style={[styles.botaoIcone, { backgroundColor: "#8b8b8b" }]} 
          onPress={alertaSignOut}
        >
          <Image 
            source={{ uri: 'https://cdn-icons-png.freepik.com/512/8500/8500156.png' }} 
            style={styles.fotoPerfil} 
          />
        </Pressable>
        <Text style={globalStyles.titulo2}>admin@gmail.com</Text>
      </View>
      <View style={styles.containerBusca}>
        <TextInput
          style={[globalStyles.titulo2, styles.inputBusca]}
          placeholder="Pesquisar lote..."
          value={busca}
          onChangeText={(t) => handleSearch(t)}
          clearButtonMode="while-editing"
        />
      </View>
      <FlatList
        data={listaFiltrada || []}
        style={{flex: 1}}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <Text style={[globalStyles.titulo2, styles.empty]}>
            {busca.length > 0 ? "Nenhum resultado encontrado" : "Nenhum lote cadastrado"}
          </Text>
        }
        renderItem={({ item }) => (
          <View style={[styles.containerItem, { borderLeftColor: item.cor || "#333" }]}>
            <Pressable style={{ flex: 1 }} onPress={() => abrirDetalhes(item)}>
              <Text style={[globalStyles.titulo2, {textAlign: 'left'}]}>
                {item.nome}
              </Text>
              <Text style={[globalStyles.subtitulo, {textAlign: 'left'}]}>
                {item.status || "Pendente"}
              </Text>
            </Pressable>

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
      />

      <DetailsModal 
        visible={detailsVisible}
        lote={loteParaDetalhe}
        onClose={() => setDetailsVisible(false)}
        onEdit={() => {
          setDetailsVisible(false)
          navigation.navigate("EditarLote", { lote: loteParaDetalhe })
        }}
      />

      <ConfirmModal 
        visible={modalVisible}
        lote={loteSelecionado}
        onClose={() => setModalVisible(false)}
        onConfirm={(status, cor) => mudarStatus(status, cor)}
      />

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
  inputBusca: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingTop: 21,
    paddingBottom: 21
  },
  containerItem: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
    borderLeftWidth: 6,
    elevation: 3,
    shadowColor: "#000",
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
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#FFF'
  },
  textoIcone: { color: "#fff", fontSize: 16 },
  empty: { textAlign: "center", marginTop: 50, fontSize: 16, color: "#999" }
});