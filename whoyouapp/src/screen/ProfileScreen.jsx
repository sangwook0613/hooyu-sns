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
  

const ProfileScreen = ({ navigation, route, userPK, userName, userEmoji, setUserName, deviceWidth, deviceHeight }) => {
  const [isStatus, setIsStatus] = useState(true)
  const [isImage, setIsImage] = useState(true)
  const [isSurvey, setIsSurvey] = useState(true)
  const [isModalVisible, setModalVisible] = useState(false)
  const scrollRef = useRef()

  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  const ProfileTitle = () => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          style={{ width: 50, height: 50 }}
          source={emojiImages.default.emoji[userEmoji]}
        />
        <Text>{userName}</Text>
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

  // setIsEmojiSelect(!isEmojiSelect)
  // console.log(isEmojiSelect)

  return (
    <>
      <ScrollView
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
                paddingLeft: 20,
                paddingRight: 20,
                alignItems: 'center',
                elevation: 10,
              }}
            >
              <Text>상태창</Text>
              <TouchableOpacity onPress={toggleModal}>
                <AntDesign name="exclamationcircleo" size={24} color="black" />
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
              <Text>이미지</Text>
              <TouchableOpacity onPress={toggleModal}>
                <AntDesign name="exclamationcircleo" size={24} color="black" />
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
                paddingLeft: 20,
                paddingRight: 20,
                alignItems: 'center',
                elevation: 10,
              }}
            >
              <Text>설문</Text>
              <TouchableOpacity onPress={toggleModal}>
                <AntDesign name="exclamationcircleo" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <SurveyContent />
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