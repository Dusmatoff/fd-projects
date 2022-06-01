import axios from 'axios';
import moment from 'moment';

export const API_BASE_URL = '/wp-admin/admin-ajax.php?action=';

export const checkError = (result) => {
  if ('status' in result && result.status > 299) {
    if (!result.success) {
      const message = result?.data?.message;
      throw new Error(message);
    } else {
      throw new Error('Bad request');
    }
  }
};

export const checkResponse = (response) => {
  if ('success' in response.data && !response.data.success) {
    throw new Error(response.data.message);
  }

  return response.data;
};

export const getParamFromUrl = (param: string): string => {
  const urlString = new URL(window.location.href);
  return urlString.searchParams.get(param);
};

export const ajaxGet = (actionName: string, params: Object = {}) => {
  const query = objectToQuery(params);
  return axios
      .get(`${API_BASE_URL}${actionName}${query}`)
      .then((res) => checkResponse(res));
};

export const ajaxPost = (actionName, body) => axios
  .post(`${API_BASE_URL}/${actionName}`, body)
  .then((res) => checkResponse(res))
  .catch((error) => checkError(error.response));

export const ajaxPut = (actionName, body) => axios
  .put(`${API_BASE_URL}/${actionName}`, body)
  .then((res) => checkResponse(res))
  .catch((error) => checkError(error.response));

export const ajaxDelete = (actionName, body) => axios
  .delete(`${API_BASE_URL}/${actionName}`, body)
  .then((res) => checkResponse(res))
  .catch((error) => checkError(error.response));

export const diffInMinutes = (last) => {
  const now = moment(new Date());
  const lastOpen = moment(last);
  const duration = moment.duration(now.diff(lastOpen));

  return duration.asMinutes();
}

const objectToQuery = (params: Object): string => {
  let query = '';

  Object.keys(params).forEach((currentValue) => {
    query += `&${currentValue}=${params[currentValue]}`;
  });

  return query;
};
