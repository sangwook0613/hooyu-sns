import React, {useEffect, useRef, useState} from 'react';
import { Text, TouchableOpacity, View, StyleSheet, KeyboardAvoidingView, ScrollView, Dimensions, TextInput, Image, Button } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios'
import { connect } from 'react-redux'
import { actionCreators } from '../../store/reducers'


const SERVER_URL = 'https://k5a101.p.ssafy.io/api/v1/'
const clientWidth = Dimensions.get('screen').width
const clientHeight = Dimensions.get('screen').height

const emojiArray = [
  ['amazing', 'amazing2', 'amazing3', 'amazing4', 'amazing5', 'amazing6'], 
  ['amazing', 'amazing', 'amazing', 'amazing', 'amazing', 'amazing']
]

const Survey = ({ navigation, route, setUserEmoji, SERVER_URL, userPK, userEmoji }) => {
  const [emoji, setEmoji] = useState(userEmoji)
  const [isEmojiSelect, setIsEmojiSelect] = useState(false)
  const [title, setTitle] = useState('')
  const [options, setOptions] = useState(
    [
      '', ''
    ]
  )
  

  const SurveyTitle = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => setIsEmojiSelect(true)}
        >
          <Image
            style={{ width: 40, height: 40 }}
            source={route.params.emoji}
          />
        </TouchableOpacity>
        <Text style={{ marginLeft: 10, color: '#aaa'}}>이모지 선택</Text>
      </View>
    );
  }

  const onTextChange = (index, text) => {
    setOptions(options.map((option, index2) => {
      return index !== index2 ? option: text
    }))
  }

  const onOptionDelete = (index) => {
    const tmpOptions = [...options]
    tmpOptions.splice(index, 1)
    setOptions(tmpOptions)
  }

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: (props) => <SurveyTitle {...props} />,
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 10 }} onPress={() => {
          createSurvey()
          navigation.navigate('Main')
          }}
        >
          <Text>등록</Text>
        </TouchableOpacity>
      )
    });
    setOptions(options)
  }, [navigation, emoji, options]);

  const createEmoji = () => {
    setUserEmoji(emoji)
    axios({
      method: 'post',
      url: SERVER_URL + 'user/emojiSet',
      data: {
        "userEmoji": emoji,
        "userPK": userPK
      }
    })
    .then((res) => {
      console.log("emoji set sucess")
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const createSurvey = () => {
    console.log(title)
    axios({
      method: 'post',
      url: SERVER_URL + 'content/create/survey',
      data: {
        "answerList": [...options],
        "requestContentDto": {
          "color": '',
          "exon": title,
          "userPK": userPK
        }
      }
    })
    .then((res) => {
      console.log("survey set sucess")
      createEmoji()
    })
    .catch((err) => {
      console.log(err)
    })
  }


  return (
    <LinearGradient colors={["#AB79EF", "#FC98AB"]} style={styles.mainView}>
      <TouchableWithoutFeedback onPress={() => {setIsEmojiSelect(false)}} style={{flex: 1, width: clientWidth, alignItems: 'center'}}>
        <KeyboardAwareScrollView style={{flex: 1}}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.surveyTitleView}>
            <Text>무엇이 궁금하신가요?</Text>
            <View style={{width: clientWidth*0.8, height: 40, backgroundColor: 'white', borderRadius: 3, justifyContent: 'center', marginTop: 10, paddingHorizontal: 10}}>
              <TextInput style={{height: '100%'}}
                placeholder={"질문을 입력해주세요"}
                onChangeText={(text) => setTitle(text)}
              />
            </View>
          </View>
          <View style={styles.surveyContentView}>
            <Text>옵션</Text>
            <View style={{width: clientWidth*0.8, height: 40, backgroundColor: 'white', borderRadius: 3, justifyContent: 'center', marginTop: 10, paddingHorizontal: 10}}>
              <TextInput style={{height: '100%'}}
                placeholder={"옵션을 입력해주세요"}
                onChangeText={(text) => onTextChange(0, text)}
              />
            </View>
            <View style={{width: clientWidth*0.8, height: 40, backgroundColor: 'white', borderRadius: 3, justifyContent: 'center', marginTop: 10, paddingHorizontal: 10}}>
              <TextInput style={{height: '100%'}}
                placeholder={"옵션을 입력해주세요"}
                onChangeText={(text) => onTextChange(1, text)}
              />
            </View>
            {
              options.map((option, index) => (
                index > 1 &&
                <View key={index} style={{width: clientWidth*0.8, height: 40, flexDirection: 'row', backgroundColor: 'white', borderRadius: 3, justifyContent: 'space-between', alignItems:'center', marginTop: 10, paddingHorizontal: 10}}>
                  <TextInput style={{height: '100%'}}
                    placeholder={"옵션을 입력해주세요"}
                    onChangeText={(text) => onTextChange(index, text)}
                    value={options[index]}
                  />
                  <TouchableOpacity 
                    onPress={()=> onOptionDelete(index)}
                  >
                    <View style={styles.minusOption}>
                      <Text style={{ fontSize: 16 }}>-</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))
            }
            {
              options.length < 5 && 
              <TouchableOpacity 
                style={{ alignItems: 'center', marginTop: 15 }}
                onPress={()=> {
                  setOptions((prevState) => [...prevState, ''])
                }}
              >
                <View style={styles.addOption}>
                  <Text style={{fontSize: 20}}>+</Text>
                </View>
              </TouchableOpacity>
            }
          </View>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
      { isEmojiSelect && 
        <View style={styles.emojiSelect}>
          { [0, 1].map((num, index) => (
            <View key={index} style={styles.emojiSelectRow}>
              {emojiArray[num].map((emotion, index2) => (
                <View key={index2} style={styles.emojiSelectCol}>
                  <TouchableOpacity
                    onPress={() => {
                      setIsEmojiSelect(false)
                      setEmoji(emojiArray[index][index2])
                      console.warn(index, index2)
                    }}
                    >
                    <Image 
                      source={route.params.emoji}
                      style={{width: '100%', height: '100%'}}
                      />
                  </TouchableOpacity>
                </View>
                ))}
            </View>
          ))}
        </View>
      }
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  surveyTitleView: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 5,
    marginTop: 80
  },
  surveyContentView: {
    flex: 2,
    padding: 5,
    paddingTop: 30,
  },
  emojiSelect: {
    position: 'absolute',
    width: 300,
    height: 100,
    borderWidth: 1,
    borderColor: "#B4B4B4",
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 4,
    },
  emojiSelectRow: {
    flex: 1, 
    flexDirection: 'row',
    width: '100%', 
    height: 10
  },
  emojiSelectCol: {
    flex:1, 
    width: 10, 
    height: '100%',
    padding: 5
  },
  addOption: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  minusOption: {
    // position: 'absolute',
    borderWidth: 2,
    height: 25,
    width: 25,
    borderRadius: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  }
});


function mapStateToProps(state) {
  return {
    SERVER_URL: state.user.SERVER_URL,
    userPK: state.user.userPK,
    userEmoji: state.user.userEmoji,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setUserEmoji: (emoji) => {
      dispatch(actionCreators.setUserEmoji(emoji))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Survey);