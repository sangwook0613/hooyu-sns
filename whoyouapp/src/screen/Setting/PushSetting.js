import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const PushSetting = (props) => {
  const [isModalVisible, setModalVisible] = useState(false)

  return (
    <>
      <TouchableOpacity>
        <View><Text>푸시 알림 받기</Text></View>
      </TouchableOpacity>
     <View><Text>푸시 알림 반경 메인과 동기화</Text></View>
     <View><Text>푸시 알람 반경</Text></View>
    </>
  )
}

export default PushSetting