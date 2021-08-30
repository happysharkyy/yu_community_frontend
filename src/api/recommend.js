import request from '@/utils/request'


// 发布
export function getList() {
    return request(({
      url: '/Recommend/getList',
      method: 'get',
    }))
}