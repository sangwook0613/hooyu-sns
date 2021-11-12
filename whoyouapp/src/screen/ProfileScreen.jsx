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
import DeleteModal from '../components/modal/deleteModal'
import images from '../assets/images'
  

const ProfileScreen = ({ navigation, route, userPK, userName, userEmoji, setUserName, deviceWidth, deviceHeight }) => {
  const [isOwner, setOwner] = useState(route.params.nickname === userName)
  const [isStatus, setIsStatus] = useState(true)
  const [isImage, setIsImage] = useState(true)
  const [isSurvey, setIsSurvey] = useState(true)
  const [isModalVisible, setModalVisible] = useState(false)
  
  const now = new Date()
  const scrollRef = useRef()

  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  const ProfileTitle = () => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          style={{ width: 40, height: 40 }}
          source={emojiImages.default.emoji[userEmoji]}
        />
        <Text style={{ marginLeft: 10 }}>{userName}</Text>
      </View>
    )
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: (props) => <ProfileTitle {...props} />,
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate('Setting')}>
          <Text>설정</Text>
        </TouchableOpacity>
      )
    })
  }, [navigation])

  const humanize = (date) => {
    const moment = require("moment")
    let r = Date.parse(now) - Date.parse(date) + 32400000
    if (parseInt(r) > 2678400000) {
      r = "1달 이전"
    } else if (parseInt(r) > 86400000) {
      r = parseInt(parseInt(r) / 86400000).toString() + "일 전"
    } else if (parseInt(r) >= 3600000) {
      r = parseInt(parseInt(r) / 3600000).toString() + "시간 전"
    } else if (parseInt(r) >= 60000) {
      r = parseInt(parseInt(r) / 60000).toString() + "분 전"
    } else {
      r = "방금 전"
    }
    return r;
  }

  return (
    <>
      <ScrollView
        style={{backgroundColor: '#C7C7C7'}}
        ref={scrollRef}
      >
        <View style={{ flex: 1 }}>
          <DeleteModal
            contentId={1}
            isModalVisible={isModalVisible}
            setModalVisible={setModalVisible}
          />
        </View>
        {isStatus && (
          <>
            <View
              style={{
                width: deviceWidth,
                height: 50,
                backgroundColor: 'white',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 15,
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
                    height: deviceWidth * 0.07,
                    width: deviceWidth * 0.07,
                  }}
                  source={images.menu.status}
                  resizeMode='contain' />
                <Text>상태 메시지</Text>
              </View>
              <TouchableOpacity onPress={toggleModal}>
                <AntDesign name="close" size={18} color="black" />
              </TouchableOpacity>
            </View>
            <StatusContent />
          </>
        )}

        {isImage && (
          <>
            <View
              style={{
                width: deviceWidth,
                height: 50,
                backgroundColor: 'white',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 20,
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
                    height: deviceWidth * 0.06,
                    width: deviceWidth * 0.06,
                    marginRight: 7,
                  }}
                  source={images.menu.image}
                  resizeMode='contain' />
                <Text>사진</Text>
              </View>
              <TouchableOpacity onPress={toggleModal}>
                <AntDesign name="close" size={18} color="black" />
              </TouchableOpacity>
            </View>
            <ImageContent setIsImage={setIsImage}/>
          </>
        )}

        
        {isSurvey && (
          <>
            <View
              style={{
                width: deviceWidth,
                height: 50,
                backgroundColor: 'white',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 17,
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
                    height: deviceWidth * 0.06,
                    width: deviceWidth * 0.06,
                    marginRight: 5,
                  }}
                  source={images.menu.question}
                  resizeMode='contain' />
                <Text>질문</Text>
              </View>
              <TouchableOpacity onPress={toggleModal}>
                <AntDesign name="close" size={18} color="black" />
              </TouchableOpacity>
            </View>
            <SurveyContent setIsSurvey={setIsSurvey} />
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