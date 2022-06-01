import * as types from '../actionTypes/app';
import * as hallsTypes from '../actionTypes/halls';
import { ajaxGet } from '../utils';

export function fetchHalls() {
  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const halls = await ajaxGet('fd_shop_get_halls');

      dispatch({ type: hallsTypes.SET_HALLS, payload: halls });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
}
