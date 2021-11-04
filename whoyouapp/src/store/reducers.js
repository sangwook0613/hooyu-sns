import { combineReducers } from 'redux';
import { createAction, createReducer } from "@reduxjs/toolkit";

// 기본 State 정리
const defaultState = {
  userId: 0,
}

// Actions 정의
const login = createAction("LOGIN");
const logout = createAction("LOGOUT");


// Reducer 정의
const UserReducer = createReducer(defaultState, {
  [login]: (state, action) => {
    // 로그인 시 state 변경 로직
    // state.push({ text: action.payload, id: Date.now() });
  },
  // [logout]: (state, action) => 
    // 로그아웃 시 state 변경 로직
    // state.filter(toDo => toDo.id !== action.payload)
});


export default combineReducers({
  user: UserReducer,
});