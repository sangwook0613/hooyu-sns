import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { Animated, View, Text, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native'
import amazingEmozi from '../../assets/images/amazing2.png'


const ShelterList = forwardRef(({ deviceWidth, deviceHeight, theme, navigate, users, selectPrivateZoneUser, selectedPrivateZoneUser }, ref) => {
  const shelterList = useRef(new Animated.Value(deviceHeight)).current

  useImperativeHandle(ref, () => ({
    open: () => {
      Animated.timing(shelterList, {
        toValue: deviceHeight * 0.6,
        duration: 400,
        useNativeDriver: false,
      }).start()
    },
    close: () => {
      selectPrivateZoneUser(-1)
      Animated.timing(shelterList, {
        toValue: deviceHeight,
        duration: 400,
        useNativeDriver: false,
      }).start()
    }
  }))

  const mainColor1 = theme == "morning" ? "#57B4DF" : (theme == "evening" ? '#EC5446' : '#0B1C26')
  const mainColor4 = theme == "morning" ? "#E7F7FF" : (theme == "evening" ? '#FCE2E0' : '#E9E9E9')

  const styles = styleSheet(deviceWidth, deviceHeight, mainColor1, mainColor4)
  
  return (
    <Animated.View
      style={{
        top: shelterList}}
    >
      <View style={styles.shelterList}>
        <View style={styles.shelterListHeader}>
          <View style={styles.shelterListHeaderOption}>
            <Text style={styles.shelterListHeaderOptionText}>
              프라이빗존
            </Text>
          </View>
        </View>
        <ScrollView
          contentOffset={{
            y: (deviceWidth * 0.07 + 22) *  selectedPrivateZoneUser
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
                onPress={() => selectPrivateZoneUser(index)}
              >
                <View style={styles.user}>
                  <View style={{
                    alignItems: 'center',
                    flexDirection: 'row'
                  }}>
                    <Image
                      style={styles.shelterListEmoji}
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
              {index == selectedPrivateZoneUser && 
                <View style={styles.userMenu}>
                  <TouchableOpacity
                    style={styles.userMenuButton}
                    onPress={() => {navigate('User', {username: user.name, content: 'status'})}}
                  >
                    <Text style={{
                      color: 'white',
                      fontWeight: 'bold',
                    }}>
                      상태
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.userMenuButton, {opacity: user.contentTime.images === null ? 0.6 : 1}]}
                    onPress={() => {navigate('User', {username: user.name, content: 'image'})}}
                    disabled={user.contentTime.images === null ? true : false}
                  >
                    <Text style={{
                      color: 'white',
                      fontWeight: 'bold',
                    }}>
                      사진
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.userMenuButton, {opacity: user.contentTime.survey === null ? 0.6 : 1}]}
                    onPress={() => {navigate('User', {username: user.name, content: 'survey'})}}
                    disabled={user.contentTime.survey === null ? true : false}
                  >
                    <Text style={{
                      color: 'white',
                      fontWeight: 'bold',
                    }}>
                      질문
                    </Text>
                  </TouchableOpacity>
                </View>
              }
            </View>
          ))}
        </ScrollView>
      </View>
    </Animated.View>
  )
})

const styleSheet = (deviceWidth, deviceHeight, mainColor1, mainColor4) => StyleSheet.create({
  shelterList: {
    position: 'absolute',
    width: '100%',
    height: deviceHeight * 0.365,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 11,
  },
  shelterListEmoji: {
    height: deviceWidth * 0.07,
    marginRight: 10,
    width: deviceWidth * 0.07,
  },
  shelterListHeader: {
    alignItems: 'center',
    borderBottomColor: mainColor4,
    borderBottomWidth: 3,
    flexDirection: 'row',
    height: deviceHeight * 0.05,
    justifyContent: 'flex-start',
  },
  shelterListHeaderOption: {
    paddingLeft: 20,
  },
  shelterListHeaderOptionText: {
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

export default ShelterList