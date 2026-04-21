import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext({});

const USUARIOS_SISTEMA = [
  { email: "admin@gmail.com", senha: "123", nome: "Administrador" },
  { email: "joao@gmail.com", senha: "456", nome: "João Silva" },
  { email: "maria@gmail.com", senha: "789", nome: "Maria Souza" },
]

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = await AsyncStorage.getItem("@user");
      if (storageUser) {
        setUser(JSON.parse(storageUser))
      }
      setLoading(false)
    }
    loadStorageData()
  }, [])

  async function signIn(email, password) {
    const data = { email: email, token: "12345abc" }
    setUser(data)
    await AsyncStorage.setItem("@user", JSON.stringify(data))
  }

  async function signOut() {
    await AsyncStorage.removeItem("@user")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext