import React, { useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, Image } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import firebase from 'firebase/app'
import 'firebase/auth'
import styles from './css/Styles'
import GoogleSignInLogo from '../public/GoogleSignInLogo'
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
import GoogleDark from '../public/GoogleDark'



const Auth = ({ navigation }) => {
  WebBrowser.maybeCompleteAuthSession()
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    // expoClientId: '391495645952-nkjm6v4e1il9nrpp0nvagtn9pbkd5be8.apps.googleusercontent.com',
    // iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    // androidClientId: '391495645952-prcjqrbuh7u9ami41qk63iqkc7f7ff08.apps.googleusercontent.com',
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

  let [fontsLoaded] = useFonts({
    'Roboto': require('../public/fonts/Roboto/Roboto-Medium.ttf'),
  })

  if (!fontsLoaded) {
    return <Text>App loading...</Text>
  }

  return (
    <View style={styles.container}>
      <TouchableNativeFeedback
        style={styles.googleButton}
        onPress={promptAsync}
        underlayColor="clear"
      > 
        <View style={{flexDirection: "row"}}>
          <GoogleDark />
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </View>
      </TouchableNativeFeedback>

    </View>
  )
}

export default Auth
