import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function VerificationCodeScreen({ route }) {
  const navigation = useNavigation();
  const [code, setCode] = useState(['', '', '', '', '', '']); // Estado para los 6 dígitos del código de verificación

  const username = route?.params?.username || ''; 

  const handleSubmit = () => {
    const confirmationCode = code.join('');
    const params = {
      username, 
      confirmationCode
    };

    navigation.navigate('NewPasswordScreen', params);
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
        <View style={styles.verificationbox}>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>

          <Text style={styles.title}>RESTABLECER CONTRASEÑA</Text>
          <Text style={[styles.instructions, { marginBottom: 30 }]}>
            Hemos enviado un código de 6 dígitos a tu correo y teléfono, introduce el código para cambiar la contraseña
          </Text>
          
          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <TextInput 
                key={index}
                style={styles.codeInput} 
                keyboardType="number-pad" 
                maxLength={1} 
                placeholderTextColor="#000"
                value={digit}
                onChangeText={text => {
                  const newCode = [...code];
                  newCode[index] = text;
                  setCode(newCode);
                }}
              />
            ))}
          </View>
          <TouchableOpacity onPress={() => {/* Lógica para reenviar código */}}>
            <Text style={styles.resendText}>Reenviar Código</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>SIGUIENTE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};