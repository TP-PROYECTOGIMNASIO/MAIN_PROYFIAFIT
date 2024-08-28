import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import styles from './styles';  

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {   
    try {
      // Envía las credenciales al backend mediante POST
      const response = await axios.post('https://gzim53vhw1.execute-api.us-east-2.amazonaws.com/desarrollo/login', {
        username,
        password,   
      });

      console.log('Respuesta de la API:', response.data);


      if (response.data.success) {
        navigation.navigate('Dashboard');
      } else {
       
        Alert.alert('Ingreso Fallido', response.data.message || 'Credenciales Invalidas');
      }
    } catch (error) {
      console.error('Error en la API:', error.response ? error.response.data : error.message);
      Alert.alert('Ingreso Fallido', 'Ocurrió un error. Por favor, intenta nuevamente.');
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/background.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.loginBox}>
          <Text style={styles.loginTitle}>INICIAR SESIÓN</Text>
          <Text style={styles.loginTitle2}>Usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="Usuario"
            placeholderTextColor="#888"
            value={username}
            onChangeText={setUsername}
          />

          <Text style={styles.loginTitle2}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>INGRESAR</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
            <Text style={styles.linkText}>¿Deseas restablecer la contraseña?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.linkText}>
              Si no tienes una cuenta <Text style={styles.registerText}>REGISTRATE</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}