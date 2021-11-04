import React, { useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const StatusTutorial = ({ navigation: { navigate }}) => {

  const [inputValue, setInputValue] = useState('')

  const registerStatus = () => {
    console.warn('회원가입 API')
  }

  return (
    <View>
      <View style={styles.statusContainer}>
        <View style={{
            width: deviceWidth * 0.8
          }}
        > 
          <Text style={{
            color: '#0B1C26',
            fontSize: 22,
            fontWeight: 'bold',
          }}>
            오늘 내 기분은?
          </Text>
          <Text style={{
            color: '#4F5457',
            fontSize: 14,
            marginTop: deviceHeight * 0.01,
          }}>
            오늘 당신의 기분은 어떠신가요?
          </Text>
        </View>
        <View
          style={styles.statusInput}
        >
          <TextInput
            style={{
              fontSize: 18,
            }}
            autoCapitalize={'none'}
            value={inputValue}
            onChangeText={(e) => setInputValue(e)}
            maxLength={10}
            placeholder='상태 입력'
          />
        </View>
      </View>
      <View style={styles.register__container}>
        <TouchableOpacity
          style={[styles.register, inputValue === '' && { backgroundColor: '#A1A1A1'}]}
          disabled={inputValue === ''}
          onPress={() => registerStatus()}
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
  statusContainer: {
    alignItems: 'center',
    marginTop: deviceHeight * 0.15,
  },
  statusInput: {
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

export default StatusTutorial;