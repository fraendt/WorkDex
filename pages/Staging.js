import React, { useState, useContext, useRef, useEffect } from 'react'
import {
  Text,
  View,
  Button,
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

import { Feather } from 'react-native-vector-icons'
import { ProgressBar, Colors } from 'react-native-paper'
import UserContext from '../components/UserContext'

import 'react-native-get-random-values'
import { v1 as uuidv1 } from 'uuid'

import * as Notifications from 'expo-notifications'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

import { timeFormat, dateFormat } from '../util/util'

import Constants from 'expo-constants'

import Base64 from 'base-64'
global.atob = Base64.encode

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // height: '100%',
    // backgroundColor: 'blue',
    justifyContent: 'center',
    padding: 5,
  },
  row: {
    // flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row',
    // backgroundColor: 'red',
    // alignContent: 'space-between'
    // justifyContent: 'center'
    margin: 10,
    // width: '40%',
    // minWidth: 40,
    alignSelf: 'center',
  },
  text: {
    fontSize: 30,
    marginHorizontal: 20,
    // alignSelf: 'center'
  },
  display: {
    fontSize: 30,
    color: '#fff',
    backgroundColor: '#3cb043',
    margin: 0,
    padding: 8,
    alignSelf: 'flex-end',
    // alignSelf: 'center',
    marginHorizontal: 20,
  },
})

const uploadFile = async (uri, parentId) => {
  let storageRef = firebase
    .storage()
    .ref(`${firebase.auth().currentUser.uid}/files`)

  const fname = uuidv1()

  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
      resolve(xhr.response)
    }
    xhr.onerror = function (e) {
      console.log(e)
      reject(new TypeError('Network request failed'))
    }
    xhr.responseType = 'blob'
    xhr.open('GET', uri, true)
    xhr.send(null)
  })

  const ref = storageRef.child(`${fname}`)
  const snapshot = await ref.put(blob)

  const url = await snapshot.ref.getDownloadURL()

  await firebase
    .firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .collection('work')
    .doc(parentId)
    .set(
      {
        pages: firebase.firestore.FieldValue.arrayUnion(url),
      },
      { merge: true }
    )
}

const getDefaultDate = () => {
  let day = new Date()
  day.setDate(day.getDate())
  day.setHours(16)
  day.setMinutes(0)
  day.setSeconds(0)
  return day
}

const Staging = ({ navigation }) => {
  // const [defaultDate, setDefaultDate] = useState(0)
  // const defaultDate = new Date()
  // defaultDate.setDate(defaultDate.getDate())
  // defaultDate.setHours(16)
  // defaultDate.setMinutes(0)
  // defaultDate.setSeconds(0)

  const { cachedImages, setCachedImages } = useContext(UserContext)

  const [dateVisual, setDateVisual] = useState(getDefaultDate)

  const date = useRef(getDefaultDate())
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)

  const [savedPageCount, setSavedPageCount] = useState(0)
  const [showProgress, setShowProgress] = useState(false)

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  })

  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState(false)
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
        console.log(response)
      }
    )

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

  const backArrow = () => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Gallery')}>
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

  const SENDITTOME = () => {
    // onsole.log(date.current.toLocaleDateString(), date.current.toLocaleTimeString)
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: 8,
        }}
      >
        <Button
          color="#3cb043"
          title="Remind me!"
          onPress={submit}
          style={{ marginHorizontal: 50 }}
        />
      </View>
    )
  }

  const submit = async () => {
    const gid = await saveToFirebase()
    // console.log(date)
    scheduleATonOfPushNotifications(date.current, gid)
  }

  const urgency = {
    low: 'You have work due soon! 🙂',
    mid: 'You have work due very soon! ⚠️',
    high: 'You have work due immediately! 🚨',
  }

  const scheduleATonOfPushNotifications = (deliveryDate, gid) => {
    console.log('asdf', deliveryDate)
    const delivery = deliveryDate.getDate()
    const start = new Date().getDate()
    const diff = delivery - start
    console.log(diff)
    for (let i = diff; i >= 0; i--) {
      console.log(i)
      const deliveryInstance = new Date(deliveryDate.getTime())
      deliveryInstance.setDate(delivery - i)
      let title, body
      if (diff == 0) {
        title = urgency['high']
        body = 'You schedule this reminder earlier today. It is due now.'
      } else if (i == 0) {
        title = urgency['high']
        body = `You scheduled this reminder ${
          diff - i
        } days ago. It is due now.`
      } else if (i <= 2) {
        title = urgency['mid']
        body = `You scheduled this reminder ${
          diff - i
        } days ago. It is due in ${i} days.`
      } else {
        title = urgency['low']
        body = `You scheduled this reminder ${
          diff - i
        } days ago. It is due in ${i} days.`
      }

      /*
      const dDays = diff - i
      const dHours = deliveryInstance.getHours()
      const dMinutes = deliveryInstance.getMinutes()

      console.log(deliveryInstance, dDays, dHours, dMinutes)
      */
      const secsToNotify = (deliveryInstance.getTime() - Date.now()) / 1000

      console.log(secsToNotify)
      console.log(new Date().toLocaleString())

      schedulePushNotification({
        title,
        body,
        data: { groupId: gid },
        trigger: {
          seconds: secsToNotify,
        },
      })

      console.log(title, body, gid, deliveryInstance.toLocaleString())
    }
  }

  const saveToFirebase = async () => {
    setShowProgress(true)

    const groupId = uuidv1()

    for (let i = 0; i < cachedImages.length; ++i) {
      await uploadFile(cachedImages[i].uri, groupId)
      setSavedPageCount(i + 1)
    }

    await firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .collection('work')
      .doc(groupId)
      .set(
        {
          remindAt: date.current.getTime() / 1000,
        },
        { merge: true }
      )

    await firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .set(
        {
          saveTimes: firebase.firestore.FieldValue.arrayUnion(Date.now()),
        },
        { merge: true }
      )

    setTimeout(() => {
      setShowProgress(false)
      setCachedImages([])
      navigation.navigate('Home')
    }, 1000)

    return groupId
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date.current
    setShow(false)

    setDateVisual(currentDate)
    date.current = currentDate
  }

  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }

  const showDatepicker = () => {
    showMode('date')
  }

  const showTimepicker = () => {
    showMode('time')
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: backArrow,
      headerRight: SENDITTOME,
      headerTitle: '',
    })
  }, [navigation])

  return (
    <>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.text}>Remind me</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>on</Text>
          {/* <Button style={styles.display} onPress={showDatepicker} title={date.toLocaleDateString()} /> */}
          <TouchableOpacity style={styles.display} onPress={showDatepicker}>
            <Text style={{ fontSize: 30, color: '#fff' }}>
              {dateFormat(dateVisual)}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>at</Text>
          {/* <Button style={styles.display} onPress={showTimepicker} title={date.toLocaleTimeString()} /> */}
          <TouchableOpacity style={styles.display} onPress={showTimepicker}>
            <Text style={{ fontSize: 30, color: '#fff' }}>
              {timeFormat(dateVisual)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateVisual}
          mode={mode}
          display="default"
          onChange={onChange}
        />
      )}

      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
        }}
      >
        {showProgress && (
          <>
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <Text style={{ fontSize: 30 }}>Uploading...</Text>
            </View>

            <ProgressBar
              style={{
                height: 20,
              }}
              progress={savedPageCount / cachedImages.length}
              color="#3CB043"
            />
          </>
        )}
      </View>
    </>
  )
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
    console.log(token)
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

export default Staging
