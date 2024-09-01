import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';// importando librerias para los iconos de redes sociales

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.copyright}>     Copyright © 2024</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
    footer: {
      backgroundColor: '#000',
      padding: 25,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      
    },

      copyright: {
      color: 'white',
      fontFamily: 'Alegraya',
      fontSize: 22,
    },
    
  });
  
  export default Footer;