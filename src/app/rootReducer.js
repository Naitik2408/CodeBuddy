// filepath: /home/naitik2408/Contribution/code-collab-platform/client/src/app/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import groupReducer from '../features/group/groupSlice';
import questionReducer from '../features/question/questionSlice';
import themeReducer from '../features/theme/themeSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  group: groupReducer,
  question: questionReducer,
  theme: themeReducer, // Add theme reducer
});

export default rootReducer;