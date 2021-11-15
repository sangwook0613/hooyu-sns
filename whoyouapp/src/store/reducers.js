import { combineReducers } from 'redux'
import { createAction, createReducer } from "@reduxjs/toolkit"
import { Dimensions, StatusBar } from 'react-native'


// 기본 State 정리
const defaultState = {
  deviceWidth: Dimensions.get('window').width,
  deviceHeight: StatusBar.currentHeight > 24 ? Dimensions.get('window').height : Dimensions.get('window').height - StatusBar.currentHeight,
  myRadius: 2000,
  SERVER_URL: 'https://k5a101.p.ssafy.io/api/v1/',
  userPK: 0,
  userEmoji: 'none',
  userName: '',
  acceptPush: null,
  acceptRadius: null,
  acceptSync: null,
}

// Actions 정의
const login = createAction("LOGIN")
const logout = createAction("LOGOUT")
const setRadius = createAction("SETRADIUS")
const setUserPK = createAction("SETUSERPK")
const setUserName = createAction("SETUSERNAME")
const setUserEmoji = createAction("SETUSEREMOJI")
const setPushSetting = createAction("SETPUSHSETTING")


// Reducer 정의
const UserReducer = createReducer(defaultState, {
  [setUserPK]: (state, action) => ({
    ...state,
    userPK: action.payload
    // 로그인 시 state 변경 로직
    // state.push({ text: action.payload, id: Date.now() });
  }),
  [setUserName]: (state, action) => ({
    ...state,
    userName: action.payload
  }),
  [setUserEmoji]: (state, action) => ({
    ...state,
    userEmoji: action.payload
    // 로그인 시 state 변경 로직
    // state.push({ text: action.payload, id: Date.now() });
  }),
  [setRadius]: (state, action) => ({
    ...state,
    myRadius: action.payload
  }),
  [setPushSetting]: (state, action) => ({
    ...state,
    acceptPush: action.payload.acceptPush,
    acceptRadius: action.payload.acceptRadius,
    acceptSync: action.payload.acceptSync
  }),
});

export const actionCreators = {
  setUserPK,
  setUserEmoji,
  setUserName,
  logout,
  setRadius,
  setPushSetting,
}

export default combineReducers({
  user: UserReducer,
})