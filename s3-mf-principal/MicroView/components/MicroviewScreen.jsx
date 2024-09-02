import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

export default function MicroviewScreen() {
  const route = useRoute();
  const { urlMain } = route.params;
  const navigation = useNavigation();
  const aleatorio = Math.floor(Math.random() * (7 - 0 + 1)) + 0;
  const navegacion = [
    "administrador",
    "clientes",
    "encargado",
    "entrenador",
    "fisioterapeuta",
    "instructor",
    "manager",
    "nutricionista",
    "recepcionista"
  ];
  const urlNew = "https://s3-mf-" + navegacion[aleatorio] + ".netlify.app/";

  const handleNavigateToDashboard = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleNavigateToDashboard}>
        <Text style={styles.backButtonText}>← Regresar</Text>
      </TouchableOpacity>
      
      {Platform.OS === 'web' ? (
        <iframe 
          src={urlMain} 
          style={styles.webview} 
          title="Microview Web" 
        />
      ) : (
        <WebView
          source={{ uri: urlMain }}
          style={styles.webview}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,

  },
  backButton: {
    position: 'absolute',
    top: 200,
    left: 10,
    zIndex: 1,
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});
