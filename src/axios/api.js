import axios from "axios";
import comm from "../common/comm";
import { Loading, Message,MessageBox } from "element-ui";
import router from '../router';

axios.defaults.timeout = 30000;
axios.defaults.baseURL = comm.SERVER_PATH;
axios.defaults.headers = {
  "X-Requested-With": "XMLHttpRequest"
};

function callback(res, resolve, loadingInstance) {
  loadingInstance.close();
  if (res.data.code == 200) {
    //SUCCESS_MSG
    Message.success({
      message: res.data.errMsg
    });
  }
  if (res.data.code == 500) {
    Message.warning({
      message: res.data.errMsg
    });
  }
  if (res.data.code == 101) {
    //WARNING
    Message.warning({
      message: res.data.errMsg
    });
  }
  resolve(res.data);
}

function error(err, resolve, loadingInstance) {
  loadingInstance.close();
  Message.error({
    message: "网络错误，请联系管理员处理!"
  });
}

export default {
  addRandom(url){
    if(url.indexOf("?")>=0){
    }
    else{
      url+="?";
    }
    url+="&t="+Math.random();
    return url;
  },
  // get请求
  get(url, param) {
    url = this.addRandom(url);
    let loadingInstance = Loading.service({
      customClass: "appLoading",
      lock: true,
      text: "正在处理",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)"
    });
    return new Promise(resolve => {
      axios({
        method: "get",
        url: comm.urlPrefix + url,
        params: param || {}
      })
        .then(res => callback(res, resolve, loadingInstance))
        .catch(err => error(err, resolve, loadingInstance));
    });
  },
  // post请求
  post(url, param) {
    url = this.addRandom(url);
    let loadingInstance = Loading.service({
      customClass: "appLoading",
      lock: true,
      text: "正在处理",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)"
    });
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: comm.urlPrefix + url,
        data: param || {}
      })
        .then(res => callback(res, resolve, loadingInstance))
        .catch(err => error(err, resolve, loadingInstance));
    });
  }
};
