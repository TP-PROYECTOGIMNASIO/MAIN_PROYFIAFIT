import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function ResetPasswordScreen() {
  const navigation = useNavigation();
  
  const handleBack = () => {
    navigation.goBack(); // Retrocede a la pantalla anterior en la pila de navegación
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
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>

          <Text style={styles.loginTitle}>USUARIO O CONTRASEÑA INCORRECTA</Text>
          <p></p>
          <Image
            source={require('../../public/icons8-circled-x-96.png')}
            style={styles.resetImage}
            resizeMode="contain"
          />
          <p></p>
          <Text style={styles.loginTitle2}>Por favor volver a introducir los datos correctamente</Text>

        
          <p></p>
          <TouchableOpacity style={styles.button} onPress={handleBack}>
            <Text style={styles.buttonText}>VOLVER</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
