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
import ReportModal from '../components/modal/reportModal'


const emojiArray = ['smile', 'amazing', 'sad', 'love', 'sense', 'angry']

const StatusContent = ({ ownerName, userPK, userName, deviceWidth, deviceHeight, setIsStatus }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isEmojiSelect, setIsEmojiSelect] = useState(false)
  const [statusData, setStatusData] = useState([])
  const [isEmotions, setEmotions] = useState(false)
  const [giveEmotion, setGiveEmotion] = useState('')
  const [statusEmoji, setStatusEmoji] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false)
  const [deleteModalContent, setDeleteModalContent] = useState(null)
  const [isReportModalVisible, setReportModalVisible] = useState(false)
  const [reportModalContent, setReportModalContent] = useState(null)
  const now = new Date()

  useEffect(() => {
    Api.getUserStatus(ownerName)
      .then((res) => {
        if (res.data.success.length === 0) {
          setIsStatus(false)
        } else {
          let data = res.data.success
          getEmotion(data[0].contentPk)
          setStatusData(data)
        }
      })
      .catch((err) => {
        console.warn(err)
      })
  }, [])

  const deleteToggleModal = () => {
    setDeleteModalContent(statusData[currentIndex].contentPk)
    setDeleteModalVisible(!isDeleteModalVisible)
  }

  const reportToggleModal = () => {
    setReportModalContent(statusData[currentIndex].contentPk)
    setReportModalVisible(!isReportModalVisible)
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
        setStatusEmoji(emojis)
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
    Api.setContentEmotion(giveEmotion, statusData[currentIndex].contentPk, userPK)
      .then((res) => {
        console.log(res.data.success)
        getEmotion(statusData[currentIndex].contentPk)
        // 공감 취소 표시 방법 2 - 대신 해당 게시글에 이모지 존재 유무를 계산해야함
        // setStatusEmoji(emojis => {
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

  const reRenderStatus = () => {
    Api.getUserStatus(ownerName)
      .then((res) => {
        if (res.data.success.length === 0) {
          setIsStatus(false)
        } else {
          let data = res.data.success
          getEmotion(currentIndex === data.length ? data[currentIndex - 1].contentPk : data[currentIndex].contentPk)
          if (currentIndex === data.length) {
            setCurrentIndex(currentIndex - 1)
          }
          setStatusData(data)
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
          contentPK={deleteModalContent}
          userPK={userPK}
          isModalVisible={isDeleteModalVisible}
          setModalVisible={setDeleteModalVisible}
          reRender={reRenderStatus}
        />
        <ReportModal
          contentPK={reportModalContent}
          userPK={userPK}
          isModalVisible={isReportModalVisible}
          setModalVisible={setReportModalVisible}
        />
      </View>
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
        <TouchableOpacity onPress={ownerName === userName ? deleteToggleModal : reportToggleModal}>
          <AntDesign name={ownerName === userName ? "close" : "exclamationcircle"} size={18} color={ownerName === userName ? "black" : "#FF6A77"} />
        </TouchableOpacity>
      </View>
      <SwiperFlatList
        ref={swiperFlatList}
        data={statusData}
        showPagination
        onChangeIndex={({ index }) => {
          console.log('onchangeIndex', '자몽이2', index)
          setCurrentIndex(index)
          setIsEmojiSelect(false)
          getEmotion(statusData[index].contentPk)
        }}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => {setIsEmojiSelect(false)}}>
            <View
              key={item.contentPk}
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
      
      <TouchableWithoutFeedback onPress={() => {
        setIsEmojiSelect(false)
        console.log('첫 공감 누름!!')
      }}>
        <View style={{flexDirection: 'row', height: 40, backgroundColor: 'white'}}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
            {!isEmotions &&
              <View>
                <Text
                  style={{
                    color: '#B4B4B4',
                  }}
                >
                  첫 공감을 남겨보세요
                </Text>
              </View>}
            {isEmotions && Object.keys(statusEmoji).map((item, index) => (
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
                  {convertCount(statusEmoji[item])}
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
                console.log('statusData', statusData)
                console.log('statusEmoji', statusEmoji)
                addEmotion(emotion, statusData[currentIndex].contentPk, userPK)
                console.warn(emotion, statusData[currentIndex], index)
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