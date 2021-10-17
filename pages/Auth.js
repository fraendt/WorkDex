import React, { useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import firebase from 'firebase/app'
import 'firebase/auth'
import { GoogleAuthData } from 'expo-google-sign-in'

WebBrowser.maybeCompleteAuthSession()

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
    flexWrap: 'none',
  },
  button: {
    borderRadius: '5px',
    border: '1px solid lightgray',
    backgroundColor: '#fff',
    boxShadow: '0 4px 4px -2px #888888',
    cursor: 'pointer',
  },
  buttonChild: {
    display: 'grid',
    gridGap: '18px',
    gridTemplateColumns: '50px 250px',
    paddingHorizontal: '8px',
    paddingVertical: '24px',
  },
  icon: {
    backgroundImage:
      'conic-gradient(from -45deg, #ea4335 110deg, #4285f4 90deg 180deg, #34a853 180deg 270deg, #fbbc05 270deg)',
    backgroundPosition: '73% 55%',
    backgroundSize: '150% 150%',
    backgroundRepeat: 'no-repeat',
    backgroundClip: 'text',
    color: 'transparent',
    margin: 'auto',
  },
  centerText: {
    margin: 'auto',
    fontFamily: 'Roboto_500Medium',
    fontSize: '30px',
    display: 'block',
  },
})

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
      <TouchableHighlight
        style={styles.button}
        onPress={promptAsync}
        underlayColor="clear"
      >
        <View style={styles.buttonChild}>
          <View>
            <FontAwesome style={styles.icon} name="google" size={50} />
          </View>
          <Text style={styles.centerText}>Sign in with Google</Text>
        </View>
      </TouchableHighlight>
    </View>
  )
}

export default Auth
