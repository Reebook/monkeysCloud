import Axios from 'axios';
import { NotificationManager } from 'react-notifications';

const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    NotificationManager.error('Server Error');
  }

  return Promise.reject(1 + error);
});

const setJwt = token => {
  if (token) axios.defaults.headers['Authorization'] = token;
  else delete axios.defaults.headers['Authorization'];
};

export default {
  get: axios.get,
  patch: axios.patch,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
