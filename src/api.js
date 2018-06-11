import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/server/api/v1/admin'
axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJTQUlUTyIsImV4cCI6MTUzNDk1Njc0MywianRpIjoiOTRjNmJjYjUtNmIwNi0xMWU4LWIxNzQtNmEwMDAyMjNkNTQwIiwiaWF0IjoxNTI4NDUzNjY0fQ.1vwUpnU4yiqd53S3Adr9mUEIofv9xyUHd8ZxiVJryiw'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export default {
  OrderList: params => {
    return axios.get('/orders', params)
  },
  TradeList: params => {
    return axios.get('/trades', params)
  }
}
