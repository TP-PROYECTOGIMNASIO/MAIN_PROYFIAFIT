import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function PasswordCorrectScreen() {
  const navigation = useNavigation();
  
  const handleBack = () => {
    navigation.goBack(); // Retrocede a la pantalla anterior en la pila de navegación
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
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>

          <Text style={styles.title}>CONTRASEÑA RESTABLECIDA</Text>

          <Image
            source={require('../../public/icons8-marca-de-verificación-100.png')}
            style={styles.resetImage}
            resizeMode="contain"
          />
        <p></p>
          <Text style={styles.title2}>Su contraseña ha sido restablecida con éxito</Text>

        
          <p></p>
          <TouchableOpacity style={styles.button} onPress={handleBack}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
