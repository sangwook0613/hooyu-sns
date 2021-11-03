import React from 'react';
import { Image, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-web-swiper';
import images from '../assets/images';

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const dummyEmojis = [
  {
    id: 1,
    emoji: images.emoji.amazing,
    count: 100,
  },
  {
    id: 2,
    emoji: images.emoji.amazing2,
    count: 200,
  },
  {
    id: 3,
    emoji: images.emoji.amazing,
    count: 300,
  }
]

const dummyStatus = [
  {
    id: 1,
    backgroundColor: 'skyblue',
    content: '나는 오늘도 눈물을 흘린다.'
  },
  {
    id: 2,
    backgroundColor: 'ligthgray',
    content: '나는 오늘도 눈물을 흘린다.'
  },
  {
    id: 3,
    backgroundColor: 'blue',
    content: '나는 오늘도 눈물을 흘린다.'
  }
]

const StatusContent = ({ }) => {  
  return (
    <>
      <Swiper
        controlsEnabled={false}
        containerStyle={{ width: '100%', height: deviceWidth }}
      >
        {dummyStatus.map((status) => (
          <View
            key={status.id}
            style={{
              backgroundColor: status.backgroundColor,
              flex: 1,
              justifyContent: 'center',
              alignItems:"center"
            }}
          >
            <Text>{status.content}</Text>
          </View>
        ))}
        <View style={{backgroundColor: 'blue', flex: 1}}></View>
        <View style={{backgroundColor: 'red', flex: 1}}></View>
        <View style={{backgroundColor: 'blue', flex: 1}}></View>
      </Swiper>
      <View style={{flexDirection: 'row', height: 40, backgroundColor: 'white'}}>
        {dummyEmojis.map((item) => (
          <View key={item.id} style={{flexDirection: 'row', alignItems:'center', marginLeft: 10}}>
            <Image
              style={{ width: 24, height: 24, marginRight: 5 }}
              source={item.emoji}
              />
            <Text>{item.count}</Text>
          </View>
        ))}
      </View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        backgroundColor: 'white',
      }}>
        <TouchableOpacity style={{marginLeft: 20, marginRight: 20}}>
          <Text style={{ fontSize: 18, fontWeight: 'bold'}}>공감</Text>
        </TouchableOpacity>
        <Text>1시간 전</Text>
      </View>
      <Text></Text>
    </>
  )
}

export default StatusContent;