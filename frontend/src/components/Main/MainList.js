import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { Animated, Dimensions, View, Text, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native'
import amazingEmozi from '../../assets/images/amazing2.png'


const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const date = new Date()

const theme = 6 <= date.getHours() && date.getHours() <= 15 ? "morning" : (16 <= date.getHours() && date.getHours() <= 19 ? 'evening' : 'night')
const mainColor1 = theme == "morning" ? "#A1D1E7" : (theme == "evening" ? '#EC5446' : '#0B1C26')
const mainColor4 = theme == "morning" ? "#E7F7FF" : (theme == "evening" ? '#FCE2E0' : '#E9E9E9')

const MainList = forwardRef(({ users, selectUser, selectedUser }, ref) => {

  const mainList = useRef(new Animated.Value(deviceHeight)).current

  useImperativeHandle(ref, () => ({
    open: () => {
      Animated.timing(mainList, {
        toValue: deviceHeight * 0.6,
        duration: 400,
        useNativeDriver: false,
      }).start()
    },
    close: () => {
      selectUser(-1)
      Animated.timing(mainList, {
        toValue: deviceHeight,
        duration: 400,
        useNativeDriver: false,
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
          <TouchableWithoutFeedback 
            onPress={() => alert('거리순')}
          >
            <View style={styles.mainListHeaderOption}>
              <Text style={styles.mainListHeaderOptionText}>
                거리순
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback 
            onPress={() => alert('최신순')}
          >
            <View style={styles.mainListHeaderOption}>
              <Text style={styles.mainListHeaderOptionText}>
                최신순
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <ScrollView
          contentOffset={{
            y: (deviceWidth * 0.07 + 22) *  selectedUser
          }}
        >
          {users.map((user, index) => (
            <View
            key={index}
            style={{
              borderBottomColor: mainColor4,
              borderBottomWidth: 2,
            }}
            >
              <TouchableWithoutFeedback  
                onPress={() => selectUser(index)}
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
              </TouchableWithoutFeedback>
              {index == selectedUser && 
                <View style={styles.userMenu}>
                  {['상태', '사진', '질문'].map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.userMenuButton}
                    >
                      <Text style={{
                        color: 'white',
                        fontWeight: 'bold',
                      }}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              }
            </View>
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
    height: deviceHeight * 0.365,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
  },
  userMenu: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingHorizontal: 70,
    paddingTop: 5,
    width: '100%'
  },
  userMenuButton: {
    alignItems: 'center',
    backgroundColor: mainColor1,
    borderRadius: 7,
    paddingVertical: 3,
    width: deviceWidth * 0.17,
  },
  userText: {
    fontWeight: 'bold',
  },
})

export default MainList