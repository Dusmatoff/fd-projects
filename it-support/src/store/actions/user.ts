import * as types from '../actionTypes';
import { ajaxGet } from '../../utils';

export function fetchCurrentUser() {
  return async function (dispatch) {
    try {
      const user = await ajaxGet('get-user-with-location', { availability: false });

      dispatch({ type: types.SET_USER, payload: user });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
    }
  };
}
