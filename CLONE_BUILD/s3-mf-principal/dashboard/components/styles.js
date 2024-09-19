import { StyleSheet } from "react-native-web";
export default StyleSheet.create({
  container: {
    flex: 1,
  
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#000000',
  },
  navbarText: {
    fontSize: 20,
    color: '#fff',
  },
  //Tamaño logo FIA FIT
  logo: {
    width: 300,
   height: 110,
   resizeMode: 'contain',
  },
  
  //Estilo fondo inicio de sesion
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  // Cuadro que envuelve el inicio de sesion
  loginBox: {
  alignSelf: 'center',
  margin: ' auto',
  position: 'absolute',
  top: '70px',
  left: '41%',
  borderRadius: 10,
  backgroundColor: 'rgba(243, 244, 247, 0.8)',
  maxWidth: '100%',  
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: 50,
  boxSizing: 'border-box',
  gap: 'var(--gap-8xl)',
  zIndex: 50
  
    
  },
  //Estilo Tituos de iniciar sesion
  loginTitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold', // Negrita
    fontFamily: 'Times New Roman, Times, serif', // Fuente Times New Roman
    color: '#8c1c13', // Color de la letra (negro en este caso)
  },

  loginTitle2: {
    fontSize: 12,
    marginBottom: 5,
    textAlign: 'center',
    fontWeight: 'bold', // Negrita
    fontFamily: 'Times New Roman, Times, serif' // Fuente Times New Roman
  },

  input: {
    height: 40,
    backgroundColor: '#2f2e2e', 
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
    color: '#fff', 
  },
  button: {
    margin: 8,
    backgroundColor: '#B5121C',
    padding: 10,
    borderRadius: 5,
    
  },
  buttonText: {
    
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    
  },
  linkText: {
    color: '#000',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold', // Negrita
    fontFamily: 'Times New Roman, Times, serif' // Fuente Times New Roman
  },
  registerText: {
    color: '#ff0000', 
    fontWeight: 'bold', // Negrita
    fontFamily: 'Times New Roman, Times, serif' // Fuente Times New Roman
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
  },
  copyright: {
    color: 'white',
    fontSize: 14,
  },
  socialIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15, // Espacio entre los iconos
  },
});