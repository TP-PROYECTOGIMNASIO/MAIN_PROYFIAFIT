import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet,Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {WebView} from 'react-native-webview';

export default function MicroviewScreen() {
  const navigation = useNavigation();
  const aleatorio=Math.floor(Math.random() * (3 - 0 + 1)) + 0;
  const navegacion=["clientes","administrador","manager","recepcionista"]
  const urlNew="https://s3-mf-"+navegacion[aleatorio]

  const handleNavigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {Platform.OS === 'web' ? (
        <iframe 
          src={urlNew} 
          style={styles.webview} 
          title="Microview Web" 
        />
      ) : (
        <WebView
          source={{ uri: urlNew }}
          style={styles.webview}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingTop: 100,
  },
  text: {
      color: "white",
  },
  webview: {
      flex: 1,
  },
});