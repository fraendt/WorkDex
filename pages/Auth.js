import React, { useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import firebase from 'firebase/app'
import 'firebase/auth'
import { GoogleAuthData } from 'expo-google-sign-in'
import styles from './css/Styles'

WebBrowser.maybeCompleteAuthSession()

const Auth = ({ navigation }) => {
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

  return (
    <View style={styles.container}>
      {/* <TouchableHighlight
        style={styles.googleButton}
        onPress={promptAsync}
        underlayColor="clear"
      >
        <View style={styles.buttonChild}>
          <View>
            <FontAwesome style={styles.icon} name="google" size={50} />
          </View>
          <Text style={styles.centerText}>Sign in with Google</Text>
        </View>
        
      </TouchableHighlight> */}
      <FontAwesome.Button name='google' size={50} onPress={()=>{promptAsync()}}>
          Sign in with Google
        </FontAwesome.Button>
    </View>
  )
}

export default Auth
