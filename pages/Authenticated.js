import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Home from './Home'
import Schedule from './Schedule'
import CameraPage from './CameraPage'
import Gallery from './Gallery'
import UserContext from '../components/UserContext'

import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import Notify from './Notify'
import SaveImages from './SaveImages'

const Drawer = createDrawerNavigator()

const Authenticated = ({ navigation }) => {
  const [cachedImages, setCachedImages] = useState([]);
  return (
    <UserContext.Provider value={{cachedImages, setCachedImages}}>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Schedule" component={Schedule} />
          <Drawer.Screen name="Camera" component={CameraPage} options={{headerShown: false}} />
          <Drawer.Screen name="Gallery" component={Gallery} />
          <Drawer.Screen name="Notifications" component={Notify} />
          <Drawer.Screen name="Save Images" component={SaveImages} />
        </Drawer.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}


export default Authenticated
