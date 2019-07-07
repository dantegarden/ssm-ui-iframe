import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 30000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code != 200) {
      message(res.msg, 'error')
      return Promise.reject(res.message)
    }
    return res.data
  },
  error => {
    const res = error.response
    console.log(res.status)
    if (res.status === 401) {
      store.dispatch('FedLogOut').then(() => { location.reload() })
    } else if (res.status === 403) {
      message(res.status + '： ' + res.data.msg, 'error')
    } else if (res.status === 400) {
      message(res.status + '： ' + res.data.msg, 'error')
    } else if (res.status === 202) {
      this.$router.push({ path: '/' })
    } else if (res.status === 503) { // 服务异常
      message(res.status + '： ' + res.data, 'error')
    } else {
      message(res.status + '： ' + res.data.message, 'error')
    }
    return Promise.reject(error)
  }
)

export function message(text, type) {
  Message({
    message: text,
    type: type,
    duration: 5 * 1000
  })
}

export default service
