import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';
import { globalStyles } from '../styles/globalstyles';

export default function DetailsModal({ visible, lote, onClose, onEdit }) {
  if (!lote) return null;

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="fade"
      transparent
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={[globalStyles.subtitulo, styles.label]}>Nome do Lote:</Text>
          <Text style={[globalStyles.titulo2, styles.label]}>{lote.nome}</Text>

          <Text style={[globalStyles.subtitulo, styles.label]}>Status:</Text>
          <Text style={[globalStyles.titulo2, { color: lote.cor || '#333' }, styles.label]}>
            {lote.status || "Pendente"}
          </Text>

          <Text style={[globalStyles.subtitulo, styles.label]}>Descrição:</Text>
          <Text style={[globalStyles.titulo2, styles.label]}>
            {lote.descricao || "Nenhuma descrição informada."}
          </Text>

          <View style={styles.buttonArea}>

            <Pressable style={[globalStyles.button, styles.button]} onPress={onEdit}>
              <Text style={[globalStyles.botaoTexto, { color: '#FFF' }]}>Editar Lote</Text>
            </Pressable>

            <Pressable style={[globalStyles.button, styles.buttonBack]} onPress={onClose}>
              <Text style={[globalStyles.botaoTexto, { color: '#000' }]}>Voltar</Text>
            </Pressable>

          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#FFF',
    borderRadius: 15,
    gap: 7,
    padding: 20,
    elevation: 5,
  },
  label: {
    textAlign: 'left'
  },
  buttonArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    gap: 10
  },
  button: {
    flex: 1,
    borderWidth: 1,
  },
  buttonBack: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    borderWidth: 1,
    borderColor: "#cfcfcf"
  }
});