import React, { useEffect, useState } from 'react'
import { Dimensions, View, Text, TouchableOpacity } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import ListPrivateZone from '../../components/PrivateZone/ListPrivateZone'
import NoPrivateZone from '../../components/PrivateZone/NoPrivateZone'
import SettingPrivateZone from '../../components/PrivateZone/SettingPrivateZone'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const PrivateZoneSetting = (props) => {
  const [isSettingPrivateZone, setIsSettingPrivateZone] = useState(false)
  const [privateZoneList, setPrivateZoneList] = useState([])

  useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      console.log(latitude, longitude)
    })
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

  const deletePrivateZone = () => {
    console.log('delete')
    setPrivateZoneList([])
  }

  const privateZoneComponent = () => {
    if (isSettingPrivateZone) {
      return <SettingPrivateZone setPrivateZone={setPrivateZone}  />
    } else {
      return privateZoneList.length ? 
      <ListPrivateZone privateZoneList={privateZoneList} deletePrivateZone={deletePrivateZone} /> 
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

export default PrivateZoneSetting