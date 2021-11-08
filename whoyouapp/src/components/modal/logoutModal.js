import React from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import Modal from "react-native-modal";

const LogoutModal = ({ isModalVisible, setModalVisible }) => {  
  const sendModalVisible = () => {
    setModalVisible(!isModalVisible)
  }

  const sendReport = () => {
    console.warn('Change Nickname')
    sendModalVisible()
  }

  return (
    <Modal 
      isVisible={isModalVisible}
      onBackdropPress={sendModalVisible}
      useNativeDriver={true}
      style={{
        flex: 1, justifyContent: "center", alignItems: "center",
      }}
    >
      <View style={{
        padding: 20,
        backgroundColor: 'white',
        width: 320,
        height: 170,
      }}>
        <Text style={{fontSize: 22, fontWeight: 'bold', marginBottom: 20}}>로그아웃</Text>
        <Text style={{fontSize: 14, marginBottom: 2}}>로그아웃 하시겠습니까?</Text>
        <View style={{paddingTop: 30, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
          <TouchableOpacity style={{paddingRight: 30}} onPress={sendModalVisible}>
            <Text style={{fontSize: 16, color: 'black'}}>아니오</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{paddingRight: 20}} onPress={sendReport}>
            <Text style={{fontSize: 16, color: 'red'}}>네</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
  
};

export default LogoutModal;