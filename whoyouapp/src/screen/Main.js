import React, { useState, useEffect, useRef } from 'react'
import { Dimensions, PermissionsAndroid, Platform } from 'react-native'
import { StyleSheet, View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Animated } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import { actionCreators } from '../store/reducers'

import shelter from '../assets/images/shelter.png'
import wowImoticon from '../assets/images/wowimoticon.png'
import Geolocation from 'react-native-geolocation-service'
import amazingEmozi from '../assets/images/amazing2.png'
import morning from '../assets/images/morning.png'
import evening from '../assets/images/evening.png'
import night from '../assets/images/night.png'
import GestureRecognizer from 'react-native-swipe-gestures'
import images from '../assets/images'

import { RadderEffect } from '../components/Main/RadderEffect'
import MainList from '../components/Main/MainList'
import ShelterList from '../components/Main/ShelterList'
import AddButton from '../components/Main/AddButton'
import axios from 'axios'


const date = new Date()

const theme = 6 <= date.getHours() && date.getHours() <= 15 ? "morning" : (16 <= date.getHours() && date.getHours() <= 19 ? 'evening' : 'night')
const mainColor1 = theme == "morning" ? "#A1D1E7" : (theme == "evening" ? '#EC5446' : '#0B1C26')
const mainColor2 = theme == "morning" ? "#CDE4EE" : (theme == "evening" ? '#F2B332' : '#293A44')
const mainColor3 = theme == "morning" ? "#FDA604" : (theme == "evening" ? '#ED5646' : '#B4B4B4')
const mainColor4 = '#E9E9E9'


