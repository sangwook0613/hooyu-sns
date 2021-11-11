import React, { useState, useEffect, useRef } from 'react';
import { Animated, Dimensions, View, Text, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, __spread } from 'react-native'
import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons"
import images from '../../assets/images';


const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const date = new Date()

const theme = 6 <= date.getHours() && date.getHours() <= 15 ? "morning" : (16 <= date.getHours() && date.getHours() <= 19 ? 'evening' : 'night')
const mainColor1 = theme == "morning" ? "#A1D1E7" : (theme == "evening" ? '#EC5446' : '#0B1C26')
const mainColor2 = theme == "morning" ? "#CDE4EE" : (theme == "evening" ? '#F2B332' : '#293A44')
const mainColor3 = theme == "morning" ? "#FDA604" : (theme == "evening" ? '#ED5646' : '#B4B4B4')
const mainColor4 = '#E9E9E9'


const AddButton = ({ navigate }) => {

  const open = useRef(new Animated.Value(0)).current
  const [isOpen, setIsOpened] = useState(false)

  const toggleMenu = () => {
    Animated.timing(open, {
      toValue: isOpen ? 0 : 1,
      duration: 400,
      useNativeDriver: false,
    }).start()

    setIsOpened(!isOpen)
  }

  return (
    <View
      style={styles.addButtonContainer}
    >
      <TouchableWithoutFeedback
        onPress={() => navigate('CreateContent', { emoji: images.emoji.amazing, menu: 0 })}
      >
        <Animated.View style={[styles.addButtonEl, {
          left: open.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [deviceWidth * 0.44, deviceWidth * 0.1, deviceWidth * 0.28]
          }),
        }]}>
          <Image 
          style={{
            height: deviceWidth * 0.07,
            width: deviceWidth * 0.07,
          }}
          source={images.menu.emoji}
          resizeMode='contain' />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPress={() => navigate('CreateContent', { emoji: images.emoji.amazing, menu: 1 })}
      >
        <Animated.View style={[styles.addButtonEl, {
          left: open.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [deviceWidth * 0.44, deviceWidth * 0.1, deviceWidth * 0.44]
          }),
        }]}>
          <Image 
          style={{
            height: deviceWidth * 0.08,
            width: deviceWidth * 0.08,
          }}
          source={images.menu.status}
          resizeMode='contain' />
        </Animated.View>

      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => navigate('CreateContent', { emoji: images.emoji.amazing, menu: 2 })}
      >
        <Animated.View style={[styles.addButtonEl, {
          left: open.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [deviceWidth * 0.44, deviceWidth * 0.1, deviceWidth * 0.6]
          }),
        }]}>
          <Image 
          style={{
            height: deviceWidth * 0.07,
            width: deviceWidth * 0.07,
          }}
          source={images.menu.image}
          resizeMode='contain' />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPress={() => navigate('CreateContent', { emoji: images.emoji.amazing, menu: 3 })}
      >
        <Animated.View style={[styles.addButtonEl, {
          left: open.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [deviceWidth * 0.44, deviceWidth * 0.1, deviceWidth * 0.76]
          }),
        }]}>
          <Image 
          style={{
            height: deviceWidth * 0.075,
            width: deviceWidth * 0.075,
          }}
          source={images.menu.question}
          resizeMode='contain' />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPress={() => toggleMenu()}
      >
        <Animated.View style={[styles.addButton,{
          left: open.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [deviceWidth * 0.44, deviceWidth * 0.1, deviceWidth * 0.1]
          }),
          transform: [
            {
              rotate: open.interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", "45deg"]
              })
            }
          ]
        }]}>
          <AntDesign name="plus" size={24} color="#fff" />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  addButton: {
    alignItems: 'center',
    backgroundColor: mainColor3,
    borderRadius: 35,
    elevation: 4,
    height: deviceWidth * 0.12,
    justifyContent: 'center',
    marginTop: deviceHeight
      * 0.13,
    width: deviceWidth * 0.12,
    top: -deviceWidth * 0.01,
    position: 'absolute'
  },
  addButtonContainer: {
    alignItems: 'center',
    flex: 0.25,
  },
  addButtonEl: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 35,
    elevation: 4,
    height: deviceWidth * 0.10,
    justifyContent: 'center',
    marginTop: deviceHeight
      * 0.13,
    width: deviceWidth * 0.10,
    position: 'absolute'
  },
})

export default AddButton