import { combineReducers } from 'redux';
import { appReducer } from './app';
import { userReducer } from './user';
import { categoriesReducer } from './categories';
import { itemsReducer } from './items';
import { inventoryReducer } from './inventory';
import { reportsReducer } from './reports';
import { dailyReportsReducer } from './dailyReports';

export const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  categories: categoriesReducer,
  items: itemsReducer,
  inventory: inventoryReducer,
  reports: reportsReducer,
  dailyReports: dailyReportsReducer,
});
