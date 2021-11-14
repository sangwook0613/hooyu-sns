import React, { useEffect, useState } from 'react'
import { Dimensions, View, Text, TouchableOpacity } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import ListPrivateZone from '../../components/PrivateZone/ListPrivateZone'
import NoPrivateZone from '../../components/PrivateZone/NoPrivateZone'
import SettingPrivateZone from '../../components/PrivateZone/SettingPrivateZone'
import { connect } from 'react-redux'
import axios from 'axios'


const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const PrivateZoneSetting = ({ userPK, SERVER_URL }) => {
  const [isSettingPrivateZone, setIsSettingPrivateZone] = useState(false)
  const [privateZoneList, setPrivateZoneList] = useState([])

  const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 })

  useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      setUserLocation({ latitude: latitude, longitude: longitude})
    })
    // getPrivateZone()s
  }, [isSettingPrivateZone, privateZoneList])

  const goToSettingPrivateZone = () => {
    setIsSettingPrivateZone(true)
  }

  const setPrivateZone = (zone) => {
    console.log(privateZoneList)
    setPrivateZoneList((prev) => [...prev, zone])
    console.log(privateZoneList)
    setIsSettingPrivateZone(false)
  }

  // const getPrivateZone = () => {
  //   console.log(SERVER_URL)
  //   axios({
  //     method: 'get',
  //     url: SERVER_URL + 'user/private' + userPK,
  //   })
  //   .then((res) => {
  //     console.log(res.data.success)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  // }

  const deletePrivateZone = () => {
    console.log('delete')
    setPrivateZoneList([])
  }

  const privateZoneComponent = () => {
    if (isSettingPrivateZone) {
      return <SettingPrivateZone setPrivateZone={setPrivateZone} userLocation={userLocation} privateZoneList={privateZoneList} />
    } else {
      return privateZoneList.length ? 
      <ListPrivateZone privateZoneList={privateZoneList} deletePrivateZone={deletePrivateZone} userLocation={userLocation} /> 
      : 
      <NoPrivateZone goToSettingPrivateZone={goToSettingPrivateZone}/>
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          width: deviceWidth,
          height: 60,
          backgroundColor: 'white',
          paddingLeft: 20,
          paddingRight: 20,
          justifyContent: 'center',
          borderBottomWidth: 1,
          borderBottomColor: '#E5E5E5',
        }}
      >
        <View><Text style={{fontSize: 16, fontWeight: '700'}}>나의 프라이빗 존</Text></View>
      </View>
      {
        privateZoneComponent()
      }
    </View>
  )
}


function mapStateToProps(state) {
  return {
    SERVER_URL: state.user.SERVER_URL,
    userPK: state.user.userPK,
  }
}

export default connect(mapStateToProps)(PrivateZoneSetting);