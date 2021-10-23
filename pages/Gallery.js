import React, { useContext, useState } from 'react';
import UserContext from '../components/UserContext';
import { View, Text, Image, Animated, StyleSheet, Dimensions, ImageBackground, Button } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const createImageTab = (dataUri) => {
  return ({ navigation }) => <Image source={dataUri}></Image>
}

const Gallery = ({ navigation }) => {
  
  const { cachedImages, setCachedImages } = useContext(UserContext);
  const [imageIndex, setIndex] = useState(cachedImages.length-1)

  if (cachedImages.length == 0) {
    return (
      <Text>
        You have no images staged for scheduling!
      </Text>
    )
  }

  return (
    <View>
      
      <Tab.Navigator>
        { cachedImages.map((val, idx) => <Tab.Screen name={'image '+idx} component={createImageTab(val)} key={idx}/>) }
      </Tab.Navigator>
      <TouchableHighlight
        onPress={() => alert('hi')}
        style={{
          position: 'fixed',
          top: 100,
          right: 100,
          borderRadius: 7,
          borderWidth: 1,
        }}
      >
        <View>
          <Text style={{
            color: '#3CB043',
            margin: 3,
            fontWeight: 10,
          }}>
            Next
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  )
}

export default Gallery;