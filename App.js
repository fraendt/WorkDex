import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';
import Header from './components/Header';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import Icon from 'react-native-vector-icons/Octicons';
import CameraPage from './pages/CameraPage';

const Drawer = createDrawerNavigator();
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

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Schedule" component={Schedule} />
        <Drawer.Screen name="Camera" component={CameraPage} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
