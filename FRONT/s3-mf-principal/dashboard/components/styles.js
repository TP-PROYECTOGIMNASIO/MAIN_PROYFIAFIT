// styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Permite que el contenido se expanda
    alignItems: 'center', // Centra los elementos horizontalmente
    paddingBottom: 20, // Espacio inferior para el desplazamiento
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10, 
    marginTop: 10, 
    backgroundColor: '#f0f0f0',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-start', // Asegúrate de que el contenido esté al principio
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 0, // Mantener un espacio pequeño
    marginTop: 50,
    color: '#333',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center', // Centra las tarjetas horizontalmente

    width: '100%',
    marginTop: 50, // Añadir margen superior para separar del título
  },
  card: {
    height: 400, // Mantén el tamaño uniforme para todas las tarjetas
    backgroundColor: '#d3d3d3',
    width: '30%',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-start', // Alinea el contenido verticalmente al inicio
    paddingVertical: 10,
    paddingHorizontal: 10, // Agrega un poco de padding horizontal
  },
  cardHeader: {
    height: 60,
    width: '100%',
    backgroundColor: '#B5121C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: '100%', // Ajusta el ancho de la imagen al 100%
    height: 200, // Ajusta la altura de la imagen
    resizeMode: 'cover',
    marginBottom: 10, // Espacio entre la imagen y el título
  },
  
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 0, // Establecer margen vertical en 0
    marginTop: 10, // Agrega un poco de margen superior para el título
    textAlign: 'center',
    color: '#333', // Color del texto del título
  },
  
  cardButton: {
    backgroundColor: '#B5121C',
    borderRadius: 4,
    paddingVertical: 8, // Ajustar el padding vertical
    paddingHorizontal: 20,
    marginTop: 10, // Espaciado entre el botón y el título
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
