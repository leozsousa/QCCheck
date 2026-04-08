import React, { useContext } from "react"; // 1. Importe o useContext
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthContext from "../context/AutoContext"; // 2. Importe seu contexto
import { View, ActivityIndicator } from "react-native";
// Telas
import LoginScreen from "../screens/LoginScreen";
import LoteListScreen from "../screens/LoteListScreen";
import InspectionScreen from "../screens/InspectionScreen";
import EditLoteScreen from "../screens/EditarLoteScreen";

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  // 3. Pegamos o usuário do contexto global
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#c2ccc2",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      {/* 4. LÓGICA DE PERSISTÊNCIA: Se não tem user, mostra Login. Se tem, mostra App */}
      {!user ? (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen
            name="Lotes"
            component={LoteListScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NovoLote"
            component={InspectionScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditarLote"
            component={EditLoteScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}