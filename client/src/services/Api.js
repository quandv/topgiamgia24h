const axios = require('axios')
// import { get } from 'https';

export default() => {
  return axios.create({
    baseURL: `https://topgiamgia24h.com`
    // baseURL: `http://localhost:8081`
  })
}
