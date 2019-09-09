import { axios } from '@/utils/request'

const api = {
  examineTree: '/examine/tree',
  examineList: '/examine/list'
}

export default api

export function getExamineTree (parameter) {
  return axios({
    url: api.examineTree,
    method: 'get',
    params: parameter
  })
}

export function getExamineList (parameter) {
  return axios({
    url: api.examineList,
    method: 'get',
    params: parameter
  })
}
