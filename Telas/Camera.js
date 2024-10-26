import React, { useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useCameraPermissions, CameraView } from "expo-camera"

export default function Camera () {
    const [permissions, requestPermission] = useCameraPermissions()
    useEffect(()=>{requestPermission()},[])
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
    return(
        <View style={styles.container}>
            <CameraView style={styles.camera}>

            </CameraView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    camera: {
        flex: 1,
      }
    })