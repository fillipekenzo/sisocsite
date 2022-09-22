import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASEURL_API,
  headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Authorization",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    authorization: `Bearer ${localStorage.getItem('@Sisoc:token')}`,

  }
});

// api.interceptors.request.use(
//   async (request) => {

//     request.headers['Authorization'] = 'Bearer ' + localStorage.getItem('@Sisoc:token') + "";

//     return request
//   },
//   error => {

//   }
// )

export default api;
