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

Mock.mock(/\/case\/list/, 'get', caseList)
