import React, { useRef, useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Ionicons';
//import Icon from 'react-native-vector-icons/MaterialIcons';
import {MaterialIcons, Ionicons} from 'react-native-vector-icons';
import { AutoFocus } from 'expo-camera/build/Camera.types';
import UserContext from '../components/UserContext';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
  },
  camera: {
    backgroundColor: 'blue',
    width: '100%',
  },
  buttonContainer: {
    position: 'relative',
    fontSize: 160,
    height: '100%',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
  snap: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderWidth: 0,
  },
  flip: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderWidth: 0,
  },
  gallery: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderWidth: 0,
  },
  snapIcon: {
    position: 'absolute',
    fontSize: 80,
    bottom: 30,
    left: "50%",
    marginLeft: -40,
  },
  flipIcon: {
    position: 'absolute',
    fontSize: 80,
    top: '5%',
    left: 30,
  },
  galleryIcon: {
    position: 'absolute',
    fontSize: 80,
    bottom: 30,
    right: 0,
  },
});


const CameraPage = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const isFocused = useIsFocused();
  const [camera, setCamera] = useState(null);
  const { cachedImages, setCachedImages } = useContext(UserContext);

  const takePicture = async () => {
    if (camera) {
      let photo = await camera.takePictureAsync();
      setCachedImages([...cachedImages, photo]);
    }
  }

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }
  return (
    <View style={styles.container}>
      { isFocused && 
      <Camera 
        style={styles.camera} 
        type={type} 
        ref={ref => {
          setCamera(ref);
        }}
      >
        <View style={styles.buttonContainer}>
          <TouchableNativeFeedback
            style={styles.flip}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Ionicons name='camera-reverse-outline' color='#fff' style={styles.flipIcon}/>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            style={styles.snap}
            onPress={() => {takePicture()}}>
            <Ionicons name='md-scan-circle-outline' color='#fff' style={styles.snapIcon}/>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            style={styles.gallery}
            onPress={() => navigation.navigate('Gallery')}
          >
          
            <MaterialIcons name='photo-album' color='#fff' style={styles.galleryIcon}/>

          </TouchableNativeFeedback>
        </View>
      </Camera>
    }
    </View>
  )
}

export default CameraPage
