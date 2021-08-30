
import request from '@/utils/request'


// 所有活动
export function getList() {
    return request(({
      url: '/activity/getList',
      method: 'get',
    }))
}
// 用户查看自己活动
export function getListByUser() {
  return request(({
    url: '/activity/getListByUser',
    method: 'get',
  }))
}

export function getActivityById(id) {
    return request(({
      url: '/activity/getActivityById/'+id,
      method: 'get',
    }))
}
export function doMiaoSha(id) {
    return request(({
      url: '/activity/do_miaosha/'+id,
      method: 'get',
    }))
}

export function unsign(activityId) {
  return request(({
    url: '/activity/unsign',
    method: 'get',
    params: {activityId:activityId}
  }))
}
