import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Key, Lock, KeyRound } from 'lucide-react-native';
import styles from './UpdatePasswordStyles';
import { useRoute } from '@react-navigation/native';

export default function UpdatePassword() {
  const route = useRoute(); 
  const { role, username } = route.params || {}; 
  console.log('Username en UpdatePassword:', username);


  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [message, setMessage] = useState({ type: '', content: '' });

  const handlePasswordChange = (name, value) => {
    setPasswords({ ...passwords, [name]: value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwords.new !== passwords.confirm) {
      setMessage({ type: 'error', content: 'Las contraseñas no coinciden' });
      return;
    }

    try {
      // Configurar los parámetros de la solicitud
      const response = await fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/auth/HU-TP-88', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username, 
          newPassword: passwords.new,
        }),
      });

      if (response.ok) {
        setMessage({ type: 'success', content: 'Contraseña actualizada con éxito' });
        setPasswords({ current: '', new: '', confirm: '' });
      } else {
      
        const errorData = await response.json();
        setMessage({ type: 'error', content: `Error: ${errorData.message || 'No se pudo actualizar la contraseña'}` });
      }
    } catch (error) {
    
      setMessage({ type: 'error', content: `Error de red: ${error.message}` });
    }

    setTimeout(() => setMessage({ type: '', content: '' }), 3000);
  };

  return (
    <View style={styles.container}>
      {role && (
        <Text style={styles.title}>
          Bienvenido {role}
        </Text>
      )}

      <View style={styles.formContainer}>
        {message.content && (
          <View style={[styles.message, message.type === 'success' ? styles.successMessage : styles.errorMessage]}>
            <Text>{message.content}</Text>
          </View>
        )}

        <Text style={styles.title}>
          <Key style={styles.icon} size={24} />
          Cambiar Contraseña 
        </Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Contraseña Actual</Text>
          <View style={styles.inputContainer}>
            <KeyRound style={styles.icon} size={24} />
            <TextInput
              style={styles.input}
              secureTextEntry
              value={passwords.current}
              onChangeText={(value) => handlePasswordChange('current', value)}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nueva Contraseña</Text>
          <View style={styles.inputContainer}>
            <Lock style={styles.icon} size={24} />
            <TextInput
              style={styles.input}
              secureTextEntry
              value={passwords.new}
              onChangeText={(value) => handlePasswordChange('new', value)}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Confirmar Nueva Contraseña</Text>
          <View style={styles.inputContainer}>
            <Lock style={styles.icon} size={24} />
            <TextInput
              style={styles.input}
              secureTextEntry
              value={passwords.confirm}
              onChangeText={(value) => handlePasswordChange('confirm', value)}
            />
          </View>
        </View>

        <TouchableOpacity onPress={handlePasswordSubmit}>
          <Text style={styles.button}>Cambiar Contraseña</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
