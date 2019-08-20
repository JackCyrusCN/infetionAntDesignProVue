import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const totalCount = 4// 70 // 1

const warningList = (options) => {
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
      in_diagnose: Mock.mock('@in_diagnose()'),
      inspect: Mock.mock('@infection()'),
      num: Mock.mock('@integer(1, 15)'),
      periods_time: Mock.mock('@date(MM-dd)' + '/' + '@date(MM-dd)'),
      days: Mock.mock('@integer(10, 30)'),
      fever: Mock.mock('@integer(10, 30)'),
      ratio_blood: Mock.mock('@integer(1, 10)' + '/' + '@integer(15, 25)'),
      factor_danger: Mock.mock('@cword(10)'),
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
const warningTree = () => {
  return builder([{
    'key': 'key-01',
    'title': '科室预警',
    'icon': 'mail',
    'children': [{
      'key': 'key-01-01',
      'title': '内一科',
      'icon': null,
      'children': [
        {
          'key': 'key-01-01-01',
          'title': '00245123/测试',
          'icon': null
        },
        {
          'key': 'key-01-01-02',
          'title': '00245124/测试1',
          'icon': null
        }
      ]
    },
    {
      'key': 'key-01-02',
      'title': '内二科',
      'icon': null
    },
    {
      'key': 'key-01-03',
      'title': '外科',
      'icon': null
    },
    {
      'key': 'key-01-04',
      'title': '妇科',
      'icon': null
    },
    {
      'key': 'key-01-05',
      'title': '手术室',
      'icon': null
    }
    ]
  },
  {
    'key': 'key-02',
    'title': '病历预警',
    'icon': 'dollar',
    'children': [{
      'key': 'key-02-01',
      'title': '内一科',
      'icon': null
    },
    {
      'key': 'key-02-02',
      'title': '内二科',
      'icon': null
    },
    {
      'key': 'key-02-03',
      'title': '外科',
      'icon': null
    },
    {
      'key': 'key-02-04',
      'title': '妇科',
      'icon': null
    },
    {
      'key': 'key-02-05',
      'title': '手术室',
      'icon': null
    }
    ]
  }])
}
Mock.mock(/\/warning\/tree/, 'get', warningTree)
Mock.mock(/\/warning/, 'get', warningList)
