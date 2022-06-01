import axios from 'axios';

export const getParamFromUrl = (param: string): string => {
  const urlString = new URL(window.location.href);
  return urlString.searchParams.get(param);
};

export const ajaxGet = (actionName: string, params: Object = {}) => {
  const query = objectToQuery(params);
  return axios
    .get(`/wp-admin/admin-ajax.php?action=${actionName}${query}`)
    .then((res) => res.data);
};

export const ajaxPost = (actionName, body) => axios
  .post(`/wp-admin/admin-ajax.php?action=${actionName}`, body)
  .then((res) => res.data);

const objectToQuery = (params: Object): string => {
  let query = '';

  Object.keys(params).forEach((currentValue) => {
    query += `&${currentValue}=${params[currentValue]}`;
  });

  return query;
};
