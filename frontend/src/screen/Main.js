import React from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, View, Text, Button, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AddButton from '../assets/images/add.png'


const device_width = Dimensions.get('window').width
const device_height = Dimensions.get('window').height
const mainColor1 = '#A1D1E7'
const mainColor2 = '#71D2FF'
const mainColor3 = '#FDA604'

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
          <Text style={{top: -20, marginRight: 20, transform: [{ rotate: '30deg'}]}}>20m</Text>
          <Text style={{marginRight: 20, transform: [{ rotate: '10deg'}]}}>100m</Text>
          <Text style={{marginRight: 20, transform: [{ rotate: '-10deg'}]}}>500m</Text>
          <Text style={{top: -20, transform: [{ rotate: '-30deg'}]}}>2km</Text>
        </View>
      </View>
      <View
        style={styles.addButtonContainer}
      >
        <TouchableOpacity style={styles.addButton}>
          <Image 
            style={styles.addButtonImage}
            source={AddButton}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  addButton: {
    alignItems: 'center',
    backgroundColor: mainColor3,
    borderRadius: 35,
    elevation: 4,
    height: device_width * 0.12,
    justifyContent: 'center',
    marginTop: device_height * 0.13,
    width: device_width * 0.12,
  },
  addButtonContainer: {
    alignItems: 'center',
    flex: 0.25,
  },
  addButtonImage: {
    width: device_width * 0.06,
  },
  linearGradient: {
    flex: 1,
  },
  profileButton: {
    flex:0.05,
    alignItems: "flex-end",
  },
  rader: {
    borderRadius: Math.round(device_width + device_height) / 2,
    width: device_width * 0.7,
    height: device_width * 0.7,
    borderColor: mainColor3,
    borderWidth: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
});


export default Main;