import React, { useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

export default function DashboardScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { role } = route.params;

  useEffect(() => {
    // Guardar el role en AsyncStorage
    const storeRole = async () => {
      try {
        await AsyncStorage.setItem('userRole', role);
        console.log('Role guardado en AsyncStorage:', role);
      } catch (error) {
        console.error('Error al guardar el role en AsyncStorage:', error);
      }
    };

    if (role) {
      storeRole(); // Ejecuta el almacenamiento cuando el role esté disponible
    }
  }, [role]);

  const handleNavigateToWeb = () => {
    navigation.navigate('Microview', { role: role });
  };
  const handleNavigateToLogin = () => {
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/background.png')}
        style={styles.backgroundImage}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={handleNavigateToWeb}
        >
          <Text style={styles.buttonText}>Ir a {role}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleNavigateToLogin}
        >
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}
