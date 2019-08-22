import { axios } from '@/utils/request'

const api = {
  notifyList: '/message/notify'
}

export default api

// 获取预警树
export function getNotifyList (parameter) {
  return axios({
    url: api.notifyList,
    method: 'get',
    params: parameter
  })
}
