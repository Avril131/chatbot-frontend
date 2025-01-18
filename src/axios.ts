import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8888/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token'); // 从 localStorage 获取 token

    if (token) {
      config.headers[ 'Authorization' ] = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  response => {
    console.log("====origin_res", response)
    if (response.data.data.error_code === 40010) {
      localStorage.removeItem("token")
    }
    return response.data;
  },
  error => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default instance;
