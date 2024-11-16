import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ClienteRegularScreen = () => {
  const [showPasarellaPago, setShowPasarellaPago] = useState(false); 
  const navigation = useNavigation();


  const [membresia, setMembresia] = useState('');
  const [descripcion, setDescripcion] = useState()
  const [montoInscripcion, setMontoInscripcion] = useState(0);
  const [montoPrecio, setMontoPrecio] = useState(0);
  
  const [isSelectedBasic, setIsSelectedBasic] = useState(false);
  const [isSelectedPro, setIsSelectedPro] = useState(false);


  // Función para manejar la navegación a la siguiente pantalla
  const handleOpenPayment = () => {
    if (membresia) {
      navigation.navigate('ClienteRegular2Screen', { plan: membresia, detalle:descripcion, inscripcion: montoInscripcion, precio: montoPrecio });
    } else {
      alert('Por favor selecciona un plan de membresía');
    }
  };


  const handleClosePayment = () => {
    setShowPasarellaPago(false);
  };

    // Manejo de la selección del checkbox pro
    const toggleCheckboxPro = () => {
      setIsSelectedPro(!isSelectedPro);
      if (!isSelectedPro) {
        setMembresia('Membresía Pro');
        setDescripcion('Este es el pan de membresia pro');
        setMontoInscripcion(70.00); // Asignar monto de inscripción
        setMontoPrecio(150.00); // Asignar monto de precio
        setIsSelectedBasic(false); // Deseleccionar Básico si se selecciona Pro
      } else {
        // Si se deselecciona el checkbox pro, limpiar valores
        setMembresia('');
        setDescripcion('');
        setMontoInscripcion(0);
        setMontoPrecio(0);
      }
    };

  const toggleCheckboxBasic = () => {
    setIsSelectedBasic(!isSelectedBasic);
    if (!isSelectedBasic) {
      setMembresia('Membresía Básica');
      setDescripcion('Este es el pan de membresia basica');
      setMontoInscripcion(50.00); // Asignar monto de inscripción
      setMontoPrecio(100.00); // Asignar monto de precio
      setIsSelectedPro(false); // Deseleccionar Pro si se selecciona Básico
    } else {
      // Si se deselecciona el checkbox básico, limpiar valores
      setMembresia('');
      setDescripcion('');
      setMontoInscripcion(0);
      setMontoPrecio(0);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.underline} />
      <ScrollView contentContainerStyle={styles.scrollableContainer}>
        <View style={styles.form}>
          <View style={styles.firstLine}>
            <Text style={styles.label}>Selecciona tu plan de Membresía</Text>
            <TouchableOpacity style={styles.button} onPress={handleOpenPayment}>
              <Text style={styles.buttonText}>Siguiente</Text>
            </TouchableOpacity>
            {showPasarellaPago && (
              <Modal
                visible={showPasarellaPago}
                transparent={true}
                animationType="slide"
                onRequestClose={handleClosePayment}
              >
                <PasarellaPago onClose={handleClosePayment} />
              </Modal>
            )}
          </View>
          <View style={styles.checkboxContainer}>
            <View style={styles.checkboxItem}>
              <TouchableOpacity
                style={[styles.checkbox, isSelectedBasic && styles.checkboxSelected]}
                onPress={toggleCheckboxBasic}
              />
              <View>
                <Text style={styles.checkboxTitulo}>Membresía Básica</Text>
                <Text style={styles.checkboxLabel}>Descripción</Text>
              </View>
              <View>
                <Text style={styles.checkboxTitulo}>Inscripción</Text>
                <Text style={styles.checkboxLabel}>S/.50.00</Text>
              </View>
              <View>
                <Text style={styles.checkboxTitulo}>Precio</Text>
                <Text style={styles.checkboxLabel}>S/.100.00</Text>
              </View>
            </View>
            <View style={styles.checkboxItem}>
              <TouchableOpacity
                style={[styles.checkbox, isSelectedPro && styles.checkboxSelected]}
                onPress={toggleCheckboxPro}
              />
              <View>
                <Text style={styles.checkboxTitulo}>Membresía Pro</Text>
                <Text style={styles.checkboxLabel}>Descripción</Text>
              </View>
              <View>
                <Text style={styles.checkboxTitulo}>Inscripción</Text>
                <Text style={styles.checkboxLabel}>S/.70.00</Text>
              </View>
              <View>
                <Text style={styles.checkboxTitulo}>Precio</Text>
                <Text style={styles.checkboxLabel}>S/.150.00</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '80%',
    marginTop: 50,
    marginBottom: 50,
    alignSelf: 'center',
  },
  underline: {
    height: 50,
    backgroundColor: '#B71C1C',
    width: '100%',
  },
  scrollableContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  form: {
    marginVertical: 20,
  },
  firstLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 58,
  },
  button: {
    backgroundColor: '#B71C1C',
    marginRight: 60,
    fontSize: 20,
    width: 120,
    height: 38,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    paddingTop: 5,
  },
  checkboxContainer: {
    flexDirection: 'column',
    padding: 10,
    marginLeft: 50,
    marginRight: 50,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#D9D9D9',
    height: 100,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    backgroundColor: '#fff',
    borderColor: 'B71C1C',
    marginRight: 10,
    marginLeft: 45,
    borderRadius: 5,
  },
  checkboxSelected: {
    backgroundColor: '#B71C1C',
  },
  checkboxTitulo: {
    fontSize: 20,
    paddingLeft: 150,
    paddingBottom: 15,
  },
  checkboxLabel: {
    fontSize: 18,
    paddingLeft: 170,
  },
});

export default ClienteRegularScreen;
