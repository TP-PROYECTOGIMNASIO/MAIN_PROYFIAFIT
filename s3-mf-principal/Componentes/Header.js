import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation(); // Uso de useNavigation para obtener la instancia de navigation

  // Define la función para manejar la navegación
  const handlePress = () => {
    navigation.navigate('Login'); // Cambia 'Login' por el nombre de tu pantalla de destino
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={handlePress}>
        <Image 
          source={require('../login/assets/logoFondoNegro.png')} 
          style={styles.logo} 
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.navbarText}>Back</Text> {/* Opcional: Puedes eliminar esto si no necesitas un texto de retroceso */}
      </TouchableOpacity>
    </View>
  );
};

// Estilos del header
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: { 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
  },
  navbarText: {
    fontSize: 20,
    color: '#000', // Cambia el color para que sea visible
  },
  logo: {
    width: 300,
    height: 110,
    resizeMode: 'contain',
  },
});

export default Header;
