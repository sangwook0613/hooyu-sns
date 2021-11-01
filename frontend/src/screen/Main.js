import React, { useState, useEffect } from 'react';
import { Dimensions, PermissionsAndroid, Platform } from 'react-native';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import shelter from '../assets/images/shelter.png'
import wowImoticon from '../assets/images/wowimoticon.png'
import cloud1 from '../assets/images/cloud1.png'
import AddButton from '../assets/images/add.png'
import Geolocation from 'react-native-geolocation-service'
import amazingEmozi from '../assets/images/amazing2.png'


const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
const radarWidth = Dimensions.get('window').width * 0.7
const mainColor1 = '#A1D1E7'
const mainColor2 = '#71D2FF'
const mainColor3 = '#FDA604'

const nearUsers = [
  {
    name: '나승호',
    x: 20,
    y: 2,
  },
  {
    name: '류현선',
    x: 17,
    y: 2,
  },
  {
    name: '김승현',
    x: 0,
    y: -7,
  },
  {
    name: '최다윗',
    x: -12,
    y: -3,
  },
  {
    name: '박상욱',
    x: 4,
    y: 9,
  }
]


function Main() {

  const [location, setLocation] = useState('unknown')
  const [radarX, setRadarX] = useState(0)
  const [radarY, setRadarY] = useState(0)
  const [radarWidth, setRadarWidth] = useState(0)

  const [users, setUsers] = useState([])

  async function requestPositionPermissions() {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'whenInUse',
      });
    }
  
    if (Platform.OS === 'android') {
      const locationGranted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);
      if (
        locationGranted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED &&
        locationGranted['android.permission.ACCESS_COARSE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
        ) {
        return true
      } else {
        return false
      }
    }
  }

   // 라디안으로 변환
  function deg2rad(deg) {
    return deg * Math.PI / 180
  }

  // 디그리로 변환
  function rad2deg(deg) {
    return deg * 180 / Math.PI
  }

  function distance(lat1, lon1, lat2, lon2) {
    const theta = lon1 - lon2
    const rad_lat1 = deg2rad(lat1)
    const rad_lat2 = deg2rad(lat2)
    const rad_lon1 = deg2rad(lon1)
    const rad_lon2 = deg2rad(lon2)

    let dist = Math.sin(rad_lat1) * Math.sin(rad_lat2) + Math.cos(rad_lat1) * Math.cos(rad_lat2) * Math.cos(deg2rad(theta))

    const y = Math.sin(rad_lon2 - rad_lon1) * Math.cos(rad_lat2)
    const x = Math.cos(rad_lat1) * Math.sin(rad_lat2) - Math.sin(rad_lat1) * Math.cos(rad_lat2) * Math.cos(rad_lon2 - rad_lon1)

    const bangwee = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360

    dist = Math.acos(dist)
    dist = rad2deg(dist)
    dist = dist * 60 * 1.1515 * 1609.344

    if (bangwee < 90) {
      const r = deg2rad(bangwee)
      const x_dist = dist * Math.sin(r)
      const y_dist = -dist * Math.cos(r)
      return [x_dist, y_dist, bangwee]
    }
    else if (bangwee < 180) {
      const r = deg2rad(bangwee - 90)
      const x_dist = dist * Math.sin(r)
      const y_dist = dist * Math.cos(r)
      return [x_dist, y_dist, bangwee]
    }
    else if (bangwee < 270) {
      const r = deg2rad(bangwee - 180)
      const x_dist = -dist * Math.sin(r)
      const y_dist = dist * Math.cos(r)
      return [x_dist, y_dist, bangwee]
    }
    else {
      const r = deg2rad(bangwee - 270)
      const x_dist = -dist * Math.sin(r)
      const y_dist = -dist * Math.cos(r)
      return [x_dist, y_dist, bangwee]
    }

  }

  useEffect(() => {
    requestPositionPermissions()
      .then((didGetPermission) => {
        if (didGetPermission) {
          Geolocation.getCurrentPosition( position => {
            const { latitude, longitude } = position.coords
            setLocation({
              latitude,
              longitude
            })
            // 유저 세팅
            setUsers(nearUsers)
          },
          error => {
            console.warn(error.code, error.message)
          })
        } else {
          alert('no location permission')
        }
      })
      .catch((err) => {
        console.warn(err)
      })
  }, [])

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
        <View style={styles.radar__text}>
          <Text style={styles.radar__text__title}>내 반경안의 이웃들</Text>
          <Text style={styles.radar__text__count}>10000</Text>
        </View>
        <View style={styles.shelterArea}>
          <Image
            source={shelter}
            style={styles.shelterImage}
          ></Image>
        </View>


        <View 
        style={styles.rader}
        onLayout={({ target }) => {
          target.measure((x, y, width, height, pageX, pageY) => {
            setRadarX(x + pageX)
            setRadarY(y + pageY)
            setRadarWidth(width)
          })
        }}
        >
        </View>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={{ top: -20, marginRight: 20, transform: [{ rotate: '30deg' }] }}>20m</Text>
          <Text style={{ marginRight: 20, transform: [{ rotate: '10deg' }] }}>100m</Text>
          <Text style={{ marginRight: 20, transform: [{ rotate: '-10deg' }] }}>500m</Text>
          <Text style={{ top: -20, transform: [{ rotate: '-30deg' }] }}>2km</Text>
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
      {/* 중앙 내 이모티콘 */}
      <TouchableOpacity 
        style={{
          left: radarX + radarWidth / 2 - deviceWidth * 0.035,
          top: radarY + radarWidth / 2 - deviceWidth * 0.035,
          position: 'absolute',
          elevation: 5,
        }}
      >
        <Image
          style={{
            height: deviceWidth * 0.07,
            width: deviceWidth * 0.07,
          }}
          source={amazingEmozi}
          resizeMode="cover"
        />
      </TouchableOpacity>
      {users.map(user => (
        <TouchableOpacity
          key={user.name}
          style={{
            left: radarX + radarWidth / 2 - deviceWidth * 0.03 + (radarWidth / 2 * user.x / 23),
            top: radarY + radarWidth / 2 - deviceWidth * 0.03 + (radarWidth / 2 * user.y / 23),
            position: 'absolute',
            elevation: 5,
          }}
        >
          <Image
            style={{
              height: deviceWidth * 0.06,
              width: deviceWidth * 0.06,
            }}
            source={amazingEmozi}
            resizeMode="cover"
          />
        </TouchableOpacity>
      ))}
    </LinearGradient >
  )
}

