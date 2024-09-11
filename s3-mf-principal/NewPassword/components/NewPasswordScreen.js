import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import styles from './styles';

const NewPasswordScreen = ({ navigation, route }) => {

  const { username = '', confirmationCode = '' } = route?.params || {};

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleConfirm = () => {
    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Las contraseñas no coinciden.',
      });
      return;
    }

    if (password.length < 8) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'La contraseña debe tener al menos 8 caracteres.',
      });
      return;
    }

    axios.put('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/auth/hu-tp-02', 
      { 
        username,
        confirmationCode,
        newPassword: password
      },
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
          text2: 'Contraseña restablecida con éxito.',
        });
        navigation.navigate('Login');
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: 'No se pudo restablecer la contraseña. Intente nuevamente.',
        });
      }
    })
    .catch(error => {
      console.error('Error al restablecer la contraseña:', error);
      if (error.response && error.response.data && error.response.data.error) {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: error.response.data.error,
        });
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: 'Ocurrió un error. Por favor, intenta nuevamente.',
        });
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Image
            source={require('../../public/background.png')}
            style={styles.backgroundImage}
          />
        </View>
        <View style={styles.rightSection}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>RESTABLECER CONTRASEÑA</Text>
            <Text style={styles.title2}>Escriba una nueva contraseña</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <Text style={styles.title2}>Vuelva a escribir la contraseña</Text>
            <TextInput
            style={[styles.input, { marginBottom: 30 }]}
             
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleConfirm}>
              <Text style={styles.buttonText}>CONFIRMAR</Text>
            </TouchableOpacity>
        </View>
      </View>
      </View>
    
  );
};

export default NewPasswordScreen;