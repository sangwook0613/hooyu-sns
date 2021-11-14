import React, {useEffect, useState} from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios'
import { connect } from 'react-redux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'


const SettingPrivateZone = ({ setPrivateZone, userLocation, privateZoneList, deviceWidth }) => {
  
  const [privateZoneName, setPrivateZoneName] = useState('')

  const confirmPrivateZone = () => {
    setPrivateZone(`프라이빗 존${privateZoneList.length + 1}`)
    // setPrivateZone()
  }

  // const setPrivateZone = () => {
  //   axios({
  //         method: 'post',
  //         url: SERVER_URL + 'user/setPrivate',
  //         body: {
  //           privateZoneDto: {
  //             'lat': userLocation.latitude,
  //             'lon': userLocation.longitude,
  //             'title': `프라이빗 존${privateZoneList.length + 1}`,
  //             'userPK': userPK
  //           }
  //         }
  //       })
  //       .then((res) => {
  //         console.log(res.data.success)
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //       })
  // }

  const onLayout = e => {
    console.log(e.nativeEvent.layout)
  }

  const mainButton = () => {
    return {
      width: deviceWidth * 0.7,
      height: 50,
      backgroundColor: '#F38181',
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    }
  }

  useEffect(() => {
    console.log(userLocation)
    console.log(privateZoneList)
  }, [privateZoneName])

  return (
    <View style={{flex:1}}>
      <View style={{flex: 2, padding: 20}}>
        <View style={{flex: 1, borderWidth: 2, justifyContent: 'center'}} onLayout={onLayout}>
          <MapView 
            style={{ flex : 1 }}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.003,
              longitudeDelta: 0.005,
            }}
            showsUserLocation={true}
            scrollEnabled={false}
          />
          <View style={{
            width: 160, 
            height: 160, 
            borderWidth: 2, 
            position: 'absolute', 
            left: deviceWidth/2-104, 
            borderRadius: 80,
            borderColor: 'purple',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }}
            >
          </View>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        <TouchableOpacity
          style={mainButton()}
          onPress={confirmPrivateZone}
        >
          <Text style={{fontSize: 16, fontWeight: '700', color: 'white'}}>확인</Text>
        </TouchableOpacity>
      </View> 
    </View>
  )
}


function mapStateToProps(state) {
  return {
    deviceWidth: state.user.deviceWidth,
    SERVER_URL: state.user.SERVER_URL,
    userPK: state.user.userPK,
  }
}

export default connect(mapStateToProps)(SettingPrivateZone);