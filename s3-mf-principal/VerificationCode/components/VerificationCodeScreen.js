import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function VerificationCodeScreen(){
  const navigation = useNavigation();
  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>RESTABLECER CONTRASEÑA</Text>
        <Text style={styles.instructions}>
          Hemos enviado un código de 6 dígitos a tu correo y teléfono, introduce el código para cambiar la contraseña
        </Text>
        
        <View style={styles.codeContainer}>
         
          <TextInput 
            style={styles.codeInput} 
            keyboardType="number-pad" 
            maxLength={1} 
            placeholderTextColor="#000"
          />
          <TextInput 
            style={styles.codeInput} 
            keyboardType="number-pad" 
            maxLength={1} 
            placeholderTextColor="#000"
          />
          <TextInput 
            style={styles.codeInput} 
            keyboardType="number-pad" 
            maxLength={1} 
            placeholderTextColor="#000"
          />
          <TextInput 
            style={styles.codeInput} 
            keyboardType="number-pad" 
            maxLength={1} 
            placeholderTextColor="#000"
          />
          <TextInput 
            style={styles.codeInput} 
            keyboardType="number-pad" 
            maxLength={1} 
            placeholderTextColor="#000"
          />
          <TextInput 
            style={styles.codeInput} 
            keyboardType="number-pad" 
            maxLength={1} 
            placeholderTextColor="#000"
          />
        </View>
        
        <TouchableOpacity 
          style={styles.button} onPress={() => navigation.navigate('NewPasswordScreen')}>
          <Text style={styles.buttonText}>SIGUIENTE</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

