import React, {
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
  useContext,
} from 'react'
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
import {
  StackActions,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native'
import { NavigationActions } from 'react-navigation'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import * as Notifications from 'expo-notifications'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import Constants from 'expo-constants'

import { Ionicons } from '@expo/vector-icons'

import { timeFormat, dateFormat } from '../util/util'

import Fade from '../components/Fade'

import FadeIn from 'react-native-fade-in-image'

const dimensions = Dimensions.get('window')
const imageHeight = dimensions.height
const imageWidth = dimensions.width
const imageRatio = imageWidth / imageHeight

const Tab = createMaterialTopTabNavigator()

Date.prototype.addHours = function (h) {
  this.setHours(this.getHours() + h)
  return this
}

async function schedulePushNotification({ title, body, data, trigger }) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
    },
    trigger,
  })
}

const HomeworkGroup = (props) => {

  const dateInfo = new Date(props.data.data.remindAt * 1000)

  console.log(props.navigation)

  return (
    <Fade visible={props.data.show} idx={props.idx}>
      <View
        style={{
          marginBottom: 20,
          paddingVertical: 10,
        }}
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
          <TouchableOpacity
            style={{
              position: 'absolute',
              left: 15,
            }}
            onPress={() => props.handleHide(props.data.id)}
          >
            <Ionicons name="eye" size={24} color="black" />
          </TouchableOpacity>
          <Ionicons name="notifications" size={24} color="black" />
          <Text
            style={{
              fontSize: 20,
            }}
          >
            {dateFormat(dateInfo)} @ {timeFormat(dateInfo)}
          </Text>
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 15,
            }}
            onPress={() => {
              props.navigation.navigate('Camera', {
                screen: 'Assignment',
                params: { groupId: props.data.id },
              })
            }}
          >
            <Ionicons name="expand" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Carousel
          images={props.data.data.urls}
          styles={{
            width: imageWidth,
            height: imageHeight,
          }}
          width={imageWidth - 45}
          height={imageHeight - 90 / imageRatio}
        />
      </View>
    </Fade>
  )
}

