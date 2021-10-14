import React, { useRef, useState, useEffect, useContext } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native'
import { Camera } from 'expo-camera'
import { useIsFocused } from '@react-navigation/native'
// import Icon from 'react-native-vector-icons/Ionicons';
//import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  MaterialIcons,
  Ionicons,
  Entypo,
  MaterialCommunityIcons,
} from 'react-native-vector-icons'
import { AutoFocus } from 'expo-camera/build/Camera.types'
import UserContext from '../components/UserContext'

import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator'

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
})

const CameraPage = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const isFocused = useIsFocused()
  const [camera, setCamera] = useState(null)
  const { cachedImages, setCachedImages } = useContext(UserContext)

  const [isRatioSet, setIsRatioSet] = useState(false)
  const [imagePadding, setImagePadding] = useState(0)
  const [ratio, setRatio] = useState(null)

  const { height, width } = Dimensions.get('window')
  const screenRatio = height / width

  const takePicture = async () => {
    if (camera) {
      let photo = await camera.takePictureAsync()

      const manipResult = await manipulateAsync(
        photo.uri || photo.localUri,
        [{ resize: { height: 1440 } }],
        { compress: 1, format: SaveFormat.JPEG }
      )

      setCachedImages([...cachedImages, manipResult])
    }
  }

  // https://stackoverflow.com/questions/58634905/camera-preview-in-expo-is-distorted
  const prepareRatio = async () => {
    let desiredRatio = '4:3' // Start with the system default
    // This issue only affects Android
    if (Platform.OS === 'android') {
      const ratios = await camera.getSupportedRatiosAsync()

      // Calculate the width/height of each of the supported camera ratios
      // These width/height are measured in landscape mode
      // find the ratio that is closest to the screen ratio without going over
      let distances = {}
      let realRatios = {}
      let minDistance = null
      for (const ratio of ratios) {
        const parts = ratio.split(':')
        const realRatio = parseInt(parts[0]) / parseInt(parts[1])
        realRatios[ratio] = realRatio
        // ratio can't be taller than screen, so we don't want an abs()
        const distance = screenRatio - realRatio
        distances[ratio] = realRatio
        if (minDistance == null) {
          minDistance = ratio
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio
          }
        }
      }
      // set the best match
      desiredRatio = minDistance
      //  calculate the difference between the camera width and the screen height
      const remainder = Math.floor(
        (height - realRatios[desiredRatio] * width) / 2
      )
      // set the preview padding and preview ratio
      setImagePadding(remainder)
      setRatio(desiredRatio)
      // Set a flag so we don't do this
      // calculation each time the screen refreshes
      setIsRatioSet(true)
    }
  }

  // the camera must be loaded in order to access the supported ratios
  const setCameraReady = async () => {
    if (!isRatioSet) {
      await prepareRatio()
    }
  }

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
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
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        margin: 0,
        backgroundColor: 'black',
      }}
    >
      {isFocused && (
        <Camera
          style={{
            backgroundColor: 'blue',
            width: '107%',
            height: '100%',
            marginTop: imagePadding,
            marginBottom: imagePadding,
          }}
          type={type}
          ref={(ref) => {
            setCamera(ref)
          }}
          onCameraReady={setCameraReady}
          ratio={ratio}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                position: 'absolute',
                fontSize: 50,
                bottom: 30,
                left: 50,
              }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                )
              }}
            >
              <Ionicons
                name="camera-reverse-outline"
                color="#fff"
                style={{
                  fontSize: 50,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                position: 'absolute',
                fontSize: 50,
                bottom: 30,
                left: '50%',
                marginLeft: -25,
              }}
              onPress={() => {
                takePicture()
              }}
            >
              <Entypo //Ionicons
                //name='md-scan-circle-outline'
                name="circle"
                color="#fff"
                style={{
                  fontSize: 50,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                position: 'absolute',
                fontSize: 80,
                bottom: 30,
                right: 50,
              }}
              onPress={() => navigation.navigate('Gallery')}
            >
              <MaterialCommunityIcons //MaterialIcons
                //name='photo-album'
                name="image-outline"
                color="#fff"
                style={{
                  fontSize: 50,
                }}
              />
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  )
}

export default CameraPage
