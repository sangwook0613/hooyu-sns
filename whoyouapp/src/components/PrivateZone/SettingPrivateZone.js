import React, {useEffect, useRef, useState} from 'react';
import { Text, TouchableOpacity, View, StyleSheet, ScrollView, TouchableWithoutFeedback, Dimensions, TextInput, Image, Animated } from 'react-native';
import axios from 'axios'
import { connect } from 'react-redux'


const clientWidth = Dimensions.get('screen').width
const clientHeight = Dimensions.get('screen').height

const SettingPrivateZone = ({ navigation, userPK, setPrivateZone }) => {
  
  const confirmPrivateZone = () => {
    setPrivateZone('zone')
  }

  return (
    <View style={{flex:1}}>
      <View style={{flex: 2, width: 200, height: 200, borderWidth: 2}}>

      </View>
      <View style={{ flex: 1, justifyContent: 'start', alignItems: 'center' }}>
        <TouchableOpacity
          style={styles.mainButton}
          onPress={confirmPrivateZone}
        >
          <Text style={{fontSize: 16, fontWeight: '700', color: 'white'}}>확인</Text>
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


export default connect(mapStateToProps)(SettingPrivateZone);