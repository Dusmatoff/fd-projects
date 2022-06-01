import { combineReducers } from 'redux';
import { appReducer } from './app';
import { userReducer } from './user';
import { requestsReducer } from './requests';
import { commentsReducer } from './comments';
import { updatesReducer } from './updates';

export const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  requests: requestsReducer,
  comments: commentsReducer,
  updates: updatesReducer,
});
