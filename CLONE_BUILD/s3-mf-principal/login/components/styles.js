import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // Alinea los elementos en una fila (izquierda y derecha)
  },
  leftSection: {
    width: '50%', // Ocupa el 50% del ancho de la pantalla
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  rightSection: {
    width: '50%', // Ocupa el 50% del ancho de la pantalla
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center', // Centra horizontalmente
    backgroundColor: '#f2f2f2', // Color de fondo para diferenciar
  },
  loginBox: {
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
  loginTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#b5121c',
    marginBottom: 15,
    textAlign: 'center',
  },
  loginTitle2: {
    fontSize: 24,
    color: '#4B4F57',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: '#DFE0E1',
    color: '#333',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#b71c1c',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
    width: '70%', // Ajusta el ancho al 70% del contenedor padre
    maxWidth: 300, // Establece un ancho máximo fijo para el botón
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

  buttonText: {
    color: '#F3F4F7',
    fontSize: 24,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#4B4F57',
    fontSize: 20,
    marginTop: 15,
    
  },
  linkText2: {
    color: '#4B4F57',
    fontSize: 20,
    marginTop: 15,
    textDecorationLine: 'underline',
  },
  registerText: {
    fontWeight: 'bold',
    color: '#b5121C',
  },

  resetImage: {
    width: 120, // Ajusta el ancho de la imagen
    height: 120, // Ajusta la altura de la imagen
  },
});
