import request from '@/utils/request'


// 发布
export function chatList(userId) {
    return request(({
      url: '/chatList/getList',
      method: 'post',
      params: { userId: userId}
    }))
  }
  // 发布
export function remove(id) {
  return request(({
    url: '/chatList/remove',
    method: 'post',
    params: {id:id}
  }))
}
export function insertChat(userId,signId) {
    return request(({
      url: '/chatList/insertChat',
      method: 'post',
      params: {userId:userId,signId:signId}
    }))
  }
