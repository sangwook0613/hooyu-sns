
import React, { useState, useEffect } from 'react'
import { Button, Dimensions } from 'react-native'
import images from '../assets/images'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import jwt_decode from "jwt-decode";
import Api from "../utils/api"
import { connect } from 'react-redux'
import { actionCreators } from '../store/reducers'
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


const Login = ({ navigation: { navigate }, deviceWidth, setUserPK, setUserEmoji, setPushSetting, userPK, userEmoji }) => {
  // const [userpk, setUserpk] = useState(0);
  const [userInfo, setUserInfo] = useState(null);
  const [userInfo2, setUserInfo2] = useState(null);
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true)

  useEffect(() => {
    if (userPK != 0 && userEmoji) {
      navigate('Main')
    } else if (userPK != 0 && !userEmoji) {
      navigate('NicknameTutorial')
    } else {
      GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        webClientId: '5095342969-dcob776t7ckfeu2gddkb2j4ke2cprfst.apps.googleusercontent.com',
      });
      isSignedIn()
    }
  }, [userEmoji])


  // 이미 로그인 되어있는 상태인지 체크
  const isSignedIn = async () => {
    // const {navigate} = this.props.navigation;
    // 여기서 백엔드한테 토큰 보내고, 응답을 받는다.

    const isSignedIn = await GoogleSignin.isSignedIn()

    const accessToken = await AsyncStorage.getItem('access_token')
    const refreshToken = await AsyncStorage.getItem('refresh_token')
    console.log("순서 2")
    console.log(accessToken)
    // refresh 토큰 유효기간 체크
    if (accessToken) {
      await getCurrentUserInfo()
      setTimeout(() => {
        console.log("user : ", userInfo2)
        console.log("순서 4")
        setGettingLoginStatus(false)
        // if (userInfo2 && userInfo2.emoji) {
        //   navigate('Main')
        // } else if (userInfo2 && !userInfo2.emoji) {
        //   navigate('NicknameTutorial')
        // }
      }, 1000)
    }
    setGettingLoginStatus(false)
    // navigate('Main')
    // if (isSignedIn) {
    //   alert('이미 로그인 함.')
    //   getCurrentUserInfo()
    //   setGettingLoginStatus(false)
    //   // Main으로 이동.
    //   // navigate('Main')
    // } else {
    //   console.log('로그인 해라')
    //   setGettingLoginStatus(false)
    // }
    // setGettingLoginStatus(false)
  }

  // 현재 유저 정보 가져오기
  const getCurrentUserInfo = async () => {
    try {
      // 여기서 백엔드한테 보내고, 응답으로 유저 정보를 받는다.
      const userInfo = await GoogleSignin.signInSilently()
      const accessToken = await AsyncStorage.getItem('access_token')
      console.log('userpk', jwt_decode(accessToken).pk)
      await setUserPK(jwt_decode(accessToken).pk)
      Api.getUser(jwt_decode(accessToken).pk)
        .then((res) => {
          setUserInfo2(res.data.success)
          setUserEmoji(res.data.success.emoji)
          setPushSetting(res.data.success.acceptPush, res.data.success.acceptRadius, res.data.success.acceptSync)
          console.log("순서 3")
          console.log(res.data.success.emoji)
        })
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        console.log('아직 로그인 하지 않았음')
      } else {
        console.log("에러에러")
      }
    }
  };

  // 로그인. 회원가입 안되어 있을때도.
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn()
      // console.log('유저 정보 :  ', userInfo)
      // setUserInfo(userInfo)
      // validation 작업
      // console.log(userInfo.idToken)
      await Api.loginGoogle(userInfo.idToken)
        .then(async (res) => {
          // console.log("access token : ", res.headers['access_token'])
          // console.log("refresh token : ", res.headers['refresh_token'])
          await AsyncStorage.setItem('access_token', res.headers['access_token'])
          await AsyncStorage.setItem('refresh_token', res.headers['refresh_token'])
          // console.log("access token : ", await AsyncStorage.getItem('access_token'))
          // console.log("refresh token : ",await AsyncStorage.getItem('refresh_token'))
          console.log("순서 0")
          console.log(res.data.success.id)
          setUserPK(res.data.success.id)
          console.log("순서 1")
        }).catch((err) => {
          console.log(err)
        })
      // 최초 로그인일때. 
      // navigate('Main')
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
    isSignedIn()
  };

  const signOut = async () => {
    setGettingLoginStatus(true)

    // 토큰 지우기
    try {
      await GoogleSignin.revokeAccess()
      await GoogleSignin.signOut()
      await AsyncStorage.setItem('access_token', '')
      await AsyncStorage.setItem('refresh_token', '')
      setUserInfo(null)
    } catch (error) {
      console.error(error)
    }
    setGettingLoginStatus(false)
  };

  if (gettingLoginStatus) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FF6A77' }}>
        <View style={{ flex: 0.7, justifyContent: "center", alignItems: "center" }}>
          <View style={{}}>
            <Image
              source={images.logo}
              style={{ width: deviceWidth * 0.5, height: deviceWidth * 0.5 }}
            />
          </View>
        </View>
        <View style={{ flex: 0.3, alignItems: "center" }}>
          <View style={{ elevation: 4 }}>
            <GoogleSigninButton
              style={{ width: 312, height: 68 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Light}
              onPress={signIn}
            />
          </View>
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

function mapStateToProps(state) {
  return {
    deviceWidth: state.user.deviceWidth,
    deviceHeight: state.user.deviceHeight,
    myRadius: state.user.myRadius,
    SERVER_URL: state.user.SERVER_URL,
    userPK: state.user.userPK,
    userEmoji: state.user.userEmoji,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setUserPK: (pk) => {
      dispatch(actionCreators.setUserPK(pk))
    },
    setUserEmoji: (emoji) => {
      dispatch(actionCreators.setUserEmoji(emoji))
    },
    setPushSetting: (acceptPush, acceptRadius, acceptSync) => {
      dispatch(actionCreators.setPushSetting({acceptPush, acceptRadius, acceptSync}))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)