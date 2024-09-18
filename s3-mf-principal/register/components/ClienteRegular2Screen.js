import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, CheckBox } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import PasarellaPago from './PaymentMethods'; 

const ClienteRegular2Screen = ({ route, navigation }) => {
  const { plan, detalle, inscripcion, precio, total } = route.params || {};
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
    window.location.href = '/aa.html?precio=' + total + '&descripcion='+plan ; 
  };

  const handleClosePayment = () => {
    setShowWebView(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.underline} />
        <View style={styles.detalleplan}>
          <View style={styles.column}>
            <Text style={styles.title}>{plan}</Text>
            <Text style={styles.contenido}>{detalle}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.title}>Inscripción</Text>
            <Text style={styles.contenido}>S/.{inscripcion}.00</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.title}>Precio</Text>
            <Text style={styles.contenido}>S/.{precio}.00</Text>
          </View>
        </View>

        {/* Dropdowns en una sola fila */}
        <View style={styles.dropdownRow}>
          <View style={[styles.pickerWrapper, { zIndex: TipoOpen ? 2000 : 1 }]}>
            <Text style={styles.inputLabel}>Tipo de Membresía</Text>
            <DropDownPicker
              open={TipoOpen}
              setOpen={setTipoOpen}
              items={[
                /* { label: 'Seleccione', value: 0 },
                { label: 'Membresía Básica', value: 6 },
                { label: 'Membresía Pro', value: 7 }, */
              ]}
              value={Tipo}
              setValue={setTipo}
              containerStyle={styles.pickerContainer}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              dropDownContainerStyle={[styles.dropDown]}
              arrowStyle={styles.dropDownArrow}
              onChangeValue={item => setTipo(item)}
            />
          </View>

          <View style={[styles.pickerWrapper, { zIndex: FormaPagoOpen ? 2000 : 1 }]}>
            <Text style={styles.inputLabel}>Forma de Pago</Text>
            <DropDownPicker
              open={FormaPagoOpen}
              setOpen={setFormaPagoOpen}
              items={[
                { label: 'Tarjeta de Crédito', value: 'tarjeta_credito' },
              ]}
              value={FormaPago}
              setValue={setFormaPago}
              containerStyle={styles.pickerContainer}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              dropDownContainerStyle={[styles.dropDown, { zIndex: 2000 }]}
              arrowStyle={styles.dropDownArrow}
              onChangeValue={item => setFormaPago(item)}
            />
          </View>

          <View style={[styles.pickerWrapper, { zIndex: SedeOpen ? 2000 : 1 }]}>
            <Text style={styles.inputLabel}>Seleccionar Sede</Text>
            <DropDownPicker
              open={SedeOpen}
              setOpen={setSedeOpen}
              items={[
                { label: 'Sede 1', value: 'sede1' },
                /* { label: 'Sede 2', value: 'sede2' },
                { label: 'Sede 3', value: 'sede3' }, */
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
  contenido:{
    fontSize:20,
    paddingTop:10,
  },
  form:{
    backgroundColor:'#ffff',
    width:'80%',
    alignSelf:'center',
    flex:1,
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
    marginLeft:20,
    marginRight:20,
  },
  pickerWrapper: {
    flex: 1,
    marginRight: 10, // Espacio entre dropdowns
    position:'relative',
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
    position:'absolute',
    top:'100%',
    //zIndex:1000,
  },
  dropDownArrow: {
    color: '#B71C1C',
  },
  checkboxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginLeft:80,
    marginRight:100,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:100,
    position:'unset',
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
    width:150,
    marginLeft:600,
    marginTop:20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title2:{
    fontSize: 26, 
    fontWeight: 'bold',
    color:'#B71C1C',
    paddingLeft:50,
    position:'unset',
  }
});

export default ClienteRegular2Screen;
