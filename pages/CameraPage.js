import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Camera } from 'expo-camera'
import { useIsFocused } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { AutoFocus } from 'expo-camera/build/Camera.types'

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
    fontSize: '10rem',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  flip: {
    position: 'absolute',
    fontSize: '5rem',
    margin: 'auto',
  },
  snap: {
    position: 'absolute',
    fontSize: '5rem',
    display: 'block',
    bottom: 0,
    justifyContent: 'center',
  },
  snapIcon: {
    position: 'absolute',
    fontSize: '5rem',
    bottom: 0,
  },
})

const CameraPage = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const isFocused = useIsFocused()
  const [camera, setCamera] = useState(null)

  const takePicture = async () => {
    console.log(camera)
    if (camera) {
      let photo = await camera.takePictureAsync()
      console.log(photo)
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
      {isFocused && (
        <Camera
          style={styles.camera}
          type={type}
          ref={(ref) => {
            setCamera(ref)
          }}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.flip}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                )
              }}
            >
              <Icon
                name="camera-reverse-outline"
                color="#fff"
                style={styles.flip}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.snap} onPress={takePicture}>
              <Icon
                name="md-scan-circle-outline"
                color="#fff"
                style={styles.snapIcon}
              />
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  )
}

export default CameraPage
