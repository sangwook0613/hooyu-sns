import React, {useRef, useState, useEffect} from 'react';
import { Text, TouchableOpacity, View, StyleSheet, ScrollView, Dimensions, TextInput, Image, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios'
import { connect } from 'react-redux'
import { actionCreators } from '../../store/reducers'


const SERVER_URL = 'https://k5a101.p.ssafy.io/api/v1/'
const clientWidth = Dimensions.get('screen').width
const clientHeight = Dimensions.get('screen').height

const colorArray = ['#FFD0D0', 'red', 'orange', 'yellow', 'green', 'blue', 'purple']
const emojiArray = [
  ['amazing', 'amazing2', 'amazing3', 'amazing4', 'amazing5', 'amazing6'], 
  ['amazing', 'amazing', 'amazing', 'amazing', 'amazing', 'amazing']
]


const Status = ({ navigation, route, setUserEmoji, SERVER_URL, userPK, userEmoji }) => {
  const [emoji, setEmoji] = useState(userEmoji)
  const [isEmojiSelect, setIsEmojiSelect] = useState(0)
  const [color, setColor] = useState('#FFD0D0')
  const [colorScrollX, setColorScrollX] = useState(0)
  const [status, setStatus] = useState('')
  const statusBackground = useRef()
  const colorScroll = useRef()
  
  
  const StatusTitle = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => setIsEmojiSelect(isEmojiSelect+1)}
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

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: (props) => <StatusTitle {...props} />,
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 10 }} onPress={() => {
          createStatus()
          navigation.navigate('Main')
          console.log(color)
          console.log(status)
        }}>
          <Text>등록</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation, status, color, emoji]);


  const onEndScroll = () => {
    colorScroll.current.scrollTo({ x : parseInt((colorScrollX+35)/70)*70 })
  }

  const onColorPress = (index) => {
    colorScroll.current.scrollTo({ x : index*70 })
  }

  const backgroundStyle = (color) => {
    return {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: color,
    }
  }

  

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
      console.log(res.data.success)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const createStatus = () => {
    axios({
      method: 'post',
      url: SERVER_URL + 'content/create/status',
      data: {
        "color": color,
        "exon": status,
        "userPK": userPK
      }
    })
    .then((res) => {
      console.log(res.data.success)
      createEmoji()
    })
    .catch((err) => {
      console.log(err)
    })
  }



  return (
    <TouchableWithoutFeedback onPress={() => {setIsEmojiSelect(false)}}>
      <View style={backgroundStyle(color)} ref={statusBackground}>
        <View style={styles.foo}>
          <Text></Text>
        </View>
          <View style={styles.statusBox} >
            <TextInput style={{ textAlign: 'center'}}
              placeholder={"상태를 입력해주세요"}
              onChangeText={(text) => setStatus(text)}
              />
          </View>
        <View style={styles.scrollViewBox} >
          <View style={styles.scrollViewInner}>
            <ScrollView 
              style={styles.scrollView}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              onScroll = {(e) => {
                setColorScrollX(e.nativeEvent.contentOffset.x)
                setColor(colorArray[parseInt((colorScrollX+35)/70)])
              }}
              onScrollEndDrag={onEndScroll}
              ref={colorScroll}
              >
              <View style={styles.blankBox}></View>
              {
                colorArray.map((color, index) => (
                  <TouchableOpacity 
                  onPress={() => {onColorPress(index)}} 
                  key={index}
                  >
                    <LinearGradient
                      colors={colorArray[parseInt((colorScrollX+35)/70)] === color ? 
                        ["#AB79EF", "#FC98AB"] : ["white", "white"]}
                      style={{
                        width: colorArray[parseInt((colorScrollX+35)/70)] === color ? 
                        40 : 34,
                        height: colorArray[parseInt((colorScrollX+35)/70)] === color ? 
                        40 : 34,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: colorArray[parseInt((colorScrollX+35)/70)] === color ? 
                        15 : 18,
                        elevation: 4,
                        marginTop: colorArray[parseInt((colorScrollX+35)/70)] === color ? 
                        0 : 6
                      }}
                    >
                      <View
                        style={{ 
                          width: 34,
                          height: 34,
                          backgroundColor: color,
                        }}
                      ></View>
                    </LinearGradient>
                  </TouchableOpacity>
                  
                  ))
                }
              <View style={styles.blankBox}></View>

            </ScrollView>
          </View>
        </View>
        { Boolean(isEmojiSelect%2) && 
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
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: "#FFD0D0",
  },
  foo: {
    flex: 1,
  },
  statusBox: {
    flex: 3,
    justifyContent: "center",
  },
  scrollViewBox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  scrollViewInner: {
    height: 40
  },
  scrollView: {
  },  
  colorBox: {
    width: 40,
    height: 40,
    borderColor: 'black',
    borderWidth: 2,
    marginHorizontal: 15
  },
  blankBox: {
    width: clientWidth/2-65,
    height: 40,
    marginHorizontal: 15
  },
  emojiSelect: {
    position: 'absolute',
    width: 300,
    height: 100,
    borderWidth: 1,
    borderColor: "#aaa",
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


export default connect(mapStateToProps, mapDispatchToProps)(Status);