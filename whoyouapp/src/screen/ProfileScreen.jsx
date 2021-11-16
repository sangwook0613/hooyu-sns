import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Dimensions, Button, Text, Image, View, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import Api from '../utils/api'
import { connect } from 'react-redux'
import { actionCreators } from '../store/reducers'
import * as emojiImages from '../assets/images'
import ImageContent from '../components/ImageContent'
import StatusContent from '../components/StatusContent'
import SurveyContent from '../components/SurveyContent'
import images from '../assets/images'
  

const ProfileScreen = ({ navigation, route, userPK, userName, userEmoji, setUserName, deviceWidth, deviceHeight }) => {
  const [ownerName, setOwnerName] = useState(route.params.nickname === userName ? userName : route.params.nickname)
  const [isStatus, setIsStatus] = useState(true)
  const [isImage, setIsImage] = useState(true)
  const [isSurvey, setIsSurvey] = useState(true)
  
  const now = new Date()
  const scrollRef = useRef()
  const moveTo = [
    // 그냥 프로필을 눌러서 들어온 경우
    {
      status: 0,
      image: 0,
      survey: 0,
    },
    // 이미지 or 설문만 있는 경우
    // 제목 공간 + 이미지 크기 + 공감 받은 이모지 공간 + 공감 버튼 공간 + 여백
    {
      status: 0,
      image: 50 + deviceWidth + 40 + 40 + 10,
      survey: 50 + deviceWidth + 40 + 40 + 10,
    },
    // 둘다 있는 경우
    {
      status: 0,
      image: 50 + deviceWidth + 40 + 40 + 10,
      survey: (50 + deviceWidth + 40 + 40 + 10)*2,
    },
  ]

  const getPointToScroll = () => {
    const checkList = isImage + isSurvey
    setTimeout(() => {
      const node = scrollRef.current
      node.scrollTo({ y: moveTo[checkList][route.params.content], animated: true })
    }, 400)
  }

  const ProfileTitle = () => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          style={{ width: 34, height: 34 }}
          source={ownerName === userName ? emojiImages.default.emoji[userEmoji] : emojiImages.default.emoji[route.params.emoji]}
        />
        <Text style={{ marginLeft: 10 }}>{ownerName}</Text>
      </View>
    )
  }

  useEffect(() => {
    getPointToScroll()
    navigation.setOptions({
      headerTitle: (props) => <ProfileTitle {...props} />,
      headerRight: () => (
        (ownerName === userName && (
          <TouchableOpacity style={{ padding: 10 }} onPress={() => navigation.navigate('Setting')}>
            <Text>설정</Text>
          </TouchableOpacity>
        )))
    })
  }, [navigation])

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: (props) => <ProfileTitle {...props} />,
  //     headerRight: () => (
  //       <TouchableOpacity style={{ padding: 10, }} onPress={() => navigation.navigate('Setting')}>
  //         <Text>설정</Text>
  //       </TouchableOpacity>
  //     )
  //   })
  // }, [navigation])

  return (
    <>
      <ScrollView
        style={{backgroundColor: '#C7C7C7'}}
        ref={scrollRef}
      >
        {isStatus ? (
          <>
            <StatusContent 
              ownerName={ownerName}
              setIsStatus={setIsStatus}
            />
          </>
        )
        : (
          <>
          <View
            style={{
              width: deviceWidth,
              height: 50,
              backgroundColor: 'white',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 13,
              paddingRight: 20,
              alignItems: 'center',
              elevation: 10,
            }}
          >
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <Image 
                style={{
                  height: deviceWidth * 0.075,
                  width: deviceWidth * 0.075,
                }}
                source={images.menu.status}
                resizeMode='contain' />
              <Text style={{ fontSize: 15 }}>상태 메시지</Text>
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#FF6A77',
              height: deviceWidth,
              justifyContent: 'center',
              width: deviceWidth,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 14,
                fontWeight: 'bold'
              }}
            >
              남긴 상태 메시지가 없습니다.
            </Text>
          </View>
          <View 
            style={{
              alignItems:'center',
              backgroundColor: 'white',
              flexDirection: 'row', 
              height: 40,
              paddingLeft: 10
            }}
          >
            <Image 
              style={{
                height: 22,
                width: 22,
              }}
              source={images.emoji.sad}
            />
          </View>
          <View 
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 40,
              backgroundColor: 'white',
              elevation: 10 
            }}
          >
            <Text
              style={{
                fontSize: 15,
                marginLeft: 15,
              }}
            >
              공감...은 나중에
            </Text>
          </View>
          <View style={{ height: 10, backgroundColor: "#D7D7D7"}}></View>
          </>
        )}

        {isImage && (
          <>
            <ImageContent 
              ownerName={ownerName}
              setIsImage={setIsImage}
            />
          </>
        )}

        
        {isSurvey && (
          <>
            <SurveyContent 
              ownerName={ownerName}
              setIsSurvey={setIsSurvey}
            />
          </>
        )}
      </ScrollView>
    </>
  )
}

function mapStateToProps(state) {
  return {
    deviceWidth: state.user.deviceWidth,
    deviceHeight: state.user.deviceHeight,
    userPK: state.user.userPK,
    userName: state.user.userName,
    userEmoji: state.user.userEmoji,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setUserName: (emoji) => {
      dispatch(actionCreators.setUserName(emoji))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)