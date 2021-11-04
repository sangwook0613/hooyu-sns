import React, { useState } from 'react';
import { Image, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-web-swiper';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import images from '../assets/images';

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const dummyStatus = [
  {
    id: 1,
    backgroundColor: 'skyblue',
    content: '나는 오늘도 눈물을 흘린다.',
    emojis: [{
      emoji: images.emoji.amazing,
      count: 100,
    },],
  },
  {
    id: 2,
    backgroundColor: '#D7D7D7',
    content: '나는 오늘도 눈물을 흘린다.',
    emojis: [
      {
        emoji: images.emoji.amazing2,
        count: 222,
      },
      {
        emoji: images.emoji.amazing,
        count: 111,
      },
    ],
  },
  {
    id: 3,
    backgroundColor: 'blue',
    content: '나는 오늘도 눈물을 흘린다.',
    emojis: [{
      emoji: images.emoji.amazing,
      count: 1123,
    },],
  }
]

const StatusContent = ({ }) => {
  const [currentIndex, setCurrendIndex] = useState(0)

  return (
    <View>
      <SwiperFlatList
        data={dummyStatus}
        onChangeIndex={({ index }) => {
          setCurrendIndex(index)
          // console.log(index, prevIndex)
        }}
        renderItem={({ item }) => (
          <View
            key={item.id}
            style={{
              width: deviceWidth,
              height: deviceWidth,
              backgroundColor: item.backgroundColor,
              flex: 1,
              justifyContent: 'center',
              alignItems:"center"
            }}
          >
            <Text>{item.content}</Text>
          </View>
        )}
      />
      <View style={{flexDirection: 'row', height: 40, backgroundColor: 'white'}}>
        <View style={{flexDirection: 'row', alignItems:'center', marginLeft: 10}}>
          {dummyStatus[currentIndex]['emojis'].map((item, index) => (
            <View key={index} style={{flexDirection: 'row', alignItems:'center', marginLeft: 10}}>
              <Image
                style={{ width: 24, height: 24, marginRight: 5 }}
                source={item.emoji}
                />
              <Text>{item.count}</Text>
            </View>
          ))}
        </View>
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
      <View style={{ height: 10, backgroundColor: "#D7D7D7"}}></View>
    </View>
  )
}

export default StatusContent;