import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import Home from '../pages/Home'
import Schedule from '../pages/Schedule'
import Icon from 'react-native-vector-icons/Octicons'

const Drawer = createDrawerNavigator()

const MenuIcon = ({ navigate }) => (
  <Icon
    name="three-bars"
    size={30}
    color="#000"
    onPress={() => navigate('DrawerOpen')}
  />
)

const Header = (props) => {
  return (
    <NavigationContainer>
      <Icon
        name="three-bars"
        size={30}
        color="#000"
        onPress={() => navigate('DrawerOpen')}
      />
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Schedule" component={Schedule} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default Header
