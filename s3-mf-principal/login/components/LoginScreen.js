import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import styles from './styles';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    axios.post('https://cxdt2lrhdb.execute-api.us-east-2.amazonaws.com/desarrollo/auth/login', {
      username,
      password,
    })
    .then(response => {
      console.log('Respuesta completa de la API:', response);
      console.log('Datos de la API:', response.data);

      if (response.data.message === 'Login exitoso.') {
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Login Exitoso',
          text2: 'Redirigiendo a Dashboard...',
        });
        setTimeout(() => {
          navigation.navigate('Dashboard');
        }, 2000);
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Ingreso Fallido',
          text2: response.data.message || 'Credenciales Invalidas',
        });
      }
    })
    .catch(error => {
      console.error('Error en la API:', error.response ? error.response.data : error.message);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Ingreso Fallido',
        text2: 'Ocurrió un error. Por favor, intenta nuevamente.',
      });
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Image
          source={require('../assets/background.png')}
          style={styles.backgroundImage}
        />
      </View>
      <View style={styles.rightSection}>
        <View style={styles.loginBox}>
          <Text style={styles.loginTitle}>INICIAR SESIÓN</Text>
          <Text style={styles.loginTitle2}>Usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su usuario"
            placeholderTextColor="#888"
            value={username}
            onChangeText={setUsername}
          />
          <Text style={styles.loginTitle2}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su contraseña"
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
              Si no tienes una cuenta <Text style={styles.registerText}>REGÍSTRATE</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
