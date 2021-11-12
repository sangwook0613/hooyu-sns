import React, { useEffect, useState } from 'react'
import { Image, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SwiperFlatList } from 'react-native-swiper-flatlist'
import Api from '../utils/api'
import { connect } from 'react-redux'
import * as emojiImages from '../assets/images'
import images from '../assets/images'

const emojiArray = ['smile', 'amazing', 'sad', 'love', 'sense', 'angry']

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

const SurveyContent = ({ ownerName, userPK, userName, deviceWidth, deviceHeight, setIsSurvey }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isEmojiSelect, setIsEmojiSelect] = useState(false)
  const [surveyData, setSurveyData] = useState([])
  const [isEmotions, setEmotions] = useState([])
  const [giveEmotion, setGiveEmotion] = useState([])
  const [surveyEmoji, setSurveyEmoji] = useState([])
  const [checkVote, setCheckVote] = useState([])

  useEffect(() => {
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
  }, [])

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



  return (
    <View>
      <SwiperFlatList
        // renderAll={true}
        showPagination
        data={surveyData}
        onChangeIndex={({ index }) => {
          setCurrentIndex(index)
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
                  console.log('surveyData', surveyData)
                  console.log('surveyEmoji', surveyEmoji)
                  // addEmotion(emotion, surveyData[currentIndex].contentPk, userPK, currentIndex)
                  console.warn('checkehck', surveyData, checkVote)
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
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        backgroundColor: 'white',
        elevation: 10 
      }}>
        {giveEmotion[currentIndex] === '' &&
          <TouchableOpacity style={{ marginLeft: 15, marginRight: 20 }} onPress={() => setIsEmojiSelect(!isEmojiSelect)}>
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

export default connect(mapStateToProps)(SurveyContent)