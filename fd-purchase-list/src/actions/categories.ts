import * as types from '../actionTypes/app';
import * as categoryTypes from '../actionTypes/categories';
import { ajaxGet } from '../utils';

export function fetchCategories() {
  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const categories = await ajaxGet('debit-and-credit-categories');

      dispatch({
        type: categoryTypes.SET_CATEGORIES,
        payload: categories,
      });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
}
