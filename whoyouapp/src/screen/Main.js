import React, { useState, useEffect, useRef } from 'react'
import { Alert, AppState, BackHandler, Dimensions, LogBox } from 'react-native'
import { StyleSheet, View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Animated } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import { actionCreators } from '../store/reducers'

import shelter from '../assets/images/shelter.png'
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
import * as TaskManager from 'expo-task-manager'
import * as Location from 'expo-location'
import * as emojiImages from '../assets/images'


import api from '../utils/api'

const date = new Date()

const theme = 6 <= date.getHours() && date.getHours() <= 15 ? "morning" : (16 <= date.getHours() && date.getHours() <= 19 ? 'evening' : 'night')
const mainColor1 = theme == "morning" ? "#A1D1E7" : (theme == "evening" ? '#EC5446' : '#0B1C26')
const mainColor2 = theme == "morning" ? "#CDE4EE" : (theme == "evening" ? '#F2B332' : '#293A44')
const mainColor3 = theme == "morning" ? "#FDA604" : (theme == "evening" ? '#ED5646' : '#B4B4B4')
const mainColor4 = '#E9E9E9'
// 선택 안된 반경
const mainColor5 = theme == "morning" ? "#B2B2B2" : (theme == "evening" ? '#FFFFFF' : '#B2B2B2')
// 선택 된 반경
const mainColor6 = theme == "morning" ? "#000000" : (theme == "evening" ? '#000000' : '#FFFFFF')
// 선택 된 반경 옆 표시색
const mainColor7 = theme == "morning" ? "#FDA604" : (theme == "evening" ? '#ED5646' : '#FFFFFF')

const testUsers = [
  {
    "contentTime": {
      "images": "2021-11-12T00:50:41.862085",
      "recent": "2021-11-12T01:11:20.115517",
      "status": "2021-11-12T01:19:20.115517",
      "survey": null,
    },
    "distDto": {
      "dist": 1024.26937672832003,
      "xdist": 1521.99639309943186,
      "ydist": 101.848937014469676,
    },
    "emoji": "angry",
    "name": "asdad",
    "privateZone": false,
  },
  {
    "contentTime": {
      "images": "2021-11-12T00:50:41.862085",
      "recent": "2021-11-12T01:12:20.115517",
      "status": "2021-11-12T01:19:20.115517",
      "survey": null,
    },
    "distDto": {
      "dist": 924.26937672832003,
      "xdist": 1321.99639309943186,
      "ydist": 81.848937014469676,
    },
    "emoji": "angry",
    "name": "asdad",
    "privateZone": false,
  },
  {
    "contentTime": {
      "images": "2021-11-12T00:50:41.862085",
      "recent": "2021-11-12T01:13:20.115517",
      "status": "2021-11-12T01:19:20.115517",
      "survey": null,
    },
    "distDto": {
      "dist": 824.26937672832003,
      "xdist": 1061.99639309943186,
      "ydist": 51.848937014469676,
    },
    "emoji": "angry",
    "name": "asdad",
    "privateZone": false,
  },
  {
    "contentTime": {
      "images": "2021-11-12T00:50:41.862085",
      "recent": "2021-11-12T01:17:20.115517",
      "status": "2021-11-12T01:19:20.115517",
      "survey": null,
    },
    "distDto": {
      "dist": 724.26937672832003,
      "xdist": 851.99639309943186,
      "ydist": 41.848937014469676,
    },
    "emoji": "angry",
    "name": "asdad",
    "privateZone": false,
  }
]


