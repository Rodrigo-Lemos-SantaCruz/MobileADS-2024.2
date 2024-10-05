import React,{ useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {getAuth, signInWithEmailAndPassword } from "firebase/auth"
import firebase from '../Servicos/firebase'

export default function Login() {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [resultado, setResultado] = useState(true)
  const ValidaLogin = function(rota) {
    if(email == 'admin@gmail.com' && senha == '123456') {
      var nomeCerto = 'Rodrigo'
      setResultado(true)
      console.log('Login Correto')
      navigation.navigate(rota, {nome: nomeCerto, idade: 29})
    } else {
      setResultado(false)
      console.log('Errou')
    }
  }
  const ValidaComFirebase = function(rota) {
      const auth = getAuth(firebase)
      signInWithEmailAndPassword(auth, email, senha)
        .then(user => {
          var nomeCerto = 'Rodrigo'
          setResultado(true)
          console.log(user)
          navigation.navigate(rota, {nome: nomeCerto, idade: 29})
          })
        .catch(err => {
          setResultado(false)
          console.error(err)})
  }
  return (
    <View style={styles.container}>
      {resultado ? null : <Text>Usuário errou email ou senha</Text>}
      <TextInput placeholder='Email' onChangeText={(text)=>setEmail(text)} />
      <TextInput placeholder='Senha' onChangeText={(text)=>setSenha(text)} />
      <Button title='Calculadora' onPress={()=>ValidaComFirebase('CalculaNota')} />
      <Button title='Lista' onPress={()=>ValidaComFirebase('Lista')} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
