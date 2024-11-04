import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [foto, setFoto] = useState(null)
  const [flashMode, setFlashMode] = useState('off')
  const [facing, setFacing] = useState('back')
  const [zoom, setZoom] = useState(0)
  const cameraRef = useRef(null)
  const tirarFoto = function() {
    cameraRef.current.takePictureAsync()
        .then((img) => {console.log(img)
            setFoto(img)
        })
        .catch((err) => console.error(err))
  }
  const salvarFoto = function() {
    console.log('salvando foto...')
    console.log(foto.uri)
    fetch(foto.uri)
      .then((resposta)=>{
        return resposta.blob()
      })
      .then((blob)=>{console.log(blob)})
      .catch((err)=>console.error(err))
  }
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  if(foto) {
    return(
      <View style={styles.container}>
        <Image style={{width:'100%', height:'100%' }} source={{uri: foto.uri}} />
        <View style={styles.buttonContainer}>
          <Button title='Nova foto' onPress={()=>setFoto(null)} />
          <Button title='Salvar' onPress={salvarFoto} />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <CameraView zoom={zoom} facing={facing} flash={flashMode} style={styles.camera} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <Button style={styles.button} title="Tirar Foto" onPress={tirarFoto} />
          <Button style={styles.button} title="flash" onPress={()=>setFlashMode(flashMode == 'on' ? 'off' : 'on')} />
          <Button style={styles.button} title="facing" onPress={()=>setFacing(facing == 'front' ? 'back' : 'front')} />
          <Button style={styles.button} title="+" onPress={()=>setZoom(zoom+0.1)} />
          <Button style={styles.button} title="-" onPress={()=>setZoom(zoom-0.1)} />
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20, 
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
    
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});