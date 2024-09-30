import React,{ useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function Calculadora({route}) {
    const nome = route.params.nome
    const navigation = useNavigation()
    const [prova, setProva] = useState(0)
    const [Trabalho, setTrabalho] = useState(0)
    const [resultado, setResultado] = useState(0)
    const calcular = function() {
        setResultado((prova*0.7)+(Trabalho*0.3))
    }
    return (
    <View style={styles.container}>
      <View style={styles.fundoAmarelo}>
        <Text style={styles.textoGrande}>Olá, {nome}. Sua idade é {route.params.idade}</Text>
        <Text style={[styles.textoGrande, styles.textoNegrito]}>Minha Calculadora</Text>
      </View>
      <View style={styles.row}>
        <Text>Nota da Prova: </Text>
        <TextInput placeholder='Insira aqui...' onChangeText={(text)=>setProva(text)} />
      </View>
      <TextInput placeholder='Nota do Trabalho' onChangeText={(text)=>setTrabalho(text)} />
      <Button title='Calcular' onPress={()=>calcular()} />
      <Text>A média do aluno é: {resultado}</Text>
      <Button title='Voltar' onPress={()=>{navigation.goBack()}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row'  
  },
  textoGrande: {
    fontSize: 30,
    color: 'red'
  },
  textoNegrito: {
    fontWeight: '500',
    color: 'blue',
  },
  fundoAmarelo: {
    flex:1,
    backgroundColor: 'yellow',
    margin: 20,
    paddingBottom: 10,
    borderWidth: 10,
    borderColor: 'black',
    borderRadius: 20
  }
});
