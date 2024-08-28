import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';


export default function ResetPasswordScreen(){
    const navigation = useNavigation();

  return (
    
      
    <ImageBackground source={require('../assets/background.png')} style={styles.background}>
         <View style={styles.container}>

        <Text style={styles.title}>RESTABLECER CONTRASEÑA</Text>
        
        <Text style={styles.subtitle}>Ingrese su usuario para restablecer contraseña</Text>
        
        <TextInput 
          //placeholder="Usuario" 
          style={styles.input} 
          placeholderTextColor="#000" 
        />
        
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('VerificationCode')}>
          <Text style={styles.buttonText}>SIGUIENTE</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backLink}>← Regresar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};