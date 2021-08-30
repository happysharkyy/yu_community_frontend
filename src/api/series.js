import request from '@/utils/request'
// 列表
export function getListSeries(pageNo, size) {
    return request(({
      url: '/series/list',
      method: 'get',
      params: { pageNo: pageNo, size: size }
    }))
  } 
  
export function getPostsBySeries(pageNo, size , seriesId) {
    return request(({
      url: '/series/findPostBySeries',
      method: 'post',
      params: { pageNo: pageNo, size: size, size: size ,seriesId: seriesId}
    }))
  }
export function getListSeriesAll(pageNo, size) {
    return request(({
      url: '/series/listAll',
      method: 'get',
      params: { pageNo: pageNo, size: size }
    }))
}
  
// 发布
export function series(topic) {
    return request({
      url: '/series/create',
      method: 'post',
      data: topic
    })
  }
export function saveSeriesPost(topicId,seriesId) {
    return request({
      url: '/series/saveSeriesPost',
      method: 'post',
      params: {
        topicId: topicId,
        seriesId: seriesId
        }
    })
}
export function findSeriesByPost(topicId) {
    return request({
      url: '/series/findSeriesByPost',
      method: 'post',
      params: {
        topicId: topicId
        }
    })
}

export function findSeries() {
    return request({
        url: '/series/findSeries',
        method: 'get'
    })
}
export function viewSeries(id) {
    return request({
        url: '/series/findById/'+id,
        method: 'get'
    })
}
// 浏览
export function getSeries(id) {
    return request({
        url: `/series`,
        method: 'get',
        params: {
        id: id
        }
    })
}
export function update(topic) {
    return request({
        url: '/series/update',
        method: 'post',
        data: topic
    })
}

export function deleteSeries(id) {
    return request({
        url: `/series/delete/${id}`,
        method: 'delete'
    })
}
