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
  
      if (decodedAccessToken.exp < Date.now() / 1000 + 60) {
        config.headers["access_token"] = accessToken
        config.headers["refresh_token"] = refreshToken
      }
      else {
        // console.log('testest')
        config.headers["access_token"] = accessToken
      }
      if (word[0] == 'content' && word[1] == 'upload') {
        config.headers["Content-Type"] = 'multipart/form-data'
      }
    }
    // console.log("에베베",config.url)
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

    const accessToken = await AsyncStorage.getItem('access_token')
    // console.log(accessToken)
    if (
      accessToken &&
      response.headers["access_token"] &&
      response.headers["access_token"] != accessToken
    ) {
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








// headers 안에 담겨 오는지  검증.
// const setJwtTokens = (response) => {
//   if (response.headers['access_token'])
//     AsyncStorage.setItem('access_token', response.headers['access_token'])
//   if (response.headers['refresh_token'])
//     AsyncStorage.setItem('refresh_token', response.headers['refresh_token'])
// }

// const updateAccessToken = (response) => {
//   if (response.headers['access_token'] !== AsyncStorage.getItem('access_token')) {
//     AsyncStorage.setItem('access_token', response.headers['access_token'])
//   }
// }

// export const requestGet = async (url, headers) => {
//   try {
//     const response = await axios.get(url, { headers })
//     if (response.status === 200) {
//       if (response.headers['access_token']) {
//         updateAccessToken(response)
//       }
//       return response.data
//     }
//     throw new Error()
//   } catch (e) {
//     throw new Error(e)
//   }
// }

// export const requestPost = async (url, data, headers) => {
//   try {
//     const response = await axios.post(url, data, { headers })
//     if (response.status === 200) {
//       if (response.headers['access_token']) {
//         setJwtTokens(response)
//       }
//       return response.data;
//     }
//     throw new Error()
//   } catch (e) {
//     throw new Error(e)
//   }
// }

// export const requestPut = async (url, data, headers) => {
//   try {
//     const response = await axios.put(url, data, { headers })
//     if (response.status === 200) {
//       if (response.headers['access_token']) {
//         updateAccessToken(response)
//       }
//       return response.data
//     }
//     throw new Error()
//   } catch (e) {
//     throw new Error(e)
//   }
// }

// export const requestDelete = async (url, headers) => {
//   try {
//     const response = await axios.delete(url, { headers })
//     if (response.status === 200) {
//       if (response.headers['access_token']) {
//         updateAccessToken(response)
//       }
//       return response.data
//     }
//     throw new Error()
//   } catch (e) {
//     throw new Error(e)
//   }
// }


