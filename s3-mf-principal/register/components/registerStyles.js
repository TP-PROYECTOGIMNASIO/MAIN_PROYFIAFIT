import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  contentContainer: {
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  underlineprincipal: {
    height: 30,
    backgroundColor: '#B71C1C',
    width: '100%',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#B71C1C',  // Rojo
    marginBottom: 20,
  },
  formContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  inputWrapper: {
    width: '30%',  // Ajustado para 3 columnas
    margin: 15,
  },
  input: {
    height: 50,
    borderColor: '#BDBDBD',  // Color gris
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#F5F5F5',
  },
  inputlabel:{
    fontSize:18,
  },
  pickerContainer: {
    width: '100%',  // Ajustado para 3 columnas
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
  },
  dropDownArrow: {
    color: '#B71C1C',
  },
  underline: {
    height: 5,
    backgroundColor: '#B71C1C',
    marginTop: 20,
    marginBottom: 20,
  },
  registerButton: {
    width: '22%',
    backgroundColor: '#B71C1C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 5,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
