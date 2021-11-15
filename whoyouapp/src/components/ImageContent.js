import React, { useEffect, useState, useRef } from 'react'
import { Image, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { SwiperFlatList } from 'react-native-swiper-flatlist'
import LinearGradient from 'react-native-linear-gradient'
import Api from '../utils/api'
import { connect } from 'react-redux'
import * as emojiImages from '../assets/images'
import images from '../assets/images'
import DeleteModal from '../components/modal/deleteModal'


const emojiArray = ['smile', 'amazing', 'sad', 'love', 'sense', 'angry']

const ImageContent = ({ ownerName, userPK, userName, deviceWidth, deviceHeight, setIsImage }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isEmojiSelect, setIsEmojiSelect] = useState(false)
  const [imageData, setImageData] = useState([])
  const [isEmotions, setEmotions] = useState(false)
  const [giveEmotion, setGiveEmotion] = useState('')
  const [imageEmoji, setImageEmoji] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)
  const [isModalVisible, setModalVisible] = useState(false)
  const [deleteContent, setDeleteContent] = useState(null)
  const now = new Date()

  
  useEffect(() => {
    Api.getUserImage(ownerName)//ownerName
      .then((res) => {
        if (res.data.success.length === 0) {
          setIsImage(false)
        } else {
          let data = res.data.success
          getEmotion(data[0].contentPk)
          setImageData(data)
        }
      })
      .catch((err) => {
      console.warn(err)
      })
  }, [])

  const toggleModal = () => {
    setDeleteContent(imageData[currentIndex].contentPk)
    setModalVisible(!isModalVisible)
  }

  const getEmotion = (contentPK) => {
    Api.getContentEmotion(contentPK)
      .then((result) => {
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
        setIsLoaded(true)
      })
      .catch((err) => {
        console.warn(err)
      })
  }

  const addEmotion = (emoji, contentId, userPK) => {
    Api.setContentEmotion(emoji, contentId, userPK)
      .then((res) => {
        getEmotion(contentId)
        // 공감 완료 표시 방법 2
        // setImageEmoji(emojis => {
        //   const updated = {...emojis}
        //   updated[emoji] ? updated[emoji]++ : updated[emoji] = 1
        //   return updated
        // })
        // setEmotions(true)
        // setGiveEmotion(emoji)
      })  
      .catch((err) => {
        console.warn(err)
      })
  }

  const deleteEmotion = () => {
    Api.setContentEmotion(giveEmotion, imageData[currentIndex].contentPk, userPK)
      .then((res) => {
        getEmotion(imageData[currentIndex].contentPk)
        // 공감 취소 표시 방법 2 - 대신 해당 게시글에 이모지 존재 유무를 계산해야함
        // setImageEmoji(emojis => {
        //   const updated = {...emojis}
        //   updated[giveEmotion]--
        //   return updated
        // })
        // setEmotions(false)
        // setGiveEmotion('')
      })
      .catch((err) => {
        console.log(err)
      })
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

  const swiperFlatList = useRef()

  const reRenderImage = () => {
    Api.getUserImage(ownerName)
      .then((res) => {
        if (res.data.success.length === 0) {
          setIsImage(false)
        } else {
          let data = res.data.success
          getEmotion(currentIndex === data.length ? data[currentIndex - 1].contentPk : data[currentIndex].contentPk)
          if (currentIndex === data.length) {
            setCurrentIndex(currentIndex - 1)
          }
          setImageData(data)
          swiperFlatList.current.scrollToIndex({ index: currentIndex === 0 ? currentIndex : currentIndex - 1 })
        }
      })
      .catch((err) => {
        console.warn(err)
      })
  }

  return (
    <View>
      <View style={{ flex: 1 }}>
        <DeleteModal
          contentPK={deleteContent}
          userPK={userPK}
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          contentType={'image'}
          reRender={reRenderImage}
        />
      </View>
      <View
        style={{
          width: deviceWidth,
          height: 50,
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingLeft: 20,
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
              height: deviceWidth * 0.06,
              width: deviceWidth * 0.06,
              marginRight: 7,
            }}
            source={images.menu.image}
            resizeMode='contain' />
          <Text>사진</Text>
        </View>
        <TouchableOpacity onPress={toggleModal}>
          <AntDesign name="close" size={18} color="black" />
        </TouchableOpacity>
      </View>
      <SwiperFlatList
        ref={swiperFlatList}
        data={imageData}
        onChangeIndex={({ index }) => {
          setCurrentIndex(index)
          setIsEmojiSelect(false)
          getEmotion(imageData[index].contentPk)
        }}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => {setIsEmojiSelect(false)}}>
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
          </TouchableWithoutFeedback>
        )}
      />
      <TouchableWithoutFeedback onPress={() => {setIsEmojiSelect(false)}}>
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
                  style={{ width: 22, height: 22, marginRight: 5 }}
                  source={emojiImages.default.emoji[item]}
                  />
                <Text
                  style={{
                    fontSize: 12,
                  }}
                >
                  {convertCount(imageEmoji[item])}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </TouchableWithoutFeedback>
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
            <TouchableOpacity
              key={index}
              style={{
                elevation: 10,
                flex: 1,
                height: 35,
                // height: '50%',
              }}
              onPress={() => {
                setIsEmojiSelect(false)
                console.log('imageData', imageData)
                console.log('imageEmoji', imageEmoji)
                addEmotion(emotion, imageData[currentIndex].contentPk, userPK)
                console.warn(emotion, imageData[currentIndex], index)
              }}
            >
              <Image
                resizeMode="cover"
                source={emojiImages.default.emoji[emotion]}
                style={{ width: 35, height: 35 }}
              />
            </TouchableOpacity>
          ))}     
        </View>
      }
      <TouchableWithoutFeedback onPress={() => {setIsEmojiSelect(false)}}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 40,
          backgroundColor: 'white',
          elevation: 10 
        }}>
          {isLoaded && giveEmotion === '' &&
            <TouchableOpacity style={{ marginLeft: 15, marginRight: 15 }} onPress={() => setIsEmojiSelect(!isEmojiSelect)}>
              <Text style={{ fontSize: 15 }}>{isEmojiSelect ? '닫기': '공감'}</Text>
            </TouchableOpacity>
          }
          {isLoaded && giveEmotion !== '' && 
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
                    source={emojiImages.default.emoji[giveEmotion]}
                  />
                </LinearGradient>
              </TouchableOpacity>
            </>
          }
          {imageData.length !== 0
          ?
            <Text
              style={{
                color: '#B4B4B4',
                fontSize: 12,
              }}
            >
              {humanize(imageData[currentIndex].createAt)}
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

export default connect(mapStateToProps)(ImageContent)