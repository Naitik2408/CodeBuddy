import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import groupReducer from '../features/group/groupSlice';
import questionReducer from '../features/question/questionSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  group: groupReducer,
  question: questionReducer, // Add this
});

export default rootReducer;