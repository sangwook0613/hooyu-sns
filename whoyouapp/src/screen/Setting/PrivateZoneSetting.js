import React, { useEffect, useState } from 'react'
import { Dimensions, View, Text, TouchableOpacity } from 'react-native'
import Geolocation from 'react-native-geolocation-service'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const PrivateZoneSetting = (props) => {
  const [haveZone, setZone] = useState(true)
  
  useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      console.log(latitude, longitude)
    })
  })

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
      {haveZone && (
        <>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{paddingBottom: 70, fontSize: 16}}>프라이빗 존을 설정해보세요.</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              style={{
                width: deviceWidth * 0.7,
                height: 50,
                backgroundColor: '#F38181',
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{fontSize: 16, fontWeight: '700', color: 'white'}}>프라이빗 존 설정</Text>
            </TouchableOpacity>
          </View> 
        </>
      )}
    </View>
  )
}

export default PrivateZoneSetting