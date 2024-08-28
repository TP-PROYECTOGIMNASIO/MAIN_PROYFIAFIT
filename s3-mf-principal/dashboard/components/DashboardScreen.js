import React from 'react';
import { View, Text, ImageBackground } from 'react-native';


import { useNavigation } from '@react-navigation/native';

import styles from './styles';  
export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Text>Pantalla de Dashboard</Text>


      <ImageBackground source={require('../assets/background.png')} style={styles.backgroundImage}
>
       </ImageBackground>
    </View>



  );
}



