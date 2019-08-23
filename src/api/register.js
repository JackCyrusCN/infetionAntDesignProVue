import { axios } from '@/utils/request'

const api = {
  caseList: '/case/list'
}

export default api

// 获取预警树
export function getCaseList (parameter) {
  return axios({
    url: api.caseList,
    method: 'get',
    params: parameter
  })
}