const Home = ({ navigation }) => {
  const [userData, setUserData] = useState([-1])

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  })

  useEffect(() => {
    return navigation.addListener('focus', () => {
      setUserData([-1])
      const ref = firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .collection('work')

      ref.get().then((querySnapshot) => {
        let ids = []

        querySnapshot.docs.forEach((doc) => {
          let d = doc.data()
          ids.push({
            id: doc.id,
            data: {
              remindAt: d.remindAt,
              urls: d.pages,
            },
            show: true,
          })
        })

        ids.sort((a, b) => {
          if (a.data.remindAt < b.data.remindAt) return -1
          else if (a.data.remindAt > b.data.remindAt) return 1
          else return 0
        })

        setUserData(ids)
      })
    })
  }, [navigation])

  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState(false)
  const thisSucks = (notif) => {
    // console.log(navigation)
    navigation.navigate('Camera', {
      screen: 'Assignment',
      params: { groupId: notif.groupId },
    })
  }

  const notificationListener = useRef()
  const responseListener = useRef()

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token))

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification)
      }
    )

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const notif = response.notification.request.content.data
        if (notif.groupId) {
          // navigation.navigate(
          //   'Assignment', notif
          // )
          // navigation.navigate(
          //   'Camera', {
          //     screen: 'Assignment',
          //     params: notif
          //   }
          // )
          thisSucks(notif)
        } else {
          navigation.navigate('Camera')
        }
      }
    )

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

  useEffect(async () => {
    const times = await firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()

    const { saveTimes } = times.data()

    const actualTimes = []

    for (const t of saveTimes) {
      const d = new Date(t)
      actualTimes.push(
        d.getSeconds() + 60 * d.getMinutes() + 60 * 60 * d.getHours()
      )
    }

    actualTimes.sort()

    const remindTimes = []

    remindTimes.push(actualTimes[0])

    for (let i = 1; i < actualTimes.length; i++) {
      if (actualTimes[i] - 60 * 30 > actualTimes[i - 1]) {
        // last taken more than 30 minutes ago
        remindTimes.push(actualTimes[i])
      }
    }

    // remindTimes.push(78420)

    for (let t of remindTimes) {
      const date = new Date()
      const nowTime =
        60 * 60 * date.getHours() + 60 * date.getMinutes() + date.getSeconds()

      const secsToNotify = t - nowTime

      if (secsToNotify <= 0) {
        continue
      }

      schedulePushNotification({
        title: 'Homework Picture reminder! 📷',
        body: 'Make sure to capture your homework.',
        data: { type: 'camera', groupId: null },
        trigger: {
          seconds: secsToNotify,
        },
      })
    }
  }, [])

  const handleHide = (id) => {
    let workCopy = [...userData]

    for (let i = 0; i < workCopy.length; ++i) {
      if (workCopy[i].id === id) {
        workCopy[i].show = false
      }
    }

    setUserData(workCopy)
  }

  return (
    <ScrollView
      style={{ paddingHorizontal: 20, paddingVertical: 75, marginBottom: 30 }}
    >
      <TouchableOpacity
        onPress={() => {
          firebase.auth().signOut()
        }}
      >
        <Text style={{ fontSize: 35 }}>
          Welcome, {firebase.auth().currentUser.displayName}
        </Text>
      </TouchableOpacity>

      {/* <Button title={'notif'} onPress={() => {
        console.log(navigation)
        navigation.navigate(
          'Camera', {
            screen: 'Assignment',
            params: {groupId: '086b5cc0-386c-11ec-9989-eb7cf27881b8'}
          }
        )}} /> */}

      <View style={{ marginTop: 20 }}>
        {userData.length > 0 && userData[0] != -1
          ? userData.map((e, k) => {
              // console.log(e.data.remindAt*1000, Date.now(), e.data.remindAt*1000 - Date.now())

              if (e.data.remindAt * 1000 - Date.now() < 0) {
                // console.log(1)
                if (k == 0) {
                  return (
                    <React.Fragment key={k}>
                      <Text
                        style={{
                          fontSize: 25,
                          borderBottomWidth: 2,
                          marginBottom: 5,
                          paddingBottom: 2,
                        }}
                      >
                        Overdue
                      </Text>
                      <HomeworkGroup data={e} idx={k} handleHide={handleHide} navigation={navigation}/>
                    </React.Fragment>
                  )
                } else {
                  // console.log(5)
                  return (
                    <HomeworkGroup
                      data={e}
                      key={k}
                      idx={k}
                      handleHide={handleHide}
                      navigation={navigation}
                    />
                  )
                }
              } else if (
                e.data.remindAt * 1000 - Date.now() <
                1000 * 60 * 60 * 24
              ) {
                // console.log(7070)
                if (
                  k == 0 ||
                  !(
                    userData[k - 1].data.remindAt * 1000 - Date.now() >
                    1000 * 60 * 60 * 24
                  )
                ) {
                  return (
                    <React.Fragment key={k}>
                      <Text
                        style={{
                          fontSize: 25,
                          borderBottomWidth: 2,
                          marginBottom: 5,
                          paddingBottom: 2,
                        }}
                      >
                        Due today
                      </Text>
                      <HomeworkGroup data={e} idx={k} handleHide={handleHide} navigation={navigation}/>
                    </React.Fragment>
                  )
                } else {
                  return (
                    <HomeworkGroup
                      data={e}
                      key={k}
                      idx={k}
                      handleHide={handleHide}
                      navigation={navigation}
                    />
                  )
                }
              } else if (
                e.data.remindAt * 1000 - Date.now() <
                1000 * 60 * 60 * 24 * 3
              ) {
                // console.log(2)
                if (
                  k == 0 ||
                  !(
                    userData[k - 1].data.remindAt * 1000 - Date.now() >
                    1000 * 60 * 60 * 24 * 3
                  )
                ) {
                  return (
                    <React.Fragment key={k}>
                      <Text
                        style={{
                          fontSize: 25,
                          borderBottomWidth: 2,
                          marginBottom: 5,
                          paddingBottom: 2,
                        }}
                      >
                        Due Soon
                      </Text>
                      <HomeworkGroup data={e} idx={k} handleHide={handleHide} navigation={navigation}/>
                    </React.Fragment>
                  )
                } else {
                  return (
                    <HomeworkGroup
                      data={e}
                      key={k}
                      idx={k}
                      handleHide={handleHide}
                      navigation={navigation}
                    />
                  )
                }
              } else {
                // console.log(6)
                if (
                  k == 0 ||
                  userData[k - 1].data.remindAt * 1000 - Date.now() <
                    1000 * 60 * 60 * 24 * 3
                ) {
                  return (
                    <React.Fragment key={k}>
                      <Text
                        style={{
                          fontSize: 25,
                          borderBottomWidth: 2,
                          marginBottom: 5,
                          paddingBottom: 2,
                        }}
                      >
                        Due in a while
                      </Text>
                      <HomeworkGroup data={e} idx={k} handleHide={handleHide} navigation={navigation}/>
                    </React.Fragment>
                  )
                } else {
                  console.log(2)
                  return (
                    <HomeworkGroup
                      data={e}
                      key={k}
                      idx={k}
                      handleHide={handleHide}
                      navigation={navigation}
                    />
                  )
                }
              }
            })
          : null}

          <View style={{height:  50}}></View>

        {userData.length == 0 && <Text>No images yet!</Text>}
      </View>
    </ScrollView>
  )
}

async function registerForPushNotificationsAsync() {
  let token
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!')
      return
    }
    token = (await Notifications.getExpoPushTokenAsync()).data
  } else {
    alert('Must use physical device for Push Notifications')
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  }

  return token
}

export default Home
