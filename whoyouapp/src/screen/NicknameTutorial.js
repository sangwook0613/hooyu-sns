import React, { useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';
import axios from 'axios'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
const SERVER_URL = 'https://k5a101.p.ssafy.io/api/v1/'

const NicknameTutorial = ({ navigation: { navigate }}) => {

  const [inputValue, setInputValue] = useState('')

  const registerNickname = () => {
    axios({
      url: SERVER_URL + `user/duplicated/${inputValue}`,
      method: 'post',
      data: {
        userName: inputValue  
      }
    })
    .then((res) => {
      if (res.data.success !== 'Success') {
        alert('중복된 닉네임입니다.')
      } else {
        navigate('EmojiTutorial', {nickname: inputValue})
      }
    })
    .catch((err) => {
      console.warn(err)
    })
  }

  return (
    <View>
      <View style={styles.nicknameContainer}>
        <View style={{
            width: deviceWidth * 0.8
          }}
        > 
          <Text style={{
            color: '#0B1C26',
            fontSize: 22,
            fontWeight: 'bold',
          }}>
            닉네임 설정
          </Text>
          <Text style={{
            color: '#4F5457',
            fontSize: 14,
            marginTop: deviceHeight * 0.01,
          }}>
            당신의 닉네임을 설정해주세요.
          </Text>
        </View>
        <View
          style={styles.nicknameInput}
        >
          <TextInput
            style={{
              fontSize: 18,
            }}
            autoCapitalize={'none'}
            value={inputValue}
            onChangeText={(e) => setInputValue(e)}
            maxLength={10}
            placeholder='닉네임 입력'
          />
        </View>
      </View>
      <View style={styles.register__container}>
        <TouchableOpacity
          style={[styles.register, inputValue === '' && { backgroundColor: '#A1A1A1'}]}
          disabled={inputValue === ''}
          onPress={() => registerNickname()}
        >
          <Text
            style={styles.register__text}
          >
            등록
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  nicknameContainer: {
    alignItems: 'center',
    marginTop: deviceHeight * 0.15,
  },
  nicknameInput: {
    borderBottomColor: '#0B1C26',
    borderBottomWidth: 2,
    marginTop: deviceHeight * 0.1,
    paddingHorizontal: 10,
    width: deviceWidth * 0.8,
  },
  register: {
    alignItems: 'center',
    backgroundColor: '#0B1C26',
    borderRadius: 20,
    height: 45,
    justifyContent: 'center',
    marginTop: deviceHeight * 0.35,
    width: deviceWidth * 0.8,
  },
  register__container: {
    alignItems: 'center',
  },
  register__text: {
    color: 'white',
    fontSize: 15,
  }
})

export default NicknameTutorial;