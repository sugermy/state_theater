import axios from 'axios';
import { Promise } from 'q';
import { Toast } from 'mint-ui';
let baseUrl = 'http://192.168.33.174';

axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default {
  get(url, data, params) {
    return new Promise(function(resolve, reject) {
      axios
        .request({
          method: 'get',
          url: baseUrl + url,
          data: data,
          params: params
        })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          Toast('请求失败');
          resolve(err);
        });
    });
  }
};
