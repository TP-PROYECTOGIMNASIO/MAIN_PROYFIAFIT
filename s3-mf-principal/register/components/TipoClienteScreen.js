import React from 'react'; 
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TipoClienteScreen = () => {
    const navigation = useNavigation();

    const handleButtonClick = (screenName) => {
        navigation.navigate(screenName);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonClick('ClienteRegularScreen')}>
                <View style={styles.underline} />
                <Image
                    source={require('../assets/clire.png')} 
                    style={styles.image}
                />
                <Text style={styles.buttonText}>CLIENTE REGULAR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonClick('ClienteLibreScreen')}>
            <View style={styles.underline} />
                <Image
                    source={require('../assets/clili.png')} 
                    style={styles.image}
                />
                <Text style={styles.buttonText}>CLIENTE LIBRE</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row', // Distribuye los botones en una fila
        justifyContent: 'center', // Centra los botones horizontalmente
        alignItems: 'center', // Centra los botones verticalmente
        paddingHorizontal: 16, // Espacio a los lados
    },
    button: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        marginHorizontal: 80, // Espacio entre los botones
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        width: 360, // Ajusta el ancho según sea necesario
        height: 380, // Ajusta la altura según sea necesario
    },
    underline:{
        width: '100%',
        backgroundColor: '#B71C1C',
        height: 40,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    image: {
        width: '100%',
        height: 230,
        marginBottom: 16,
        marginTop: 25,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default TipoClienteScreen;
