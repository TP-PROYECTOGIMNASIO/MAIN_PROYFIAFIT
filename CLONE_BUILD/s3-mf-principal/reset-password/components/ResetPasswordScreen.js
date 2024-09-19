import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import styles from './styles';

export default function ResetPasswordScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState(''); 
 
  const handleNext = () => {
    if (username.trim() === '') {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Por favor ingrese su usuario.',
      });
      return;
    }
  
    axios.patch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/auth/hu-tp-02', 
      { username },
      { 
        headers: {
          'Content-Type': 'application/json',
       }
      }
    )
    .then(response => {
      if (response.status === 200) {
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Éxito',
          text2: 'Código de verificación enviado.',
        });
        navigation.navigate('VerificationCode', { username });
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: 'No se pudo enviar el código. Intente nuevamente.',
        });
      }
    })
    .catch(error => {
      console.error('Error al enviar código de verificación:', error);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
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
        <View style={styles.resetbox}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>

          <Text style={styles.title}>RESTABLECER CONTRASEÑA</Text>
          <p></p>
          <Image
            source={require('../assets/icons8-orientación-de-bloqueo-100.png')}
            style={styles.resetImage}
            resizeMode="contain"
          />
          <p></p>
          <Text style={styles.subtitle}>Ingrese su usuario</Text>

          <TextInput
            style={styles.input}
            placeholder="Usuario"
            placeholderTextColor="#888"
            value={username}
            onChangeText={setUsername}
          />
       
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>SIGUIENTE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}