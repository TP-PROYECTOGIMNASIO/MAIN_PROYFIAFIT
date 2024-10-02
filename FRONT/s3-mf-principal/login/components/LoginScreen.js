import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import styles from './styles';

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

  const handleLogin = () => {
    axios.post('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/auth/hu-tp-01', {
      username,
      password,
    })
    .then(response => {
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

          // Si el usuario tiene el rol de 'cliente' o 'cliente_libre', siempre redirige al Dashboard
          if (userRole === 'cliente' || userRole === 'cliente_libre') {
            navigation.navigate('Dashboard', { role: userRole, username: username });
          }
          // Si el rol es diferente y necesita cambiar la contraseña
          else if (forcePasswordChange !== '1') {
            navigation.navigate('UpdatePassword', { role: userRole, username: username });
          }
          // Si no necesita cambiar la contraseña
          else {
            navigation.navigate('Dashboard', { role: userRole, username: username });
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
