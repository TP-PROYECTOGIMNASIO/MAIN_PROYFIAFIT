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
    urlNew = "https://d9cbdrt9qxc6x.cloudfront.net";

  }else if(role ==="cliente"){
    urlNew = "https://d28sl9jcsu2dh.cloudfront.net/";
  }else if(role==='entrenador'){
    urlNew = "https://dvnm61x8t41e0.cloudfront.net/";
  }else if(role==='cliente_libre'){
    urlNew = "https://d28sl9jcsu2dh.cloudfront.net/";

  }else if(role==='instructor'){
    urlNew = "https://d3matswszdb8p0.cloudfront.net/";

  }else if(role==='manager'){
    urlNew = "https://dlfxmk04c8l4u.cloudfront.net";

  }else if(role ==='encargado'){
    urlNew = "https://d33a2p3oofplz1.cloudfront.net/";

  }else if(role==='fisioterapeuta'){
    urlNew = "https://d1f9oglz3r6l8a.cloudfront.net/";

  }else if(role==='nutricionista'){
    urlNew = "https://d27br7ner8n8n5.cloudfront.net/";

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
