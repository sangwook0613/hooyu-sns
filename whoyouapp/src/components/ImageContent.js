import React, { useEffect, useState } from 'react'
import { Image, Text, View, TouchableOpacity } from 'react-native'
import { SwiperFlatList } from 'react-native-swiper-flatlist'
import Api from '../utils/api'
import { connect } from 'react-redux'
import * as emojiImages from '../assets/images'

const emojiArray = ['smile', 'amazing', 'sad', 'love', 'sense', 'angry']

const ImageContent = ({ ownerName, userPK, userName, deviceWidth, deviceHeight, setIsImage }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isEmojiSelect, setIsEmojiSelect] = useState(false)
  const [imageData, setImageData] = useState([])
  const [isEmotions, setEmotions] = useState([])
  const [giveEmotion, setGiveEmotion] = useState([])
  const [imageEmoji, setImageEmoji] = useState([])
  
  useEffect(() => {
    Api.getUserImage('seungho')//seunghyun
      .then((res) => {
        console.log('유저 이미지 불러오기')
        console.log(res.data.success)
        if (res.data.success.length === 0) {
          setIsImage(false)
        } else {
          let data = res.data.success
          data.map((content, idx) => {
            data[idx]['id'] = idx
            Api.getContentEmotion(data[idx].contentPk)
              .then((result) => {
                console.log(result.data)
                let chk = false
                let isMe = false
                let temp = {}
                for (let emojiData of result.data.success) {
                  if (emojiData.userPK === userPK) {
                    isMe = true
                  }
                  temp[emojiData.contentEmoji] ? temp[emojiData.contentEmoji]++ : temp[emojiData.contentEmoji] = 1
                  chk = true
                }
                setImageEmoji(emojis => [...emojis, temp])
                setEmotions(chks => [...chks, chk])
                setGiveEmotion(curr => [...curr, isMe])
              })
              .catch((err) => {
                console.warn(err)
              })
          })
          setImageData(data)
          console.log('최종', imageData)
        }
      })
      .catch((err) => {
      console.warn(err)
      })
  }, [])

  return (
    <View>
      <SwiperFlatList
        data={imageData}
        onChangeIndex={({ index }) => {
          setCurrentIndex(index)
          // console.log(index, prevIndex)
        }}
        renderItem={({ item }) => (
          <View
            key={item.id}
            style={{
              width: deviceWidth,
              height: deviceWidth,
              flex: 1,
              justifyContent: 'center',
              alignItems:"center"
            }}
          >
            <Image resizeMode="contain" source={{ uri: item.exon }} style={{ width: '100%', height: '100%' }} />
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
                  console.log('imageData', imageData)
                  console.log('imageEmoji', imageEmoji)
                  addEmotion(emotion, imageData[currentIndex].contentPk, userPK, currentIndex)
                  console.warn(emotion, imageData[currentIndex], index)
                }}
              >
                <Image source={emojiImages.default.emoji[emotion]} style={{width: '100%', height: '100%'}}/>
              </TouchableOpacity>
            </View>
          ))}     
        </View>
      }
      <View style={{flexDirection: 'row', height: 40, backgroundColor: 'white'}}>
        <View style={{flexDirection: 'row', alignItems:'center', marginLeft: 10}}>
          {!isEmotions[currentIndex] &&
            <View>
              <Text>공감이 없습니다!</Text>
            </View>}
          {isEmotions[currentIndex] && Object.keys(imageEmoji[currentIndex]).map((item, index) => (
            <View key={index} style={{flexDirection: 'row', alignItems:'center', marginLeft: 10}}>
              <Image
                style={{ width: 24, height: 24, marginRight: 5 }}
                source={emojiImages.default.emoji[item]}
                />
              <Text>{imageEmoji[currentIndex][item]}</Text>
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
        {!giveEmotion[currentIndex] &&
          <TouchableOpacity style={{ marginLeft: 20, marginRight: 20 }} onPress={() => setIsEmojiSelect(!isEmojiSelect)}>
            <Text style={{ fontSize: 18, fontWeight: 'bold'}}>공감</Text>
          </TouchableOpacity>
        }
        {giveEmotion[currentIndex] && 
          <Text style={{ marginLeft: 20, marginRight: 20, fontSize: 16 }}>이미 공감하셨습니다.</Text>
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

export default connect(mapStateToProps)(ImageContent)