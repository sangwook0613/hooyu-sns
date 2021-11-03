import React, {useRef, useState} from 'react';
import { Text, TouchableOpacity, View, StyleSheet, ScrollView, Dimensions, TextInput, Image } from 'react-native';


const clientWidth = Dimensions.get('screen').width
const clientHeight = Dimensions.get('screen').height

const colorArray = ['#FFD0D0', 'red', 'orange', 'yellow', 'green', 'blue', 'purple']

const Picture = ({ navigation, route }) => {
  
  const PictureTitle = () => {
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
      headerTitle: (props) => <PictureTitle {...props} />,
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 10 }} >
          <Text>등록</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation]);


  const [color, setColor] = useState('#FFD0D0')
  const [colorScrollX, setColorScrollX] = useState(0)
  const statusBackground = useRef()
  const colorScroll = useRef()

  const onEndScroll = () => {
    colorScroll.current.scrollTo({ x : parseInt((colorScrollX+35)/70)*70 })
  }

  const onColorPress = (index) => {
    colorScroll.current.scrollTo({ x : index*70 })
    // setIsBlack('white')
  }

  const backgroundStyle = (color) => {
    return {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      // backgroundColor: "#FFD0D0",
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
          placeholder={"사진을 입력해주세요"}
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
    flex: 1,
    justifyContent: "center"
  },
  scrollViewBox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  scrollViewInner: {
    height: 40,
    marginBottom: 50,
  },
  scrollView: {
    height: 30,
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
});


export default Picture;