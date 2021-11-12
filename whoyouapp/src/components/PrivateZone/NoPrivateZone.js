import React, {useEffect, useRef, useState} from 'react';
import { Text, TouchableOpacity, View, StyleSheet, ScrollView, TouchableWithoutFeedback, Dimensions, TextInput, Image, Animated } from 'react-native';
import axios from 'axios'
import { connect } from 'react-redux'
import { produceWithPatches } from 'immer';


const clientWidth = Dimensions.get('screen').width
const clientHeight = Dimensions.get('screen').height

const NoPrivateZone = ({ navigation, userPK, goToSettingPrivateZone }) => {
  
  const goSetting = () => {
    goToSettingPrivateZone()
  }


  return (
    <View style={{flex:1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{paddingBottom: 70, fontSize: 16}}>프라이빗 존을 설정해보세요.</Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity 
          style={styles.mainButton} 
          onPress={goSetting}
        >
          <Text style={{fontSize: 16, fontWeight: '700', color: 'white'}}>프라이빗 존 설정</Text>
        </TouchableOpacity>
      </View> 
    </View>
  )
}

const styles = StyleSheet.create({
  mainButton: {
    width: clientWidth * 0.7,
    height: 50,
    backgroundColor: '#F38181',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  }
});


function mapStateToProps(state) {
  return {
    SERVER_URL: state.user.SERVER_URL,
    userPK: state.user.userPK,
  }
}


export default connect(mapStateToProps)(NoPrivateZone);