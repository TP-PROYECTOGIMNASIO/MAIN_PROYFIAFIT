import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DashboardScreen } from './dashboard';
import UpdatePassword from './dashboard/components/UpdatePassword';
import LoginScreen from './login/components/LoginScreen';
import UserNotScreen from './login/components/UserNotScreen';
import ResetPasswordScreen from './reset-password/components/ResetPasswordScreen';
import VerificationCodeScreen from './VerificationCode/components/VerificationCodeScreen';
import NewPasswordScreen from './NewPassword/components/NewPasswordScreen';
import PassswordCorrectScreen from './NewPassword/components/PassswordCorrectScreen';
import RegisterScreen from './register/components/RegisterScreen';
import CodeScreen from './register/components/CodeScreen';
import TipoClienteScreen from './register/components/TipoClienteScreen';
import ClienteRegularScreen from './register/components/ClienteRegularScreen'; 
import ClienteRegular2Screen from './register/components/ClienteRegular2Screen';
import ClienteLibreScreen from './register/components/ClienteLibreScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Footer from './Componentes/Footer';
import Header from './Componentes/Header';

import Toast from 'react-native-toast-message'; 
import { MicroviewScreen } from './MicroView';
import Dashboard from './Componentes/inicio';

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
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CodeScreen" component={CodeScreen} options={{ headerShown: false }} /> 
        <Stack.Screen name="TipoClienteScreen" component={TipoClienteScreen} options={{ headerShown: false }} /> 
        <Stack.Screen name="ClienteRegularScreen" component={ClienteRegularScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ClienteRegular2Screen" component={ClienteRegular2Screen} options={{ headerShown: false }}/>
        <Stack.Screen name="ClienteLibreScreen" component={ClienteLibreScreen} options={{ headerShown: false }}/>  
        <Stack.Screen name="UpdatePassword" component={UpdatePassword} options={{ headerShown: false }} />      
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
