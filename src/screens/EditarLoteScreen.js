import React, { useRef } from "react";
import { View, Text, TextInput, Pressable, Alert, StyleSheet } from "react-native";
import { useForm } from "../hooks/UseForm";
import { globalStyles } from "../styles/globalstyles";
import ListContext from "../context/ListContext";

export default function EditLoteScreen({ navigation, route }) {

  const {lote} = route.params; 
  const { updateListItem, removeListItem } = React.useContext(ListContext);
 
  const refData = useRef(null)
  const refResp = useRef(null)
  const refCargo = useRef(null)
  const refDesc = useRef(null)

  const { values, handleChange } = useForm({
    nome: lote.nome,
    data: lote.data,
    responsavel: lote.responsavel,
    cargo: lote.cargo,
    descricao: lote.descricao,
  });

  async function salvarEdicao() {

    const loteAtualizado = {
      ...lote,
      ...values,
    };

    await updateListItem(loteAtualizado);

    Alert.alert("Sucesso", "Lote atualizado!");

    navigation.goBack();
  }

  function deletar() {

    Alert.alert(
      "Excluir",
      "Deseja realmente excluir este lote?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            await removeListItem(lote.id);
            navigation.goBack();
          },
        },
      ]
    );
  }

  return (
    <View style={[globalStyles.container, styles.container]}>

      <Text style={globalStyles.titulo1}>Editar Lote</Text>

      <TextInput
        style={globalStyles.input}
        value={values.nome}
        returnKeyType="next"
        onChangeText={(t) => handleChange("nome", t)}
        onSubmitEditing={() => refData.current.focus()}
        placeholder="Nome do Lote"
      />

      <TextInput
        style={globalStyles.input}
        value={values.data}
        ref={refData}
        returnKeyType="next"
        onChangeText={(t) => handleChange("data", t)}
        onSubmitEditing={() => refResp.current.focus()}
        placeholder="Data (DD/MM/AAAA)"
      />

      <TextInput
        style={globalStyles.input}
        value={values.responsavel}
        ref={refResp}
        returnKeyType="next"
        onChangeText={(t) => handleChange("responsavel", t)}
        onSubmitEditing={() => refCargo.current.focus()}
        placeholder="Responsável"
      />

      <TextInput
        style={globalStyles.input}
        value={values.cargo}
        ref={refCargo}
        returnKeyType="next"
        onChangeText={(t) => handleChange("cargo", t)}
        onSubmitEditing={() => refDesc.current.focus()}
        placeholder="Cargo" 
      />

      <TextInput
        style={[globalStyles.input, { height: 100 }]}
        value={values.descricao}
        ref={refDesc}
        onChangeText={(t) => handleChange("descricao", t)}
        placeholder="Descrição"   
        multiline
      />

      <Pressable style={globalStyles.button} onPress={salvarEdicao}>
        <Text style={globalStyles.botaoTexto}>Salvar Alterações</Text>
      </Pressable>

      <Pressable style={[globalStyles.button, {backgroundColor: '#770000'}]} onPress={deletar}>
        <Text style={globalStyles.botaoTexto}>Excluir Lote</Text>
      </Pressable>

      <Pressable style={[globalStyles.button, styles.button]} onPress={() => navigation.goBack()}>
        <Text style={[globalStyles.botaoTexto, styles.textButton]}>Cancelar</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    justifyContent: 'center',
    margin: 24,
    padding: 0,
    gap: 7
  },
  button: {
    backgroundColor: "#f2f2f2",
    borderWidth: 1,
    borderColor: "#cfcfcf"
  },
  textButton: {
    color: '#000',
    fontWeight: 'bold'
  }
});