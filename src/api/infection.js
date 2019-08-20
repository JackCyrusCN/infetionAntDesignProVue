import { axios } from '@/utils/request'

const api = {
  warningTree: '/warning/tree',
  warning: '/warning/list',
  breathMachine: '/warning/breath-machine',
  fever: '/warning/fever',
  intubationCenter: '/warning/intubation-center',
  intubationUrinary: '/warning/intubation-urinary',
  routinBlood: '/warning/routin-blood',
  routinUrinary: '/warning/routin-urinary',
  bacteria: '/warning/bacteria',
  antibiotic: '/warning/antibiotic'
}

export default api

// 获取预警树
export function getWarningTree (parameter) {
  return axios({
    url: api.warningTree,
    method: 'get',
    params: parameter
  })
}

// 获取预警List
export function getWarningList (parameter) {
  return axios({
    url: api.warning,
    method: 'get',
    params: parameter
  })
}

export function getBreathMachine (parameter) {
  return axios({
    url: api.breathMachine,
    method: 'get',
    params: parameter
  })
}

export function getFever (parameter) {
  return axios({
    url: api.fever,
    method: 'get',
    params: parameter
  })
}

export function getIntubationCenter (parameter) {
  return axios({
    url: api.intubationCenter,
    method: 'get',
    params: parameter
  })
}

export function getIntubationUrinary (parameter) {
  return axios({
    url: api.intubationUrinary,
    method: 'get',
    params: parameter
  })
}

export function getRoutinBlood (parameter) {
  return axios({
    url: api.routinBlood,
    method: 'get',
    params: parameter
  })
}

export function getRoutinUrinary (parameter) {
  return axios({
    url: api.routinUrinary,
    method: 'get',
    params: parameter
  })
}

export function getBacteria (parameter) {
  return axios({
    url: api.bacteria,
    method: 'get',
    params: parameter
  })
}

export function getAntibiotic (parameter) {
  return axios({
    url: api.antibiotic,
    method: 'get',
    params: parameter
  })
}
