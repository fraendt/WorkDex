import React, { useContext } from 'react';
import UserContext from '../components/UserContext';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'

import { v1 as uuidv1 } from 'uuid'

// temporary backend mechanism to prove backend works while ui is being finished

const SaveImages = ({ navigation }) => {

  const { cachedImages, setCachedImages } = useContext(UserContext);

  const saveToFirebase = () => {
    console.log(cachedImages)
    
    let storageRef = firebase.storage().ref(`${firebase.auth().currentUser.uid}/files`)

    cachedImages.map(({ base64 }, idx) => {
      console.log(idx, base64.substr(22))
      storageRef.child(`${uuidv1()}`)
        .putString(base64.substr(22), 'base64', {
          contentType: 'image/png'
        })
        .then(() => {
          storageRef.child(`${uuidv1()}`).getDownloadURL()
          .then((url) => {
            console.log(url)
          })
        })
    })
  }

  return (
    <View style={{padding: "20px"}}>
      <TouchableHighlight onPress={() => {saveToFirebase()}}>
        <Text style={{ borderWidth: 'none' }}>
          Yeet
        </Text>
      </TouchableHighlight>
    </View>
  )
}

export default SaveImages;