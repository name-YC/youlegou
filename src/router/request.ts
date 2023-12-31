import axios from 'axios'

// 根路径
//  axios.defaults.baseURL =
// axios.defaults.baseURL = 'http://localhost:8801'

const  requests = axios.create({
    baseURL: 'http://127.0.0.1:8802/api/private/v1/',   //引入接口
    timeout: 20000,
});

// 请求超时
// axios.defaults.timeout = 5000 // 超时时间

requests.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      // console.log('拦截器')
      if (config.headers['X-Skip-Interceptor']) {
        console.log('跳过拦截器')
        return config;
      }
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default requests
