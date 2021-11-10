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

  updateNickname(inputValue, pk) {
    return axios({
      url: `user/nameSet`,
      method: 'post',
      data: {
        userName: inputValue,
        userPK: pk,
      }
    })
  },

  setPushSetting(accept, radius, sync, pk) {
    return axios({
      url: `user/push`,
      method: 'post',
      data: {
        accept: accept,
        radius: radius,
        sync: sync,
        userPK: pk
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
  },

  setPushAlarmReceive(accept, radius, sync, pk) {
    return axios({
      method: 'post',
      url: 'user/push',
      data: {
        accept: accept,
        radius: radius,
        sync: sync,
        userPK: pk
      }
    })
  },

  setUserAlived(pk) {
    return axios({
      method: 'put',
      url: `user/wakeup?userPK=${pk}`
    })
  },

  setUserKilled(pk) {
    return axios({
      method: 'put',
      url: `user/killed?userPK=${pk}`
    })
  },
}