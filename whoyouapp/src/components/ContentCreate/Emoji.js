import React, {useEffect, useRef, useState} from 'react';
import { Text, TouchableOpacity, View, StyleSheet, ScrollView, Dimensions, TextInput, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios'
import { connect } from 'react-redux'
import { actionCreators } from '../../store/reducers'


const emojiArray = [
  ['amazing', 'amazing2', 'amazing3', 'amazing4', 'amazing5', 'amazing6'], 
  ['amazing', 'amazing', 'amazing', 'amazing', 'amazing', 'amazing']
]

const Emoji = ({ navigation, route, setUserEmoji, SERVER_URL, userPK, userEmoji }) => {
  
  const [isEmojiSelect, setIsEmojiSelect] = useState(false)
  const [emoji, setEmoji] = useState(userEmoji)
  const [checked, setChecked] = useState(false)

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
        <TouchableOpacity style={{ marginRight: 10 }} >
          <Text>등록</Text>
        </TouchableOpacity>
      )
    });
    if (checked) {
      createEmoji()
      navigation.navigate('Main')
    }
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
        <TouchableOpacity
          onPress={() => {setIsEmojiSelect(!isEmojiSelect)}}
        >
          <Image
            style={{ width: 50, height: 50 }}
            source={route.params.emoji}
          />
        </TouchableOpacity>
      </View>
      <View style={isEmojiSelect ? styles.emojiSelectBoxClose: styles.emojiSelectBoxOpen}>
        { [0, 1].map((num, index) => (
          <View key={index} style={styles.emojiSelectRow}>
            {emojiArray[num].map((emotion, index2) => (
              <View key={index2} style={styles.emojiSelectCol}>
                <TouchableOpacity
                  onPress={() => {
                    setIsEmojiSelect(false)
                    setEmoji(emojiArray[index][index2])
                    setChecked(true)
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
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emojiSelectBoxOpen: {
    position: 'absolute',
    width: 300,
    height: 100,
    bottom: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: "#B4B4B4",
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 4,
  },
  emojiSelectBoxClose: {
    opacity: 0,
    position: 'absolute',
    width: 300,
    height: 100,
    bottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
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