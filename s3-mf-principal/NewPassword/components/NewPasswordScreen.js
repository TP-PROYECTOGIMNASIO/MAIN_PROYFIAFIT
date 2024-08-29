import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import styles from './styles';

const NewPasswordScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleConfirm = () => {
    // Lógica para confirmar restablecimiento de contraseña
    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Regresar</Text>
        </TouchableOpacity>

        <View style={styles.formContainer}>
          <Text style={styles.title}>RESTABLECER CONTRASEÑA</Text>
          <TextInput
            style={styles.input}
            placeholder="Escriba una nueva contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Vuelva a escribir la contraseña para confirmar"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleConfirm}>
            <Text style={styles.buttonText}>CONFIRMAR RESTABLECIMIENTO</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default NewPasswordScreen;
