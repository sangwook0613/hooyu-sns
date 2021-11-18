import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Button, Text, Image, View, TouchableOpacity, ScrollView, FlatList, LogBox } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import Api from '../utils/api'
import * as emojiImages from '../assets/images'
import { connect } from 'react-redux'
import ImageContent from '../components/ImageContent'
import StatusContent from '../components/StatusContent'
import SurveyContent from '../components/SurveyContent'
import ReportModal from '../components/modal/reportModal'
import BlockModal from '../components/modal/blockModal'
import images from '../assets/images'
  

const UserScreen = ({ navigation, route, userPK, userName, userEmoji, setUserName, deviceWidth, deviceHeight }) => {
  LogBox.ignoreAllLogs()

  const [ownerName, setOwnerName] = useState(route.params.nickname === userName ? userName : route.params.nickname)
  const [isStatus, setIsStatus] = useState(true)
  const [isImage, setIsImage] = useState(true)
  const [isSurvey, setIsSurvey] = useState(true)
  const [isBlockModalVisible, setBlockModalVisible] = useState(false)
  const [isReportModalVisible, setReportModalVisible] = useState(false)
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
    console.log(checkList, route.params.content, route.params.nickname)
  }

  const toggleBlockModal = () => {
    setBlockModalVisible(!isBlockModalVisible)
  }
  
  const toggleReportModal = () => {
    setReportModalVisible(!isReportModalVisible)
  }

  const UserTitle = () => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          style={{ width: 50, height: 50 }}
          source={images.emoji.amazing2}
        />
        <Text>{route.params.nickname}</Text>
      </View>
    )
  }

  useEffect(() => {
    getPointToScroll()
    navigation.setOptions({
      headerTitle: (props) => <UserTitle {...props} />,
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 10 }} onPress={toggleBlockModal}>
          <Text>차단</Text>
        </TouchableOpacity>
      )
    })
  }, [navigation])


  return (
    <>
      <ScrollView
        ref={scrollRef}
      >
        <View style={{ flex: 1 }}>
          <BlockModal
            contentId={1}
            isModalVisible={isBlockModalVisible}
            setModalVisible={setBlockModalVisible}
          />
          <ReportModal
            contentId={1}
            isModalVisible={isReportModalVisible}
            setModalVisible={setReportModalVisible}
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
                paddingLeft: 20,
                paddingRight: 20,
                alignItems: 'center'
              }}
            >
              <Text>상태창</Text>
              <TouchableOpacity onPress={toggleReportModal}>
                <AntDesign name="exclamationcircleo" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <StatusContent ownerName={ownerName}/>
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
                alignItems: 'center'
              }}
            >
              <Text>이미지</Text>
              <TouchableOpacity onPress={toggleReportModal}>
                <AntDesign name="exclamationcircleo" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <ImageContent ownerName={ownerName} setIsImage={setIsImage}/>
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
                paddingLeft: 20,
                paddingRight: 20,
                alignItems: 'center'
              }}
            >
              <Text>설문</Text>
              <TouchableOpacity onPress={toggleReportModal}>
                <AntDesign name="exclamationcircleo" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <SurveyContent ownerName={ownerName} setIsSurvey={setIsSurvey}/>
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

export default connect(mapStateToProps)(UserScreen)