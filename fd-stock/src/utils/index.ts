import axios from 'axios';

export const API_BASE_URL = window.localStorage.getItem('SYMFONY_API_BASE_URL');

export const checkError = (result) => {
  if ('status' in result && result.status > 299) {
    const message = result?.data?.error;
    if (message != null) {
      throw new Error(message);
    } else {
      throw new Error('Bad request');
    }
  }
};

export const getParamFromUrl = (param: string): string => {
  const urlString = new URL(window.location.href);
  return urlString.searchParams.get(param);
};

export const ajaxGet = (actionName: string, params: Object = {}) => {
  const query = objectToQuery(params);
  return axios
    .get(`${API_BASE_URL}/${actionName}?${query}`)
    .then((res) => res.data);
};

export const ajaxPost = (actionName, body) => axios
  .post(`${API_BASE_URL}/${actionName}`, body)
  .then((res) => res.data);

export const ajaxPut = (actionName, body) => axios
  .put(`${API_BASE_URL}/${actionName}`, body)
  .then((res) => res.data)
  .catch((error) => checkError(error.response));

export const ajaxDelete = (actionName, body) => axios
  .delete(`${API_BASE_URL}/${actionName}`, body)
  .then((res) => res.data)
  .catch((error) => checkError(error.response));

const objectToQuery = (params: Object): string => {
  let query = '';

  Object.keys(params).forEach((currentValue) => {
    query += `${currentValue}=${params[currentValue]}&`;
  });

  return query;
};
