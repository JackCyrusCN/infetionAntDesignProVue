<template>
  <div>
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <a-form :form="form">
        <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
          <a-button htmlType="submit" type="primary" @click="handleSubmit()">提交</a-button>
          <a-button style="margin-left: 8px" @click="print()">打印</a-button>
          <a-button style="margin-left: 8px" @click="goBack()">返回</a-button>
        </a-form-item>
        <a-form-item
          v-bind="formItemLayout"
          label="审批建议/排除原因"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-textarea
            placeholder="建议/原因"
            :autosize="{ minRows: 2, maxRows: 6 }"
            v-model="caseReport.advice"
          />
        </a-form-item>
        <a-form-item
          v-bind="formItemLayout"
          label="感染诊断"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-select style="width: 240px" v-model="caseReport.infectionDiagCode" disabled>
            <a-select-option value="in1">上呼吸道感染</a-select-option>
            <a-select-option value="in2">下呼吸道感染</a-select-option>
            <a-select-option value="in3">胸膜腔感染</a-select-option>
            <a-select-option value="in4">血管相关性感染</a-select-option>
            <a-select-option value="in5">败血症</a-select-option>
            <a-select-option value="in6">输血相关感染</a-select-option>
            <a-select-option value="in7">侵犯心脏瓣膜的心内膜炎</a-select-option>
            <a-select-option value="in8">心肌炎或心包炎</a-select-option>
            <a-select-option value="in9">感染性腹泻</a-select-option>
            <a-select-option value="in10">胃肠道感染</a-select-option>
            <a-select-option value="in11">抗菌药物相关性腹泻</a-select-option>
            <a-select-option value="in12">病毒性肝炎</a-select-option>
            <a-select-option value="in13">腹(盆)腔内组织感染</a-select-option>
            <a-select-option value="in14">腹水感染</a-select-option>
            <a-select-option value="in15">皮肤感染</a-select-option>
            <a-select-option value="in16">软组织感染</a-select-option>
            <a-select-option value="in17">褥疮感染</a-select-option>
            <a-select-option value="in18">烧伤感染</a-select-option>
            <a-select-option value="in19">乳腺脓肿或乳腺炎</a-select-option>
            <a-select-option value="in20">脐炎</a-select-option>
            <a-select-option value="in21">婴儿脓疱病</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          v-bind="formItemLayout"
          label="病原学检查"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-radio-group
            name="radioGroup"
            :defaultValue="1"
            v-model="caseReport.etiologicEx"
            disabled
          >
            <a-radio :value="1">是</a-radio>
            <a-radio :value="0">否</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          v-bind="formItemLayout"
          label="标本名称"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-input
            placeholder="标本名称"
            style="width: 200px"
            v-model="caseReport.etiologicSpecName"
            disabled
          />
        </a-form-item>
        <a-form-item
          v-bind="formItemLayout"
          label="易感因素"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <div>
            <div :style="{ borderBottom: '1px solid #E9E9E9'}">
              <a-checkbox
                :indeterminate="indeterminate"
                @change="onCheckAllChange"
                :checked="checkAll"
                disabled
              >{{ checkAllName }}</a-checkbox>
            </div>
            <a-checkbox-group
              :options="plainOptions"
              v-model="caseReport.preFactor"
              @change="onChange"
              disabled
            />
            <!--checkedList caseReport.preFactor-->
          </div>
        </a-form-item>
        <a-form-item
          v-bind="formItemLayout"
          label="备注"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-textarea
            placeholder="备注"
            :autosize="{ minRows: 2, maxRows: 6 }"
            v-model="caseReport.preFactorElse"
            disabled
          />
        </a-form-item>
      </a-form>
    </a-card>
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
export default {
  data () {
    return {
      caseReport: this.$route.query.caseReport,
      form: this.$form.createForm(this),
      pid: '',
      patientName: '',
      checkAllName: '全选',
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
  computed: {

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
    print () {
      window.print()
    },
    init () {
      this.tseq = ''
    },
    goBack () {
      this.$router.back()
    },
    handleSubmit () {
    }
  },
  mounted () {
    this.init()
    console.log('1')
    console.log('query==>' + JSON.stringify(this.$route.query.caseReport))
    console.log('2')
  }
}
</script>