function Main({ navigation: { navigate }, deviceWidth, deviceHeight, myRadius, SERVER_URL, userPK, setMyRadius}) {

  const styles = styleSheet(deviceWidth, deviceHeight, deviceWidth * 0.7)

  const [location, setLocation] = useState('unknown')
  const [radarX, setRadarX] = useState(-100)
  const [radarY, setRadarY] = useState(-100)
  const [radarWidth, setRadarWidth] = useState(-100)

  const [users, setUsers] = useState([])
  const [privateZoneUsers, setPrivateZoneUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(-1)
  const [selectedPrivateZoneUser, setSelectedPrivateZoneUser] = useState(-1)

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

  const mainListRef = useRef()
  const shelterListRef = useRef()

  useEffect(() => {
    shelterListRef.current.close()
    getLocation()
    setInterval(() => {
      getLocation()
    }, 10000);
  }, [])

  getLocation = () => {
    requestPositionPermissions()
      .then((didGetPermission) => {
        if (didGetPermission) {
          Geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords
            setLocation({
              latitude,
              longitude
            })
            // getUsers()
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
  }

  getUsers = () => {
    axios({
      method: 'post',
      url: SERVER_URL + 'user/radar',
      data: {
        list: [
        ],
        requestRadiusDto: {
          lat: 100.12354,
          lon: 100.12354,
          radius: myRadius,
          userPK: userPK
        }
      }
    })
    .then((res) => {
      setUsers(res.data.success.filter(user => user.privateZone !== true))
      setPrivateZoneUsers(res.data.success.filter(user => user.privateZone === true))
      // console.warn(res.data.success[0])
    })
    .catch((err) => {
      console.warn(err)
    })
  }

  const selectUser = (idx) => {
    setSelectedUser(idx)
  }

  const selectPrivateZoneUser = (idx) => {
    setSelectedPrivateZoneUser(idx)
  }

  return (
    <>
    <GestureRecognizer
        onSwipeUp={() => {
          shelterListRef.current.close()
          mainListRef.current.open()
        }}
        onSwipeDown={() => {
          mainListRef.current.close()
          shelterListRef.current.close()
        }}
        config={{
          velocityThreshold: 0.1,
          directionalOffsetThreshold: 50,
        }}
        style={{
          height: deviceHeight,
          width: deviceWidth,
          position: 'absolute',
          flex: 1,
        }}
      >
      <LinearGradient colors={[mainColor1, mainColor2]} style={styles.linearGradient}>
        {
        theme == "morning" 
        ? 
        <>
          <TouchableWithoutFeedback
            onPress={() => {
              mainListRef.current.close()
              shelterListRef.current.close()
            }}
          >
            <Image source={morning} style={styles.morning} resizeMode="contain" />
          </TouchableWithoutFeedback>
        </>
        :
        (theme == "evening" 
        ?
        <>
          <TouchableWithoutFeedback
            onPress={() => {
              mainListRef.current.close()
              shelterListRef.current.close()
            }}
          >
            <Image source={evening} style={styles.evening} resizeMode="contain" />
          </TouchableWithoutFeedback>
        </>
        :
        <>
          <TouchableWithoutFeedback
            onPress={() => {
              mainListRef.current.close()
              shelterListRef.current.close()
            }}
          >
            <Image source={night} style={styles.night} resizeMode="contain" />
          </TouchableWithoutFeedback>
        </>
        )
        }
        
        <View style={styles.profileButton}>
          <TouchableOpacity onPress={() => navigate("Profile", {nickname: 'HELLO', emoji: images.emoji.amazing})}>
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
          <TouchableOpacity
              style={styles.shelterArea}
              disabled={myRadius === 500 || myRadius === 2000 ? false : true }
              onPress={() => {
                mainListRef.current.close()
                shelterListRef.current.open()
              }}
            >
            <View >
              <Image
                source={shelter}
                style={[
                  styles.shelterImage, 
                  { 
                    opacity: myRadius === 500 || myRadius === 2000 ? 1 : 0.2 
                  }
                ]}
              ></Image>
            </View>
          </TouchableOpacity>

          
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
            <View
              style={{
                borderRadius: Math.round(deviceWidth + deviceHeight) / 2,
                width: radarWidth / 1.5,
                height: radarWidth / 1.5,
                borderColor: mainColor4,
                borderWidth: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  borderRadius: Math.round(deviceWidth + deviceHeight) / 2,
                  width: radarWidth / 3,
                  height: radarWidth / 3,
                  borderColor: mainColor4,
                  borderWidth: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <RadderEffect
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                ></RadderEffect>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text style={{ top: -20, marginRight: 20, transform: [{ rotate: '30deg' }] }}>20m</Text>
            <Text style={{ marginRight: 20, transform: [{ rotate: '10deg' }] }}>100m</Text>
            <Text style={{ marginRight: 20, transform: [{ rotate: '-10deg' }] }}>500m</Text>
            <Text style={{ top: -20, transform: [{ rotate: '-30deg' }] }}>2km</Text>
          </View>
        </View>

        <AddButton navigate={navigate} />

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

        {users.map((user, index) => (
          <View
            key={index}
            style={{
              position: 'absolute'
            }}
          >
            {index == selectedUser && 
              <LinearGradient
                colors={['#AB79EF', '#FC98AB']} 
                style={{
                  borderRadius: 20,
                  left: radarX + radarWidth / 2 - deviceWidth * 0.035 + (radarWidth / 2 * user.distDto.xdist / (myRadius * 115 / 100)),
                  top: radarY + radarWidth / 2 - deviceWidth * 0.035 + (radarWidth / 2 * user.distDto.ydist / (myRadius * 115 / 100)),
                  height: deviceWidth * 0.07,
                  width: deviceWidth * 0.07,
                  position: 'absolute',
                  elevation: 6,
                }}
              >
              </LinearGradient>
            }
            <TouchableOpacity
              style={{
                left: radarX + radarWidth / 2 - deviceWidth * 0.03 + (radarWidth / 2 * user.distDto.xdist / (myRadius * 115 / 100)),
                top: radarY + radarWidth / 2 - deviceWidth * 0.03 + (radarWidth / 2 * user.distDto.ydist / (myRadius * 115 / 100)),
                position: 'absolute',
                elevation: index == selectedUser ? 7 : 5,
              }}
              onPress={() => {
                selectUser(index)
                shelterListRef.current.close()
                mainListRef.current.open()
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
          </View>
        ))}
      </LinearGradient >
    </GestureRecognizer>

    <MainList 
      deviceWidth={deviceWidth}
      deviceHeight={deviceHeight}
      theme={theme}
      navigate={navigate} 
      users={users} 
      selectUser={selectUser} 
      selectedUser={selectedUser} 
      ref={mainListRef} 
    />
    <ShelterList
      deviceWidth={deviceWidth}
      deviceHeight={deviceHeight}
      theme={theme} 
      navigate={navigate}
      users={privateZoneUsers}
      selectPrivateZoneUser={selectPrivateZoneUser} 
      selectedPrivateZoneUser={selectedPrivateZoneUser} 
      ref={shelterListRef} 
    />
    </>
  )
}

const styleSheet = (deviceWidth, deviceHeight, radarWidth) => StyleSheet.create({
  evening: {
    left: deviceWidth * 0.025,
    position: "absolute",
    top: -deviceHeight * 0.2,
    width: deviceWidth * 0.95
  },
  linearGradient: {
    flex: 1,
  },
  morning: {
    left: deviceWidth * 0.025,
    position: "absolute",
    top: -deviceHeight * 0.2,
    width: deviceWidth * 0.95
  },
  night: {
    left: deviceWidth * 0.025,
    position: "absolute",
    top: -deviceHeight * 0.2,
    width: deviceWidth * 0.95
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
  },
  profileImoticon: {
    marginTop: deviceHeight
      * 0.02,
    marginRight: deviceWidth * 0.03,
    width: 40,
    height: 40,
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
})

function mapStateToProps(state) {
  return {
    deviceWidth: state.user.deviceWidth,
    deviceHeight: state.user.deviceHeight,
    myRadius: state.user.myRadius,
    SERVER_URL: state.user.SERVER_URL,
    userPK: state.user.userPK,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setMyRadius: (radius) => {
      dispatch(actionCreators.setRadius(radius))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)