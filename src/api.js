import axios from 'axios'
import store from '@/store'

axios.defaults.baseURL = 'http://localhost:8080/server/api/v1/admin'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = `Bearer ${store.state.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error.response.data)
  }
)

export default {
  FirmList: _ => {
    return axios.get('/firms')
  },
  FuturesList: _ => {
    return axios.get('/futures')
  },
  OrderList: params => {
    return axios.get('/orders', { params: params })
  },
  TradeList: params => {
    return axios.get('/trades', { params: params })
  }
}
