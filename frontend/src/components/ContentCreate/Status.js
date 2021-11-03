import React, {useRef, useState} from 'react';
import { Text, TouchableOpacity, View, StyleSheet, ScrollView, Dimensions, TextInput, Image } from 'react-native';

const clientWidth = Dimensions.get('screen').width
const clientHeight = Dimensions.get('screen').height

const colorArray = ['#FFD0D0', 'red', 'orange', 'yellow', 'green', 'blue', 'purple']
const emojiArray = [
  ['amazing', 'amazing', 'amazing', 'amazing', 'amazing', 'amazing'], 
  ['amazing', 'amazing', 'amazing', 'amazing', 'amazing', 'amazing']
]


const Status = ({ navigation, route }) => {
  
  const StatusTitle = () => {
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
      headerTitle: (props) => <StatusTitle {...props} />,
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 10 }} >
          <Text>등록</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  const [isEmojiSelect, setIsEmojiSelect] = useState(false)
  const [color, setColor] = useState('#FFD0D0')
  const [colorScrollX, setColorScrollX] = useState(0)
  const statusBackground = useRef()
  const colorScroll = useRef()

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

  return (
    <View style={backgroundStyle(color)} ref={statusBackground}>
      <View style={styles.foo}>
        <Text></Text>
      </View>
      <View style={styles.statusBox}>
        <TextInput 
          placeholder={"상태를 입력해주세요"}
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
                  <View
                    style={{ 
                      width: 40,
                      height: 40,
                      backgroundColor: color,
                      borderColor: colorArray[parseInt((colorScrollX+35)/70)] === color ? 'black':'white' ,
                      borderWidth: 2,
                      marginHorizontal: 15
                    }}
                  ></View>
                </TouchableOpacity>
                
              ))
            }
            <View style={styles.blankBox}></View>

          </ScrollView>
        </View>
      </View>
      { isEmojiSelect && 
      <View style={styles.emojiSelect}>
        { [0, 1].map((num, index) => (
          <View key={index} style={styles.emojiSelectRow}>
            {emojiArray[num].map((emotion, index) => (
              <View key={index} style={styles.emojiSelectCol}>
                <TouchableOpacity
                  onPress={() => {setIsEmojiSelect(false)}}
                >
                  <Image 
                    source={route.params.emoji}
                    // source={require(`../../assets/images/${emotion}`)}
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
    justifyContent: "center"
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
    borderWidth: 2,
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


export default Status;