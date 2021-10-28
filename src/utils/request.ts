import axios from 'axios'

const service = axios.create({
  baseURL: process.env.Vue_APP_BASE_API,
  timeout: 10000
})

// axios.defaults.baseURL = 'http://apis.imooc.com/api/' // 该接口需要 icode
// 'http://api.vikingship.xyz/api' // 不需要 icode，但需使用 devServer.proxy 反向代理实现跨域

// request 拦截器
service.interceptors.request.use(config => {
  config.params = { ...config.params, icode: '123' }
  return config
})

export default service
