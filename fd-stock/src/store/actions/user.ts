import * as types from '../actionTypes/app';
import * as userTypes from '../actionTypes/user';
import { ajaxGet } from '../../utils';

export function fetchCurrentUser() {
  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const user = await ajaxGet('get-user-with-location', { availability: false });

      dispatch({ type: userTypes.SET_USER, payload: user });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
}
