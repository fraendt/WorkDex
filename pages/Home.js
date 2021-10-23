import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import firebase from 'firebase/app'
import 'firebase/auth'

const Home = ({ navigation }) => {
  return (
    <View style={{ padding: '20px',}}>
      <Text style={{ fontSize: '30px' }}>Welcome, {firebase.auth().currentUser.displayName}</Text>
    </View>
  )
}

export default Home
