import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';// importando librerias para los iconos de redes sociales

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.copyright}>Gimnasio © 2024</Text>
      <View style={styles.socialIcons}>
        <FontAwesome name="facebook" size={24} color="white" style={styles.icon} />
        <FontAwesome name="instagram" size={24} color="white" style={styles.icon} />
        <FontAwesome name="twitter" size={24} color="white" style={styles.icon} />
        <FontAwesome name="linkedin" size={24} color="white" style={styles.icon} />
        <FontAwesome name="youtube" size={24} color="white" style={styles.icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    footer: {
      backgroundColor: '#000',
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    copyright: {
      color: 'white',
    },
    socialIcons: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      flex: 1,
    },
    icon: {
      marginHorizontal: 10,
    },
  });
  
  export default Footer;