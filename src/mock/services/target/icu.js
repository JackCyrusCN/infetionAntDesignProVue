import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../../util'

const totalCount = 55

const breathMaList = (options) => {
  const parameters = getQueryParameters(options)
  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1
  for (let i = 1; i < next; i++) {
    result.push({
      'zyid': Mock.mock('@natural(10000000,99999999)'),
      'pname': Mock.mock('@cword(3,5)'),
      'diagnose': Mock.mock('@cword(5,8)'),
      'admissionDate': Mock.mock('@datetime()'),
      'admIcuDate': Mock.mock('@datetime()'),
      'days': Mock.mock('@natural(3,25)'),
      'reason': Mock.mock('@cword(10,30)'),
      'methods': Mock.mock('@natural(1,3)'),
      'startDate': Mock.mock('@datetime()'),
      'endDate': Mock.mock('@datetime()')
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

Mock.mock(/\/monitor\/target\/icu/, 'get', breathMaList)
