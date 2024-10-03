import React, {useState} from "react";
import { Button, View, Text, TextInput, FlatList, StyleSheet } from "react-native";


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
    const [frutas, setFrutas] = useState([])
    return(
        <View style={styles.container}>
            <Text>Minha Lista</Text>
            <FlatList
                data={frutas}
                keyExtractor={(item)=>item.nome}
                renderItem={({item})=>{
                    //console.log(item.item.nome)
                    return(<Fruta nome={item.nome} qtd={item.qtd} />)}}
            />
            <Button title="Chamar Callback" onPress={()=>buscarDadosCallback(callbackDeExibicaoDeDados)} />
            <Button title="Chamar Promise" onPress={testarPromise} />
            <Button title="Chamar Await" onPress={testarAwait} />
            <Button title="Chamar API" onPress={testarAPI} />
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
    }
})
export default Lista