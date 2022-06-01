import * as types from '../actionTypes';
import { ajaxPost } from '../../utils';

export const addClient = (fields: object) => async function (dispatch) {
  dispatch({ type: types.SHOW_LOADER });

  const formData = new FormData();

  for (const key in fields) {
    formData.append(key, fields[key]);
  }

  try {
    const result = await ajaxPost('fdsoft/clients', formData);

    dispatch({ type: types.SHOW_ALERT, payload: result.message });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};
