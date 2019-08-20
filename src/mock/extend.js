import { Random } from 'mockjs2'

Random.extend({
  // 自定义函数名：function(){}
  in_diagnose: function () {
    const arr = ['呼吸系统', '消化系统', '泌尿系统', '中枢神经系统', '心血管系统',
      '骨和关节', '血液', '生殖系统', '手术部位']
    return this.pick(arr)
  },
  infection: function () {
    const arr = ['大肠埃希菌(多重耐药)','白色念珠菌','革兰阳性杆菌','鲍曼不动杆菌(多重耐药)','凝固酶阳性葡萄球菌(多重耐药)']
    return this.pick(arr)
  }
})
