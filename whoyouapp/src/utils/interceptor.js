import axios from 'axios'
// import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import jwt_decode from "jwt-decode";


axios.defaults.baseURL = "https://k5a101.p.ssafy.io/api/v1/"
axios.defaults.headers.post["Content-Type"] = "application/json"


axios.interceptors.request.use(
  async function (config) {
    const word = config.url.split("/")
    if (word[0] != "login") {
      const accessToken = await AsyncStorage.getItem('access_token')
      // console.log(accessToken)
      const refreshToken = await AsyncStorage.getItem('refresh_token')
      const decodedAccessToken = jwt_decode(accessToken)
      // console.log(decodedAccessToken.exp, Date.now()/ 1000 + 1780)
      if (decodedAccessToken.exp < Date.now() / 1000 + 10) {
        config.headers["access_token"] = accessToken
        config.headers["refresh_token"] = refreshToken
      }
      else {
        // console.log('testest')
        config.headers["access_token"] = accessToken
      }
      
    }
    // console.log("에베베",config.url)
    // console.log(config.headers)
    return config
  },
  function (error) {
    console.log(error);
    console.log("request  에러 : " + error);
    return Promise.reject(error);
  }
)

axios.interceptors.response.use(
  async function (response) {
    // console.log('-------response--------', response.headers)

    const accessToken = await AsyncStorage.getItem('access_token')
    // console.log(response.config.headers["access_token"])
    if (
      accessToken &&
      response.headers["access_token"] &&
      response.headers["access_token"] != accessToken
    ) {
      console.log('바뀐다!!! ',await AsyncStorage.getItem('access_token'))
      await AsyncStorage.setItem("access_token", response.headers["access_token"])
    }
    return response
  },
  function (error) {
    console.log(error)
    console.log("response   에러 : " + error)
    return Promise.reject(error)
  }
);

export default axios;