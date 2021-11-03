import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Text, Image, View, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import ImageContent from '../components/ImageContent';
// import Swiper from 'react-native-web-swiper';
import StatusContent from '../components/StatusContent';


const dummyData = [
  {
    id: 1,
  },
]

const dummyData2 = [
  {
    id: 11,
  },
]
  
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const ProfileScreen = ({ navigation, route }) => {
  const [isStatus, setIsStatus] = useState(true)
  const [isImage, setIsImage] = useState(true)
  const [isSurvey, setIsSurvey] = useState(true)
  const scrollRef = useRef()
  
  useEffect(() => {
    setTimeout(() => {
        const node = scrollRef.current;
        node.scrollTo({ y: 500, animated: true });
    }, 400);
  },[]);

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
    <ScrollView
      ref={scrollRef}
    >
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
            <TouchableOpacity onPress={() => {
              flatListRef.current.scrollToOffset({
                offset: 100,
                Animation: true
              })
            }}>
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
            <TouchableOpacity onPress={() => {
              flatListRef.current.scrollToOffset({
                offset: deviceHeight,
                Animation: true
              })
            }}>
              <AntDesign name="exclamationcircleo" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <ImageContent />
        </>
      )}
    </ScrollView>
  )
}

export default ProfileScreen;