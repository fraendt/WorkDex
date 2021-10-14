import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Home from './Home'
import Schedule from './Schedule'
import CameraPage from './CameraPage'
import Gallery from './Gallery'
import UserContext from '../components/UserContext'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import Notify from './Notify'
import CameraStack from './CameraStack'
import Staging from './Staging'
import { MaterialCommunityIcons } from 'react-native-vector-icons'
import Assignment from './Assignment'

// const Drawer = createDrawerNavigator()
const Drawer = createMaterialBottomTabNavigator()
const Stack = createNativeStackNavigator()

const HomeIcon = ({ color, focused }) => {
  return <MaterialCommunityIcons name="home" color={color} size={26} />
}

const Icon = (icon) => {
  return ({ color, focused }) => (
    <MaterialCommunityIcons name={icon} color={color} size={26} />
  )
}

const HomeStack = ({ navigation }) => {
  const { setParentNav } = useContext(UserContext)
  setParentNav(navigation)
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen
        name="HomePage"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Assignment" component={Assignment} />
    </Stack.Navigator>
  )
}

const Authenticated = ({ navigation }) => {
  const [cachedImages, setCachedImages] = useState([])

  return (
    <UserContext.Provider value={{ cachedImages, setCachedImages }}>
      <NavigationContainer>
        <Drawer.Navigator barStyle={{ backgroundColor: '#C32A2A' }}>
          <Drawer.Screen
            name="Home"
            component={Home}
            options={{ tabBarLabel: 'Home', tabBarIcon: HomeIcon }}
          />
          {/* <Drawer.Screen
            name="Schedule"
            component={Schedule}
            options={{ tabBarLabel: 'Schedule', tabBarIcon: Icon('calendar') }}
          /> */}
          <Drawer.Screen
            name="Camera"
            component={CameraStack}
            options={{
              tabBarLabel: 'Camera',
              tabBarIcon: Icon('camera'),
              unmountOnBlur: true,
            }}
          />
          {/* <Drawer.Screen
            name="time"
            component={Notify}
            options={{ tabBarLabel: 'time' }}
          /> */}
        </Drawer.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  )
}

export default Authenticated