const Main = ({ navigation: { navigate }, deviceWidth, deviceHeight, myRadius, SERVER_URL, userPK,userEmoji, setMyRadius }) => {

  LogBox.ignoreAllLogs()

  const styles = styleSheet(deviceWidth, deviceHeight, deviceWidth * 0.7)

  const [radarX, setRadarX] = useState(-100)
  const [radarY, setRadarY] = useState(-100)
  const [radarWidth, setRadarWidth] = useState(-100)

  const [users, setUsers] = useState([])
  const [privateZoneUsers, setPrivateZoneUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(-1)
  const [selectedPrivateZoneUser, setSelectedPrivateZoneUser] = useState(-1)

  const mainListRef = useRef()
  const shelterListRef = useRef()
  const appState = useRef(AppState.currentState)
  const isInitialMount = useRef(true)

  const FOREGROUND_LOCATION_TASK = 'foreground-location-task'
  const BACKGROUND_LOCATION_TASK = 'background-location-task'

  useEffect(() => {
    api.setUserAlived(userPK)
      .then(() => {
      })
      .catch((err) => {
        console.log(err)
      })
    const initialPermission = async () => {
      await requestPermission()
      AppState.addEventListener('change', handleAppStateChange)
    }
    initialPermission ()
    return () => {
      console.log('메인에서 끊기')
      AppState.removeEventListener('change', handleAppStateChange)
      api.setUserKilled(userPK)
        .then(() => {
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      instantGetLocation('active')
    }
  }, [myRadius, userEmoji])

  const handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      instantGetLocation('active')
    }
    if (
      appState.current.match(/inactive|active/) &&
      nextAppState === 'background'
    ) {
      instantGetLocation('background')
    }
    appState.current = nextAppState;
  }

  const requestPermission = async () => {
    const front = await Location.requestForegroundPermissionsAsync()
    const back = await Location.requestBackgroundPermissionsAsync()
    if (front.granted && back.granted) {
      instantGetLocation('active')
    } else {
      Alert.alert(
        '서비스 이용 알림', 
        '필수 권한을 허용해야 서비스 정상 이용이 가능합니다. 설정에서 설정해주세요.',
        [
          {
            text: "확인",
            onPress: () => BackHandler.exitApp()
          }
        ])
    }
  }

  TaskManager.defineTask(FOREGROUND_LOCATION_TASK, ({ data, error }) => {
    if (error) {
      console.log(error.message)
      return
    }
    if (data) {
      const { locations } = data
      getUsers(locations[0].coords.latitude, locations[0].coords.longitude)
    }
  })

  TaskManager.defineTask(BACKGROUND_LOCATION_TASK, ({ data, error }) => {
    if (error) {
      console.log(error.message)
      return
    }
    if (data) {
      const { locations } = data
      getUsers(locations[0].coords.latitude, locations[0].coords.longitude)
    }
  })

  const instantGetLocation = async (status) => {
    const front = await Location.getForegroundPermissionsAsync()
    const back = await Location.getBackgroundPermissionsAsync()
    if (front.granted && back.granted) {
      const data = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.high})
      getUsers(data.coords.latitude, data.coords.longitude)
      if (status == 'active') {
        activeGetLocation()
      } else {
        backgroundGetLocation()
      }
    } else {
      Alert.alert(
        '서비스 이용 알림', 
        '필수 권한을 허용해야 서비스 정상 이용이 가능합니다. 설정에서 설정해주세요.',
        [
          {
            text: "확인",
            onPress: () => BackHandler.exitApp()
          }
        ])
    }
  }

  const activeGetLocation = async () => {
    const isTaskStarted = await Location.hasStartedLocationUpdatesAsync(BACKGROUND_LOCATION_TASK)
    if (isTaskStarted) {
      await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK)
    }
    await Location.startLocationUpdatesAsync(FOREGROUND_LOCATION_TASK, {
      accuracy: Location.Accuracy.High,
      distanceInterval: 0,
      timeInterval: 10000,
      foregroundService: {
        notificationTitle: 'Hooyu',
        notificationBody : '당신의 반경을 탐색하는중...',
        notificationColor: '#FF6A77'
      }
    })
  }

  const backgroundGetLocation = async () => {
    const isTaskStarted = await Location.hasStartedLocationUpdatesAsync(FOREGROUND_LOCATION_TASK)
    if (isTaskStarted) {
      await Location.stopLocationUpdatesAsync(FOREGROUND_LOCATION_TASK)
    }
    await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK, {
      accuracy: Location.Accuracy.High,
      distanceInterval: 0,
      timeInterval: 30000,
      foregroundService: {
        notificationTitle: 'Hooyu',
        notificationBody : '당신의 반경을 탐색하는중...',
        notificationColor: '#FF6A77'
      }
    })
  }

  const getUsers = (latitude, longitude) => {
    console.log('실행됨')
    axios({
      method: 'post',
      url: SERVER_URL + 'user/radar',
      data: {
        list: [
        ],
        requestRadiusDto: {
          lat: latitude,
          lon: longitude,
          radius: myRadius,
          userPK: userPK
        }
      }
    })
      .then((res) => {
        if (appState.current === 'active') {
          setUsers([...testUsers, ...res.data.success.filter(user => user.privateZone !== true)])
          setPrivateZoneUsers(res.data.success.filter(user => user.privateZone === true))
        }
        console.warn('get users : ', AppState.currentState)
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
          directionalOffsetThreshold: 80,
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
            <TouchableOpacity onPress={() => navigate("Profile", { nickname: 'HELLO', emoji: emojiImages.default.emoji[userEmoji] })}>
              <View>
                <View style={styles.profileBackground}></View>
                <Image
                  source={emojiImages.default.emoji[userEmoji]}
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
              <Text style={styles.radar__text__title}>내 반경 안의 유저</Text>
              <Text style={styles.radar__text__count}>{users.length}</Text>
            </View>
            <TouchableOpacity
              style={styles.shelterArea}
              disabled={myRadius === 500 || myRadius === 2000 ? false : true}
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
                <View
                  style={[
                    styles.shelterCount,
                    {
                      opacity: myRadius === 500 || myRadius === 2000 ? 1 : 0
                    }
                  ]}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}
                  >
                    {privateZoneUsers.length}
                  </Text>
                </View>
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

            <View style={{ flexDirection: "row", marginTop: deviceWidth * 0.023 }}>
              {
                myRadius == 20 &&
                <View style={{ top: -deviceWidth * 0.06, marginRight: deviceWidth * 0.05, transform: [{ rotate: '30deg' }] }}>
                  <View style={{ position: "absolute", left: 0, backgroundColor: mainColor7, width: 2, height: "100%" }}></View>
                  <View style={{ position: "absolute", right: 0, backgroundColor: mainColor7, width: 2, height: "100%" }}></View>
                  <Text style={{ color: mainColor6, paddingRight: 5, paddingLeft: 5 }}>20m</Text>
                </View>
              }
              {
                myRadius != 20 &&
                <View style={{ top: -deviceWidth * 0.06, marginRight: deviceWidth * 0.05, transform: [{ rotate: '30deg' }] }}>
                  <Text onPress={() => setMyRadius(20)} style={{ color: mainColor5, paddingRight: 5, paddingLeft: 5 }}>20m</Text>
                </View>
              }
              {
                myRadius == 100 &&
                <View style={{ marginRight: deviceWidth * 0.05, transform: [{ rotate: '10deg' }] }}>
                  <View style={{ position: "absolute", left: 0, backgroundColor: mainColor7, width: 2, height: "100%" }}></View>
                  <View style={{ position: "absolute", right: 0, backgroundColor: mainColor7, width: 2, height: "100%" }}></View>
                  <Text style={{ color: mainColor6, paddingRight: 5, paddingLeft: 5 }}>100m</Text>
                </View>
              }
              {
                myRadius != 100 &&
                <View style={{ marginRight: deviceWidth * 0.05, transform: [{ rotate: '10deg' }] }}>
                  <Text onPress={() => setMyRadius(100)} style={{ color: mainColor5, paddingRight: 5, paddingLeft: 5 }}>100m</Text>
                </View>
              }
              {
                myRadius == 500 &&
                <View style={{ marginRight: deviceWidth * 0.05, transform: [{ rotate: '-10deg' }] }}>
                  <View style={{ position: "absolute", left: 0, backgroundColor: mainColor7, width: 2, height: "100%" }}></View>
                  <View style={{ position: "absolute", right: 0, backgroundColor: mainColor7, width: 2, height: "100%" }}></View>
                  <Text style={{ color: mainColor6, paddingRight: 5, paddingLeft: 5 }}>500m</Text>
                </View>
              }
              {
                myRadius != 500 &&
                <View style={{ marginRight: deviceWidth * 0.05, transform: [{ rotate: '-10deg' }] }}>
                  <Text onPress={() => setMyRadius(500)} style={{ color: mainColor5, paddingRight: 5, paddingLeft: 5 }}>500m</Text>
                </View>
              }
              {
                myRadius == 2000 &&
                <View style={{ top: -deviceWidth * 0.06, transform: [{ rotate: '-30deg' }] }}>
                  <View style={{ position: "absolute", left: 0, backgroundColor: mainColor7, width: 2, height: "100%" }}></View>
                  <View style={{ position: "absolute", right: 0, backgroundColor: mainColor7, width: 2, height: "100%" }}></View>
                  <Text style={{ color: mainColor6, paddingRight: 5, paddingLeft: 5 }}>2km</Text>
                </View>
              }
              {
                myRadius != 2000 &&
                <View style={{ top: -deviceWidth * 0.06, transform: [{ rotate: '-30deg' }] }}>
                  <Text onPress={() => setMyRadius(2000)} style={{ color: mainColor5, paddingRight: 5, paddingLeft: 5 }}>2km</Text>
                </View>
              }
            </View>
          </View>

          <AddButton navigate={navigate} theme={theme} />

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
              source={emojiImages.default.emoji[userEmoji]}
              resizeMode="cover"
            />
          </TouchableOpacity>

          {users.map((user, index) => (
            user.distDto.dist <= myRadius
            ?
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
                  source={images.emoji[user.emoji]}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </View>
            :
            <View
              key={index}>
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
        setUsers={setUsers}
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
    height: deviceWidth / 530 * 943,
    position: "absolute",
    top: (deviceHeight - (deviceWidth / 530 * 943)) / 2,
    width: deviceWidth * 0.95
  },
  linearGradient: {
    flex: 1,
  },
  morning: {
    position: "absolute",
    height: deviceWidth / 530 * 942,
    top: (deviceHeight - (deviceWidth / 530 * 942)) / 2,
    width: deviceWidth
  },
  night: {
    left: deviceWidth * 0.025,
    height: deviceWidth / 530 * 943,
    position: "absolute",
    top: (deviceHeight - (deviceWidth / 530 * 943)) / 2,
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
    borderColor: "#B4B4B4",
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
    color: "#B4B4B4",
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
  shelterCount: {
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: Math.round(deviceWidth + deviceHeight
    ) / 2,
    height: deviceWidth * 0.04,
    justifyContent: 'center',
    left: deviceWidth * 0.045,
    paddingHorizontal: 3,
    position: 'absolute',
    minWidth: deviceWidth * 0.04,
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
    userEmoji: state.user.userEmoji
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