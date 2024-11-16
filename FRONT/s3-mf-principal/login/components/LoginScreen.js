import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage
import styles from './styles';
import { VITE_APP_API_URL_09, VITE_APP_API_URL_USERNAME, VITE_APP_API_URL_01 } from '@env';

// Función para decodificar base64url
function base64UrlDecode(base64Url) {
  const base64 = base64Url
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const binary = atob(base64);
  return decodeURIComponent(escape(binary));
}

// Función para parsear el JWT
function parseJwt(token) {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid JWT token');
  }

  const payload = parts[1];
  const decodedPayload = base64UrlDecode(payload);

  return JSON.parse(decodedPayload);
}

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const apiUrl01 = VITE_APP_API_URL_01;

  useEffect(() => {
    // Verificar si el usuario ya está autenticado
    const checkAuthentication = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        // Si hay un token, decodifícalo y redirige al Dashboard
        try {
          const decodedPayload = parseJwt(token);
          const userRole = decodedPayload['custom:role'];

          // Verifica si el usuario necesita cambiar la contraseña
          const forcePasswordChange = decodedPayload['custom:forcePasswordChange'];
          console.log('Force Password Change:', forcePasswordChange);

          if (userRole === 'cliente' || userRole === 'cliente_libre') {
            navigation.navigate('Dashboard', { role: userRole, token: token, username: username });
          } else if (forcePasswordChange !== '1') {
            navigation.navigate('UpdatePassword', { role: userRole, token: token, username: username });
          } else {
            navigation.navigate('Dashboard', { role: userRole, token: token, username: username });
          }

        } catch (error) {
          console.error('Error al decodificar el token:', error.message);
          // Si hay un error, puedes redirigir a la pantalla de inicio de sesión
        }
      }
    };

    checkAuthentication();
  }, []); // Solo se ejecuta una vez al cargar el componente

  const handleLogin = async () => {
    axios.post(apiUrl01, {
      username,
      password,
    })
    .then(async response => {
      console.log('Respuesta completa de la API:', response);
      console.log('Datos de la API:', response.data);

      if (response.data.message === 'Login exitoso.') {
        const token = response.data.idToken;

        try {
          if (!token || token.split('.').length !== 3) {
            throw new Error('Token vacío o malformado');
          }

          const decodedPayload = parseJwt(token);
          console.log('Decoded Payload:', decodedPayload);

          // Verifica el rol del usuario
          const userRole = decodedPayload['custom:role'];
          console.log('User Role:', userRole);

          // Verifica si el usuario necesita cambiar la contraseña
          const forcePasswordChange = decodedPayload['custom:forcePasswordChange'];
          console.log('Force Password Change:', forcePasswordChange);

          // Almacena el token en AsyncStorage
          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('username', username); // Almacena el nombre de usuario
          await AsyncStorage.setItem('role', userRole); // Almacena el nombre de usuario


          // Redirige según el rol del usuario
          if (userRole === 'cliente' || userRole === 'cliente_libre') {
            navigation.navigate('Dashboard', { role: userRole, token: token, username: username });
          } else if (forcePasswordChange !== '1') {
            navigation.navigate('UpdatePassword', { role: userRole, token: token, username: username });
          } else {
            navigation.navigate('Dashboard', { role: userRole, token: token, username: username });
          }

        } catch (error) {
          console.error('Error al decodificar el token:', error.message);
          navigation.navigate('UserNotScreen'); // Redirigir a UserNotScreen en caso de error
        }
      } else {
        navigation.navigate('UserNotScreen'); // Redirigir a UserNotScreen si la respuesta no es exitosa
      }
    })
    .catch(error => {
      console.error('Error en la API:', error.response ? error.response.data : error.message);
      navigation.navigate('UserNotScreen'); // Redirigir a UserNotScreen en caso de error
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
            style={[styles.input, { marginBottom: 30 }]}
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
            <Text style={styles.linkText2}>¿Deseas restablecer la contraseña?</Text>
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
