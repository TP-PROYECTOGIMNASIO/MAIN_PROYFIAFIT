import { StyleSheet, Dimensions } from 'react-native'; // Importa desde 'react-native'
const { width, height } = Dimensions.get('window'); // Obtén las dimensiones de la pantalla

export default StyleSheet.create({
  background: {
    flex: 1,
    
    width: width, // Usa las dimensiones obtenidas
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(243, 244, 247, 0.8)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#8c1c13',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: 250,
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    width: 250,
    height: 40,
    backgroundColor: '#B5121C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backLink: {
    color: '#000',
    fontSize: 14,
    marginTop: 10,
  },
});
