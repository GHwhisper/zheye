import request from '@/utils/request'

// 获取专栏列表
export function getColumns (): any {
  return request({
    url: '/columns',
    method: 'get'
  })
}
