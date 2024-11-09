import axios from 'axios'

axios.interceptors.request.use((req) => {
  req.withCredentials = true
  return req
})

axios.interceptors.response.use(
  (res) => res.data,
  (err) => {
    return Promise.reject(err.response.data)
  }
)
