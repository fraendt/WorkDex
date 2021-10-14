import React, { useState, useRef, useEffect } from 'react'
import * as Notifications from 'expo-notifications'
import { Button, Platform, View, Text } from 'react-native'
import Constants from 'expo-constants'
import { TouchableHighlight } from 'react-native-gesture-handler'

// console.log(Platform.OS)
// "web" for web
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const Notify = ({ navigation }) => {
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

  const notif = new firebase.notifications.Notification().setTitle('help')

  notif.android.setBigPicture(
    'https://pbs.twimg.com/profile_images/1379253140516700169/aG8Tu1K6.jpg'
  )

  firebase.notifications().displayNotification(notif)

  return (
    <View>
      <TouchableHighlight
        onPress={schedulePushNotification}
        style={{ marginTop: 100 }}
      >
        <View>
          <Text>notification test</Text>
        </View>
      </TouchableHighlight>
    </View>
  )
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
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

export default Notify
