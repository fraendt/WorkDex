import React, { useContext, useState } from 'react';
import UserContext from '../components/UserContext';
import { View, Text, Image, Animated, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { ScrollView } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  actionText: {
    
  }
})

const Gallery = ({ navigation }) => {
  
  const { cachedImages, setCachedImages } = useContext(UserContext);
  const [imageIndex, setIndex] = useState(cachedImages.length-1)
  const [debug, setDebug] = useState(height)
  
  const direction = () => {
    const figureHorizontalDirection = (delta) => (delta > 0 ? 'SWIPE_RIGHT' : 'SWIPE_LEFT');
    const figureVerticalDirection = (delta) => (delta > 0 ? 'SWIPE_DOWN' : 'SWIPE_UP');

    const dx = this.endX - this.startX;
    const dy = this.endY - this.startY;

    return Math.abs(dx) > Math.abs(dy) ? figureHorizontalDirection(dx) : figureVerticalDirection(dy);
  };

  console.log(cachedImages);
  const onSwipe = (gestureName, gestureState) => {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    console.log(gestureState)
    switch (gestureName) {
      case SWIPE_UP:
        console.log("up")
        break;
      case SWIPE_DOWN:
        console.log("down")
        break;
      case SWIPE_LEFT:
        console.log("left")
        if (imageIndex != 0) setIndex(imageIndex-1)
        break;
      case SWIPE_RIGHT:
        console.log("right")
        if (imageIndex != cachedImages.length-1) setIndex(imageIndex+1)
        break;
    }
    console.log(imageIndex)
  }
  return (
    <GestureRecognizer
      onSwipe={(direction, state) => onSwipe(direction, state)}
      onTouchStart={(event) => {
        this.startX = event.nativeEvent.pageX;
        this.startY = event.nativeEvent.pageY;
      }}
      onTouchEnd={(event) => {
        this.endX = event.nativeEvent.pageX;
        this.endY = event.nativeEvent.pageY;

        const d = direction();

        if (d === 'SWIPE_UP') {
            this.onSwipeUp();
        } else if (d === 'SWIPE_DOWN') {
            this.onSwipeDown();
        }
      }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'yellow',
      }}
    >
      <View>
        <Text>{debug}</Text>
        {/* <Image 
          source={cachedImages[imageIndex]}
          style={{
            padding: 1,
            height: Dimensions.get('window').height - 10,
          }}
        /> */}
        <ImageBackground
          source={cachedImages[imageIndex]}
          resizeMode="contain"
          style={{
            width: '100%',
            height: 200,
          }}
        />
      </View>
    </GestureRecognizer>

    // <ScrollView  // primitive
    //   horizontal={true}
    //   styles={{
    //     width: '100%'
    //   }}
    // >
    //   {cachedImages.map((val, idx) => {return (
    //       <Image source={val} key={idx}/>
    //   )})}
    // </ScrollView>

  )
}

export default Gallery;