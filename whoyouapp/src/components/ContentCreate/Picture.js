import React, {useEffect, useRef, useState} from 'react';
import { Text, TouchableOpacity, View, StyleSheet, PermissionsAndroid, Dimensions, Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import imageUpload from '../../assets/createcontent/uploadImage.png'
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios'
import { connect } from 'react-redux'
import { actionCreators } from '../../store/reducers'

const clientWidth = Dimensions.get('screen').width

const emojiArray = [
  ['amazing', 'amazing2', 'amazing3', 'amazing4', 'amazing5', 'amazing6'], 
  ['amazing', 'amazing', 'amazing', 'amazing', 'amazing', 'amazing']
]

const Picture = ({ navigation, route, setUserEmoji, SERVER_URL, userPK, userEmoji }) => {
  
  const [isEmojiSelect, setIsEmojiSelect] = useState(false)
  const [emoji, setEmoji] = useState(userEmoji)
  const [imageFile, setImageFile] = useState('')
  const [sendForm, setSendForm] = useState('')


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

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: (props) => <PictureTitle {...props} />,
      headerRight: () => (
        <View>
          { imageFile ? 
            <TouchableOpacity style={{ marginRight: 10 }} onPress={() => {
              createPicture()
              navigation.navigate('Main')
            }}>
              <Text>등록</Text>
            </TouchableOpacity>
            :
            <Text style={{color: 'gray', marginRight: 10 }}>등록</Text>
          }

        </View>
      )
    });
  }, [navigation, emoji, imageFile, sendForm]);


  const imageGalleryLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      mediaType: 'photo'
    };
  
    ImagePicker.launchImageLibrary(options, (res) => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        setImageFile(res.assets[0])
      }
    });
  }  

  const requestGalleryPermission = async () => {
    if (Platform.OS === 'ios') {
      alert('안드로이드에서만 지원됩니다.')
    }

    if (Platform.OS === 'android') {
      const galleryGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      )
      if (
        galleryGranted === PermissionsAndroid.RESULTS.GRANTED
      ) {
        imageGalleryLaunch()
      } else {
        alert('갤러리 접근 권한을 얻지 못했습니다.')
        // return false
      }
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

  const createPicture = () => {
    const formData = new FormData();

    formData.append('upload', {
      uri: imageFile.uri,
      type: imageFile.type,
      name: imageFile.fileName
    })

    axios({
      method: 'post',
      url: 'content/upload',
      data: formData
    })
    .then((res) => {
      savePicture(res.data.success)
      createEmoji()
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const savePicture = (uri) => {
    axios({
      method: 'post',
      url: SERVER_URL + 'content/create/image',
      data: {
        userPK: userPK,
        color: '',
        exon: uri,
      }
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
                  source={{ uri: imageFile.uri }}
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
            <TouchableOpacity onPress={() => {
              requestGalleryPermission()
            }}
            >
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
                      // console.log('onpress')
                      setEmoji(emojiArray[index][index2])
                      // console.log(emoji)
                      setIsEmojiSelect(false)
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


export default connect(mapStateToProps, mapDispatchToProps)(Picture);