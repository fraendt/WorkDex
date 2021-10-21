import React, { useContext } from 'react';
import UserContext from '../components/UserContext';
import { View, Text, Image } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';



const Gallery = ({ navigation }) => {

  const { cachedImages, setCachedImages } = useContext(UserContext);
  console.log(cachedImages);

  if (0) return (
    <View>
      {cachedImages.map((val, idx) => {return (
        // <Text key={idx}>{val.base64}</Text>
        <Image source={val} key={idx}/>
      )})}
    </View>
  )

  return (
    <Swipeable>
      
    </Swipeable>
  )
}

export default Gallery;