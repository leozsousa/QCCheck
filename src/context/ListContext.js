import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ListContext = createContext({});

export const ListProvider = ({ children }) => {
  const [list, setList] = useState([]);

  // 1. Carrega os dados assim que o App abre
  useEffect(() => {
    async function carregarLista() {
      try {
        const storageList = await AsyncStorage.getItem("@list_lotes");
        if (storageList) {
          setList(JSON.parse(storageList));
        }
      } catch (error) {
        console.error("Erro ao carregar lotes:", error);
      }
    }
    carregarLista();
  }, []);

  // 2. Função para Adicionar
  async function addListItem(item) {
    try {
      const newList = [item, ...list];
      setList(newList);
      await AsyncStorage.setItem("@list_lotes", JSON.stringify(newList));
    } catch (error) {
      console.error("Erro ao salvar lote:", error);
    }
  }

  // 3. Função para Remover
  async function removeListItem(id) {
    try {
      const newList = list.filter((item) => item.id !== id);
      setList(newList);
      await AsyncStorage.setItem("@list_lotes", JSON.stringify(newList));
    } catch (error) {
      console.error("Erro ao remover lote:", error);
    }
  }

  // 4. Função para Atualizar (Editar)
  async function updateListItem(updatedItem) {
    try {
      const newList = list.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
      setList(newList);
      await AsyncStorage.setItem("@list_lotes", JSON.stringify(newList));
    } catch (error) {
      console.error("Erro ao atualizar lote:", error);
    }
  }

  return (
    <ListContext.Provider value={{ list, addListItem, removeListItem, updateListItem }}>
      {children}
    </ListContext.Provider>
  );
};

export default ListContext;