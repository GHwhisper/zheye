import request from '@/utils/request'

// 获取专栏列表
export function getColumns (): any {
  return request({
    url: '/columns',
    method: 'get'
  })
}

// 获取专栏详情
export function getColumnById (cid: string): any {
  return request({
    url: `/columns/${cid}`,
    method: 'get'
  })
}
