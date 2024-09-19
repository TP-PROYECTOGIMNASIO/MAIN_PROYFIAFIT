import { StyleSheet, Dimensions } from 'react-native'; // Importa desde 'react-native'
const { width, height } = Dimensions.get('window'); // Obtén las dimensiones de la pantalla

export default StyleSheet.create({
  background: {
   //flex: 1,

    width: width, // Usa las dimensiones obtenidas
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    flex: 1,
    flexDirection: 'row', // Alinea los elementos en una fila (izquierda y derecha)
  },


  resetbox: {
    width: '85%',  // Aumenta el ancho a un 85% de su sección
    maxWidth: 550, // Incrementa el ancho máximo
    padding: 40,   // Aumenta el padding interno
    backgroundColor: 'rgba(243, 244, 247, 0.9)',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,

  },

  leftSection: {
    width: '50%', // Ocupa el 50% del ancho de la pantalla
    justifyContent: 'center',
    alignItems: 'center',
  },

  rightSection: {
      width: '50%', // Ocupa el 50% del ancho de la pantalla
      justifyContent: 'center', // Centra verticalmente
      alignItems: 'center', // Centra horizontalmente
      backgroundColor: '#f2f2f2', // Color de fondo para diferenciar
  },

  backgroundImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#b5121c',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24,
    color: '#4B4F57',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    width: '70%',
    height: 45,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#DFE0E1',
    color: '#333',
    fontSize: 14,

  },
  button: {
    backgroundColor: '#b71c1c',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
    width: '40%', // Ajusta el ancho al 70% del contenedor padre
    maxWidth: 300, // Establece un ancho máximo fijo para el botón


  },
  buttonText: {
    color: '#F3F4F7',
    fontSize: 24,
    fontWeight: 'bold',

  },
  backLink: {
    color: '#000',
    fontSize: 14,
    marginTop: 10,
  },

  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    padding: 5,
    zIndex: 1,
  },

  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});