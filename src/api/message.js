import request from '@/utils/request'


// 发布
export function getList(pageNo, size,name) {
  if(name == null){
    name=''
  }
    return request(({
      url: '/sysMessage/findMessagePageByUserId',
      method: 'post',
      params: { pageNo: pageNo, size: size,name: name}
    }))
  }
  // 发布
export function getHistory(conversationId,userId) {
  if(conversationId!=null){
    return request(({
      url: '/sysMessage/findMessageByConversationId',
      method: 'post',
      params: {conversationId: conversationId,userId:userId}
    }))
  }
}
export function getCount() {
  return request(({
    url: '/sysMessage/getCountUnreadAll',
    method: 'get',
  }))
}
getCount