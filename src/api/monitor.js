import { axios } from '@/utils/request'

const api = {
  icuList: '/monitor/target/icu/list'
}

export default api

// 获取预警树
export function getIcuList (parameter) {
  return axios({
    url: api.icuList,
    method: 'get',
    params: parameter
  })
}
