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

}