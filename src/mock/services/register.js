import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const totalCount = 25
const caseList = (options) => {
  const parameters = getQueryParameters(options)
  const result = []
  const pageNo = parseInt(parameters.pageNum)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1
  for (let i = 1; i < next; i++) {
    result.push({
      key: Mock.mock('@increment(1)'),
      pid: Mock.mock('@integer(10000000, 99999999)'),
      patientName: Mock.mock('@cword(3, 5)'),
      gender: Mock.mock('@genderdt()'),
      age: Mock.mock('@natural(0,100)'),
      ageUnit: Mock.mock('@word(10, 20)'),
      admissionDate: Mock.mock('@datetime'),
      editable: false
    })
  }

  return builder({
    pageSize: pageSize,
    pageNum: pageNo,
    total: totalCount,
    totalPage: totalPage,
    data: result
  })
}

const reportedList = (options) => {
  const parameters = getQueryParameters(options)

  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      key: tmpKey,
      id: tmpKey,
      no: Mock.mock('@integer(10000000, 99999999)'),
      patientName: Mock.mock('@cword(3, 5)'),
      infectionDiag: Mock.mock('@infectionDiag()'),
      status: Mock.mock('@integer(0, 2)'),
      updatedAt: Mock.mock('@datetime'),
      editable: false
    })
  }

  return builder({
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result
  })
}

Mock.mock(/\/case\/list/, 'get', caseList)
Mock.mock(/\/iregister\/reported\/list/, 'get', reportedList)
