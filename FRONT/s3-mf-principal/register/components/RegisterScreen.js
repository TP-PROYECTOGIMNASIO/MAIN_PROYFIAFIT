import React, { useState } from 'react';  
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'; 
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './registerStyles'; 
import axios from 'axios';
import Toast from 'react-native-toast-message';

const RegisterScreen = ({ navigation }) => {

  const [document, setDocument] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('')
  const [mail, setMail] = useState('');
  const [phone, setTelefono] = useState('');
  const [gender_id, setGenero] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState('');
  const [emergecy_contact, setContacto] = useState('');
  const [emergency_contact_phone_number, setTelContacto] = useState('');
  const [relacion, setRelacion] = useState('');
  const [code, setCode] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [postal_code, setPostalCode] = useState('');

  const [generoOpen, setGeneroOpen] = useState(false);
  const [relacionOpen, setRelacionOpen] = useState(false);
  
  const [usuario, setUsername] = useState('');

  
  const handleRegister = () => {
    const formData = new FormData();
  
    formData.append('document', document);
    formData.append('mail', mail);
    formData.append('phone', phone);
    formData.append('password', password);
    formData.append('photo', photo);
    formData.append('gender_id', gender_id);
    formData.append('code', 'ABC123');
    formData.append('city', 'Lima');
    formData.append('address', address);
    formData.append('country', 'Perú');
    formData.append('postal_code', '15001');
    formData.append('emergecy_contact', emergecy_contact);
    formData.append('emergency_contact_phone_number', emergency_contact_phone_number);
  
    axios.post('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/clientes/hu-tp-04', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log('Respuesta completa de la API:', response);
        console.log('Datos de la API:', response.data);
  
        if (response.data.message === 'Usuario creado exitosamente') {
          /* const decoded = decodeJWT(response.data.idToken);
          console.log(decoded); */
          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Registro Exitoso',
            text2: `Usuario creado: ${response.data.username}`,
          });
          setTimeout(() => {
            // La navegación debe estar aquí, dentro del bloque 'then'
            navigation.navigate('CodeScreen', {username: response.data.username, password: password});
          }, 2000);
        } else {
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Registro Fallido',
            text2: response.data.message || 'Error de validación',
          });
        }
      })
      .catch(error => {
        console.error('Error en la API:', error.response ? error.response.data : error.message);
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Registrado',
          text2: 'Ocurrió un error. Por favor, intenta nuevamente.',
        });
      });
  };
  


  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.underlineprincipal}></View>
      <View style={styles.container}>

        <Text style={styles.title}>REGISTRO DEL CLIENTE</Text>
        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputlabel}>Documento*</Text>
            <TextInput 
              value={document}  
              onChangeText={setDocument} 
              style={styles.input}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text  style={styles.inputlabel}>Nombre*</Text>
            <TextInput 
              value={nombre}  
              onChangeText={setNombre} 
              style={styles.input} 
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text  style={styles.inputlabel}>Apellido Paterno*</Text>
            <TextInput  
              value={apellidoPaterno}  
              onChangeText={setApellidoPaterno} 
              style={styles.input}            
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text  style={styles.inputlabel}>Apellido Materno*</Text>
            <TextInput  
              value={apellidoMaterno}  
              onChangeText={setApellidoMaterno}  
              style={styles.input}      
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text  style={styles.inputlabel}>Correo Electrónico*</Text>
            <TextInput 
              value={mail}  
              onChangeText={setMail} 
              style={styles.input}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text  style={styles.inputlabel}>Número de Teléfono*</Text>
            <TextInput 
              value={phone}  
              onChangeText={setTelefono} 
              style={styles.input}
            />
          </View>
          <View style={[styles.inputWrapper, { zIndex: generoOpen ? 5000 : 1 }]}>
            <Text  style={styles.inputlabel}>Género*</Text>
            <DropDownPicker
              open={generoOpen}
              setOpen={setGeneroOpen}
              items={[
                { label: 'Seleccione género', value: 0 },
                { label: 'Masculino', value: 6 },
                { label: 'Femenino', value: 7 },
              ]}
              value={gender_id}
              setValue={setGenero}
              containerStyle={[styles.pickerContainer]}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              dropDownContainerStyle={{ zIndex: 5000, elevation: 5 }}  // Elevación en Android
              arrowStyle={styles.dropDownArrow}
              onChangeValue={item => setGenero(item)}
            />
          </View>
         
          <View style={styles.inputWrapper}>
            <Text  style={styles.inputlabel}>Dirección</Text>
            <TextInput 
              value={address}  
              onChangeText={setAddress} 
              style={styles.input}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text  style={styles.inputlabel}>Adjuntar Imagen</Text>
            <TextInput 
              value={photo}  
              onChangeText={setPhoto}  
              style={styles.input}
            />
          </View> 
          <View style={styles.inputWrapper}>
            <Text  style={styles.inputlabel}>Crear Contraseña</Text>
            <TextInput 
              value={password}  
              onChangeText={setPassword}  
              style={styles.input}
              secureTextEntry={true} 
            />
          </View> 
        </View>
        <View style={styles.underline} />
        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <Text  style={styles.inputlabel}>Contacto de Emergencia*</Text>
            <TextInput 
              value={emergecy_contact} 
              onChangeText={setContacto} 
              style={styles.input} 
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text  style={styles.inputlabel}>Número de Teléfono*</Text>
            <TextInput 
              value={emergency_contact_phone_number} 
              onChangeText={setTelContacto} 
              style={styles.input} 
            />
          </View>
          <View style={[styles.inputWrapper, { zIndex: relacionOpen ? 2000 : 1 }]}>
            <Text  style={styles.inputlabel}>Tipo de Relación*</Text>
            <DropDownPicker
              open={relacionOpen}
              setOpen={setRelacionOpen}
              items={[
                { label: 'Seleccione tipo de relación', value: '' },
                { label: 'Familiar', value: 1 },
                { label: 'Amigo', value: 2 },
                { label: 'Comercial', value: 3 },
              ]}
              value={relacion}
              setValue={setRelacion}
              containerStyle={[styles.pickerContainer]}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              dropDownContainerStyle={{ zIndex: 2000, elevation: 5 }}
              arrowStyle={styles.dropDownArrow}
              onChangeValue={item => setRelacion(item)}
            />
          </View>        
        </View>
        <TouchableOpacity 
          style={styles.registerButton} 
          onPress={handleRegister}
        >
          <Text style={styles.registerButtonText}>SIGUIENTE</Text>
        </TouchableOpacity>
      </View>
      
    </ScrollView>
  );
};

export default RegisterScreen;

