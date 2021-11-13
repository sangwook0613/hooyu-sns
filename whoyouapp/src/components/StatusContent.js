import React, { useEffect, useState } from 'react'
import { Image, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { SwiperFlatList } from 'react-native-swiper-flatlist'
import LinearGradient from 'react-native-linear-gradient'
import Api from '../utils/api'
import { connect } from 'react-redux'
import * as emojiImages from '../assets/images'
import images from '../assets/images'


const emojiArray = ['smile', 'amazing', 'sad', 'love', 'sense', 'angry']

const StatusContent = ({ ownerName, userPK, userName, deviceWidth, deviceHeight, isModalVisible, setModalVisible, setDeleteContent }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isEmojiSelect, setIsEmojiSelect] = useState(false)
  const [statusData, setStatusData] = useState([])
  const [isEmotions, setEmotions] = useState([])
  const [giveEmotion, setGiveEmotion] = useState([])
  const [statusEmoji, setStatusEmoji] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const now = new Date()

  useEffect(() => {
    Api.getUserStatus(ownerName)
      .then((res) => {
        console.log('유저 상태 받아오기', res.data.success)
        let data = res.data.success
        console.log('자몽이0')
        data.map((content, idx) => {
          data[idx]['id'] = idx
          Api.getContentEmotion(data[idx].contentPk)
            .then((result) => {
              console.log('자몽이1', idx, result.data)
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
              setIsLoaded(true)
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

  const toggleModal = () => {
    setDeleteContent(statusData[currentIndex].contentPk)
    setModalVisible(!isModalVisible)
  }

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

  const deleteEmotion = () => {
    Api.setContentEmotion(giveEmotion[currentIndex], statusData[currentIndex].contentPk, userPK)
      .then((res) => {
        console.log(res.data.success)
      })
      .catch((err) => {
        console.log(err)
      })
    console.log('공감 취소')
  }

  const humanize = (date) => {
    const moment = require("moment")
    let r = Date.parse(now) - Date.parse(date) + 32400000
    if (parseInt(r) > 2678400000) {
      r = moment(date).format("YYYY.MM.DD")
    } else if (parseInt(r) > 86400000) {
      r = parseInt(parseInt(r) / 86400000).toString() + "일 전"
    } else if (parseInt(r) >= 3600000) {
      r = parseInt(parseInt(r) / 3600000).toString() + "시간 전"
    } else if (parseInt(r) >= 60000) {
      r = parseInt(parseInt(r) / 60000).toString() + "분 전"
    } else {
      r = "방금 전"
    }
    return r;
  }

  const convertCount = (cnt) => {
    if (cnt > 1000000) {
      const convert = cnt / 1000000
      return convert.toFixed(1) + 'M'
    } else if (cnt > 1000) {
      const convert = cnt / 1000
      return convert.toFixed(1) + 'K'
    } else {
      return cnt
    }
  }

  return (
    <View>
      <View
        style={{
          width: deviceWidth,
          height: 50,
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingLeft: 13,
          paddingRight: 20,
          alignItems: 'center',
          elevation: 10,
        }}
      >
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <Image 
            style={{
              height: deviceWidth * 0.075,
              width: deviceWidth * 0.075,
            }}
            source={images.menu.status}
            resizeMode='contain' />
          <Text>상태 메시지</Text>
        </View>
        <TouchableOpacity onPress={toggleModal}>
          <AntDesign name="close" size={18} color="black" />
        </TouchableOpacity>
      </View>
      <SwiperFlatList
        data={statusData}
        showPagination
        onChangeIndex={({ index }) => {
          setCurrentIndex(index)
          setIsEmojiSelect(false)
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
            borderRadius: 10,
            backgroundColor: 'white',
            elevation: 2,
            left: 50,
            bottom: 55,
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
                    elevation: 10,
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
      <TouchableWithoutFeedback onPress={() => {setIsEmojiSelect(false)}}>
        <View style={{flexDirection: 'row', height: 40, backgroundColor: 'white'}}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
            {!isEmotions[currentIndex] &&
              <View>
                <Text
                  style={{
                    color: '#B4B4B4',
                  }}
                >
                  첫 공감을 남겨보세요
                </Text>
              </View>}
            {isEmotions[currentIndex] && Object.keys(statusEmoji[currentIndex]).map((item, index) => (
              <View key={index} style={{flexDirection: 'row', alignItems:'center', marginLeft: 10}}>
                <Image
                  style={{ width: 22, height: 22, marginRight: 5 }}
                  source={emojiImages.default.emoji[item]}
                  />
                <Text
                  style={{
                    fontSize: 12,
                  }}
                >
                  {convertCount(statusEmoji[currentIndex][item])}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => {setIsEmojiSelect(false)}}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 40,
          backgroundColor: 'white',
          elevation: 10 
        }}>
          {isLoaded && giveEmotion[currentIndex] === '' &&
            <TouchableOpacity style={{ marginLeft: 15, marginRight: 15 }} onPress={() => setIsEmojiSelect(!isEmojiSelect)}>
              <Text style={{ fontSize: 15 }}>{isEmojiSelect ? '닫기': '공감'}</Text>
            </TouchableOpacity>
          }
          {isLoaded && giveEmotion[currentIndex] !== '' &&
            <>
              <TouchableOpacity
                onPress={() => deleteEmotion()}
              >
                <LinearGradient 
                  colors={['#AB79EF', '#FC98AB']}
                  style={{
                    alignItems: 'center',
                    borderRadius: 20,
                    justifyContent: 'center',
                    marginLeft: 15,
                    marginRight: 15,
                    padding: 2,
                  }}
                >
                  <Image
                    style={{ width: 24, height: 24 }}
                    source={emojiImages.default.emoji[giveEmotion[currentIndex]]}
                  />
                </LinearGradient>
              </TouchableOpacity>
            </>
          }
          {statusData.length !== 0
          ?
            <Text
              style={{
                color: '#B4B4B4',
                fontSize: 12,
              }}
            >
              {humanize(statusData[currentIndex].createAt)}
            </Text>
          :
            <>
            </>
          }
        </View>
      </TouchableWithoutFeedback>
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