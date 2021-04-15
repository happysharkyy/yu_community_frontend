import request from '@/utils/request'

export function fetchCommentsByTopicId(topic_Id) {
  return request({
    url: '/comment/get_comments',
    method: 'get',
    params: {
      topicid: topic_Id
    }
  })
}

export function pushComment(data) {
  return request({
    url: '/comment/add_comment',
    method: 'post',
    data: data
  })
}

export function fetchStarByTopicId(topic_Id,type) {
  return request({
    url: '/star/get_stars',
    method: 'get',
    params: {
      topicid: topic_Id,
      type:type
    }
  })
}
export function saveStar(data){
  return request({
    url: '/star/save_star',
    method: 'post',
    data: data
  })
}

export function fetchForwardByTopicId(topic_Id,type) {
  return request({
    url: '/forward/get_forwards',
    method: 'get',
    params: {
      topicid: topic_Id,
      type:type
    }
  })
}
export function saveForward(data){
  return request({
    url: '/forward/save_forward',
    method: 'post',
    data: data
  })
}