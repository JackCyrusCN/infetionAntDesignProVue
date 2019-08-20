import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const totalCount = 4// 70 // 1

const warningList = (options) => {
  const parameters = getQueryParameters(options)
  console.log('options==>' + JSON.stringify(options))
  console.log('parameters==>' + JSON.stringify(parameters))
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
  return builder([
    {
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

const breathMachine = () => {
  // console.log('breathMachine==>' + JSON.stringify(options))
  return builder(
    Mock.mock({
      'data|30': [{
        'index': '@increment(1)',
        'flag': '@natural( 0, 1 )'
      }]
    })
  )
}

const fever = () => {
  return builder(
    Mock.mock({
      'data|30': [{
        'index': '@increment(1)',
        'flag': '@natural( 0, 1 )'
      }]
    })
  )
}

const intubationCenter = () => {
  return builder(
    Mock.mock({
      'data|30': [{
        'index': '@increment(1)',
        'flag': '@natural( 0, 1 )'
      }]
    })
  )
}

const intubationUrinary = () => {
  return builder(
    Mock.mock({
      'data|30': [{
        'index': '@increment(1)',
        'flag': '@natural( 0, 1 )'
      }]
    })
  )
}

const routinBlood = () => {
  return builder(
    Mock.mock({
      'data|30': [{
        'index': '@increment(1)',
        'flag': '@natural( 0, 1 )'
      }]
    })
  )
}

const routinUrinary = () => {
  return builder(
    Mock.mock({
      'data|30': [{
        'index': '@increment(1)',
        'flag': '@natural( 0, 1 )'
      }]
    })
  )
}

const bacteria = () => {
  return builder(
    Mock.mock({
      'data|30': [{
        'index': '@increment(1)',
        'flag': '@natural( 0, 1 )'
      }]
    })
  )
}

const antibiotic = () => {
  return builder(
    Mock.mock({
      'data|30': [{
        'index': '@increment(1)',
        'flag': '@natural( 0, 1 )'
      }]
    })
  )
}

Mock.mock(/\/warning\/tree/, 'get', warningTree)
Mock.mock(/\/warning\/breath-machine/, 'get', breathMachine)
Mock.mock(/\/warning\/fever/, 'get', fever)
Mock.mock(/\/warning\/intubation-center/, 'get', intubationCenter)
Mock.mock(/\/warning\/intubation-urinary/, 'get', intubationUrinary)
Mock.mock(/\/warning\/routin-blood/, 'get', routinBlood)
Mock.mock(/\/warning\/routin-urinary/, 'get', routinUrinary)
Mock.mock(/\/warning\/bacteria/, 'get', bacteria)
Mock.mock(/\/warning\/antibiotic/, 'get', antibiotic)
Mock.mock(/\/warning\/list/, 'get', warningList)
