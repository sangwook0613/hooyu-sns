import axios from 'axios'
import * as SecureStore from 'expo-secure-store'


// headers 안에 담겨 오는지  검증.
const setJwtTokens = (response) => {
  if (response.headers['access_token'])
    SecureStore.setItemAsync('access_token', response.headers['access_token'])
  if (response.headers['refresh_token'])
    SecureStore.setItemAsync('refresh_token', response.headers['refresh_token'])
}

const updateAccessToken = (response) => {
  if (response.headers['access_token'] !== SecureStore.getItemAsync('access_token')) {
    SecureStore.setItemAsync('access_token', response.headers['access_token'])
  }
}

export const requestGet = async (url, headers) => {
  try {
    const response = await axios.get(url, { headers })
    if (response.status === 200) {
      if (response.headers['access_token']) {
        updateAccessToken(response)
      }
      return response.data
    }
    throw new Error()
  } catch (e) {
    throw new Error(e)
  }
}

export const requestPost = async (url, data, headers) => {
  try {
    const response = await axios.post(url, data, { headers })
    if (response.status === 200) {
      if (response.headers['access_token']) {
        setJwtTokens(response)
      }
      return response.data;
    }
    throw new Error()
  } catch (e) {
    throw new Error(e)
  }
}

export const requestPut = async (url, data, headers) => {
  try {
    const response = await axios.put(url, data, { headers })
    if (response.status === 200) {
      if (response.headers['access_token']) {
        updateAccessToken(response)
      }
      return response.data
    }
    throw new Error()
  } catch (e) {
    throw new Error(e)
  }
}

export const requestDelete = async (url, headers) => {
  try {
    const response = await axios.delete(url, { headers })
    if (response.status === 200) {
      if (response.headers['access_token']) {
        updateAccessToken(response)
      }
      return response.data
    }
    throw new Error()
  } catch (e) {
    throw new Error(e)
  }
}