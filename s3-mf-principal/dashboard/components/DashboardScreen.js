import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function DashboardScreen() {
  const navigation = useNavigation();

  const handleNavigateToLogin = () => {
    navigation.navigate('Login');
  };
  const handleNavigateToWeb = () => {
    navigation.navigate('Microview');
  };
  return (
    <View style={styles.container}>
      <Text>Pantalla de Dashboard</Text>
      
      <ImageBackground
        source={require('../assets/background.png')}
        style={styles.backgroundImage}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={handleNavigateToLogin}
        >
          <Text style={styles.buttonText}>Ir a Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleNavigateToWeb}
        >
          <Text style={styles.buttonText}>Ir a microfront</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}
