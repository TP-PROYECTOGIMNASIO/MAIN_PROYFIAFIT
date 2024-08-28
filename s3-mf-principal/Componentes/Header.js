import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation(); // Uso de useNavigation para obtener la instancia de navigation

  return (
    <View style={styles.navbar}>
      <Image source={require('../login/assets/fiafit-logo.png')} style={styles.logo} />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.navbarText}>Regresar</Text>
      </TouchableOpacity>
    </View>
  );
};

  const styles = StyleSheet.create({
    container: {
          flex: 1,
        
        },
        navbar: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
          backgroundColor: '#000',
        },
        navbarText: {
          fontSize: 20,
          color: '#fff',
          
        },
        //Tamaño logo FIA FIT
        logo: {
          width: 300,
         height: 110,
         resizeMode: 'contain',
        },
  });
  


  export default Header;

