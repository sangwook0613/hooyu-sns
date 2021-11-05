import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Button, Text, Image, View, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import ImageContent from '../components/ImageContent';
import StatusContent from '../components/StatusContent';
import ReportModal from '../components/modal/reportModal';
import BlockModal from '../components/modal/blockModal';
import images from '../assets/images';
  
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const moveTo = [
  // 그냥 프로필을 눌러서 들어온 경우

  // 하나만 있는 경우
  
  // 두개만 있는 경우

  // 세개만 있는 경우
]

const UserScreen = ({ navigation, route }) => {
  const [isStatus, setIsStatus] = useState(true)
  const [isImage, setIsImage] = useState(true)
  const [isSurvey, setIsSurvey] = useState(false)
  const [isBlockModalVisible, setBlockModalVisible] = useState(false)
  const [isReportModalVisible, setReportModalVisible] = useState(false)
  const [userName, setUserName] = useState('USERNAME')
  const scrollRef = useRef()
  
  const getPointToScroll = () => {
    const checkList = [isStatus, isImage, isSurvey]
    
    console.log(checkList, route.params.content)
  }

  useEffect(() => {
    getPointToScroll()
    setTimeout(() => {
      const node = scrollRef.current
      node.scrollTo({ y: 500, animated: true })
    }, 400)
  },[])

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
        <Text>{userName}</Text>
      </View>
    );
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: (props) => <UserTitle {...props} />,
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 10 }} onPress={toggleBlockModal}>
          <Text>차단</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation]);


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
                alignItems: 'center'
              }}
            >
              <Text>이미지</Text>
              <TouchableOpacity onPress={toggleReportModal}>
                <AntDesign name="exclamationcircleo" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <ImageContent />
          </>
        )}
      </ScrollView>
    </>
  )
}

export default UserScreen;