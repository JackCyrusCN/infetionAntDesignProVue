import { axios } from '@/utils/request'

const api = {
  generalList: '/general/list'
}

export default api

// 获取预警树
export function getGeneralList (parameter) {
  return axios({
    url: api.generalList,
    method: 'get',
    params: parameter
  })
}