const styles = StyleSheet.create({
  addButton: {
    alignItems: 'center',
    backgroundColor: mainColor3,
    borderRadius: 35,
    elevation: 4,
    height: deviceWidth * 0.12,
    justifyContent: 'center',
    marginTop: deviceHeight
   * 0.13,
    width: deviceWidth * 0.12,
  },
  addButtonContainer: {
    alignItems: 'center',
    flex: 0.25,
  },
  addButtonImage: {
    width: deviceWidth * 0.06,
  },
  cloud1: {
    position: "absolute",
    width: deviceWidth * 0.3
  },
  cloud2: {
    bottom: 30,
    right: 30,
    position: "absolute",
    width: deviceWidth * 0.4
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
    borderRadius: Math.round(deviceWidth + deviceHeight
    ) / 2,
    top: deviceHeight
   * 0.02 - 2,
    right: deviceWidth * 0.03 - 2.5,
    width: 45,
    height: 45,
    // width: deviceWidth * 0.11,
    // height: deviceWidth * 0.11,
  },
  profileImoticon: {
    marginTop: deviceHeight
   * 0.02,
    marginRight: deviceWidth * 0.03,
    width: 40,
    height: 40,
    // width: deviceWidth * 0.1,
    // height: deviceWidth * 0.1
  },
  profileMeArea: {
    backgroundColor: 'white',
    borderRadius: Math.round(deviceWidth + deviceHeight
    ) / 2,
    borderColor: "black",
    borderWidth: 1.5,
    position: "absolute",
    top: deviceHeight
   * 0.02 + 25,
    right: deviceWidth * 0.03 - 7,
    width: 20,
    height: 20,
    // width: deviceWidth * 0.05,
    // height: deviceWidth * 0.05,
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
    borderRadius: Math.round(deviceWidth + deviceHeight
    ) / 2,
    width: radarWidth,
    height: radarWidth,
    borderColor: mainColor3,
    borderWidth: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  radar__text: {
    alignItems: 'center',
    marginBottom: deviceHeight
   * 0.01,
  },
  radar__text__count: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 22,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5
  },
  radar__text__title: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: deviceHeight
   * 0.002,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5
  },
  shelterArea: {
    alignItems: 'flex-end',
    position: 'absolute',
    top: deviceHeight
   * 0.175,
    width: deviceWidth * 0.8
  },
  shelterImage: {
    width: deviceWidth * 0.08,
    height: deviceWidth * 0.08
  },
  scopes: {
    flexDirection: "row",
    marginTop: 10
  },
});


export default Main;