import { combineReducers } from 'redux';
import { appReducer } from './app';
import { purchasesReducer } from './purchases';
import { categoriesReducer } from './categories';
import { typesReducer } from './types';
import { vendorsReducer } from './vendors';
import { userReducer } from './user';

export const rootReducer = combineReducers({
  app: appReducer,
  purchases: purchasesReducer,
  categories: categoriesReducer,
  types: typesReducer,
  vendors: vendorsReducer,
  user: userReducer,
});
