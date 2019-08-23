import { Random } from 'mockjs2'

Random.extend({
  // 自定义函数名：function(){}
  in_diagnose: function () {
    const arr = ['呼吸系统', '消化系统', '泌尿系统', '中枢神经系统', '心血管系统',
      '骨和关节', '血液', '生殖系统', '手术部位']
    return this.pick(arr)
  },
  infection: function () {
    const arr = ['大肠埃希菌(多重耐药)', '白色念珠菌', '革兰阳性杆菌', '鲍曼不动杆菌(多重耐药)', '凝固酶阳性葡萄球菌(多重耐药)']
    return this.pick(arr)
  },
  deptdt: function (i) {
    const arr = ['内一科病房', '内二科病房', '外一科病房', '外二科病房', '外三科病房',
      '外四科病房', '妇产科病房', '儿科病房', '肛肠科病房', '感染科病房',
      '手术室', '麻醉室', 'ICU病房', 'CCU病房', '高级病房', '急诊科',
      '供应室', '口腔科门诊', '皮肤科门诊', '内科门诊', '妇科门诊',
      '耳鼻喉门诊', '中医门诊']
    if (i > arr.length) {
      i = i % arr.length
      if (i === 0) {
        i = 5
      }
    }
    return arr[i - 1]
  },
  genderdt: function () {
    const arr = ['0', '1', '2']
    return this.pick(arr)
  }
})
