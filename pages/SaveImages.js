import React, { useContext } from 'react';
import UserContext from '../components/UserContext';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

import { v1 as uuidv1 } from 'uuid'

// temporary backend mechanism to prove backend works while ui is being finished

const SaveImages = ({ navigation }) => {

  const { cachedImages, setCachedImages } = useContext(UserContext);

  const saveToFirebase = () => {
    console.log(cachedImages)
    
    let storageRef = firebase.storage().ref(`${firebase.auth().currentUser.uid}/files`)

    cachedImages.map(({ base64 }, idx) => {
      let fname = uuidv1() + ".png";

      storageRef.child(`${fname}`)                        // save image to firebase storage
        .putString(base64.substr(22), 'base64', {
          contentType: 'image/png'
        })
        .then(() => 
          storageRef.child(`${fname}`).getDownloadURL()
        )
        .then(url => {
          // save url to firestore for referencing later
          firebase.firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .collection('images')
            .doc(fname)
            .set({
              'url': url,
            })
        }).then(() => {
          // done saving
          console.log("done")
        })
    })

    // prevent duplicate saving
    setCachedImages([]);
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