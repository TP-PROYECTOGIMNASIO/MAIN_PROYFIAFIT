import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const ModalLoading = ({ isVisible }) => (
  <Modal isVisible={isVisible}>
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#00ff00" />
      <Text style={styles.text}>Realizando Check-In...</Text>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    color: '#fff',
  },
});

export default ModalLoading;
