import React, { useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

// Define las imágenes para cada rol
const roleImages = {
  admin: require('../assets/interfaz_admin.jpeg'),
  cliente: require('../assets/interfaz_clientes.jpeg'),
  cliente_libre: require('../assets/interfaz_clientes.jpeg'),
  encargado: require('../assets/interfaz_encargado.jpeg'),
  entrenador: require('../assets/interfaz_entrenador.jpeg'),
  fisioterapeuta: require('../assets/interfaz_fisioterapeuta.jpeg'),
  manager: require('../assets/interfaz_manager.jpeg'),
  nutricionista: require('../assets/interfaz_nutricionista.jpeg'),
  instructor: require('../assets/background.png'),
  recepcionista: require('../assets/background.png'),
  // Agrega más roles e imágenes según sea necesario
};

export default function DashboardScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { role } = route.params;

  useEffect(() => {
    const storeRole = async () => {
      try {
        await AsyncStorage.setItem('userRole', role);
        console.log('Role guardado en AsyncStorage:', role);
      } catch (error) {
        console.error('Error al guardar el role en AsyncStorage:', error);
      }
    };

    if (role) {
      storeRole();
    }
  }, [role]);

  const handleNavigateToWeb = () => {
    navigation.navigate('Microview', { role: role });
  };

  const handleNavigateToUpdatePassword = () => {
    navigation.navigate('UpdatePassword', { role });
  };

  // Función para obtener la imagen del rol
  const getRoleImage = (role) => {
    return roleImages[role] || require('../assets/background.png'); // Imagen por defecto si el rol no coincide
  };

  const handleNavigateToCheckIn = () => {
    navigation.navigate('CheckIn', { role });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/fondogris.jpeg')}
        style={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Bienvenido {role}, Selecciona un Módulo para Iniciar</Text>
          
          <View style={styles.cardContainer}>
            {/* Tarjeta 1: Interfaz Principal */}
            <TouchableOpacity style={styles.card} >
              <View style={styles.cardHeader}></View>
              <ImageBackground
                source={getRoleImage(role)} // Usar la función para obtener la imagen
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>Interfaz Principal</Text>
              <TouchableOpacity style={styles.cardButton} onPress={handleNavigateToWeb}>
                <Text style={styles.buttonText} >SELECCIONAR</Text>
              </TouchableOpacity>
            </TouchableOpacity>
  
            {/* Tarjeta 2: Check-in - Se muestra solo si el rol no es cliente o cliente_libre */}
            {role !== 'cliente' && role !== 'cliente_libre' && (
              <TouchableOpacity style={styles.card} >
                <View style={styles.cardHeader}></View>
                <ImageBackground
                  source={require('../assets/background.png')}
                  style={styles.cardImage}
                />
                <Text style={styles.cardTitle}>Check-in</Text>
                <TouchableOpacity style={styles.cardButton} onPress={handleNavigateToCheckIn}>
                  <Text style={styles.buttonText} >SELECCIONAR</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )}
  
            {/* Tarjeta 3: Visualizar Perfil */}
            <TouchableOpacity style={styles.card} >
              <View style={styles.cardHeader}></View>
              <ImageBackground
                source={require('../assets/background.png')}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>Visualizar Perfil</Text>
              <TouchableOpacity style={styles.cardButton} onPress={handleNavigateToUpdatePassword}>
                <Text style={styles.buttonText}>SELECCIONAR</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
  
}
