import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import ModalLoading from '../components/ModalLoading';
import ModalSuccess from '../components/ModalSuccess';
import ModalError from '../components/ModalError';
import { VITE_APP_API_URL_09, VITE_APP_API_URL_USERNAME, VITE_APP_API_URL_01 } from '@env';

const CheckInScreen = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isCheckInDone, setIsCheckInDone] = useState(false);
  const apiUrl09 = VITE_APP_API_URL_09;

  const apiUrlUSERNAME = VITE_APP_API_URL_USERNAME;

  const [user, setUser] = useState({});
   // Obtén los parámetros de la ruta
   const route = useRoute();
  const navigation = useNavigation();
  const { role, username, token } = route.params || {};
  console.log("Todos los parámetros en CheckInScreen en el principal:", window.location.search); // Verificar que todos los parámetros están presentes
  

  console.log("role recibido en CheckInScreen en el principal:", role);
  console.log("token recibido en CheckInScreen en el principal:", token);
  console.log("username recibido en CheckInScreen en el principal:", username);

  useEffect(() => {
    if (role && username && token) {
      console.log("Datos recibidos en CheckInScreen en el principal:", { role, token, username });
      fetchUserName();
    } else {
      console.error('No se recibieron datos de usuario en CheckInScreen en el principal');
    }
  }, [role, token, username]); // Dependencias del useEffect // Dependencia de `navigate` // Dependencia de `token` y `username` para volver a ejecutar si estos cambian

  const fetchUserName = async () => {
    try {
      const response = await fetch(`${apiUrlUSERNAME}?username=${username}`);

      if (!response.ok) {
        throw new Error("Error en la respuesta de la API");
      }

      const data = await response.json();
      console.log("Respuesta de la API USERNAME en CheckInScreen en el principal:", data);

      if (Array.isArray(data)) {
        if (data.length > 0) {
          setUser(data[0]);
        } else {
          console.error("El array está vacío");
          setUser({});
        }
      } else if (data && typeof data === "object") {
        setUser(data);
      } else {
        console.error("Formato inesperado en la respuesta de la API:", data);
        setUser({});
      }
    } catch (error) {
      console.error("Error al obtener la información del usuario", error);
    }
  };


  // Función para calcular la distancia entre dos coordenadas en metros
  const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radio de la Tierra en km
    const dLat = deg2rad(lat2 - lat1);  // Diferencia de latitud en radianes
    const dLon = deg2rad(lon2 - lon1);  // Diferencia de longitud en radianes
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceInKm = R * c; // Distancia en km
    return distanceInKm * 1000; // Convertir a metros
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  // Función para obtener las coordenadas de los gimnasios
  const fetchGymsCoordinates = async () => {
    try {
      console.log("Realizando solicitud a la API de gimnasios...");
      const response = await fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/check-in-empleados/hu-tp-09');
      
      if (!response.ok) {
        console.error(`Error en la respuesta de la API: ${response.status} - ${response.statusText}`);
        throw new Error(`Error en la API de gimnasios: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("Datos recibidos de la API de gimnasios:", data); // Verificar la estructura de la respuesta
      return Array.isArray(data) ? data : []; // Asegurarse de devolver un array
    } catch (error) {
      console.error("Error al obtener las coordenadas de los gimnasios:", error.message);
      throw new Error('No se pudo obtener las coordenadas de los gimnasios');
    }
  };

  // Función para manejar el Check-In
  const handleCheckIn = async () => {
    console.log('Intentando realizar el check-in...');
    
     // Verificar que el ID del usuario esté disponible
    if (!user || !user.id) {
      console.error('No se encontró el ID del usuario. No se puede proceder con el check-in.');
      setErrorMessage('Error al obtener los datos del usuario.');
      setError(true);
      return;
    }

    // Solicitar permisos de ubicación
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMessage('Permiso de ubicación denegado');
      console.log("Permiso de ubicación denegado por el usuario.");
      setError(true);
      return;
    }

    console.log("Permiso de ubicación concedido.");
    setLoading(true);

    try {
      // Obtener las coordenadas de los gimnasios
      const gyms = await fetchGymsCoordinates();
      
      // Verificar que gyms sea un array
      if (!Array.isArray(gyms) || gyms.length === 0) {
        throw new Error("La respuesta de gimnasios no es un array válido o está vacía.");
      }

      // Obtener la ubicación actual
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      console.log('Ubicación actual del usuario:', { latitude, longitude });

      // Verificar si el usuario está dentro de 15 metros de algún gimnasio
      const isWithinRange = gyms.some(gym => {
        const distance = getDistanceFromLatLonInMeters(latitude, longitude, gym.latitude, gym.longitude);
        console.log(`Distancia al gimnasio (${gym.latitude}, ${gym.longitude}):`, distance);
        return distance <= 15;
      });

      if (isWithinRange) {
        console.log('Dentro del rango de 15 metros de un gimnasio, procediendo con el check-in...');

        // Llamada a la API usando fetch para realizar el check-in
        fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/check-in-empleados/hu-tp-09', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            employee_id: 1, // user.id, Usa el ID del usuario aquí
            latitude: latitude,
            longitude: longitude,
          }),
        })
        .then(response => {
          if (!response.ok) {
            console.error(`Error en la respuesta de check-in: ${response.status} - ${response.statusText}`);
            throw new Error("No se pudo completar el check-in.");
          }
          return response.json();
        })
        .then(data => {
          console.log('Respuesta del servidor al realizar check-in:', data);
          setLoading(false);

          if (data.message === 'Check-in realizado exitosamente.') {
            setSuccess(true);
            setIsCheckInDone(true);  // Cambiar el estado del botón
          } else {
            setErrorMessage(data.message || 'Error al realizar el check-in.');
            setError(true);
          }
        })
        .catch(err => {
          console.error('Error al hacer la solicitud de check-in:', err);
          setLoading(false);
          setErrorMessage('No se pudo realizar el check-in. Intenta nuevamente.');
          setError(true);
        });
      } else {
        console.log('Fuera del rango permitido de los gimnasios, check-in no realizado.');
        setLoading(false);
        setErrorMessage('No estás dentro del rango permitido de 15 metros de ningún gimnasio.');
        setError(true);
      }
    } catch (error) {
      console.error('Error en el proceso de check-in:', error);
      setLoading(false);
      setErrorMessage(error.message);
      setError(true);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.checkInButton, { backgroundColor: isCheckInDone ? '#ac1d1d' : '#4b4f56' }]}
        onPress={handleCheckIn}
        disabled={loading} // Deshabilitar el botón mientras está cargando
      >
        <Text style={styles.buttonText}>
          {isCheckInDone ? 'Realizado' : 'Aun no realizado'}
        </Text>
      </TouchableOpacity>

      <ModalLoading isVisible={loading} />
      <ModalSuccess isVisible={success} onClose={() => setSuccess(false)} />
      <ModalError isVisible={error} onClose={() => setError(false)} errorMessage={errorMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkInButton: {
    padding: 15,
    borderRadius: 8,
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CheckInScreen;
