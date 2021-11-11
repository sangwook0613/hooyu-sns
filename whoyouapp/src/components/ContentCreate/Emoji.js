import React, {useEffect, useRef, useState} from 'react';
import { Text, TouchableOpacity, View, StyleSheet, ScrollView, TouchableWithoutFeedback, Dimensions, TextInput, Image, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios'
import { connect } from 'react-redux'
import { actionCreators } from '../../store/reducers'
import * as emojiImages from '../../assets/images'
import { AntDesign } from "@expo/vector-icons"
import { map } from 'lodash';


const clientWidth = Dimensions.get('screen').width
const clientHeight = Dimensions.get('screen').height
const radius = clientWidth * 1/3
const emojiMoveLeft = [0, 0, radius*1/2, radius*Math.sqrt(3)/2, radius, radius*Math.sqrt(3)/2, radius*1/2, 0, -radius*1/2, -radius*Math.sqrt(3)/2, -radius, -radius*Math.sqrt(3)/2, -radius*1/2 ]
const emojiMoveTop = [0, -radius, -radius*Math.sqrt(3)/2, -radius*1/2, 0, radius*1/2, radius*Math.sqrt(3)/2, radius, radius*Math.sqrt(3)/2, radius*1/2, 0, -radius*1/2, -radius*Math.sqrt(3)/2 ]

const emojiArray = [
  'smile', 'amazing', 'sad', 'crying', 'sense', 'angry', 'pouting', 'pokerface', 'love', 'sunglass', 'hard', 'sleep'
]

const Emoji = ({ navigation, setUserEmoji, SERVER_URL, userPK, userEmoji }) => {
  
  const open = useRef(new Animated.Value(0)).current
  const [emoji, setEmoji] = useState(userEmoji)
  const [isEmojiSelect, setIsEmojiSelect] = useState(false)

  const range = (n) => {
    let arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(i/n)
    }
    arr.push(1)
    return arr
  }

  const toggleMenu = () => {
    Animated.timing(open, {
      toValue: isEmojiSelect ? 0 : 1,
      duration: 800,
      useNativeDriver: false,
    }).start()

    setIsEmojiSelect(!isEmojiSelect)
  }


  const EmojiTitle = () => {
    return (
      <View>
        
      </View>
    );
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: (props) => <EmojiTitle {...props} />,
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 10 }} 
          onPress={() => {
            createEmoji()
            navigation.navigate('Main')
          }}
        >
          <Text>게시</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation, emoji]);

  const createEmoji = () => {
    console.log(emoji)
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
      console.log(res.data.success)
    })
    .catch((err) => {
      console.log(err)
    })
  }


  return (
    <LinearGradient colors={["#AB79EF", "#FC98AB"]} style={styles.mainView}>
      <View style={styles.emojiSelect}>
        {
          emojiArray.map((emotion, index) => (
            <Animated.View key={index} style={['', {
              left: open.interpolate({
                inputRange: range(index+1),
                outputRange: emojiMoveLeft.slice(0, index+2)
              }),
              top: open.interpolate({
                inputRange: range(index+1),
                outputRange: emojiMoveTop.slice(0, index+2)
              })
            }]}>
              <TouchableOpacity
                style={styles.selectableEmoji}
                onPress={() => {
                  setIsEmojiSelect(false)
                  toggleMenu()
                  setEmoji(emojiArray[index])
                }}
              >
                <Image
                  source={emojiImages.default.emoji[emotion]}
                  style={{ width: 50, height: 50 }}
                />
              </TouchableOpacity>
            </Animated.View>
          ))
        }
        
        {
          isEmojiSelect ?
          <TouchableOpacity
          style={styles.disableEmojiSelect}
          onPress={() => {
            setIsEmojiSelect(false)
            toggleMenu()
          }}
          >
            <AntDesign name="close" size={30} color="#b4b4b4" />
          </TouchableOpacity>
          :
          <TouchableOpacity
          onPress={() => {
            setIsEmojiSelect(true)
            toggleMenu()
          }}
          style={styles.myEmoji}
          >
            <Image
              source={emojiImages.default.emoji[emoji]}
              style={{ width: 80, height: 80 }}
              />
          </TouchableOpacity>
        }
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiSelect: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 2
  },
  myEmoji: {
    width: 80, 
    height: 80, 
    borderRadius: 40,
    position: 'absolute',
    elevation: 6,
  },
  disableEmojiSelect: {
    width: 60, 
    height: 60, 
    backgroundColor: '#eee', 
    borderRadius: 30, 
    elevation: 4,
    justifyContent: 'center', 
    alignItems: 'center', 
    position: 'absolute'
  },
  selectableEmoji: { 
    position: 'absolute',
    width: 50, 
    height: 50, 
    left: -25,
    top: -25,
    elevation: 5,
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


export default connect(mapStateToProps, mapDispatchToProps)(Emoji);