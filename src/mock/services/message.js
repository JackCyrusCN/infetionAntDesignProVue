import Mock from 'mockjs2'
import { builder } from '../util' 

const notifyList = () => {
  return builder(
    Mock.mock({
      'data|5-10': [{
        'key': '@increment()',
        'title': '@word( 20, 30 )',
        'description': '@cword( 20, 30 )'
      }]
    })
  )
}

Mock.mock(/\/message\/notify/, 'get', notifyList)
