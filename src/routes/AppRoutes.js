import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, ActivityIndicator } from "react-native";
import AuthContext from "../context/AutoContext";
import LoginScreen from "../screens/LoginScreen";
import LoteListScreen from "../screens/LoteListScreen";
import InspectionScreen from "../screens/InspectionScreen";
import EditLoteScreen from "../screens/EditarLoteScreen";

const Stack = createNativeStackNavigator()

export default function AppRoutes() {
  const { user, loading } = useContext(AuthContext)
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
  )
}