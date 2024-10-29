import React, { useEffect, useRef, useState } from "react"
import { View, Text, StyleSheet, Button, Image } from "react-native"
import { useCameraPermissions, CameraView } from "expo-camera"

export default function Camera () {
    const [permissions, requestPermission] = useCameraPermissions()
    const [foto, setFoto] = useState(null)
    const camera = useRef(null)
    useEffect(()=>{requestPermission()},[])
    const tirarFoto = function(){
        camera.current.takePictureAsync()
            .then((img)=>{console.log(img)
                setFoto(img)
            })
            .catch((err)=>console.error(err))
    }
    if(!permissions) {
        return(
            <View>
                <Text>Permissão indefinida</Text>
            </View>
        )
    }
    if(!permissions.granted) {
        return(
            <View>
                <Text>Permissão não autorizada.</Text>
            </View>
        )
    }
    if(foto) {
        return(
            <View style={styles.container}>
                <Image style={styles.imagem} source={{uri: foto.uri}} />
            </View>
        )
    }
    return(
        <View style={styles.container}>
            <CameraView style={styles.camera} ref={camera}>
                <Button title="Tirar Foto" onPress={tirarFoto} />
            </CameraView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    imagem: {
        width: '90%',
        height: '90%'
    },
    camera: {
        flex: 1,
      }
    })