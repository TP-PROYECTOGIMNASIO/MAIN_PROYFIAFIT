import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, CheckBox, Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import PasarellaPago from './PaymentMethods'; 
import DateTimePicker from '@react-native-community/datetimepicker';

const ClienteLibreScreen = () => {
  const [showPasarellaPago, setShowPasarellaPago] = useState(false);
  const [Sede, setSede] = useState(null);
  const [boletaChecked, setBoletaChecked] = useState(false);
  const [facturaChecked, setFacturaChecked] = useState(false);
  const [boletaText, setBoletaText] = useState('');
  const [facturaText, setFacturaText] = useState('');
  const [SedeOpen, setSedeOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const precios = {
    sede1: 20.00,
    sede2: 15.00,
    sede3: 10.00,
  };

  const onChange = (event, selectedDate) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      setShowDatePicker(false); 
    } else if (event.type === 'dismissed') {
      setShowDatePicker(false);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleOpenPayment = () => {
    setShowPasarellaPago(true);
  };

  const redirectToPage = () => {
    window.location.href = '/aa.html'; 
  };

  const handleClosePayment = () => {
    setShowWebView(false);
  };

  // Obtener el precio basado en la sede seleccionada
  const precioSeleccionado = Sede ? precios[Sede] : 0;

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.underline} />
        <View style={styles.detalleplan}>
          <View style={styles.column}>
            <Text style={styles.title}>Pase Libre</Text>
            <Text style={styles.contenido}>Detalle</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.title}>Precio</Text>
            <Text style={styles.contenido}>S/{precioSeleccionado.toFixed(2)}</Text> {/* Mostrar precio */}
          </View>
        </View>
        <View style={styles.dropdownRow}>
          <View style={styles.descripcion}>Descripcion</View>
          <View style={styles.nota}>El precio cambiará según la opción seleccionada</View>
        </View>

        {/* Dropdowns en una sola fila */}
        <View style={styles.dropdownRow}>
          <View style={styles.fechas}>
            <Text style={styles.inputLabel}>Fecha de Visita</Text>
            <TouchableOpacity style={styles.datePickerButton} onPress={showDatepicker}>
              <Text style={styles.selectedDate}>
                {date ? date.toLocaleDateString() : 'Seleccionar fecha'}  {/* Formato de fecha */}
              </Text>    
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date || new Date()}
                mode="date" // o "time" o "datetime"
                is24Hour={true} // Muestra la hora en formato 24 horas
                onChange={onChange}
              />
            )}
          </View>

          <View style={[styles.pickerWrapper, { zIndex: SedeOpen ? 2000 : 1 }]}>
            <Text style={styles.inputLabel}>Seleccionar Sede</Text>
            <DropDownPicker
              open={SedeOpen}
              setOpen={setSedeOpen}
              items={[
                { label: 'Sede 1', value: 'sede1' },
                { label: 'Sede 2', value: 'sede2' },
                { label: 'Sede 3', value: 'sede3' },
              ]}
              value={Sede}
              setValue={setSede}
              containerStyle={styles.pickerContainer}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              dropDownContainerStyle={[styles.dropDown, { zIndex: 2000 }]}
              arrowStyle={styles.dropDownArrow}
              onChangeValue={item => setSede(item)}
            />
          </View>
        </View>

        <Text style={styles.title2}>Comprobante de Pago:</Text>

        {/* Checkbox row */}
        <View style={styles.checkboxRow}>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={boletaChecked}
              onValueChange={setBoletaChecked}
            />
            <Text style={styles.checkboxLabel}>Boleta</Text>
            <TextInput
              style={styles.textInput}
              placeholder="RUC/DNI"
              value={boletaText}
              onChangeText={setBoletaText}
              editable={boletaChecked}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={facturaChecked}
              onValueChange={setFacturaChecked}
            />
            <Text style={styles.checkboxLabel}>Factura</Text>
            <TextInput
              style={styles.textInput}
              placeholder="RUC"
              value={facturaText}
              onChangeText={setFacturaText}
              editable={facturaChecked}
            />
          </View>
        </View>
        <View style={styles.underline2} />
      </View>

      <TouchableOpacity style={styles.button} onPress={redirectToPage}>
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={showPasarellaPago}
        animationType="slide"
        onRequestClose={handleClosePayment}
      >
        <PasarellaPago onClose={handleClosePayment} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    overflow: 'visible', 
  },
  title: { 
    fontSize: 26, 
    fontWeight: 'bold',
    color:'#B71C1C',
  },
  contenido: {
    fontSize: 20,
    paddingTop: 10,
  },
  form: {
    backgroundColor: '#ffff',
    width: '80%',
    alignSelf: 'center',
    flex: 1,
  },
  underline: {
    height: 50,
    backgroundColor: '#B71C1C',
    width: '100%',
  },
  underline2: {
    height: 50,
    backgroundColor: '#ffff',
    width: '100%',
  },
  detalleplan: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  column: {
    flex: 1,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  dropdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
  },
  fechas: {
    flex: 1,
    marginRight: 10,
  },
  pickerWrapper: {
    flex: 1,
    position: 'relative',
    zIndex: 2000, // Asegura que el dropdown esté en el frente
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 15,
  },
  picker: {
    height: 40,
    borderColor: '#BDBDBD',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#F5F5F5',
  },
  pickerItem: {
    justifyContent: 'center',
  },
  dropDown: {
    backgroundColor: '#F5F5F5',
    borderColor: '#BDBDBD',
    borderWidth: 1,
    borderRadius: 5,
    position: 'absolute',
    top: '100%',
    zIndex: 1000,
  },
  dropDownArrow: {
    color: '#B71C1C',
  },
  checkboxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginLeft: 80,
    marginRight: 100,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginHorizontal: 10,
  },
  textInput: {
    borderColor: '#BDBDBD',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    marginLeft: 10,
    width: 250,
  },
  button: {
    backgroundColor: '#B71C1C',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  selectedDate: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    borderColor: '#BDBDBD',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
  },
});

export default ClienteLibreScreen;
