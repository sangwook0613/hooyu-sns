import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Button, Text, Image, View, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import ImageContent from '../components/ImageContent';
// import Swiper from 'react-native-web-swiper';
import StatusContent from '../components/StatusContent';
import ReportModal from '../components/modal/reportModal';
import DeleteModal from '../components/modal/deleteModal';
// import BlockModal from '../components/modal/blockModal';
  
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const ProfileScreen = ({ navigation, route }) => {
  const [isStatus, setIsStatus] = useState(true)
  const [isImage, setIsImage] = useState(true)
  const [isSurvey, setIsSurvey] = useState(true)
  const [isModalVisible, setModalVisible] = useState(false)
  const scrollRef = useRef()
  
  useEffect(() => {
    setTimeout(() => {
        const node = scrollRef.current
        node.scrollTo({ y: 500, animated: true })
    }, 400)
  },[])

  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  const ProfileTitle = () => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => { console.log('EMOJI!!') }}>
          <Image
            style={{ width: 50, height: 50 }}
            source={route.params.emoji}
          />
        </TouchableOpacity>
        <Text>{route.params.nickname}</Text>
      </View>
    );
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: (props) => <ProfileTitle {...props} />,
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate('Setting')}>
          <Text>설정</Text>
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
                alignItems: 'center'
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
                alignItems: 'center'
              }}
            >
              <Text>이미지</Text>
              <TouchableOpacity onPress={toggleModal}>
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

export default ProfileScreen;