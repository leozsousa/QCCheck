import React, { useState, useRef } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { globalStyles } from "../styles/globalstyles";
import AuthContext from "../context/AutoContext";

const USUARIO_FIXO = "admin@gmail.com";
const SENHA_FIXA = "123456";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { signIn } = React.useContext(AuthContext);

  const refSenha = useRef(null)

  function handleLogin() {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha email e senha!");
      return;
    }

    if (email !== USUARIO_FIXO || senha !== SENHA_FIXA) {
      Alert.alert("Erro", "E-mail ou senha incorretos!");
      return;
    }

    signIn(email, senha);
  }

  return (
    <View style={[globalStyles.container, styles.centralizar]}>

      <Text style={globalStyles.titulo1}>QCCheck</Text>
      <View>
        <Text style={globalStyles.titulo2}>Boas Vindas!</Text>
        <Text style={globalStyles.subtitulo}>Faça login para continuar</Text>
      </View>
      
      <View style={[{padding: 16, width: '100%'}]}>
        <TextInput
          placeholder="E-mail"
          style={globalStyles.input}
          value={email}
          returnKeyType="next"
          onChangeText={setEmail}
          onSubmitEditing={() => refSenha.current.focus()}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Senha"
          style={globalStyles.input}
          value={senha}
          ref={refSenha}
          returnKeyType="done"
          onChangeText={setSenha}
          onSubmitEditing={handleLogin}
          secureTextEntry
        />

        <Pressable style={globalStyles.button} onPress={handleLogin}>
          <Text style={globalStyles.botaoTexto}>Entrar</Text>
        </Pressable>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  centralizar: {
    justifyContent: "center",
    gap: 14
  }
});