import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const SettingScreen = ({ navigation: { navigate }}) => {
  return (
    <View>
      <Text>Setting Screen</Text>
      <TouchableOpacity onPress={() => navigate("UserSetting")}>
        <Text>계정 설정</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate("PrivateZoneSetting")}>
        <Text>프라이빗 존</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate("PushSetting")}>
        <Text>푸시 알림</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SettingScreen;