import axios from 'axios';
import { API_ROOT } from '../config/app.config';

axios.defaults.timeout = 5000;
axios.defaults.baseURL = API_ROOT;

// axios.interceptors.request.use(config => {
//   config;
// }, error => {
//   Promise.reject(error);
// });
//
// axios.interceptors.response.use(response => {
//   response;
// }, error => {
//   console.log(error);
//   return Promise.reject(error);
// });

export default axios;