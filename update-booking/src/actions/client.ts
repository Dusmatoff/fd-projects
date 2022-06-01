import moment from 'moment';
import * as clientTypes from '../actionTypes/client';
import * as types from '../actionTypes/app';
import { ajaxGet, ajaxPost } from '../utils';

export const fetchClient = (clientId, appId = false) => async function (dispatch) {
  dispatch({ type: types.SHOW_LOADER });

  try {
    const client = await ajaxGet('get_client', { clientId, appId });

    dispatch({ type: clientTypes.SET_CLIENT, payload: client });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
    throw error.message;
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};

export const addClientNote = (values) => {
  const formData = new FormData();
  formData.set('action', 'add_client_note_react');
  formData.set('type', values.clientNoteType);
  formData.set('clientId', values.clientId);
  formData.set('note', values.clientNoteText);

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const result = await ajaxPost(formData);

      dispatch({ type: types.SHOW_ALERT, payload: result.message });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
      throw error.message;
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
};

export const deleteClientNote = (id) => async function (dispatch) {
  dispatch({ type: types.SHOW_LOADER });

  try {
    const result = await ajaxGet('delete_note_react', { id });

    dispatch({ type: types.SHOW_ALERT, payload: result.message });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
    throw error.message;
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};

export const saveClientSocials = (values) => {
  const formData = new FormData();
  formData.set('action', 'save_socials');
  formData.set('id', values.id);
  formData.set('facebook', values.facebook);
  formData.set('youtube', values.youtube);
  formData.set('twitter', values.twitter);
  formData.set('instagram', values.instagram);
  formData.set('snapchat', values.snapchat);

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const saveSocials = await ajaxPost(formData);

      dispatch({ type: clientTypes.SET_SOCIALS, payload: saveSocials });

      dispatch({ type: types.SHOW_ALERT, payload: 'Socials saved' });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
      throw error.message;
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
};

export const sendAgreement = (values) => {
  const formData = new FormData();
  formData.set('action', 'send_agreement_sign');
  formData.set('email', values.email);
  formData.set('client_id', values.id);
  formData.set('app_id', values.appId);

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      await ajaxPost(formData);

      dispatch({ type: types.SHOW_ALERT, payload: 'Email sent.' });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
};

export const sendSignedAgreement = (values) => {
  const formData = new FormData();
  formData.set('action', 'send_signed_agreement_react');
  formData.set('email', values.email);
  formData.set('client_id', values.id);
  formData.set('app_id', values.appId);

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const result = await ajaxPost(formData);

      dispatch({ type: types.SHOW_ALERT, payload: result.message });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
      throw error.message;
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
};

export const deleteAgreement = (clientId) => {
  const formData = new FormData();
  formData.set('action', 'delete_agreement_react');
  formData.set('client_id', clientId);

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const result = await ajaxPost(formData);

      dispatch({ type: types.SHOW_ALERT, payload: result.message });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
      throw error.message;
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
};

export const uploadPhoto = (values) => {
  const formData = new FormData();
  formData.set('action', 'add_client_photo');
  formData.set('client_id', values.id);
  formData.set('File', values.selectedPhoto);

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const upload = await ajaxPost(formData);

      dispatch({ type: clientTypes.SET_PHOTO, payload: upload });

      dispatch({ type: types.SHOW_ALERT, payload: 'Photo uploaded' });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
      throw error.message;
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
};

export const updateClient = (values) => {
  values.phone = values.phone.match(/\d/g).join('');
  if (values.phone2) {
    values.phone2 = values.phone2.match(/\d/g).join('');
  }
  if (values.phone3) {
    values.phone3 = values.phone3.match(/\d/g).join('');
  }

  const formData = new FormData();

  formData.set('action', 'client_info_update_react');

  for (const property in values) {
    formData.set(property, values[property]);
  }

  formData.set('birthday', moment(values.birthday).format('YYYY-MM-DD'));

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const result = await ajaxPost(formData);

      dispatch({ type: types.SHOW_ALERT, payload: result.message });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
      throw error.message;
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
};

export const deletePhoto = (clientId) => {
  const formData = new FormData();
  formData.set('action', 'delete_client_photo');
  formData.set('client_id', clientId);

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const result = await ajaxPost(formData);

      dispatch({ type: types.SHOW_ALERT, payload: result.message });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
      throw error.message;
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
};
