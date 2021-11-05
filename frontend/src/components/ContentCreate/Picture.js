import React, {useRef, useState} from 'react';
import { Text, TouchableOpacity, View, StyleSheet, ScrollView, Dimensions, TextInput, Image, Button } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import imageUpload from '../../assets/createcontent/uploadImage.png'
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios'

const SERVER_URL = 'https://k5a101.p.ssafy.io/api/v1/'
const clientWidth = Dimensions.get('screen').width
const clientHeight = Dimensions.get('screen').height

const emojiArray = [
  ['amazing', 'amazing2', 'amazing3', 'amazing', 'amazing', 'amazing'], 
  ['amazing', 'amazing', 'amazing', 'amazing', 'amazing', 'amazing']
]

const Picture = ({ navigation, route }) => {
  
  
  const [isEmojiSelect, setIsEmojiSelect] = useState(false)
  const [emoji, setEmoji] = useState('amazing')

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
        <TouchableOpacity style={{ marginRight: 10 }} onPress={() => {
          createPicture()
          navigation.navigate('Main')
          }} 
        >
          <Text>등록</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  const [imageFile, setImageFile] = useState('')

  const imageGalleryLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
  
    ImagePicker.launchImageLibrary(options, (res) => {
      console.log('Response = ', res);
  
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        const source = { uri: res.assets[0].uri };
        // console.log('response', JSON.stringify(res));
        console.log(res.assets[0].uri)
        setImageFile(source)
      }
    });
  }  

  const createEmoji = () => {
    axios({
      method: 'post',
      url: SERVER_URL + 'user/emojiSet',
      data: {
        "userEmoji": emoji,
        "userPK": 1
      }
    })
    .then((res) => {
      console.log(res.data.success)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const createPicture = () => {
    axios({
      method: 'post',
      url: SERVER_URL + 'content/create/image',
      data: {
        "color": '',
        "exon": imageFile.uri,
        "userPK": 1
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
    <LinearGradient colors={["#AB79EF", "#FC98AB"]} style={styles.mainView}>
      <TouchableWithoutFeedback onPress={() => {setIsEmojiSelect(false)}} style={{flex: 1}}>
        <View style={{width: clientWidth, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {
            imageFile ? 
            <View>
              <View style={{ elevation: 15}}>
                <Image
                  style={{ width: clientWidth-80, height: clientWidth-80 }}
                  source={imageFile}
                />
              </View>
              <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', marginTop: 50}} onPress={() => imageGalleryLaunch()}>
                <View 
                  style={{ 
                    // borderWidth: 1,
                    borderColor: 'red',
                    elevation: 4,
                    width: 200, 
                    height: 40, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    borderRadius: 10,
                    backgroundColor: 'crimson'
                  }}
                >
                  <Text style={{ textAlign: 'center', color: 'white' }}>Select Another Photo</Text>
                </View>
              </TouchableOpacity>
            </View>
            : 
            <TouchableOpacity onPress={() => imageGalleryLaunch()}>
              <Image
                style={{ width: 150, height: 150, marginLeft: 25 }}
                source={imageUpload}
              />
            </TouchableOpacity>
          }
          {/* <TouchableOpacity onPress={() => imageGalleryLaunch()}>
            <Image
              style={{ width: 150, height: 150, marginLeft: 25 }}
              source={imageUpload}
            />
          </TouchableOpacity> */}
        </View>
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


export default Picture;