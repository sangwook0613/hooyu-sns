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
  const [isImage, setIsImage] = useState(false)
  const [isSurvey, setIsSurvey] = useState(false)
  const flatListRef = useRef()
  
  useEffect(() => {
    setTimeout(() => {
        const node = flatListRef.current;
        node.scrollToOffset({ offset: 500, animated: true });
    }, 400);
  },[]);
  
  const moveScroll = () => {
    flatListRef.current.scrollToOffset({
      offset: 100,
      Animation: true
    })
  }


  const ProfileTitle = () => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => {console.log('EMOJI!!')}}>
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

  const contentTitle = () => {
    return (
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
    )
  }


  const renderImageContent = () => {
    return (
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
        <FlatList
          style={{ marginBottom: 20 }}
          data={dummyData2}
          keyExtractor={(item) => item.id + ""}
          renderItem={() => (
            <ImageContent />
          )}
        />
      </>
    )
  };

  return (
    <FlatList
      ref={flatListRef}
      ListFooterComponent={
        // contentTitle
        renderImageContent
      }
      data={dummyData}
      keyExtractor={(item) => item.id + ""}
      renderItem={() => (
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
              ref.current.scrollToOffset({
                offset: deviceHeight,
                Animation: true
              })
            }}>
              <AntDesign name="exclamationcircleo" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <StatusContent />
        </>
      )}
    >
    </FlatList>
  )
}

export default ProfileScreen;