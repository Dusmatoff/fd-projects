import * as hallsTypes from '../actionTypes/halls';
import * as types from '../actionTypes/app';
import { ajaxGet, ajaxPost } from '../utils';

export function fetchHalls() {
  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const halls = await ajaxGet('get_halls');

      dispatch({ type: hallsTypes.SET_HALLS, payload: halls });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
      throw error.message;
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
}

export function updateStudioNote(values) {
  const formData = new FormData();
  formData.set('action', 'update_studio_note_react');
  formData.set('studio_note', values.studioNote);
  formData.set('hall_id', values.hallId);

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const update = await ajaxPost(formData);

      dispatch({ type: types.SHOW_ALERT, payload: update.message });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
      throw error.message;
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
}
