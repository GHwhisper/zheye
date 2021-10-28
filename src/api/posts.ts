import request from '@/utils/request'

// 获取专栏中的文章列表
export function getPosts (cid: string): any {
  return request({
    url: `/columns/${cid}/posts`,
    method: 'get'
  })
}
