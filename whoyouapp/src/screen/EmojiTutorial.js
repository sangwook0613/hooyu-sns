import React, { useState } from 'react';
import { Dimensions, Text, TouchableOpacity, Image, View, StyleSheet, TextInput } from 'react-native';
import amazingEmozi from '../assets/images/amazing2.png'
import { connect } from 'react-redux'


const EmojiTutorial = ({ navigation: { navigate }, route, deviceWidth, deviceHeight}) => {

  const styles = styleSheet(deviceWidth, deviceHeight)

  const registerEmoji = () => {
    navigate('StatusTutorial', {...route.params, emoji: 'emoji'})
  }

  return (
    <View>
      <View style={styles.emojiContainer}>
        <View style={{
            width: deviceWidth * 0.8
          }}
        > 
          <Text style={{
            color: '#0B1C26',
            fontSize: 22,
            fontWeight: 'bold',
          }}>
            지금의 감정은 무엇인가요?
          </Text>
        </View>
        <View
          style={styles.emojiInput}
        >
          <TouchableOpacity>
            <Image 
              style={{
                height: deviceWidth * 0.07,
                width: deviceWidth * 0.07,
              }}
              source={amazingEmozi}
              resizeMode='contain'
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.register__container}>
        <TouchableOpacity
          style={styles.register}
          onPress={() => registerEmoji()}
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

const styleSheet = (deviceWidth, deviceHeight, radarWidth) => StyleSheet.create({
  emojiContainer: {
    alignItems: 'center',
    marginTop: deviceHeight * 0.15,
  },
  emojiInput: {
    alignItems: 'center',
    borderBottomColor: '#0B1C26',
    height: deviceHeight * 0.5,
    justifyContent: 'center',
    paddingHorizontal: 10,
    width: deviceWidth * 0.8,
  },
  register: {
    alignItems: 'center',
    backgroundColor: '#0B1C26',
    borderRadius: 20,
    height: 45,
    justifyContent: 'center',
    marginTop: deviceHeight * 0.05,
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

function mapStateToProps(state) {
  return {
    deviceWidth: state.user.deviceWidth,
    deviceHeight: state.user.deviceHeight,
  }
}

export default connect(mapStateToProps)(EmojiTutorial)