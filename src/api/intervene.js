import { axios } from '@/utils/request'

const api = {
  interveneList: '/intervene/list'
}

export default api

// 获取预警树
export function getInterveneList (parameter) {
  return axios({
    url: api.interveneList,
    method: 'get',
    params: parameter
  })
}
