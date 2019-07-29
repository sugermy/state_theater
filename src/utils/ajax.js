import axios from 'axios';
import { Promise } from 'q';
import { Toast } from 'mint-ui';
let baseUrl = '';

export default {
  get(method, url, data, params) {
    return new Promise(function(resolve, reject) {
      axios
        .request({
          method: method,
          url: baseUrl + url,
          data: data,
          params: params
        })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          Toast('请求错误');
          resolve(err);
        });
    });
  }
};
