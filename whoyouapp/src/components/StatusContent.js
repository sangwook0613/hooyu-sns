import React, { useEffect, useState } from 'react'
import { Image, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { SwiperFlatList } from 'react-native-swiper-flatlist'
import Api from '../utils/api'
import { connect } from 'react-redux'
import * as emojiImages from '../assets/images'


const emojiArray = ['smile', 'amazing', 'sad', 'love', 'sense', 'angry']

const dummyStatus = [
  {
    id: 1,
    backgroundColor: 'skyblue',
    content: '나는 오늘도 눈물을 흘린다.',
    emojis: [{
      emoji: 'amazing',
      count: 100,
    },],
  },
  {
    id: 2,
    backgroundColor: '#D7D7D7',
    content: '나는 오늘도 눈물을 흘린다.',
    emojis: [
      {
        emoji: 'amazing',
        count: 222,
      },
      {
        emoji: 'sad',
        count: 111,
      },
    ],
  },
  {
    id: 3,
    backgroundColor: 'blue',
    content: '나는 오늘도 눈물을 흘린다.',
    emojis: [{
      emoji: 'amazing',
      count: 1123,
    },],
  }
]

const StatusContent = ({ ownerName, userPK, userName, deviceWidth, deviceHeight }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isEmojiSelect, setIsEmojiSelect] = useState(false)
  const [statusData, setStatusData] = useState([])
  const [isEmotions, setEmotions] = useState([])
  const [giveEmotion, setGiveEmotion] = useState([])
  const [statusEmoji, setStatusEmoji] = useState([])
  
  useEffect(() => {
    Api.getUserStatus(ownerName)
      .then((res) => {
        console.log('유저 상태 받아오기')
        console.log(res.data.success)
        let data = res.data.success
        console.log('data', data[0])
        data.map((content, idx) => {
          data[idx]['id'] = idx
          Api.getContentEmotion(data[idx].contentPk)
            .then((result) => {
              console.log(result.data)
              let chk = false
              let isMe = ''
              let temp = {}
              for (let emojiData of result.data.success) {
                if (emojiData.userPK === userPK) {
                  isMe = emojiData.contentEmoji
                }
                temp[emojiData.contentEmoji] ? temp[emojiData.contentEmoji]++ : temp[emojiData.contentEmoji] = 1
                chk = true
              }
              setStatusEmoji(emojis => [...emojis, temp])
              setEmotions(chks => [...chks, chk])
              setGiveEmotion(curr => [...curr, isMe])
            })
            .catch((err) => {
              console.warn(err)
            })
        })
        setStatusData(data)
        console.log('최종', statusData)
      })
      .catch((err) => {
        console.warn(err)
      })
  }, [])

  const addEmotion = (emoji, contentId, userPK, idx) => {
    Api.setContentEmotion(emoji, contentId, userPK)
      .then((res) => {
        console.log('emotion success')
        console.log(res.data)
        // 공감 완료 표시
        setStatusEmoji(emojis => {
          const updated = [...emojis]
          updated[idx][emoji] ? updated[idx][emoji]++ : updated[idx][emoji] = 1
          return updated
        })
        setEmotions(chks => {
          const updated = [...chks]
          updated[idx] = true
          return updated
        })
        setGiveEmotion(curr => {
          const updated = [...curr]
          updated[idx] = true
          return updated
        })
      })  
      .catch((err) => {
        console.warn(err)
      })
  }

  return (
    <View>
      <SwiperFlatList
        data={statusData}
        onChangeIndex={({ index }) => {
          setCurrentIndex(index)
          // console.log(index, prevIndex)
        }}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => {setIsEmojiSelect(false)}}>
            <View
              key={item.id}
              style={{
                width: deviceWidth,
                height: deviceWidth,
                backgroundColor: item.color,
                flex: 1,
                justifyContent: 'center',
                alignItems:"center"
              }}
            >
              <Text style={{fontSize: 18}}>{item.exon}</Text>
            </View>
          </TouchableWithoutFeedback>
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
                  console.log('statusData', statusData)
                  console.log('statusEmoji', statusEmoji)
                  addEmotion(emotion, statusData[currentIndex].contentPk, userPK, currentIndex)
                  console.warn(emotion, statusData[currentIndex], index)
                }}
              >
                <Image source={emojiImages.default.emoji[emotion]} style={{width: '100%', height: '100%'}}/>
              </TouchableOpacity>
            </View>
          ))}     
        </View>
      }
      <View style={{flexDirection: 'row', height: 40, backgroundColor: 'white'}}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
          {!isEmotions[currentIndex] &&
            <View>
              <Text>공감이 없습니다!</Text>
            </View>}
          {isEmotions[currentIndex] && Object.keys(statusEmoji[currentIndex]).map((item, index) => (
            <View key={index} style={{flexDirection: 'row', alignItems:'center', marginLeft: 10}}>
              <Image
                style={{ width: 24, height: 24, marginRight: 5 }}
                source={emojiImages.default.emoji[item]}
                />
              <Text>{statusEmoji[currentIndex][item]}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        backgroundColor: 'white',
        elevation: 10 
      }}>
        {giveEmotion[currentIndex] === '' &&
          <TouchableOpacity style={{ marginLeft: 20, marginRight: 20 }} onPress={() => setIsEmojiSelect(!isEmojiSelect)}>
            <Text style={{ fontSize: 18, fontWeight: 'bold'}}>공감</Text>
          </TouchableOpacity>
        }
        {giveEmotion[currentIndex] !== '' &&
          <>
            <Image
              style={{ width: 20, height: 20, marginLeft: 20 }}
              source={emojiImages.default.emoji[giveEmotion[currentIndex]]}
            />
            <Text style={{ marginLeft: 10, marginRight: 20, fontSize: 16 }}>이미 공감하셨습니다.</Text>
          </>
        }
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

export default connect(mapStateToProps)(StatusContent)