import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  leftColumn: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  rightColumn: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 16, 
    margin: 60,    
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Ajusta la imagen para que cubra el contenedor
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#B71C1C',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    width:'60%',
    color:'#4B4F57',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 20,
  },
  codeInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: 40,
    height:50,
    textAlign: 'center',
    fontSize: 18,
    marginHorizontal: 5,    
    backgroundColor: '#BDBDBD',
  },
  resendCode: {
    fontSize: 16,
    color: '#4B4F57',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#B71C1C',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
