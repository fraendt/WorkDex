import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
  },
  googleButton: {
    borderRadius: 5,
    // border: '1px solid lightgray',
    borderWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: '#fff',
    shadowColor: '#888888',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    // boxShadow: '0 4px 4px -2px #888888',
    // cursor: 'pointer',
  },
  buttonChild: {
    // display: 'grid',
    // gridGap: '18px',
    // gridTemplateColumns: '50px 250px',
    // paddingHorizontal: '8px',
    // paddingVertical: '24px',
  },
  // icon: {
  //   backgroundImage:
  //     'conic-gradient(from -45deg, #ea4335 110deg, #4285f4 90deg 180deg, #34a853 180deg 270deg, #fbbc05 270deg)',
  //   backgroundPosition: '73% 55%',
  //   backgroundSize: '150% 150%',
  //   backgroundRepeat: 'no-repeat',
  //   backgroundClip: 'text',
  //   color: 'transparent',
  //   margin: 'auto',
  // },
  centerText: {
    margin: 'auto',
    fontFamily: 'Roboto',
    fontSize: 30,
  },
})

export default styles;