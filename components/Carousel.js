import React, { useState } from 'react'
import {
  Animated,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Text,
} from 'react-native'

// const deviceWidth = Dimensions.get('window').width
const FIXED_BAR_WIDTH = 280
const BAR_SPACE = 10

const Carousel = (props) => {
  const images = props.images
  const numItems = images.length
  const itemWidth = FIXED_BAR_WIDTH / numItems - (numItems - 1) * BAR_SPACE
  const animVal = new Animated.Value(0)
  const deviceWidth = props.width

  // const [widths, setWidths] = useState([])
  // const [heights, setHeights] = useState([])

  let imageArray = []
  let barArray = []

  images.forEach((image, i) => {
    const thisImage = (
      <Image
        key={`image${i}`}
        source={{ uri: image }}
        style={{ width: props.width, height: props.height }}
        flex={1}
        resizeMode="contain"
        style={{
          borderRadius: 7,
          height: 600,
          width: deviceWidth,
          overflow: 'hidden',
        }}
      />
    )
    //const im = Image.resolveAssetSource(exampleImage)
    // Image.getSize(image, (width, height) => {
    //   setWidths(...widths, width)
    //   setHeights(...heights, height)
    // });
    imageArray.push(thisImage)

    if (images.length > 1) {
      const scrollBarVal = animVal.interpolate({
        inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
        outputRange: [-itemWidth-5, itemWidth+5],
        extrapolate: 'clamp',
      })

      const thisBar = (
        <View
          key={`bar${i}`}
          style={[
            styles.track,
            {
              width: itemWidth,
              marginLeft: i == 0? 0 : BAR_SPACE,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.bar,
              {
                width: itemWidth+2,
                transform: [{ translateX: scrollBarVal }],
                backgroundColor: 'red',
              },
            ]}
            useNativeDriver={true}
          />
        </View>
      )

      barArray.push(thisBar)
    }
  })

  if (numItems == 0) return <></>

  return (
    <View style={{ ...styles.container, ...props.style, padding: 0 }} flex={1}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={10}
        pagingEnabled
        style={props.style}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: animVal } } }],
          { useNativeDriver: false }
        )}
      >
        {imageArray}
      </ScrollView>
      <View style={styles.barContainer}>{barArray}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barContainer: {
    position: 'absolute',
    zIndex: 2,
    bottom: 40,
    flexDirection: 'row',
  },
  skip: {
    position: 'absolute',
    zIndex: 2,
    bottom: 80,
    flexDirection: 'row',
  },
  track: {
    backgroundColor: '#ccc',
    overflow: 'hidden',
    height: 2,
  },
  bar: {
    backgroundColor: '#5294d6',
    height: 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
})

export default Carousel
