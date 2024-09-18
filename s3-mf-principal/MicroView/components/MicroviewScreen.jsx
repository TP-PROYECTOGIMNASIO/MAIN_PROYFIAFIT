import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

export default function MicroviewScreen() {
  const route = useRoute();
  const { role } = route.params;
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
  var urlNew =""
  if(role === "admin"){
    urlNew = "https://s3-mf-administrador.netlify.app/";

  }else if(role ==="cliente"){
    urlNew = "https://s3-mf-clientes.netlify.app/";
  }else if(role==='entrenador'){
    urlNew = "https://s3-mf-entrenador.netlify.app/";
  }else if(role==='cliente_libre'){
    urlNew = "https://s3-mf-cliente_libre.netlify.app/";

  }else if(role==='instructor'){
    urlNew = "https://s3-mf-instructor.netlify.app/";

  }else if(role==='manager'){
    urlNew = "https://s3-mf-manager.netlify.app/";

  }else if(role ==='encargado'){
    urlNew = "https://s3-mf-encargado.netlify.app/";

  }else if(role==='fisioterapeuta'){
    urlNew = "https://s3-mf-fisioterapeuta.netlify.app/";

  }else if(role==='nutricionista'){
    urlNew = "https://s3-mf-nutricionista.netlify.app/";

  }
  const handleNavigateToDashboard = () => {
    navigation.navigate('Dashboard', { role: role });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleNavigateToDashboard}>
        <Text style={styles.backButtonText}>← Regresar</Text>
      </TouchableOpacity>
      
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
