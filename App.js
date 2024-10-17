import React,{ useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Calculadora from './Telas/Calculadora';
import Login from './Telas/Login'
import Lista from './Telas/Lista';
import CriarUsuario from './Telas/CriarUsuario'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator()



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="Criar" component={CriarUsuario} />
        <Stack.Screen name="CalculaNota" component={Calculadora} options={{title: 'Calculadora de Notas'}}/>
        <Stack.Screen name="Lista" component={Lista} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
