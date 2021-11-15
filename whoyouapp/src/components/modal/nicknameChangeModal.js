import React, { useState } from 'react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import Modal from "react-native-modal"
import Api from '../../utils/api'
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { actionCreators } from '../../store/reducers'

const NicknameChangeModal = ({ isModalVisible, setModalVisible, userPK, setUserName }) => {
  const navigation = useNavigation()
  const [newNickname, setNewNickname] = useState('')

  const sendModalVisible = () => {
    setNewNickname('')
    setModalVisible(!isModalVisible)
  }

  const sendReport = () => {
    registerNickname()
    sendModalVisible()
    navigation.reset({routes: [{name: 'Main'}]})
  }

  const registerNickname = () => {
    Api.isDuplicatedNickname(newNickname)
    .then((res) => {
      if (res.data.success !== 'Success') {
        alert('중복된 닉네임입니다.')
      } else {
        changeNickname()
      }
    })
    .catch((err) => {
      console.warn(err)
    })
  }
  
  const changeNickname = () => {
    Api.updateNickname(newNickname, userPK)
      .then((res) => {
        console.log(res.data.success)
        setUserName(newNickname)
      })
      .catch((err) => {
        console.warn(err)
      })
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
        <Text style={{fontSize: 14, marginBottom: 2}}>변경할 닉네임을 입력해주세요. <Text style={{fontSize: 12, color: 'gray'}}>(최대 10글자)</Text></Text>
        <Text style={{fontSize: 14, marginBottom: 20, color: 'gray'}}>설정 후 메인 화면으로 이동합니다.</Text>
        <TextInput
          style={{ borderBottomWidth: 2, paddingBottom: 4, fontSize: 16, }}
          placeholder={"옵션을 입력해주세요"}
          autoCapitalize={'none'}
          value={newNickname}
          maxLength={10}
          onChangeText={(text) => setNewNickname(text)}
        />
        <View style={{paddingTop: 30, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
          <TouchableOpacity style={{paddingRight: 30}} onPress={sendModalVisible}>
            <Text style={{fontSize: 16, color: 'black'}}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{paddingRight: 20}} disabled={newNickname === ''} onPress={sendReport}>
            <Text style={{fontSize: 16, color: 'red'}}>네</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

function mapStateToProps(state) {
  return {
    userPK: state.user.userPK,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setUserName: (name) => {
      dispatch(actionCreators.setUserName(name))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NicknameChangeModal)