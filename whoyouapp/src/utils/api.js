import axios from './interceptor'

export default {

  loginGoogle(data) {
    return axios({
      url: 'login/google',
      method: 'post',
      data: { googleIdToken: data }
    })
  },

  getUser(pk) {
    return axios({
      url: `user/setup/${pk}`,
      method: 'get'
    })
  },

  isDuplicatedNickname(inputValue) {
    return axios({
      url: `user/duplicated/${inputValue}`,
      method: 'post',
      data: {
        userName: inputValue  
      }
    })
  },

  setFCMToken(pk, token) {
    return axios({
      url: `browser/in`,
      method: 'post',
      data: {
        browserToken: token,
        userPK: pk
      }
    })
  }
}