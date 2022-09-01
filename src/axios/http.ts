import axios from 'axios'

const $http = axios.create({
  baseURL: 'https://itunes.apple.com/tw/rss',
})

$http.interceptors.request.use(
  config => {
    config.headers = {
      'Content-Type': 'application/json',
    }

    if (config.method.toString() === 'get') {
      config.url += `?timestamp=${new Date().getTime()}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

$http.interceptors.response.use(
  res => {
    switch (res.status) {
      case 200:
        return Promise.resolve(res)
      default:
        console.log(res.status)
    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          console.error(error.response)
          break
        case 401:
          console.error(error)
          break
        default:
          console.error('攔截錯誤請求', error.response.status)
          return Promise.reject(error)
      }
    }
  }
)

export default $http
