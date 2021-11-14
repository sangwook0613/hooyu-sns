import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from "react-native-modal";
import { connect } from 'react-redux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

const PrivateZoneModal = ({ isModalVisible, onCloseModal, deviceWidth, deviceHeight, userLocation }) => {  

  const closeModal = () => {
    onCloseModal()
  }


  return (
    <Modal 
      isVisible={isModalVisible}
      onBackdropPress={closeModal}
      useNativeDriver={true}
      style={{
        flex: 1, justifyContent: "center", alignItems: "center",
      }}
    >
      <View style={{ width: deviceWidth*0.9, height: deviceHeight*0.5, borderWidth: 2, borderRadius: 10, backgroundColor: 'white', padding: 20}}>
        <View style={{ flex: 1, justifyContent: 'center', borderWidth: 1, borderColor: '#ccc' }}>
          <MapView 
            style={{ flex : 1 }}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.003,
              longitudeDelta: 0.005,
            }}
            scrollEnabled={false}
          />
          <View style={{
            width: 160, 
            height: 160, 
            borderWidth: 2, 
            position: 'absolute', 
            left: deviceWidth*0.45-104, 
            borderRadius: 80,
            borderColor: 'purple',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }}
            >
          </View>
        </View>
        <View style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              marginTop: 20,
              width: deviceWidth * 0.7,
              height: 50,
              backgroundColor: '#F38181',
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={closeModal}
          >
            <Text style={{fontSize: 16, fontWeight: '700', color: 'white'}}>닫기</Text>
          </TouchableOpacity>
        </View> 

      </View>
    </Modal>
  )
  
};

const styles = StyleSheet.create({
  // mainButton: {
  //   width: deviceWidth * 0.7,
  //   height: 50,
  //   backgroundColor: '#F38181',
  //   borderRadius: 50,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // }
});

function mapStateToProps(state) {
  return {
    deviceWidth: state.user.deviceWidth,
    deviceHeight: state.user.deviceHeight
  }
}


export default connect(mapStateToProps)(PrivateZoneModal);