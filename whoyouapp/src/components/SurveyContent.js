import React, { useEffect, useState } from 'react';
import { Image, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import Api from '../utils/api'
import { connect } from 'react-redux'
import images from '../assets/images';

const emojiArray = ['amazing', 'amazing', 'amazing', 'amazing', 'amazing', 'amazing']

const dummyStatus = [
  {
    id: 1,
    question: '오늘 저녁은?',
    answer: ['짜장면', '짬뽕'],
    count: [10, 5],
    sum: 15,
    emojis: [{
      emoji: images.emoji.amazing,
      count: 100,
    },],
  },
  {
    id: 2,
    question: '오늘 나의 기분을 맞춰봐?',
    answer: ['별로야', '너무 좋아', '깨운해'],
    count: [20, 10, 70],
    sum: 100,
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
    question: '오늘 점심은?',
    answer: ['짜장면', '짬뽕', '스시', '김밥', '삽겹살'],
    count: [2, 10, 12, 1, 5],
    sum: 30,
    emojis: [{
      emoji: images.emoji.amazing,
      count: 1123,
    },],
  }
]

const SurveyContent = ({ userPK, userName, deviceWidth, deviceHeight }) => {
  // const [statusData, setStatusData] = useState([])
  const [currentIndex, setCurrendIndex] = useState(0)
  const [isEmojiSelect, setIsEmojiSelect] = useState(false)

  // useEffect(() => {
  //   Api.getUserStatus(userName)
  //     .then((res) => {
  //       console.log('유저 상태 받아오기')
  //       console.log(res.data.success)
  //       let data = res.data.success
  //       console.log('data', data[0])
  //       Api.getContentEmotion(data[0].contentPk)
  //         .then((res) => {
  //           console.log(res.data)
  //         })
  //         .catch((err) => {
  //           console.warn(err)
  //         })
  //       // setStatusData(res.data.success)
  //     })
  //     .catch((err) => {
  //       console.warn(err)
  //     })
  // }, [])

  return (
    <View>
      <SwiperFlatList
        data={dummyStatus}
        onChangeIndex={({ index }) => {
          setCurrendIndex(index)
        }}
        renderItem={({ item }) => (
          <View
            key={item.id}
            style={{
              width: deviceWidth,
              height: deviceWidth,
              backgroundColor: '#0B1C26',
              flex: 1,
              justifyContent: 'center',
              alignItems:"center"
            }}
          >
            <Text style={{color: 'white', fontSize: 24, marginBottom: 50}}>{item.question}</Text>
            {item.answer.map((ans, idx) => {
              const num = Math.round(item.count[idx]/item.sum*100)
              return (
                <View key={idx} style={{
                  width: deviceWidth * 0.75,
                  height: 40,
                  backgroundColor: '#0B1C26',
                  borderColor: 'white',
                  borderWidth: 3,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                  paddingHorizontal: 10,
                }}>
                  <Text style={{zIndex: 1, height: '100%', fontSize: 20, textAlignVertical: 'center', paddingLeft: 10, color: 'white'}}
                    onChangeText={(text) => onTextChange(0, text)}
                  >{ans}</Text>
                  <Text style={{zIndex: 1, height: '100%', fontSize: 20, textAlignVertical: 'center', paddingLeft: 10, color: 'white'}}
                    onChangeText={(text) => onTextChange(0, text)}
                  >{num + "%"}</Text>
                  <LinearGradient colors={["#AB79EF", "#FC98AB"]} style={{
                    width: deviceWidth * 0.75 * num / 100,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                  }}>
                  </LinearGradient>
                </View>
              )})}
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
        <TouchableOpacity
          style={{ marginLeft: 20, marginRight: 20 }}
          onPress={() => setIsEmojiSelect(!isEmojiSelect)}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold'}}>공감</Text>
        </TouchableOpacity>
        <Text>1시간 전</Text>
      </View>
      <View style={{ height: 10, backgroundColor: "#D7D7D7"}}></View>
    </View>
  )
}


function mapStateToProps(state) {
  return {
    deviceWidth: state.user.deviceWidth,
    deviceHeight: state.user.deviceHeight,
    userPK: state.user.userPK,
    userName: state.user.userName,
  }
}

export default connect(mapStateToProps)(SurveyContent)