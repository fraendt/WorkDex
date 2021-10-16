import React, { useEffect, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
    flexWrap: 'none',
  },
  button: {
    display: 'grid',
    gridGap: '18px',
    gridTemplateColumns: '50px 250px',
    borderRadius: '5px',
    border: '1px solid lightgray',
    paddingHorizontal: '8px',
    paddingVertical: '24px',
    backgroundColor: '#fff',
    boxShadow: '8px 8px 6px #888888',
    cursor: 'pointer',
  },
  icon: {
    backgroundImage: 'conic-gradient(from -45deg, #ea4335 110deg, #4285f4 90deg 180deg, #34a853 180deg 270deg, #fbbc05 270deg)',
    backgroundPosition: '73% 55%',
    backgroundSize: '150% 150%',
    backgroundRepeat: 'no-repeat',
    backgroundClip: 'text',
    color: 'transparent',
    margin: 'auto',
  },
  centerText: {
    margin: 'auto',
    fontFamily: 'Roboto_500Medium',
    fontSize: '30px',
    display: 'block'
  }
});

const Auth = ({ navigation }) => {

  const loginWithGoogle = () => {
    console.log(12)
  }

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <View>
          <FontAwesome style={styles.icon} name="google" size={50} />
        </View>
        <Text style={styles.centerText}>
          Sign in with Google
        </Text>
      </View>
    </View>
  )
}

export default Auth;