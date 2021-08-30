import request from '@/utils/request'


// 发布
export function findNotice() {
    return request(({
      url: '/notice/findNotice',
      method: 'get',
    }))
}
// 发布
export function findDomain() {
  return request(({
    url: '/notice/findDomain',
    method: 'get',
  }))
}
export function Count() {
    return request(({
      url: '/notice/Count',
      method: 'get',
    }))
}