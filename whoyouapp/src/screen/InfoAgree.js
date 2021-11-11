import React from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native'
import { Ionicons, Entypo } from '@expo/vector-icons';
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const InfoAgree = ({ navigation: { navigate }, deviceWidth }) => {

  const navigation = useNavigation()

  return (
    <>
      <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: deviceWidth * 0.75 }}>
          <View style={{ alignItems: 'flex-start', marginBottom: 10, width: '100%' }}>
            <Text style={{ fontSize: 20, fontWeight: '700', color: '#FF6A77' }}>후유 권한 안내</Text>
          </View>
          <View style={{ alignItems: 'flex-start', marginBottom: 20, width: '100%' }}>
            <Text style={{ fontWeight: 'bold' }}>후유는 아래 권한들을 필요로 합니다.</Text>
            <Text style={{ fontWeight: 'bold' }}>서비스 사용 중 앱에서 요청 시 허용해 주세요</Text>
          </View>

          <View style={{ height: 2, backgroundColor: '#B1B1B1', width: '100%' }}></View>

          <View style={{ width: '100%', marginTop: 20 }}>
            <Text style={{ fontWeight: 'bold', color: '#FF6A77' }}>필수 접근 권한</Text>
          </View>


          <View style={{ flexDirection: "row", width: '100%', marginTop: 15 }}>
            <View style={{ justifyContent: 'center', paddingRight: 15 }}>
              <Ionicons name="location-outline" size={24} color="black" />
            </View>
            <View>
              <Text style={{ fontWeight: 'bold', marginBottom:4 }}>위치 정보</Text>
              <Text>위치 정보는 주변 사람들을 찾는데{'\n'} 필요한 필수 정보로 활용됩니다.</Text>
            </View>
          </View>


          <View style={{ flexDirection: "row", width: '100%', marginTop: 15 }}>
            <View style={{ justifyContent: 'center', paddingRight: 15 }}>
              <Entypo name="globe" size={24} color="black" />
            </View>

            <View>
              <Text style={{ fontWeight: 'bold', marginBottom:4 }}>백그라운드 권한</Text>
              <Text>이 앱을 사용하지 않을때도 현재 위치 갱신 및{'\n'}주변 유저 검색, 푸시알림을 받기 위해 {'\n'}접근이 필요합니다.</Text>
            </View>
          </View>


          <View style={{ width: '100%', marginTop: 20 }}>
            <Text style={{ fontWeight: 'bold', color: '#FF6A77' }}>선택 접근 권한</Text>
          </View>
          <View style={{ flexDirection: "row", width: '100%', marginTop: 15 }}>
            <View style={{ justifyContent: 'center', paddingRight: 15 }}>
              <Ionicons name="folder-outline" size={24} color="black" />
            </View>
            <View>
              <Text style={{ fontWeight: 'bold', marginBottom:4 }}>저장공간</Text>
              <Text>앨범에 접근하여 사진을 업로드 할 수 있습니다.</Text>
            </View>
          </View>
        </View>
      </View>


      <View style={{ flex: 0.1, width: '100%' }}>
        <TouchableOpacity style={{ height: '100%', backgroundColor: '#FF6A77', justifyContent: 'center', alignItems: 'center' }} onPress={()=>navigation.reset({routes: [{name: 'Main'}]})}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>다음으로</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

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

export default connect(mapStateToProps, null)(InfoAgree)
