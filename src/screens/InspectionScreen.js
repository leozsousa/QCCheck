import React,{ useRef } from "react";
import { View, Text, TextInput, Pressable, Alert, StyleSheet } from "react-native";
import { useForm } from "../hooks/UseForm";
import { globalStyles } from "../styles/globalstyles";
import ListContext from "../context/ListContext";

export default function InspectionScreen({ navigation, route }) {
  const { addListItem } = React.useContext(ListContext);
  const { values, handleChange, resetForm, validate } = useForm({
    nome: "",
    data: "",
    responsavel: "",
    cargo: "",
    descricao: "",
  });

  const refData = useRef(null)
  const refResp = useRef(null)
  const refCargo = useRef(null)
  const refDesc = useRef(null)

  async function salvar() {

    if (!validate(["nome", "data", "responsavel", "descricao"])) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios!");
      return;
    }

    const novoLote = {
      id: Date.now().toString(),
      ...values,
    };
    await addListItem(novoLote);

    Alert.alert("Sucesso", "Lote cadastrado!");

    resetForm();

    // volta automaticamente para a lista
    navigation.goBack();
  }

  return (
    <View style={[globalStyles.container, styles.container]}>

      <Text style={globalStyles.titulo1}>Cadastro de Lote</Text>

      <TextInput
        placeholder="Nome do Lote"
        style={globalStyles.input}
        value={values.nome}
        returnKeyType="next"
        onChangeText={(t) => handleChange("nome", t)}
        onSubmitEditing={() => refData.current.focus()}
      />

      <TextInput
        placeholder="Data (DD/MM/AAAA)"
        style={globalStyles.input}
        value={values.data}
        ref={refData}
        returnKeyType="next"
        onChangeText={(t) => handleChange("data", t)}
        onSubmitEditing={() => refResp.current.focus()}
      />

      <TextInput
        placeholder="Responsável"
        style={globalStyles.input}
        value={values.responsavel}
        ref={refResp}
        returnKeyType="next"
        onChangeText={(t) => handleChange("responsavel", t)}
        onSubmitEditing={() => refCargo.current.focus()}
      />

      <TextInput
        placeholder="Cargo"
        style={globalStyles.input}
        value={values.cargo}
        ref={refCargo}
        returnKeyType="next"
        onChangeText={(t) => handleChange("cargo", t)}
        onSubmitEditing={() => refDesc.current.focus()}
      />

      <TextInput
        placeholder="Descrição"
        style={[globalStyles.input, { height: 100 }]}
        value={values.descricao}
        ref={refDesc}
        onChangeText={(t) => handleChange("descricao", t)}
        multiline
      />

      <Pressable style={globalStyles.button} onPress={salvar}>
        <Text style={globalStyles.botaoTexto}>Salvar Lote</Text>
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