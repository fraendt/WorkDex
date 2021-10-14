import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'

import firebase from 'firebase/app'
import 'firebase/auth'

const Loading = ({ navigation: { navigate } }) => {
  const loginHandler = () => {
    firebase.auth().onAuthStateChanged((u) => {
      if (u) navigate('Authenticated')
      else navigate('Auth')
    })
  }

  useEffect(() => {
    loginHandler()
  }, [])

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Loading
