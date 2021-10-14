import React, { useEffect, useState, useRef } from 'react'
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import Carousel from '../components/Carousel'
import { StackActions, CommonActions } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import * as Notifications from 'expo-notifications'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import Constants from 'expo-constants'

import { Ionicons, Feather } from '@expo/vector-icons'

import { timeFormat, dateFormat } from '../util/util'

import { useIsFocused } from '@react-navigation/native'
import { useFocusEffect } from '@react-navigation/native'

import { NavigationActions } from 'react-navigation'

const dimensions = Dimensions.get('window')
const imageHeight = dimensions.height
const imageWidth = dimensions.width
const imageRatio = imageWidth / imageHeight

const Assignment = ({ navigation, route }) => {
  const isFirstRender = React.useRef(true)

  // useEffect(() => {
  //   if (isFirstRender.current) {
  //     isFirstRender.current = false
  //   }
  //   console.log('first render');
  //   (async () => {
  //     const fbdata = await firebase
  //         .firestore()
  //         .collection('users')
  //         .doc(firebase.auth().currentUser.uid)
  //         .collection('work')
  //         .doc(route.params.groupId)
  //         .get()
  //     console.log('firebase data')
  //     console.log(fbdata.data())
  //     setData(fbdata.data())
  //   });

  // }, [])

  if (!route.params) return <Text>Loading</Text>
  const groupId = route.params.groupId

  const [data, setData] = useState(null)
  const isFocused = useIsFocused()
  console.log('group id' + groupId)

  const goBack = () => {
    setData(null)
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'Home' }],
      })
    )
  }

  const backArrow = () => {
    return (
      <TouchableOpacity onPress={() => goBack()}>
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
          />
          <Text style={{ fontWeight: '600', fontSize: 15 }}>Go Back</Text>
        </View>
      </TouchableOpacity>
    )
  }

  React.useLayoutEffect(() => {
    ;(async () => {
      setData(null)
      const fbdata = await firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .collection('work')
        .doc(route.params.groupId)
        .get()
      console.log('firebase data')
      console.log(fbdata.data())
      setData(fbdata.data())
    })()
    navigation.setOptions({
      headerLeft: backArrow,
    })
  }, [navigation])

  // useEffect(async () => {
  //   const fbdata = await firebase
  //       .firestore()
  //       .collection('users')
  //       .doc(firebase.auth().currentUser.uid)
  //       .collection('work')
  //       .doc(groupId)
  //       .get()

  //   console.log(fbdata.data())
  //   setData(fbdata.data())
  // }, [])

  // useFocusEffect(
  //   React.useCallback(() => {
  //     // Do something when the screen is focused
  //     console.log('\n');
  //     console.log('focused: '+ isFocused);
  //     console.log(route);
  //     (async () => {
  //       setData(null)
  //       const fbdata = await firebase
  //           .firestore()
  //           .collection('users')
  //           .doc(firebase.auth().currentUser.uid)
  //           .collection('work')
  //           .doc(route.params.groupId)
  //           .get()
  //       console.log('firebase data')
  //       console.log(fbdata.data())
  //       setData(fbdata.data())
  //     })();

  //     return () => {
  //       // Do something when the screen is unfocused
  //       // Useful for cleanup functions
  //       setData(null)
  //     };
  //   }, [navigation, route])
  // )

  return (
    <>
      <View style={{ width: '100%', height: '100%', flex: 1 }}>
        {data && <HomeworkGroup data={data} />}
      </View>
    </>
  )
}

const HomeworkGroup = ({ data }) => {
  console.log('HomeworkGroup data')
  console.log(data)
  if (!data?.pages || !data?.remindAt) return <Text>Loading...</Text>
  const { pages, remindAt } = data
  const dateInfo = new Date(remindAt * 1000)
  return (
    <>
      <View
        style={{
          marginBottom: 0,
          paddingVertical: 10,
          alignContent: 'center',
          alignItems: 'center',
        }}
        width={imageWidth}
        height={imageHeight - 90 / imageRatio}
      >
        <View
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: 10,
          }}
        >
          <Ionicons
            name="notifications"
            size={24}
            color="black"
            style={{ marginRight: 5 }}
          />
          <Text
            style={{
              fontSize: 20,
            }}
          >
            {dateFormat(dateInfo)}
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: 10,
          }}
        >
          <Ionicons
            name="time"
            size={24}
            color="black"
            style={{ marginRight: 5 }}
          />
          <Text
            style={{
              fontSize: 20,
            }}
          >
            {timeFormat(dateInfo)}
          </Text>
        </View>
        <Carousel
          images={pages}
          styles={{
            width: imageWidth,
            height: imageHeight,
          }}
          width={imageWidth}
          height={imageHeight - 90 / imageRatio}
        />
      </View>
    </>
  )
}

export default Assignment
