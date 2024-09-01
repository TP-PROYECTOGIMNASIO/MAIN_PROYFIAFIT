import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DashboardScreen } from './dashboard';
import LoginScreen from './login/components/LoginScreen';
import ResetPasswordScreen from './reset-password/components/ResetPasswordScreen';
import VerificationCodeScreen from './VerificationCode/components/VerificationCodeScreen';
import NewPasswordScreen from './NewPassword/components/NewPasswordScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Footer from './Componentes/Footer';
import Header from './Componentes/Header';
import Toast from 'react-native-toast-message'; 
import { MicroviewScreen } from './MicroView';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Header />
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: false }} />
          <Stack.Screen name="VerificationCode" component={VerificationCodeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Microview" component={MicroviewScreen} options={{ headerShown: false }} />        
        </Stack.Navigator>
        <Footer />
        <Toast />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
