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
