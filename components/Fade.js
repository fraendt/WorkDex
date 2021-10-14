import { Animated } from 'react-native'
import React from 'react'

class Fade extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: props.visible,
      idx: props.idx,
    }
  }

  componentWillMount() {
    this._visibility = new Animated.Value(this.props.visible ? 1 : 0)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      this.setState({ visible: true })
    }
    Animated.timing(
      this._visibility,
      {
        toValue: nextProps.visible ? 1 : 0,
        duration: 500 - 20 * (this.state.idx || 0),
      },
      { useNativeDriver: false }
    ).start(() => {
      this.setState({ visible: nextProps.visible })
    })
  }

  render() {
    const { visible, style, children, ...rest } = this.props

    const containerStyle = {
      opacity: this._visibility.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      transform: [
        {
          scale: this._visibility.interpolate({
            inputRange: [0, 1],
            outputRange: [1.01, 1],
          }),
        },
      ],
    }

    const combinedStyle = [containerStyle, style]
    return (
      <Animated.View
        style={this.state.visible ? combinedStyle : containerStyle}
        {...rest}
      >
        {this.state.visible ? children : null}
      </Animated.View>
    )
  }
}

export default Fade
