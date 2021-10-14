import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CameraPage from './CameraPage'
import Gallery from './Gallery'
import Staging from './Staging'
import Assignment from './Assignment'

const Stack = createNativeStackNavigator()

const CameraStack = ({ navigation }) => {
  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('tabPress', (e) => {
  //     // e.preventDefault();
  //     console.log('navigating to camera')
  //     navigation.navigate('CameraPage')
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#fff' },
        headerTintColor: '#000',
      }}
    >
      <Stack.Screen
        name="CameraPage"
        component={CameraPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Gallery" component={Gallery} />
      <Stack.Screen name="Upload" component={Staging} />
      <Stack.Screen name="Assignment" component={Assignment} />
    </Stack.Navigator>
  )
}

export default CameraStack
