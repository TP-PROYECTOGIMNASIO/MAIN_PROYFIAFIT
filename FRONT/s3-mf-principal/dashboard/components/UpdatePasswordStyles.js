import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f7',
    paddingHorizontal: 20,
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center', // Centra horizontalmente
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%', // Ajustamos el ancho para que sea responsive
    maxWidth: 400, // Tamaño máximo para pantallas grandes
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8c1c13',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: '500',
    color: '#62060b',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 12,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 18,
    color: '#4b4f57',
  },
  button: {
    backgroundColor: '#b5121c',
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    fontSize: 20,
    fontWeight: '500',
    marginTop: 20,
  },
  message: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  successMessage: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  errorMessage: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
});

export default styles;
