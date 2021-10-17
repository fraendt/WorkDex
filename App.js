import { StatusBar } from 'expo-status-bar';
import React, { useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';
import Header from './components/Header';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';


import Auth from './pages/Auth';
import Loading from './pages/Loading';
import Authenticated from './pages/Authenticated';

import firebase from 'firebase/app'

import firebaseConfig from './firebase-config'


firebase.initializeApp(firebaseConfig)

const Container = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
`;
const TextStyled = styled.Text`
  font-size: 18px;
  color: blue;
  font-weight: 500;
`;


const AppSwitchNavigator = createSwitchNavigator({
  Loading: Loading,
  Auth: Auth,
  Authenticated: Authenticated
})

const AppNavigator = createAppContainer(AppSwitchNavigator);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App() {
  return (
    <AppNavigator />
  );
}