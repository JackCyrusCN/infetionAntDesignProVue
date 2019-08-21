import Mock from 'mockjs2'
import { builder } from '../util'  // getQueryParameters

const generalList = () => {
  return builder(
    Mock.mock({
      'data|30': [{
        'key': '@word(8)',
        'dept': '@deptdt(@increment()',
        'inNum': '@natural( 25, 50 )',
        'infectionNum': '@natural( 0, 25 )',
        'infectionRatio': '@natural( 0, 90 )' + '%'
        // 'infectionRatio':'infectionNum / inNum'
      }]
    })
  )
}

Mock.mock(/\/general\/list/, 'get', generalList)
