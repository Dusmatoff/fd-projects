import { combineReducers } from 'redux';
import { appReducer } from './app';
import { userReducer } from './user';
import { managerAnalyticsReducer } from './managerAnalytics';
import { employeesHoursReducer } from './employeesHours';

export const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  managerAnalytics: managerAnalyticsReducer,
  employeesHours: employeesHoursReducer,
});
