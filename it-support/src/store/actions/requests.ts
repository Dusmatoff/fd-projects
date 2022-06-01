import * as types from '../actionTypes';
import {
  ajaxGet, ajaxPost, ajaxPut, ajaxDelete,
} from '../../utils';

export const fetchRequests = () => async function (dispatch) {
  dispatch({ type: types.SHOW_LOADER });

  try {
    const requests = await ajaxGet('it-support/requests');

    dispatch({ type: types.SET_REQUESTS, payload: requests });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};

export const addRequest = (data, screenshot) => async function (dispatch) {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('description', data.description);
  formData.append('screenshot', screenshot);

  if (data.files) {
    for (let i = 0; i < data.files.length; i++) {
      formData.append(`files[${i}]`, data.files[i]);
    }
  }

  dispatch({ type: types.SHOW_LOADER });

  try {
    const result = await ajaxPost('it-support/requests', formData);

    dispatch({ type: types.SHOW_ALERT, payload: result.message });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};

export const updateRequest = (fields: object) => async function (dispatch) {
  dispatch({ type: types.SHOW_LOADER });

  try {
    const result = await ajaxPut('it-support/requests', fields);

    dispatch({ type: types.SHOW_ALERT, payload: result.message });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};

export const deleteRequest = (id) => async function (dispatch) {
  dispatch({ type: types.SHOW_LOADER });

  try {
    const result = await ajaxDelete('it-support/requests', { data: { id } });

    dispatch({ type: types.SHOW_ALERT, payload: result.message });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};

export const addComment = (data, screenshot) => async function (dispatch) {
  const formData = new FormData();
  formData.append('requestId', data.requestId);
  formData.append('comment', data.comment);
  formData.append('screenshot', screenshot);

  if (data.files) {
    for (let i = 0; i < data.files.length; i++) {
      formData.append(`files[${i}]`, data.files[i]);
    }
  }

  dispatch({ type: types.SHOW_LOADER });

  try {
    const result = await ajaxPost('it-support/comments', formData);

    dispatch({ type: types.SHOW_ALERT, payload: result.message });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};

export const fetchRequestComments = (requestId) => async function (dispatch) {
  dispatch({ type: types.SHOW_LOADER });

  try {
    const comments = await ajaxGet('it-support/request/comments', { requestId });

    if (comments.length > 0) {
      dispatch({ type: types.SET_COMMENTS, payload: { [requestId]: comments } });
    }
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};

export const setRequestUpdate = (requestId) => async function (dispatch) {
  try {
    const formData = new FormData();
    formData.append('requestId', requestId);

    await ajaxPost('it-support/request/updates', formData);
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
  }
};

export const fetchRequestsUpdates = () => async function (dispatch) {
  try {
    const updates = await ajaxGet('it-support/request/updates');

    dispatch({ type: types.SET_UPDATES, payload: updates });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
  }
};
