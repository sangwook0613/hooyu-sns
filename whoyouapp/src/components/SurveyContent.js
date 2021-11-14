import React, { useEffect, useState } from 'react'
import { Image, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import LinearGradient from 'react-native-linear-gradient'
import { SwiperFlatList } from 'react-native-swiper-flatlist'
import Api from '../utils/api'
import { connect } from 'react-redux'
import * as emojiImages from '../assets/images'
import images from '../assets/images'


const emojiArray = ['smile', 'amazing', 'sad', 'love', 'sense', 'angry']

const SurveyContent = ({ ownerName, userPK, userName, deviceWidth, deviceHeight, setIsSurvey, isModalVisible, setModalVisible, setDeleteContent }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isEmojiSelect, setIsEmojiSelect] = useState(false)
  const [surveyData, setSurveyData] = useState([])
  const [isEmotions, setEmotions] = useState([])
  const [giveEmotion, setGiveEmotion] = useState([])
  const [surveyEmoji, setSurveyEmoji] = useState([])
  const [checkVote, setCheckVote] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const now = new Date()

  useEffect(() => {
    Api.getUserSurvey(ownerName)
      .then((res) => {
        console.log('유저 설문 받아오기')
        console.log('설문 예시', res.data.success[0])
        let data = res.data.success
        if (data.length === 0) {
          setIsImage(false)
        } else {
          data.map((content, idx) => {
            data[idx]['id'] = idx
            Api.getContentEmotion(data[idx].contentPK)
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
                setSurveyEmoji(emojis => [...emojis, temp])
                setEmotions(chks => [...chks, chk])
                setGiveEmotion(curr => [...curr, isMe])
                setIsLoaded(true)
              })
              .catch((err) => {
                console.warn(err)
              })
            // 투표 했는지 여부는 post로 체크한다!
            Api.voteCheck(data[idx].contentPK, userPK)
              .then((res) => {
                console.log('voteCheck', res.data, res.data.success)
                if (res.data.success === "투표하지 않았습니다.") {
                  setCheckVote(item => [...item, ''])
                } else {
                  setCheckVote(item => [...item, res.data.success])
                }
              })
              .catch((err) => {
                console.warn(err)
              })
          })
          setSurveyData(data)
        }
      })
      .catch((err) => {
        console.warn(err)
      })
  }, [])

  const toggleModal = () => {
    setDeleteContent(surveyData[currentIndex].contentPK)
    setModalVisible(!isModalVisible)
  }

  const voteToSurvey = (answerPK, contentPK) => {
    Api.voteSurvey(answerPK, contentPK, userPK)
      .then((res) => {
        console.log('투표완료!', res.data)
        
        Api.getUserSurvey(ownerName)
        .then((res) => {
          console.log('유저 설문 받아오기')
          let data = res.data.success
          if (data.length === 0) {
            setIsImage(false)
          } else {
            data.map((content, idx) => {
            data[idx]['id'] = idx
            Api.getContentEmotion(data[idx].contentPK)
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
                setSurveyEmoji(emojis => [...emojis, temp])
                setEmotions(chks => [...chks, chk])
                setGiveEmotion(curr => [...curr, isMe])
              })
              .catch((err) => {
                console.warn(err)
              })
              // 투표 했는지 여부는 post로 체크한다!
              Api.voteCheck(data[idx].contentPK, userPK)
                .then((res) => {
                  console.log('voteCheck', res.data, res.data.success)
                  if (res.data.success === "투표하지 않았습니다.") {
                    setCheckVote(item => [...item, ''])
                  } else {
                    setCheckVote(item => [...item, res.data.success])
                  }
                })
                .catch((err) => {
                  console.warn(err)
                })
            })
          setSurveyData(data)
          }
        })
        .catch((err) => {
          console.warn(err)
        })
      .catch((err) => {
        console.warn(err)
      })
    })
  }

  const addEmotion = (emoji, contentId, userPK, idx) => {
    Api.setContentEmotion(emoji, contentId, userPK)
      .then((res) => {
        console.log('emotion success')
        console.log(res.data)
        // 공감 완료 표시
        setImageEmoji(emojis => {
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
    Api.setContentEmotion(giveEmotion[currentIndex], surveyData[currentIndex].contentPk, userPK)
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
          paddingLeft: 17,
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
              marginRight: 5,
            }}
            source={images.menu.question}
            resizeMode='contain' />
          <Text>질문</Text>
        </View>
        <TouchableOpacity onPress={toggleModal}>
          <AntDesign name="close" size={18} color="black" />
        </TouchableOpacity>
      </View>
      <SwiperFlatList
        data={surveyData}
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
                backgroundColor: '#0B1C26',
                flex: 1,
                justifyContent: 'center',
                alignItems:"center"
              }}
            >
              {checkVote[currentIndex] === '' &&
                <>
                  <Text style={{ color: 'white', fontSize: 24, marginBottom: 50 }}>{item.exon}</Text>
                  {item.answerList.map((ans, idx) => {
                    const total = Object.values(item.count).reduce((a, b) => a + b)
                    const num = Number.isNaN(Math.round(item.count[ans]/total*100)) ? 0 : Math.round(item.count[ans]/total*100)
                    return (
                      <TouchableWithoutFeedback
                        key={item.answerPK[ans]} 
                        onPress={() => {
                          console.log(ans, surveyData[currentIndex].answerPK[ans])
                          setCheckVote([])
                          voteToSurvey(surveyData[currentIndex].answerPK[ans], surveyData[currentIndex].contentPK)
                        }}
                      >
                        <View style={{
                          width: deviceWidth * 0.75,
                          height: 40,
                          backgroundColor: '#0B1C26',
                          borderColor: 'white',
                          borderWidth: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: 10,
                          paddingHorizontal: 10,
                        }}>
                          <Text style={{zIndex: 1, height: '100%', fontSize: 20, textAlignVertical: 'center', paddingLeft: 10, color: 'white'}}
                            onChangeText={(text) => onTextChange(0, text)}
                          >{ans}</Text>
                        </View>
                      </TouchableWithoutFeedback>
                    )})}
                </>
              }
              {checkVote[currentIndex] !== '' &&
                <>
                  <Text style={{color: 'white', fontSize: 24, marginBottom: 50}}>{item.exon}</Text>
                  {item.answerList.map((ans, idx) => {
                    const total = Object.values(item.count).reduce((a, b) => a + b)
                    const num = Number.isNaN(Math.round(item.count[ans]/total*100)) ? 0 : Math.round(item.count[ans]/total*100)
                    return (
                      <View key={item.answerPK[ans]} style={{
                        width: deviceWidth * 0.75,
                        height: 40,
                        backgroundColor: '#0B1C26',
                        borderColor: 'white',
                        borderWidth: 1,
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
                        <LinearGradient colors={["#AB79EF", "#FC98AB"]}
                          start={{ x: 0, y: 1 }}
                          end={{ x: 1, y: 1 }}
                          style={{
                          width: deviceWidth * 0.735 * num / 100,
                          position: 'absolute',
                          opacity: 0.8,
                          top: 0,
                          left: 0,
                          bottom: 0,
                        }}>
                        </LinearGradient>
                      </View>
                    )})}
                </>
              }
              <View style={{justifyContent: 'flex-start', width: '75%'}}>
                <Text style={{ color: 'white', fontSize: 16, marginTop: 10 }}>
                  {Object.values(item.count).reduce((a, b) => a + b) + '명 참여중'}
                </Text>
              </View>
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
                  flex:1, 
                  width: '70%',
                  height: '100%',
                }}
                onPress={() => {
                  setIsEmojiSelect(false)
                  console.log('surveyData', surveyData)
                  console.log('surveyEmoji', surveyEmoji)
                  addEmotion(emotion, surveyData[currentIndex].contentPk, userPK, currentIndex)
                  console.warn('checkehck', surveyData, checkVote)
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
          <View style={{flexDirection: 'row', alignItems:'center', marginLeft: 10}}>
            {!isEmotions[currentIndex] &&
              <View>
                <Text
                  style={{
                    color: '#B4B4B4'
                  }}
                >
                  첫 공감을 남겨보세요
                </Text>
              </View>}
            {isEmotions[currentIndex] && Object.keys(surveyEmoji[currentIndex]).map((item, index) => (
              <View key={index} style={{flexDirection: 'row', alignItems:'center', marginLeft: 10}}>
                <Image
                  style={{ width: 24, height: 24, marginRight: 5 }}
                  source={emojiImages.default.emoji[item]}
                  />
                <Text>{surveyEmoji[currentIndex][item]}</Text>
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
          {surveyData.length !== 0
          ?
            <Text
              style={{
                color: '#B4B4B4',
                fontSize: 12,
              }}
            >
              {humanize(surveyData[currentIndex].createAt)}
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

export default connect(mapStateToProps)(SurveyContent)