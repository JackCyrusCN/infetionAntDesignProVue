import { axios } from '@/utils/request'

const api = {
  caseList: '/case/list',
  reportedList: '/iregister/reported/list'
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

export function getReportedList (parameter) {
  return axios({
    url: api.reportedList,
    method: 'get',
    params: parameter
  })
}
