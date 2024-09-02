import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function DashboardScreen() {
  const navigation = useNavigation();

  const handleNavigateToLogin = () => {
    navigation.navigate('Login');
  };

  const handleNavigateToWeb = (urlMain) => {
    navigation.navigate('Microview', { urlMain });
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
          onPress={() => handleNavigateToWeb('https://s3-mf-administrador.netlify.app/')}
        >
          <Text style={styles.buttonText}>Área de Administrador</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigateToWeb('https://s3-mf-clientes.netlify.app/')}
        >
          <Text style={styles.buttonText}>Área de Clientes</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigateToWeb('https://s3-mf-encargado.netlify.app/')}
        >
          <Text style={styles.buttonText}>Área de Encargado</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigateToWeb('https://s3-mf-entrenador.netlify.app/')}
        >
          <Text style={styles.buttonText}>Área de Entrenador</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigateToWeb('https://s3-mf-fisioterapeuta.netlify.app/')}
        >
          <Text style={styles.buttonText}>Área de Fisioterapeuta</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigateToWeb('https://s3-mf-instructor.netlify.app/')}
        >
          <Text style={styles.buttonText}>Área de Instructor</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigateToWeb('https://s3-mf-manager.netlify.app/')}
        >
          <Text style={styles.buttonText}>Área de Manager</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigateToWeb('https://s3-mf-nutricionista.netlify.app/')}
        >
          <Text style={styles.buttonText}>Área de Nutricionista</Text>
        </TouchableOpacity>
      
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigateToWeb('https://s3-mf-recepcionista.netlify.app/')}
        >
          <Text style={styles.buttonText}>Área de Recepcionista</Text>
        </TouchableOpacity>
        
      </ImageBackground>
    </View>
  );
}
