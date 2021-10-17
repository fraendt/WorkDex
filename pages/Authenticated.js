import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Home from './Home';
import Schedule from './Schedule';
import CameraPage from './CameraPage';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const Authenticated = ({ navigation }) => {
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="Schedule" component={Schedule} />
                <Drawer.Screen name="Camera" component={CameraPage} options={{ headerShown: false }} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default Authenticated;











