import { combineReducers } from 'redux';
import { appReducer } from './app';
import { productsReducer } from './products';
import { categoriesReducer } from './categories';
import { hallsReducer } from './halls';

export const rootReducer = combineReducers({
  app: appReducer,
  products: productsReducer,
  categories: categoriesReducer,
  halls: hallsReducer,
});
