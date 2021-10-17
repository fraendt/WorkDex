import React, { useContext } from 'react';
import UserContext from '../components/UserContext';
import { View, Text, Image } from 'react-native';



const Gallery = ({ navigation }) => {

  const { cachedImages, setCachedImages } = useContext(UserContext);
  console.log(cachedImages);

  return (
    <View>
      {cachedImages.map((val, idx) => {return (
        // <Text key={idx}>{val.base64}</Text>
        <Image source={val} key={idx}/>
      )})}
    </View>
  )
}

export default Gallery;