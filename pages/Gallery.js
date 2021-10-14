import React, { useContext, useState } from 'react'
import UserContext from '../components/UserContext'
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Button,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { ScrollView } from 'react-native-gesture-handler'
import 'react-native-gesture-handler'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Feather } from 'react-native-vector-icons'
// import { HeaderBackButton } from '@react-navigation/native-stack'

const Tab = createMaterialTopTabNavigator()

const createImageTab = (dataUri) => {
  return ({ navigation }) => (
    <Image
      source={dataUri}
      style={{ height: '100%', width: '100%', alignSelf: 'center' }}
    ></Image>
  )
}

const Gallery = ({ navigation }) => {
  const { cachedImages, setCachedImages } = useContext(UserContext)
  const [imageIndex, setIndex] = useState(cachedImages.length - 1)

  const backArrow = () => {
    const color = '#000'
    return (
      <TouchableOpacity onPress={() => navigation.navigate('CameraPage')}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: 8,
          }}
        >
          <Feather
            name="arrow-left"
            style={{ fontSize: 25, marginHorizontal: 10 }}
            color={color}
          />
          <Text style={{ fontWeight: '600', fontSize: 15, color }}>
            Go Back
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  const forwardArrow = () => {
    const color = '#000'
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Upload')}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: 8,
          }}
        >
          <Text style={{ fontWeight: '600', fontSize: 15, color }}>Next</Text>
          <Feather
            name="arrow-right"
            style={{ fontSize: 25, marginHorizontal: 10 }}
            color={color}
          />
        </View>
      </TouchableOpacity>
    )
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      // headerRight: () => (
      //   <Button onPress={() => navigation.navigate('Notification Options')} title="Next" style={{marginHorizontal: 10}}/>
      // ),
      headerLeft: backArrow,
      headerRight: forwardArrow,
      headerTitle: '',
      // headerLeft: () => (
      //   <Button onPress={() => navigation.navigate('Take a Picture')} title="Go Back" style={{marginHorizontal: 10}}/>
      // ),
    })
  }, [navigation])

  if (cachedImages.length == 0) {
    return <Text>You have no images staged for scheduling!</Text>
  }

  return (
    <>
      <Tab.Navigator style={{ flexShrink: 0 }}>
        {cachedImages.map((val, idx) => (
          <Tab.Screen
            name={'image ' + (idx + 1)}
            component={createImageTab(val)}
            key={idx}
          />
        ))}
      </Tab.Navigator>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
          position: 'absolute',
          bottom: 50,
        }}
      ></View>
    </>
  )
}

export default Gallery
