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
    borderRadius: 3,
    // border: '1px solid lightgray',
    borderWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: '#4285F4',
    shadowColor: '#888888',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    // boxShadow: '0 4px 4px -2px #888888',
    // cursor: 'pointer',
  },
  googleImage: {
    width: 500,
    height: 100,
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
  googleButtonText: {
    margin: 'auto',
    marginLeft: 5,
    marginRight: 10,
    fontFamily: 'Roboto',
    fontSize: 16,
    color: "#fff",
    
  },
})

export default styles;