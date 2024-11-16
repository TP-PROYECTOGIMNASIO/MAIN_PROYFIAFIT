import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';
import { useNavigation, useIsFocused  } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({ username: '', role: '', token: '' });
  const [modalVisible, setModalVisible] = useState(false); // Estado para manejar el modal


  // Función para verificar autenticación
  const checkAuthentication = async () => {
    try {
      const [token, username, role] = await Promise.all([
        AsyncStorage.getItem('token'),
        AsyncStorage.getItem('username'),
        AsyncStorage.getItem('role'),
      ]);

      console.log('Verificando autenticación:', { token, username, role }); // Log para debug

      if (token && username && role) {
        setIsAuthenticated(true);
        setUserData({ username, role, token });
      } else {
        setIsAuthenticated(false);
        setUserData({ username: '', role: '', token: '' });
      }
    } catch (error) {
      console.error('Error al verificar la autenticación:', error);
    }
  };

  // Efecto para verificar autenticación cuando el componente se monta
  useEffect(() => {
    checkAuthentication();
  }, []);

  // Efecto para verificar autenticación cuando la pantalla está en foco
  useEffect(() => {
    if (isFocused) {
      checkAuthentication();
    }
  }, [isFocused]);

  // Efecto para escuchar cambios en AsyncStorage
  useEffect(() => {
    const listener = navigation.addListener('state', () => {
      checkAuthentication();
    });

    return () => {
      navigation.removeListener('state', listener);
    };
  }, [navigation]);

  const handleLogoPress = () => {
    if (isAuthenticated) {
      navigation.navigate('Dashboard', {
        role: userData.role,
        username: userData.username,
        token: userData.token,
      });
    } else {
      navigation.navigate('Login');
    }
  };

  const handleLogout = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem('token'),
        AsyncStorage.removeItem('username'),
        AsyncStorage.removeItem('role'),
      ]);
      setIsAuthenticated(false);
      setUserData({ username: '', role: '', token: '' });

      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleBackPress = () => {
    const currentRoute = navigation.getState().routes[navigation.getState().index];
  
    // Aquí puedes definir a qué pantalla quieres redirigir si el usuario está autenticado
    if (isAuthenticated) {
      // Ejemplo: redirigir al Dashboard si está autenticado
      navigation.navigate('Dashboard', {
        role: userData.role,
        username: userData.username,
        token: userData.token,
      });
    } else {
      navigation.goBack(); // Solo volver si no está autenticado
    }
  };
  

  const confirmLogout = () => {
    setModalVisible(true); // Muestra el modal al confirmar cerrar sesión
  };

  const handleConfirmLogout = () => {
    setModalVisible(false); // Cierra el modal
    handleLogout(); // Llama a la función de logout
  };

  const handleCancelLogout = () => {
    setModalVisible(false); // Cierra el modal sin hacer logout
  };

  // Agregamos un log para ver el estado actual
  console.log('Estado actual:', { isAuthenticated, userData });

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={handleLogoPress}>
        <Image 
          source={require('../login/assets/logoFondoNegro.png')} 
          style={styles.logo} 
        />
      </TouchableOpacity>
      
      <View style={styles.navbarOptions}>
      <TouchableOpacity onPress={handleBackPress}>
          <Text style={styles.backText}>Volver</Text>
        </TouchableOpacity>

        {isAuthenticated && (
          <TouchableOpacity onPress={confirmLogout}>
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Modal de confirmación */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={handleCancelLogout}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>¿Estás seguro de que deseas cerrar sesión?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmLogout}>
                <Text style={styles.buttonText}>Sí</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancelLogout}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
};

// Estilos del header
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: { 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    backgroundColor: '#fff',
  },
  navbarOptions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: 16,
    color: '#000000', // Color del texto de "Cerrar Sesión"
    marginLeft: 10,
  },
  logoutText: {
    fontSize: 16,
    color: '#B5121C', // Color del texto de "Cerrar Sesión"
    marginLeft: 10,
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
  },
  modalContent: {
    width: '30%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '75%',
  },
  confirmButton: {
    backgroundColor: '#B5121C', // Color verde para "Sí"
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#d3d3d3', // Color rojo para "No"
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default Header;
