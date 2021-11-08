import React from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import Modal from "react-native-modal";

const UnregisterModal = ({ isModalVisible, setModalVisible }) => {  
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
        height: 190,
      }}>
        <Text style={{fontSize: 22, fontWeight: 'bold', marginBottom: 20}}>회원탈퇴</Text>
        <Text style={{fontSize: 14, marginBottom: 2}}>회원 탈퇴 하시겠습니까?</Text>
        <Text style={{fontSize: 14, marginBottom: 2, color: 'gray'}}>(탈퇴 시 데이터는 보존되지 않습니다.)</Text>
        <View style={{paddingTop: 30, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
          <TouchableOpacity style={{paddingRight: 30}} onPress={sendModalVisible}>
            <Text style={{fontSize: 16, color: 'black'}}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{paddingRight: 20}} onPress={sendReport}>
            <Text style={{fontSize: 16, color: 'red'}}>회원 탈퇴</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
  
};

export default UnregisterModal;