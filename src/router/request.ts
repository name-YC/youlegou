import axios from 'axios'

// 根路径
axios.defaults.baseURL = 'http://127.0.0.1:8802/api/private/v1/'
// 请求超时
// axios.defaults.timeout = 5000 // 超时时间

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      // console.log('拦截器')
      if (config.headers['X-Skip-Interceptor']) {
        console.log('跳过拦截器')
        return config
      }
      console.log(token)
      config.headers.Authorization = token
    } else {
      config.headers.token = localStorage.getItem('token')
    }
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default axios
