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
  },
  infectionDiag: function () {
    const arr = ['上呼吸道感染', '下呼吸道感染', '胸膜腔感染', '血管相关性感染', '败血症',
      '输血相关感染', '侵犯心脏瓣膜的心内膜炎', '心肌炎或心包炎', '感染性腹泻', '胃肠道感染',
      '抗菌药物相关性腹泻', '病毒性肝炎', '腹(盆)腔内组织感染', '腹水感染', '皮肤感染', '软组织感染',
      '褥疮感染', '烧伤感染', '乳腺脓肿或乳腺炎', '脐炎', '婴儿脓疱病']
    return this.pick(arr)
  }
})
