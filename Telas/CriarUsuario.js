import React,{ useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import firebase from '../Servicos/firebase'

export default function Login() {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [resultado, setResultado] = useState(true)
  const CriarUsuario = function() {
    const auth = getAuth(firebase)
    createUserWithEmailAndPassword(auth, email, senha)
        .then(user => {
            console.log(user)
            navigation.navigate('Lista')
        })
        .catch(err => {console.error(err)
            setResultado(false)
            //Alert.alert('error')
        })
  }
  return (
    <View style={styles.container}>
      {resultado ? null : <Text>email ou senha invalidos</Text>}
      <TextInput placeholder='Email' onChangeText={(text)=>setEmail(text)} />
      <TextInput placeholder='Senha' onChangeText={(text)=>setSenha(text)} />
      <Button title='Cadastrar' onPress={()=>CriarUsuario()} />
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
