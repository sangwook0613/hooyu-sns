import React, {useEffect, useRef, useState} from 'react';
import { Text, TouchableOpacity, View, StyleSheet, ScrollView, TouchableWithoutFeedback, Dimensions, TextInput, Image, Animated } from 'react-native';
import axios from 'axios'
import { connect } from 'react-redux'


const clientWidth = Dimensions.get('screen').width
const clientHeight = Dimensions.get('screen').height

const ListPrivateZone = ({ navigation, userPK, privateZoneList, deletePrivateZone }) => {
  
  const onDelete = () => {
    deletePrivateZone()
  }


  return (
    <View style={{flex:1}}>
      <View style={styles.zoneListContainer}>
        <View style={styles.zoneList}>
          <Text>{privateZoneList}</Text>
          <View style={styles.zoneListButtonView}>
            <TouchableWithoutFeedback>
              <Text style={styles.zoneListButtonShow}>지도보기</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={onDelete} >
              <Text style={styles.zoneListButtonDelete}>삭제</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          style={styles.mainButton}
        >
          <Text style={{fontSize: 16, fontWeight: '700', color: 'white'}}>프라이빗 존은 한개만 설정 가능합니다.</Text>
        </TouchableOpacity>
      </View> 
    </View>
  )
}

const styles = StyleSheet.create({
  mainButton: {
    width: clientWidth * 0.8,
    height: 50,
    backgroundColor: '#ccc',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoneListContainer: {
    flex: 1, 
    paddingTop: 50, 
    paddingHorizontal: 30
  },
  zoneList: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  zoneListButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  zoneListButtonShow: {
    fontWeight: 'bold',
    marginHorizontal: 10
  },
  zoneListButtonDelete: {
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'red'
  }
});


function mapStateToProps(state) {
  return {
    SERVER_URL: state.user.SERVER_URL,
    userPK: state.user.userPK,
  }
}


export default connect(mapStateToProps)(ListPrivateZone);