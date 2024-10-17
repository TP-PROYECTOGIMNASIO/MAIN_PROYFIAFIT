import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const ModalError = ({ isVisible, onClose, errorMessage }) => (
  <Modal isVisible={isVisible}>
    <View style={styles.container}>
      <Text style={styles.text}>{errorMessage}</Text>
      <Button title="Cerrar" onPress={onClose} />
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default ModalError;
