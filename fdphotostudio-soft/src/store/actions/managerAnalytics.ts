import * as types from '../actionTypes';
import { ajaxGet } from '../../utils';

export const fetchManagerAnalytics = () => async function (dispatch) {
  dispatch({ type: types.SHOW_LOADER });

  try {
    const result = await ajaxGet('fdsoft/manager-analytics');

    dispatch({ type: types.SET_MANAGER_ANALYTICS, payload: result });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};
