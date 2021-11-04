
import React, { useState, useEffect } from 'react'
import { Dimensions } from 'react-native'
import { requestGet, requestPost } from '../utlis/request'
import images from '../assets/images'

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const Login = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true)

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId: '5095342969-dcob776t7ckfeu2gddkb2j4ke2cprfst.apps.googleusercontent.com',
    });
    isSignedIn()
  }, [])

  const isSignedIn = async () => {
    // const {navigate} = this.props.navigation;
    // 여기서 백엔드한테 토큰 보내고, 응답을 받는다.
    const isSignedIn = await GoogleSignin.isSignedIn()
    // nativate('Main')
    if (isSignedIn) {
      alert('이미 로그인 함.')
      getCurrentUserInfo()
      setGettingLoginStatus(false)
      // Main으로 이동.
      // nativate('Main')
    } else {
      console.log('로그인 해라')
      setGettingLoginStatus(false)
    }
    // setGettingLoginStatus(false)
  }

  const getCurrentUserInfo = async () => {
    try {
      // 여기서 백엔드한테 보내고, 응답으로 유저 정보를 받는다.
      const userInfo = await GoogleSignin.signInSilently()
      console.log('유저 정보 : ', userInfo)
      setUserInfo(userInfo)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        console.log('아직 로그인 하지 않았음')
      } else {
        console.log("에러에러")
      }
    }
  };

  const signIn = async () => {
    try {
      console.log('hi')
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn()
      console.log('유저 정보 :  ', userInfo)
      setUserInfo(userInfo)


      // await axios.get()
      // 여기서 백엔드한테 보내고, 응답을 받는다.
      navigate('Main')
    } catch (error) {
      console.log('Message', JSON.stringify(error))
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('로그인이 중단되었음니다.')
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('로그인이 진행중임.')
      } else if (
        error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
      ) {
        alert('서비스를 이용할 수 없음.')
      } else {
        alert(error.message)
      }
    }
  };

  const signOut = async () => {
    setGettingLoginStatus(true)
    try {
      await GoogleSignin.revokeAccess()
      await GoogleSignin.signOut()
      setUserInfo(null)
    } catch (error) {
      console.error(error)
    }
    setGettingLoginStatus(false)
  };

  if (gettingLoginStatus) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{flex: 0.55, justifyContent: "center", alignItems: "center"}}>
          <View style={{ }}>
            <Image
              source={images.emoji.amazing}
              style={{ width: deviceWidth * 0.3, height: deviceWidth * 0.3 }}
            />
          </View>
        </View>
        <View style={{ flex: 0.45, alignItems: "center"}}>
            <GoogleSigninButton
              style={{ width: 312, height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Light}
              onPress={signIn}
            />
        </View>
      </SafeAreaView>
    );
  }
};



const styles = StyleSheet.create({

  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  imageStyle: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 30,
  },
  footerHeading: {
    fontSize: 18,
    textAlign: 'center',
    color: 'grey',
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'grey',
  },
})

export default Login;