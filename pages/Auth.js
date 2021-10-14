import React, { useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import * as Google from 'expo-auth-session/providers/google'
import * as GoogleAuth from 'expo-google-app-auth'
import * as WebBrowser from 'expo-web-browser'
import firebase from 'firebase/app'
import 'firebase/auth'
import styles from './css/Styles'
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
import GoogleLogo from '../components/GoogleLogo' // '../public/assets/google_logo.svg'
import WorkDexLogo from '../components/WorkDexLogo'

WebBrowser.maybeCompleteAuthSession()

const Auth = ({ navigation }) => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    // expoClientId: '391495645952-nkjm6v4e1il9nrpp0nvagtn9pbkd5be8.apps.googleusercontent.com',
    // iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    androidClientId:
      '391495645952-prcjqrbuh7u9ami41qk63iqkc7f7ff08.apps.googleusercontent.com',
    // webClientId: '391495645952-93ae99mb8sqjo713s70jep9afisqn3b9.apps.googleusercontent.com',
    clientId:
      '391495645952-7mb5miv1echiutbv35um4158acmbdm64.apps.googleusercontent.com',
  })

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params

      const provider = new firebase.auth.GoogleAuthProvider()

      const credential = provider.credential(id_token)

      firebase.auth().signInWithCredential(credential)
    }
  }, [response])

  // const signInWithGoogle = async () => {
  //   try {
  //     const result = await GoogleAuth.logInAsync({
  //       expoClientId: '391495645952-nkjm6v4e1il9nrpp0nvagtn9pbkd5be8.apps.googleusercontent.com',
  //       androidClientId: '391495645952-prcjqrbuh7u9ami41qk63iqkc7f7ff08.apps.googleusercontent.com',
  //       webClientId: '391495645952-93ae99mb8sqjo713s70jep9afisqn3b9.apps.googleusercontent.com',
  //       scopes: ['profile', 'email'],
  //     })

  //     if (result.type === 'success') {
  //       // console.log('success', result)
  //       // Get credentials
  //       const credential = firebase.auth.GoogleAuthProvider.credential(
  //         data.idToken,
  //         data.accessToken
  //       )
  //       // Use credentials to login to firebase
  //       firebase.auth().signInWithCredential(credential)
  //     }
  //   } catch ({ message }) {
  //     alert('login: Error:' + message)
  //   }
  // }

  let [fontsLoaded] = useFonts({
    Roboto: require('../public/fonts/Roboto/Roboto-Medium.ttf'),
  })

  if (!fontsLoaded) {
    return <Text>App loading...</Text>
  }

  return (
    <View style={styles.container}>
      <WorkDexLogo />
      <TouchableOpacity
        style={styles.googleButton}
        onPress={() => {
          promptAsync({ useProxy: true })
        }}
        underlayColor="clear"
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'auto',
            flex: 1,
          }}
        >
          <GoogleLogo />
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Auth
