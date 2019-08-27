<template>
  <div>
    <h1 style="text-align:center;color:red">医院感染病例报告卡</h1>
    <a-row>
      <a-col :md="4" :sm="0"></a-col>
      <a-col :md="2" :sm="4" v-bind="alignRight">住院号:</a-col>
      <a-col :md="2" :sm="4" v-bind="alignLeft">{{ this.$route.query.pid }}</a-col>
      <a-col :md="2" :sm="4" v-bind="alignRight">姓名:</a-col>
      <a-col :md="2" :sm="4" v-bind="alignLeft">{{ this.$route.query.userName }}</a-col>
      <a-col :md="4" :sm="0"></a-col>
    </a-row>
    <a-row>
      <a-col :md="6" :sm="4"></a-col>
      <a-col :md="2" :sm="4" v-bind="alignCenter">
        <a-button type="danger" @click="handleSubmit">保存</a-button>
      </a-col>
      <a-col :md="2" :sm="4" v-bind="alignCenter">
        <a-button type="primary" @click="print()">打印</a-button>
      </a-col>
      <a-col :md="6" :sm="4"></a-col>
    </a-row>
    <div>
      <a-form :form="form">
        <a-form-item v-bind="formItemLayout" label="感染诊断">
          <a-select
            defaultValue="下呼吸道感染"
            style="width: 120px"
            v-model="caseReport.infectionDiagCode"
          >
            <a-select-option value="in1">上呼吸道感染</a-select-option>
            <a-select-option value="in2">下呼吸道感染</a-select-option>
            <a-select-option value="in3" disabled>胸膜腔感染</a-select-option>
            <a-select-option value="in4">感染性腹泻</a-select-option>
            <a-select-option value="in5">胃肠道感染</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="病原学检查">
          <a-radio-group name="radioGroup" :defaultValue="1" v-model="caseReport.etiologicEx">
            <a-radio :value="1">是</a-radio>
            <a-radio :value="0">否</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="标本名称">
          <a-input placeholder="标本名称" style="width: 200px" v-model="caseReport.etiologicSpecName" />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="易感因素">
          <div>
            <div :style="{ borderBottom: '1px solid #E9E9E9'}">
              <a-checkbox
                :indeterminate="indeterminate"
                @change="onCheckAllChange"
                :checked="checkAll"
              >{{ checkAllName }}</a-checkbox>
            </div>
            <a-checkbox-group :options="plainOptions" v-model="checkedList" @change="onChange" />
            <!--checkedList caseReport.preFactor-->
          </div>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="备注">
          <a-textarea
            placeholder="备注"
            :autosize="{ minRows: 2, maxRows: 6 }"
            v-model="caseReport.preFactorElse"
          />
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
const plainOptions = [
  { label: '糖尿病', value: 'diabetes' },
  { label: '抗生素', value: 'antibiotic' },
  { label: '肝硬化', value: 'cirrhosis' },
  { label: '药瘾者', value: 'drug-addict' },
  { label: '放疗', value: 'radiotherapy' },
  { label: '化疗', value: 'chemotherapy' },
  { label: '免疫抑制剂', value: 'immunosuppressor' },
  { label: '肿瘤', value: 'tumor' },
  { label: '营养不良', value: 'malnutrition' },
  { label: 'WBC计数<1.5 X 10/L', value: 'WBC1.5' },
  { label: '泌尿道插管', value: 'urinaryIntubation' },
  { label: '动静脉插管', value: 'hybridIntubation' },
  { label: '使用呼吸机', value: 'ventilator' },
  { label: '人工装置', value: 'artificialDevice' },
  { label: '引流管', value: 'drainageTube' },
  { label: '手术', value: 'surgery' },
  { label: '其它', value: 'else' }
]
const defaultCheckedList = [
  'diabetes',
  'antibiotic',
  'cirrhosis',
  'drug-addict',
  'radiotherapy',
  'immunosuppressor',
  'ventilator',
  'surgery',
  'else'
]
export default {
  data () {
    return {
      caseReport: {

      },
      form: this.$form.createForm(this),
      pid: '',
      patientName: '',
      checkAllName: '全选',
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
      plainOptions,
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      },
      alignLeft: {
        style: [{ 'text-align': 'left' }, { color: 'blue' }]
      },
      alignRight: {
        style: [{ 'text-align': 'right' }, { color: '#8B7500' }]
      },
      alignCenter: {
        style: [{ 'text-align': 'center' }]
      }
    }
  },
  methods: {
    onChange (checkedList) {
      this.indeterminate =
        !!checkedList.length && checkedList.length < plainOptions.length
      this.checkAll = checkedList.length === plainOptions.length
      if (checkedList.length === plainOptions.length) {
        this.checkAllName = '全不选'
      } else {
        this.checkAllName = '全选'
      }
    },
    onCheckAllChange (e) {
      Object.assign(this, {
        checkedList: e.target.checked ? plainOptions.map(v => v.value) : [],
        indeterminate: false,
        checkAll: e.target.checked,
        checkAllName: e.target.checked ? '全不选' : '全选'
      })
    },
    handleSubmit () {
      if (this.tseq !== '') {
        this.caseReport.seq = this.tseq
      }
      this.caseReport.preFactor = this.checkedList
      this.$post('infection/caseReport', {
        ...this.caseReport
      }).then((r) => {
        console.log(r.data)
        this.tseq = r.data
        this.$message.success('保存成功')
      }).catch(() => {
        this.loading = false
        this.$message.error('保存失败')
      })
    },
    print () {
      window.print()
    },
    init () {
      this.tseq = ''
    }
  },
  mounted () {
    this.init()
  }
}
</script>
