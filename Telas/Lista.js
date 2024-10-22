import React, {useState} from "react";
import { Button, View, Text, TextInput, FlatList, StyleSheet } from "react-native";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";
import firebase from '../Servicos/firebase'

const Fruta = function({nome, qtd}) {
    return(
        <View style={styles.containerFruta}>
            <Text>{nome} - {qtd}</Text>
            <Button title='Editar' onPress={() => console.log('editar')} />
            <Button title='Deletar' onPress={() => console.log('deletar')} />
        </View>
    )
}

function buscarDadosCallback(callback) {
    setTimeout(() => {
    const dados = [{nome: 'banana', qtd: 4}, 
                    {nome: 'uva', qtd: 2}, 
                    {nome: 'maçã', qtd: 10}]
    callback(null, dados); // O primeiro argumento ´e o erro (nulo neste }, 1000);
    }, 2000)}
    function buscarDadosPromise() {
        return new Promise((resolve, reject) => {
        setTimeout(() => {
        const dados = [{nome: 'banana', qtd: 8}, 
            {nome: 'mamao', qtd: 2}, 
            {nome: 'maçã', qtd: 10}]
        resolve(dados);
        }, 3000);
        });
        }

const Lista = function() {
    //var frutas = [{nome: 'banana', qtd: 4}, 
        //            {nome: 'uva', qtd: 2}, 
        //            {nome: 'maçã', qtd: 10}]

    //Usando Callback
    function callbackDeExibicaoDeDados(erro, dados) {
        if (erro) {
        console.error("Erro:", erro);
        } else {
        setFrutas(dados)
        }
        }

        async function testarAwait() {
            var dados = await buscarDadosPromise()
            setFrutas(dados)
        }

        function testarPromise() {
            buscarDadosPromise()
                .then(dados => {
                    console.log('dentro do then')
                    setFrutas(dados)
                    // Atividade demorada
                    return 'Rodrigo'
                })
                .then(dado => console.log(dado))
                .catch(err => console.log(err))
            console.log('Fora do then')
        }
        function testarAPI() {
            fetch('https://www.fruityvice.com/api/fruit/all')
                .then(data=>data.json())
                .then(obj=> {
                    setFrutas(obj.map(item => {return {nome: item.name, qtd: Math.floor(Math.random() * 11)}}))
                })
                .catch(err => console.error(err))
        }
        const getDados = function() {
            const auth = getAuth(firebase)
            const db= getDatabase(firebase)
            const userRef = ref(db, auth.currentUser.uid)
            get(userRef)
                .then(dados => {
                    if(dados.exists()) {
                        var dadosVal = dados.val()
                        console.log(dadosVal)
                        setFrutas(dadosVal)
                    }
                })
                .catch(err => console.error(err))
        }
        const addFruta = function() {
            const db = getDatabase(firebase)
            const auth = getAuth(firebase)
            const userUid = auth.currentUser.uid
            const frutaRef = ref(db, userUid)
            set(frutaRef, [...frutas, {nome: fruta, qtd: qtd}])
                .then(()=>{
                    setFrutas([...frutas, {nome: fruta, qtd: qtd}])
                    setFruta('')
                    setQtd(0)
                })
                .catch((err)=>console.error(err))
        }
    const [frutas, setFrutas] = useState([])
    const [fruta, setFruta] = useState('')
    const [qtd, setQtd] = useState(0)
    return(
        <View style={styles.container}>
            <Text>Minha Lista</Text>
            <View style={[styles.linha, {alignItems: 'stretch', justifyContent:'space-between'}]}>
                <TextInput placeholder="Fruta" value={fruta} onChangeText={(text)=>setFruta(text)} />
                <TextInput placeholder="Qtd" value={qtd} onChangeText={(nro)=>setQtd(nro)} />
                <Button title="+" onPress={addFruta} />
            </View>
            <FlatList
                data={frutas}
                keyExtractor={(item)=>item.nome}
                renderItem={({item})=>{
                    //console.log(item.item.nome)
                    return(<Fruta nome={item.nome} qtd={item.qtd} />)}}
            />
            <View style={styles.linha}>
                <Button title="Callback" onPress={()=>buscarDadosCallback(callbackDeExibicaoDeDados)} />
                <Button title="Promise" onPress={testarPromise} />
                <Button title="Await" onPress={testarAwait} />
                <Button title="API" onPress={testarAPI} />
                <Button title="Firebase" onPress={getDados} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerFruta: {
        flexDirection: 'row',
        margin: 8,
        padding: 10,
        backgroundColor: 'gray',
        borderRadius: 15
    },
    container: {
        flex:.8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    linha: {
        flexDirection: 'row'
    }
})
export default Lista