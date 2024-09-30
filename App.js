import React,{ useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Calculadora from './Telas/Calculadora';
import Login from './Telas/Login'
import Lista from './Telas/Lista';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator()



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Lista'>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
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
