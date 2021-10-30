import React from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, View, Text, Button } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


const device_width = Dimensions.get('window').width
const device_height = Dimensions.get('window').height

function Main() {

  return (
    <LinearGradient colors={['#A1D1E7', '#CDE4EE']} style={styles.linearGradient}>
      <View style={styles.profileButton}>
        <Text >프로필</Text>
      </View>
      <View style={{
        flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View style={styles.rader}>
          
        </View>
        <View style={{flexDirection: "row", marginTop: 10}}>
          <Text style={{marginRight: 20, transform: [{ rotate: '30deg'}]}}>20m</Text>
          <Text style={{marginRight: 20, transform: [{ rotate: '10deg'}]}}>100m</Text>
          <Text style={{marginRight: 20, transform: [{ rotate: '-10deg'}]}}>500m</Text>
          <Text style={{transform: [{ rotate: '-30deg'}]}}>2km</Text>
        </View>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  rader: {
    borderRadius: Math.round(device_width + device_height) / 2,
    width: device_width * 0.7,
    height: device_width * 0.7,
    borderColor: "#FDA604",
    borderWidth: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileButton: {
    flex:0.05,
    alignItems: "flex-end",
  },

  button20m: {
  }


});


export default Main;