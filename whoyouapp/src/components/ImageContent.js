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
  const [isEmotions, setEmotions] = useState(false)
  const [giveEmotion, setGiveEmotion] = useState('')
  const [imageEmoji, setImageEmoji] = useState({})
  
  useEffect(() => {
    Api.getUserImage(ownerName)//ownerName
      .then((res) => {
        console.log('유저 이미지 불러오기')
        console.log(res.data.success)
        if (res.data.success.length === 0) {
          setIsImage(false)
        } else {
          let data = res.data.success
          getEmotion(data[0].contentPk)
          setImageData(data)
          console.log('최종', imageData)
        }
      })
      .catch((err) => {
      console.warn(err)
      })
  }, [])


  const getEmotion = (contentPK) => {
    Api.getContentEmotion(contentPK)
      .then((result) => {
        console.log('자몽이1', result.data)
        let chk = false
        let isMe = ''
        let emojis = {}
        for (let emojiData of result.data.success) {
          if (emojiData.userPK === userPK) {
            isMe = emojiData.contentEmoji
          }
          emojis[emojiData.contentEmoji] ? emojis[emojiData.contentEmoji]++ : emojis[emojiData.contentEmoji] = 1
          chk = true
        }
        setImageEmoji(emojis)
        setEmotions(chk)
        setGiveEmotion(isMe)
      })
      .catch((err) => {
        console.warn(err)
      })
  }

  const addEmotion = (emoji, contentId, userPK) => {
    Api.setContentEmotion(emoji, contentId, userPK)
      .then((res) => {
        console.log('emotion success')
        console.log(res.data)
        // 공감 완료 표시
        setImageEmoji(emojis => {
          const updated = {...emojis}
          updated[emoji] ? updated[emoji]++ : updated[emoji] = 1
          return updated
        })
        setEmotions(true)
        setGiveEmotion(emoji)
      })  
      .catch((err) => {
        console.warn(err)
      })
  }

  return (
    <View>
      <SwiperFlatList
        data={imageData}
        onChangeIndex={({ index }) => {
          setCurrentIndex(index)
          getEmotion(imageData[index].contentPk)
        }}
        renderItem={({ item }) => (
          <View
            key={item.contentPk}
            style={{
              width: deviceWidth,
              height: deviceWidth,
              flex: 1,
              justifyContent: 'center',
              alignItems:"center"
            }}
          >
            <Image source={{ uri: item.exon }} style={{ width: '100%', height: '100%' }} />
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
                  addEmotion(emotion, imageData[currentIndex].contentPk, userPK)
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
          {!isEmotions &&
            <View>
              <Text
                style={{
                  color: '#B4B4B4'
                }}
              >
                첫 공감을 남겨보세요
              </Text>
            </View>}
          {isEmotions && Object.keys(imageEmoji).map((item, index) => (
            <View key={index} style={{flexDirection: 'row', alignItems:'center', marginLeft: 10}}>
              <Image
                style={{ width: 24, height: 24, marginRight: 5 }}
                source={emojiImages.default.emoji[item]}
                />
              <Text>{imageEmoji[item]}</Text>
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
        {giveEmotion.length === 0 &&
          <TouchableOpacity style={{ marginLeft: 15, marginRight: 20 }} onPress={() => setIsEmojiSelect(!isEmojiSelect)}>
            <Text style={{ fontSize: 18, fontWeight: 'bold'}}>공감</Text>
          </TouchableOpacity>
        }
        {giveEmotion.length !== 0 && 
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