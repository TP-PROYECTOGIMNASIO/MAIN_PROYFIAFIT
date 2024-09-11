import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DashboardScreen } from './dashboard';
import LoginScreen from './login/components/LoginScreen';
import UserNotScreen from './login/components/UserNotScreen';
import ResetPasswordScreen from './reset-password/components/ResetPasswordScreen';
import VerificationCodeScreen from './VerificationCode/components/VerificationCodeScreen';
import NewPasswordScreen from './NewPassword/components/NewPasswordScreen';
import PassswordCorrectScreen from './NewPassword/components/PassswordCorrectScreen';
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
      <Stack.Navigator initialRouteName="Login">
        {/* Stack para pantallas con Header y Footer */}
        <Stack.Screen 
          name="Main" 
          component={MainStack}
          options={{ headerShown: false }} 
        />
        {/* Stack para la pantalla Microview sin Header y Footer */}
        <Stack.Screen 
          name="Microview" 
          component={MicroviewScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainStack() {
  return (
    <View style={styles.container}>
      <Header />
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="VerificationCode" component={VerificationCodeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UserNotScreen" component={UserNotScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PassswordCorrectScreen" component={PassswordCorrectScreen} options={{ headerShown: false }} />
      
        
      </Stack.Navigator>
      <Footer />
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
