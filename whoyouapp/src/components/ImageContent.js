import React, { useState } from 'react';
import { Image, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import images from '../assets/images';

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
const emojiArray = ['amazing', 'amazing', 'amazing', 'amazing', 'amazing', 'amazing']

const dummyStatus = [
  {
    id: 1,
    backgroundColor: 'tomato',
    emojis: [{
      emoji: images.emoji.amazing,
      count: 100,
    },],
  },
  {
    id: 2,
    backgroundColor: 'lightyellow',
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
    backgroundColor: 'green',
    emojis: [{
      emoji: images.emoji.amazing,
      count: 1123,
    },],
  }
]


const ImageContent = ({}) => {
  const [currentIndex, setCurrendIndex] = useState(0)
  const [isEmojiSelect, setIsEmojiSelect] = useState(false)

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
          </View>
        )}
      />
      { isEmojiSelect && 
        <View style={{
          position: 'absolute',
          width: 300,
          height: 70,
          borderWidth: 1,
          borderColor: "#aaa",
          borderRadius: 10,
          backgroundColor: 'white',
          elevation: 4,
          left: 50,
          bottom: 100,
          paddingLeft: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          {emojiArray.map((emotion, index) => (
            <View key={index} style={{
              flex:1, 
              height: '50%',
            }}>
              <TouchableOpacity
                style={{
                  flex:1, 
                  width: '70%',
                  height: '100%',
                }}
                onPress={() => {
                  setIsEmojiSelect(false)
                  console.warn(index)
                }}
              >
                <Image source={images.emoji.amazing2} style={{width: '100%', height: '100%'}}/>
              </TouchableOpacity>
            </View>
          ))}     
        </View>
      }
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
          <Text
            style={{ fontSize: 18, fontWeight: 'bold' }}
            onPress={() => setIsEmojiSelect(!isEmojiSelect)}
          >공감</Text>
        </TouchableOpacity>
        <Text>1시간 전</Text>
      </View>
      <View style={{ height: 10, backgroundColor: "#D7D7D7"}}></View>
    </View>
  )
}

export default ImageContent;