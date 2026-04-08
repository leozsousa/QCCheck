import React from "react";
import { NavigationContainer } from "@react-navigation/native" ;
import { AuthProvider } from "./src/context/AutoContext";
import { ListProvider } from "./src/context/ListContext";
import AppRoutes from "./src/routes/AppRoutes"; 
export default function App() {
  return (
    <NavigationContainer>
      
      <AuthProvider>
        <ListProvider>
          <AppRoutes />
        </ListProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}