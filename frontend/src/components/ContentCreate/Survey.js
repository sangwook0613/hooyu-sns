import React, {useRef, useState} from 'react';
import { Text, TouchableOpacity, View, StyleSheet, KeyboardAvoidingView, ScrollView, Dimensions, TextInput, Image, Button } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const clientWidth = Dimensions.get('screen').width
const clientHeight = Dimensions.get('screen').height

const emojiArray = [
  ['amazing', 'amazing', 'amazing', 'amazing', 'amazing', 'amazing'], 
  ['amazing', 'amazing', 'amazing', 'amazing', 'amazing', 'amazing']
]

const Survey = ({ navigation, route }) => {
  
  const [isEmojiSelect, setIsEmojiSelect] = useState(false)

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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: (props) => <SurveyTitle {...props} />,
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 10 }} >
          <Text>등록</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation]);


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
              />
            </View>
          </View>
          <View style={styles.surveyContentView}>
            <Text>옵션</Text>
            <View style={{width: clientWidth*0.8, height: 40, backgroundColor: 'white', borderRadius: 3, justifyContent: 'center', marginTop: 10, paddingHorizontal: 10}}>
              <TextInput style={{height: '100%'}}
                placeholder={"옵션을 입력해주세요"}
              />
            </View>
            <View style={{width: clientWidth*0.8, height: 40, backgroundColor: 'white', borderRadius: 3, justifyContent: 'center', marginTop: 10, paddingHorizontal: 10}}>
              <TextInput style={{height: '100%'}}
                placeholder={"옵션을 입력해주세요"}
              />
            </View>
            <View style={{width: clientWidth*0.8, height: 40, backgroundColor: 'white', borderRadius: 3, justifyContent: 'center', marginTop: 10, paddingHorizontal: 10}}>
              <TextInput style={{height: '100%'}}
                placeholder={"옵션을 입력해주세요"}
              />
            </View>
            <View style={{width: clientWidth*0.8, height: 40, backgroundColor: 'white', borderRadius: 3, justifyContent: 'center', marginTop: 10, paddingHorizontal: 10}}>
              <TextInput style={{height: '100%'}}
                placeholder={"옵션을 입력해주세요"}
              />
            </View>
            <View style={{width: clientWidth*0.8, height: 40, backgroundColor: 'white', borderRadius: 3, justifyContent: 'center', marginTop: 10, paddingHorizontal: 10}}>
              <TextInput style={{height: '100%'}}
                placeholder={"옵션을 입력해주세요"}
              />
            </View>
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
});


export default Survey;