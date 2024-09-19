import React, { useState } from 'react'; 
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import styles from './codeScreenStyles'; 
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

const CodeScreen = () => {
  const [confirmationCode, setConfirmationCode] = useState(['', '', '', '', '', '']);
  const navigation = useNavigation();
  const route = useRoute();


  const {username, password} = route.params;

  const handleButtonClick = () => {
    const codeString = confirmationCode.join('');
    
    
    axios.patch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/auth/hu-tp-02', {
      username,
      confirmationCode: codeString,
      newPassword: password,
    })
    .then(response => {
      console.log('Respuesta completa de la API:', response);
      console.log('Datos de la API:', response.data);
      
      if (response.data.message === 'Código de confirmación válido.') {
        
        navigation.navigate('TipoClienteScreen');
      } else {
        
        Alert.alert('Error', 'Código de confirmación inválido o expirado.');
      }
    })
    .catch(error => {
      console.error('Error en la API:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'Ocurrió un error. Por favor, intenta nuevamente.');
    });
    //estp permite seguir a la siguiente sin validar
    navigation.navigate('TipoClienteScreen');
  };
  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <Image
          source={require('../assets/background.png')} 
          style={styles.image} 
        />
      </View>
      <View style={styles.rightColumn}>
        <Text style={styles.title}>REGISTRO DEL CLIENTE</Text>
        <Text style={styles.description}>
          Hemos enviado un código de 6 dígitos a tu correo y teléfono, introduce el código para validarlo
        </Text>
        <View style={styles.codeContainer}>
          {confirmationCode.map((value, index) => (
            <TextInput
              key={index}
              value={value}
              onChangeText={(text) => {
                const newCode = [...confirmationCode];
                newCode[index] = text;
                setConfirmationCode(newCode);
              }}
              style={styles.codeInput}
              keyboardType="numeric"
              maxLength={1}
            />
          ))}
        </View>
        <Text style={styles.resendCode}>Reenviar código</Text>
        <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CodeScreen;
