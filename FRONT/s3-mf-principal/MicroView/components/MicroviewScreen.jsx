import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Asegúrate de importar el ícono que deseas usar

export default function MicroviewScreen() {
  const route = useRoute();
  const { role, username, token } = route.params;
  const navigation = useNavigation();

  var urlNew =""
  if(role === "admin"){
    urlNew = `https://d9cbdrt9qxc6x.cloudfront.net?role=${role}&token=${token}&username=${username}`;
    //urlNew = `http://localhost:5173?role=${role}&token=${token}&username=${username}`;

  }else if(role ==="cliente"){
    urlNew = `https://d28sl9jcsu2dh.cloudfront.net?role=${role}&token=${token}&username=${username}`;
    //urlNew = `http://localhost:5173?role=${role}&token=${token}&username=${username}`;
  }else if(role==='entrenador'){
    urlNew = `https://dvnm61x8t41e0.cloudfront.net?role=${role}&token=${token}&username=${username}`;
    //urlNew = `http://localhost:5173?role=${role}&token=${token}&username=${username}`;
  }else if(role==='cliente_libre'){
    urlNew = `https://d28sl9jcsu2dh.cloudfront.net?role=${role}&token=${token}&username=${username}`;
    //urlNew = `http://localhost:5173?role=${role}&token=${token}&username=${username}`;

  }else if(role==='instructor'){
    urlNew = `https://d3matswszdb8p0.cloudfront.net?role=${role}&token=${token}&username=${username}`;
    //urlNew = `http://localhost:5173?role=${role}&token=${token}&username=${username}`;

  }else if(role==='manager'){
    urlNew = `https://dlfxmk04c8l4u.cloudfront.net?role=${role}&token=${token}&username=${username}`;
    //urlNew = `http://localhost:5173?role=${role}&token=${token}&username=${username}`;

  }else if(role ==='encargado'){
    urlNew = `https://d33a2p3oofplz1.cloudfront.net?role=${role}&token=${token}&username=${username}`;
    //urlNew = `http://localhost:5173?role=${role}&token=${token}&username=${username}`;

  }else if(role ==='encargado_eventos'){
    urlNew = `https://d33a2p3oofplz1.cloudfront.net?role=${role}&token=${token}&username=${username}`;
    //urlNew = `http://localhost:5173?role=${role}&token=${token}&username=${username}`;

  }else if(role ==='encargado_gimnasios'){
    urlNew = `https://d33a2p3oofplz1.cloudfront.net?role=${role}&token=${token}&username=${username}`;
    //urlNew = `http://localhost:5173?role=${role}&token=${token}&username=${username}`;

  }else if(role==='fisioterapeuta'){
    urlNew = `https://d1f9oglz3r6l8a.cloudfront.net?role=${role}&token=${token}&username=${username}`;
    //urlNew = `http://localhost:5173?role=${role}&token=${token}&username=${username}`;

  }else if(role==='nutricionista'){
    urlNew = `https://d27br7ner8n8n5.cloudfront.net?role=${role}&token=${token}&username=${username}`;
    //urlNew = `http://localhost:5173?role=${role}&token=${token}&username=${username}`;
  }else if(role==='recepcionista'){
    urlNew = `https://d2ts7snh3o8l3c.cloudfront.net?role=${role}&token=${token}&username=${username}`;
    //urlNew = `http://localhost:5173?role=${role}&token=${token}&username=${username}`;
  }

  

  const handleNavigateToDashboard = () => {
    navigation.navigate('Dashboard', { role: role, token: token, username: username });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleNavigateToDashboard}>
        <Icon name="arrow-back" size={24} color="black" /> {/* Cambia el nombre del ícono según sea necesario */}
        <Text style={styles.backButtonText}> Dashboard</Text>
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
    flexDirection: 'row', // Asegúrate de que el botón se comporte como un contenedor flex
    alignItems: 'center', // Centra verticalmente los elementos dentro del botón
  },
  backButtonText: {
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 5, // Agrega un margen entre el ícono y el texto
  },
});
