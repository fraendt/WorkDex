import React, { useRef, useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback, Image, TouchableHighlight } from 'react-native';
import { Camera } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Ionicons';
//import Icon from 'react-native-vector-icons/MaterialIcons';
import {MaterialIcons, Ionicons, Entypo, MaterialCommunityIcons} from 'react-native-vector-icons';
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
        style={{
          backgroundColor: 'blue',
          width: '100%',
          //height: '100%',
        }} 
        type={type} 
        ref={ref => {
          setCamera(ref);
        }}
      >
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={{
              width: 80,
              height: 80,
              position: 'absolute',
              fontSize: 80,
              top: '5%',
              left: 30,
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Ionicons 
              name='camera-reverse-outline' 
              color='#fff' 
              style={{
                fontSize: 80,
              }}
            />
          </TouchableHighlight>
          <TouchableHighlight
            style={{
              width: 80,
              height: 80,
              position: 'absolute',
              fontSize: 80,
              bottom: 30,
              left: "50%",
              marginLeft: -40,
            }}
            onPress={() => {takePicture()}}>
            <Entypo //Ionicons 
              //name='md-scan-circle-outline'
              name='circle'
              color='#fff' 
              style={{
                fontSize: 80,
              }}
            />
          </TouchableHighlight>
          <TouchableHighlight
            style={{
              width: 80,
              height: 80,
              position: 'absolute',
              fontSize: 80,
              bottom: 30,
              right: 0,
            }}
            onPress={() => navigation.navigate('Gallery')}
          >
          
            <MaterialCommunityIcons //MaterialIcons 
              //name='photo-album' 
              name='image-outline'
              color='#fff' 
              style={{
                fontSize: 80,
              }}
            />

          </TouchableHighlight>
        </View>
      </Camera>
    }
    </View>
  )
}

export default CameraPage
