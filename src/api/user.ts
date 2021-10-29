import request from '@/utils/request'

interface loginForm {
  email: string
  password: string
}

// 登录
export function login (data: loginForm): any {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 获取当前用户信息
export function getUserInfo (): any {
  return request({
    url: '/user/current',
    method: 'get'
  })
}
