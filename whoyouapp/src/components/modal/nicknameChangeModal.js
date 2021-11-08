import React from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import Modal from "react-native-modal";

const NicknameChangeModal = ({ isModalVisible, setModalVisible }) => {  
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
        height: 240,
      }}>
        <Text style={{fontSize: 22, fontWeight: 'bold', marginBottom: 20}}>닉네임 변경</Text>
        <Text style={{fontSize: 14, marginBottom: 2}}>변경할 닉네임을 입력해주세요.</Text>
        <Text style={{fontSize: 14, marginBottom: 20, color: 'gray'}}>(한글, 영어 포함 8글자)</Text>
        <TextInput
          style={{ borderBottomWidth: 2, paddingBottom: 4 }}
          placeholder={"옵션을 입력해주세요"}
          // onChangeText={(text) => onTextChange(1, text)}
        />
        <View style={{paddingTop: 30, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
          <TouchableOpacity style={{paddingRight: 30}} onPress={sendModalVisible}>
            <Text style={{fontSize: 16, color: 'black'}}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{paddingRight: 20}} onPress={sendReport}>
            <Text style={{fontSize: 16, color: 'red'}}>네</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
  
};

export default NicknameChangeModal;