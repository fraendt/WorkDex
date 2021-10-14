import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import styled from 'styled-components/native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import Home from './pages/Home'
import Schedule from './pages/Schedule'
import Icon from 'react-native-vector-icons/Octicons'
import CameraPage from './pages/CameraPage'
import UserContext from './components/UserContext'
import Gallery from './pages/Gallery'

import Auth from './pages/Auth'
import Loading from './pages/Loading'
import Authenticated from './pages/Authenticated'

import firebase from 'firebase/app'

import firebaseConfig from './firebase-config'
import { LogBox } from 'react-native'

LogBox.ignoreLogs(['Setting a timer'])
LogBox.ignoreLogs(['Animated:'])
LogBox.ignoreAllLogs()

firebase.initializeApp(firebaseConfig)

const AppSwitchNavigator = createSwitchNavigator({
  Loading: Loading,
  Auth: Auth,
  Authenticated: Authenticated,
})

const AppNavigator = createAppContainer(AppSwitchNavigator)

export default function App() {
  return <AppNavigator />
}
