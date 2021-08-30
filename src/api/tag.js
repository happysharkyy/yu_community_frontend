import request from '@/utils/request'

export function getTopicsByTag(paramMap) {
  return request({
    url: '/tag/' + paramMap.name,
    method: 'get',
    params: {
      page: paramMap.page,
      size: paramMap.size
    }
  })
}
export const save = (data,topicId) => {
  return request({
      url: '/tag/save/'+topicId,
      method: 'post',
      data: data
  })
}