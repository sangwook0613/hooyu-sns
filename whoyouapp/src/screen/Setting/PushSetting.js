import React, { useState } from 'react'
import { View, Text, Dimensions, Switch } from 'react-native'
import PushButtonGroup from './PushButtonGroup'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const PushSetting = () => {
  const [isPushEnabled, setIsPushEnabled] = useState(false)
  const [isPushSyncEnabled, setIsPushSyncEnabled] = useState(false)
  const pushToggleSwitch = () => {
    setIsPushEnabled(!isPushEnabled)
    setIsPushSyncEnabled(false)
  }
  const pushSyncToggleSwitch = () => setIsPushSyncEnabled(!isPushSyncEnabled)


  return (
    <>
      <View
        style={{
          width: deviceWidth,
          height: 60,
          backgroundColor: 'white',
          paddingLeft: 20,
          paddingRight: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#E5E5E5',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: '700' }}>푸시 알림 받기</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#F38181" }}
          thumbColor={isPushEnabled ? "white" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={pushToggleSwitch}
          value={isPushEnabled}
        />
      </View>
      <View
        pointerEvents={isPushEnabled ? "auto" : "none"} 
        style={{
          width: deviceWidth,
          height: 60,
          backgroundColor: `${isPushEnabled ? 'white' : "#E5E5E5"}`,
          paddingLeft: 20,
          paddingRight: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#E5E5E5',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: `${isPushEnabled ? 'black' : "#767577"}`, fontSize: 16, fontWeight: '700' }}>푸시 알림 반경 메인과 동기화</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#F38181" }}
          thumbColor={isPushSyncEnabled ? "white" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={pushSyncToggleSwitch}
          value={isPushSyncEnabled}
        />
      </View>
      <View
        style={{
          width: deviceWidth,
          height: 60,
          backgroundColor: 'white',
          paddingLeft: 20,
          paddingRight: 20,
          justifyContent: 'center',
          backgroundColor: `${isPushSyncEnabled ? 'white' : "#E5E5E5"}`,
        }}
      >
        <Text style={{ color: `${isPushSyncEnabled ? 'black' : "#767577"}`, fontSize: 16, fontWeight: '700' }}>푸시 알람 반경</Text>
      </View>
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
          backgroundColor: `${isPushSyncEnabled ? 'white' : "#E5E5E5"}`,
        }}
      >
        <PushButtonGroup isPushSyncEnabled={isPushSyncEnabled}/>
      </View>
    </>
  )
}

export default PushSetting