import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { Animated, Dimensions, View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import amazingEmozi from '../../assets/images/amazing2.png'


const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const date = new Date()

const theme = 6 <= date.getHours() && date.getHours() <= 15 ? "morning" : (16 <= date.getHours() && date.getHours() <= 19 ? 'evening' : 'night')
const mainColor1 = theme == "morning" ? "#A1D1E7" : (theme == "evening" ? '#EC5446' : '#0B1C26')
const mainColor2 = theme == "morning" ? "#CDE4EE" : (theme == "evening" ? '#F2B332' : '#293A44')
const mainColor3 = theme == "morning" ? "#FDA604" : (theme == "evening" ? '#ED5646' : '#B4B4B4')
const mainColor4 = theme == "morning" ? "#E7F7FF" : (theme == "evening" ? '#FCE2E0' : '#E9E9E9')

const MainList = forwardRef(({ users }, ref) => {

  const mainList = useRef(new Animated.Value(deviceHeight)).current

  useImperativeHandle(ref, () => ({
    open: () => {
      Animated.timing(mainList, {
        toValue: deviceHeight * 0.6,
        duration: 400,
      }).start()
    },
    close: () => {
      Animated.timing(mainList, {
        toValue: deviceHeight,
        duration: 400,
      }).start()
    }
  }))
  
  return (
    <Animated.View
      style={{
        top: mainList}}
    >
      <View style={styles.mainList}>
        <View style={styles.mainListHeader}>
          <TouchableOpacity 
            style={styles.mainListHeaderOption}
            onPress={() => alert('거리순')}
          >
            <Text style={styles.mainListHeaderOptionText}>
              거리순
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.mainListHeaderOption}
            onPress={() => alert('최신순')}
          >
            <View>
              <Text style={styles.mainListHeaderOptionText}>
                최신순
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {users.map((user, index) => (
            <TouchableOpacity 
              key={index} 
              onPress={() => alert(user.name)}
            >
              <View style={styles.user}>
                <View style={{
                  alignItems: 'center',
                  flexDirection: 'row'
                }}>
                  <Image
                    style={styles.mainListEmoji}
                    source={amazingEmozi}
                    resizeMode="contain"
                  />
                  <Text style={styles.userText}>
                    {user.name}
                  </Text>
                </View>
                  <Text style={styles.userText}>
                    1시간 전 게시
                  </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Animated.View>
  )
})

const styles = StyleSheet.create({
  mainList: {
    position: 'absolute',
    width: '100%',
    height: deviceHeight * 0.37,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 11,
  },
  mainListEmoji: {
    height: deviceWidth * 0.07,
    marginRight: 10,
    width: deviceWidth * 0.07,
  },
  mainListHeader: {
    alignItems: 'center',
    borderBottomColor: mainColor4,
    borderBottomWidth: 3,
    flexDirection: 'row',
    height: deviceHeight * 0.05,
    justifyContent: 'flex-end',
  },
  mainListHeaderOption: {
    paddingRight: 20,
  },
  mainListHeaderOptionText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  user: {
    alignItems: 'center',
    borderBottomColor: mainColor4,
    borderBottomWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
  },
  userText: {
    fontWeight: 'bold',
  },
})

export default MainList