import React from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import shelter from '../assets/images/shelter.png'
import wowImoticon from '../assets/images/wowimoticon.png'
import cloud1 from '../assets/images/cloud1.png'

const device_width = Dimensions.get('window').width
const device_height = Dimensions.get('window').height

function Main() {

  return (
    <LinearGradient colors={['#A1D1E7', '#CDE4EE']} style={styles.linearGradient}>
      <Image source={cloud1} style={styles.cloud1} resizeMode="contain" />
      <Image source={cloud1} style={styles.cloud2} resizeMode="contain" />
      <View style={styles.profileButton}>
        <TouchableOpacity>
          <View>
            <View style={styles.profileBackground}></View>
            <Image
              source={wowImoticon}
              style={styles.profileImoticon}
            />
            <View style={styles.profileMeArea}>
              <Text style={styles.profileMeText}>me</Text>
            </View>
          </View>

        </TouchableOpacity>
      </View>

      <View style={styles.raderArea}>
        <View style={styles.shelterArea}>
          <Image
            source={shelter}
            style={styles.shelterImage}
          ></Image>
        </View>
        <View style={styles.rader}>

        </View>
        <View style={styles.scopes}>
          <Text style={{ marginRight: 20, transform: [{ rotate: '30deg' }] }}>20m</Text>
          <Text style={{ marginRight: 20, transform: [{ rotate: '10deg' }] }}>100m</Text>
          <Text style={{ marginRight: 20, transform: [{ rotate: '-10deg' }] }}>500m</Text>
          <Text style={{ transform: [{ rotate: '-30deg' }] }}>2km</Text>
        </View>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  cloud1: {
    position: "absolute",
    width: device_width * 0.3
  },
  cloud2: {
    bottom: 30,
    right: 30,
    position: "absolute",
    width: device_width * 0.4
  },
  linearGradient: {
    flex: 1,
  },
  profileButton: {
    flex: 0.05,
    alignItems: "flex-end",
  },
  profileBackground: {
    position: "absolute",
    backgroundColor: 'white',
    borderRadius: Math.round(device_width + device_height) / 2,
    top: device_height * 0.02 - 2,
    right: device_width * 0.03 - 2.5,
    width: 45,
    height: 45,
    // width: device_width * 0.11,
    // height: device_width * 0.11,
  },
  profileImoticon: {
    marginTop: device_height * 0.02,
    marginRight: device_width * 0.03,
    width: 40,
    height: 40,
    // width: device_width * 0.1,
    // height: device_width * 0.1
  },
  profileMeArea: {
    backgroundColor: 'white',
    borderRadius: Math.round(device_width + device_height) / 2,
    borderColor: "black",
    borderWidth: 1.5,
    position: "absolute",
    top: device_height * 0.02 + 25,
    right: device_width * 0.03 - 7,
    width: 20,
    height: 20,
    // width: device_width * 0.05,
    // height: device_width * 0.05,
    justifyContent: "center",
    alignItems: "center"
  },
  profileMeText: {
    fontSize: 10,
    marginBottom: 2
  },
  raderArea: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',

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
  shelterArea: {
    alignItems: 'flex-end',
    position: 'absolute',
    top: device_height * 0.12,
    width: device_width * 0.8
  },
  shelterImage: {
    width: device_width * 0.08,
    height: device_width * 0.08
  },
  scopes: {
    flexDirection: "row",
    marginTop: 10
  }




});


export default Main;