import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import ModalLoading from '../components/ModalLoading';
import ModalSuccess from '../components/ModalSuccess';
import ModalError from '../components/ModalError';

// Coordenadas del gimnasio
const gymLatitude = -12.142037346806207;
const gymLongitude = -76.99589251328662;

const CheckInScreen = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isCheckInDone, setIsCheckInDone] = useState(false);

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

  // Función para manejar el Check-In
  const handleCheckIn = async () => {
    console.log('Intentando realizar el check-in...');
    
    // Solicitar permisos de ubicación
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMessage('Permiso de ubicación denegado');
      setError(true);
      return;
    }

    setLoading(true); // Establece loading solo después de que se concede el permiso

    // Obtener la ubicación actual
    let location;
    try {
      location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      console.log('Posición obtenida:', { latitude, longitude });

      // Calcular la distancia entre la ubicación actual y el gimnasio
      const distance = getDistanceFromLatLonInMeters(latitude, longitude, gymLatitude, gymLongitude);
      console.log('Distancia calculada:', distance);

      if (distance <= 15) {
        console.log('Dentro del rango de 15 metros, realizando el check-in...');

        // Llamada a la API usando fetch
        fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/check-in-empleados/hu-tp-09', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            employee_id: 1, // ID del empleado para pruebas
            latitude: latitude,
            longitude: longitude,
          }),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Respuesta del servidor:', data);
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
          console.error('Error al hacer la solicitud:', err);
          setLoading(false);
          setErrorMessage('No se pudo realizar el check-in. Intenta nuevamente.');
          setError(true);
        });
      } else {
        console.log('Fuera del rango permitido, check-in no realizado.');
        setLoading(false);
        setErrorMessage('No estás dentro del rango permitido para realizar el check-in (15 metros).');
        setError(true);
      }
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
      setLoading(false);
      setErrorMessage('No se pudo obtener la ubicación.');
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
