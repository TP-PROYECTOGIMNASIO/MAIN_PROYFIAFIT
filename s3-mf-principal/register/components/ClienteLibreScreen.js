import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ClienteLibreScreen = () => {
  const { plan, detalle, inscripcion, precio } = route.params || {};
  const [showPasarellaPago, setShowPasarellaPago] = useState(false);
  const [Tipo, setTipo] = useState();
  const [FormaPago, setFormaPago] = useState();
  const [Sede, setSede] = useState();

  const [boletaChecked, setBoletaChecked] = useState(false);
  const [facturaChecked, setFacturaChecked] = useState(false);
  const [boletaText, setBoletaText] = useState('');
  const [facturaText, setFacturaText] = useState('');

  const [TipoOpen, setTipoOpen] = useState(false);
  const [FormaPagoOpen, setFormaPagoOpen] = useState(false);
  const [SedeOpen, setSedeOpen] = useState(false);

  const handleOpenPayment = () => {
    setShowPasarellaPago(true);
  };

  const redirectToPage = () => {
    window.location.href = '/aa.html'; 
  };

  const handleClosePayment = () => {
    setShowWebView(false);
  };

  return (
    <View style={styles.container}>
      
      {/* <View style={styles.form}>
        <Text style={styles.title}>Pase Libre</Text>
        <Text style={styles.subtitle}>Descripción</Text>
        <Text>Seleccionar fecha</Text>
        <TextInput style={styles.input} placeholder="Fecha" />
        <Text>Seleccionar sede</Text>
        <TextInput style={styles.input} placeholder="Sede" />
        <Button title="Siguiente" onPress={handleOpenPayment} />
      </View>
      <Modal
        transparent={true}
        visible={showPasarellaPago}
        animationType="slide"
        onRequestClose={handleClosePayment}
      >
        <PasarellaPago onClose={handleClosePayment} />
      </Modal> */}
    </View>
  );
};

/* const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { alignItems: 'center', marginBottom: 20 },
  logo: { fontSize: 24, fontWeight: 'bold' },
  logoImage: { width: 100, height: 100 },
  form: { flex: 1 },
  title: { fontSize: 20, fontWeight: 'bold' },
  subtitle: { fontSize: 16, color: 'grey' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, marginVertical: 10 },
}); */

export default ClienteLibreScreen;
