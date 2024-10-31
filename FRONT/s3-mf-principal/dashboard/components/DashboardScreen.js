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
  encargado_eventos: require('../assets/interfaz_encargado_eventos.jpeg'),
  encargado_gimnasios: require('../assets/interfaz_encargado_gimnasios.jpeg'),
  entrenador: require('../assets/interfaz_entrenador.jpeg'),
  fisioterapeuta: require('../assets/interfaz_fisioterapeuta.jpeg'),
  manager: require('../assets/interfaz_manager.jpeg'),
  nutricionista: require('../assets/interfaz_nutricionista.jpeg'),
  instructor: require('../assets/interfaz_instructor.jpeg'),
  recepcionista: require('../assets/interfaz_recepcionista.jpeg'),
  principal: require('../assets/background.png'),
  // Agrega más roles e imágenes según sea necesario
};

export default function DashboardScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { role, username, token } = route.params;

  useEffect(() => {
    const retrieveUserData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        const storedRole = await AsyncStorage.getItem('role');
        const storedToken = await AsyncStorage.getItem('token');
  
        if (storedUsername && storedRole && storedToken) {
          console.log('Datos recuperados:', { storedUsername, storedRole, storedToken });
          navigation.navigate('Dashboard', { role: storedRole, token: storedToken, username: storedUsername });

          // Actualiza el estado o lo que necesites hacer con estos datos
        }
      } catch (error) {
        console.error('Error al recuperar datos de AsyncStorage:', error);
      }
    };
  
    retrieveUserData();
  }, []);

  const handleNavigateToWeb = () => {
    navigation.navigate('Microview', { role: role, token: token, username: username});
  };

  const handleNavigateToUpdatePassword = () => {
    navigation.navigate('UpdatePassword', { role: role, token: token, username: username});
  };

  // Función para obtener la imagen del rol
  const getRoleImage = (role) => {
    return roleImages[role] || require('../assets/background.png'); // Imagen por defecto si el rol no coincide
  };

  const handleNavigateToCheckIn = () => {
    navigation.navigate('CheckIn', { role: role, token: token, username: username});
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
