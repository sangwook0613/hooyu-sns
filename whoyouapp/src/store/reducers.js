import { combineReducers } from 'redux'
import { createAction, createReducer } from "@reduxjs/toolkit"
import { Dimensions } from 'react-native'


// 기본 State 정리
const defaultState = {
  deviceWidth: Dimensions.get('window').width,
  deviceHeight: Dimensions.get('window').height,
  myRadius: 2000,
  SERVER_URL: 'https://k5a101.p.ssafy.io/api/v1/',
  userPK: 2,
}

// Actions 정의
const login = createAction("LOGIN")
const logout = createAction("LOGOUT")
const setRadius = createAction("SETRADIUS")

// Reducer 정의
const UserReducer = createReducer(defaultState, {
  [login]: (state, action) => {
    // 로그인 시 state 변경 로직
    // state.push({ text: action.payload, id: Date.now() });
  },
  [setRadius]: (state, action) => ({
    ...state,
    myRadius: action.payload
  })
});

export const actionCreators = {
  login,
  logout,
  setRadius
}

export default combineReducers({
  user: UserReducer,
})