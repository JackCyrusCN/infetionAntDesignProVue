import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const interveneList = (options) => {
  const parameters = getQueryParameters(options)
  console.log('options==>' + JSON.stringify(options))
  console.log('parameters==>' + JSON.stringify(parameters))
  const title = parameters.title
  let content = ''
  switch (title) {
    case '目标性监测与干预措施降低VAP':
      content = `抬高床头
      <br />管道给予灭菌水
      <br />24-48-72-根据需要气管导管`
      break
    case '2':
      content = '2'
      break
    default:
      content = '3'
  }
  return builder({
    'content': content
  })
}

Mock.mock(/\/intervene\/list/, 'get', interveneList)
