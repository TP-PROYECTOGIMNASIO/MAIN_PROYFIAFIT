import React, { Component } from "react";
import { View, StyleSheet } from 'react-native';



const PaymentMethods = () => {
  const redirectToPage = () => {
    window.location.href = '/pagina.html';  // Cambia a la ruta de tu archivo HTML
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Página Principal</Text>
      <Button title="Ir a la Página HTML" onPress={redirectToPage} />
    </View>
  );
};
export default PaymentMethods;