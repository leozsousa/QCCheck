import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ListContext = createContext({});

export const ListProvider = ({ children }) => {
  const [list, setList] = useState([])

  useEffect(() => {
    async function carregarLista() {
      try {
        const storageList = await AsyncStorage.getItem("@list_lotes")
        if (storageList) {
          setList(JSON.parse(storageList));
        }
      } catch (error) {
        console.error("Erro ao carregar lotes:", error)
      }
    }
    carregarLista();
  }, []);

  async function addListItem(item) {
    try {
      const newList = [item, ...list]
      setList(newList);
      await AsyncStorage.setItem("@list_lotes", JSON.stringify(newList));
    } catch (error) {
      console.error("Erro ao salvar lote:", error)
    }
  }

  async function removeListItem(id) {
    try {
      const newList = list.filter((item) => item.id !== id);
      setList(newList);
      await AsyncStorage.setItem("@list_lotes", JSON.stringify(newList));
    } catch (error) {
      console.error("Erro ao remover lote:", error)
    }
  }

  async function updateListItem(updatedItem) {
    try {
      const newList = list.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
      setList(newList);
      await AsyncStorage.setItem("@list_lotes", JSON.stringify(newList));
    } catch (error) {
      console.error("Erro ao atualizar lote:", error)
    }
  }

  return (
    <ListContext.Provider value={{ list, addListItem, removeListItem, updateListItem }}>
      {children}
    </ListContext.Provider>
  );
};

export default ListContext;